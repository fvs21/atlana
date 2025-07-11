from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import HttpRequest, JsonResponse

from authentication.serializers.serializers import *
from user.models import UserInformation
from ..services import service
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from backend.permissions import IsGuest
from rest_framework.decorators import api_view
from django.contrib.auth.models import update_last_login

class AuthenticationViewSet(viewsets.ViewSet):
    permission_classes = [IsGuest]

    @action(methods=['post'], detail=False)
    def register(self, request: HttpRequest):
        serializer = RegistrationSerializer(data=request.data, context={'request': request})

        if not serializer.is_valid():
            if 'email' in serializer.errors and 'user with this email already exists.' in serializer.errors['email']:
                return JsonResponse({
                    'details': 'User with this email already exists',
                    'code': 'email_already_exists'
                }, status=400)
                
            return JsonResponse({
                'details': serializer.errors,
                'code': 'registration_failed'
            }, status=400)
        
        user = serializer.save()

        update_last_login(None, user)

        UserInformation.objects.create(user=user)
        service.generate_and_send_verification_code(user)
        
        return service.generate_authentication_response(user)
    
    @action(methods=['post'], detail=False)
    def login(self, request: HttpRequest):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                'details': 'Invalid credentials',
                'code': 'login_failed'
            }, status=400)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = authenticate(email=email, password=password)

        if not User.objects.filter(email=email, google_id=None).exists() or user is None:
            return JsonResponse({
                'details': 'Invalid credentials',
                'code': 'login_failed'
            }, status=400)
        
        update_last_login(None, user)
        
        return service.generate_authentication_response(user)

    @action(methods=["POST"], detail=False)
    def forgot_password(self, request: HttpRequest) -> JsonResponse:
        data = ForgotPasswordRequestSerializer(data=request.data)

        if not data.is_valid():
            return JsonResponse({
                "details": data.errors,
                "code": "invalid_data"
            }, status=400)

        result = service.generate_and_send_password_reset_token(data.validated_data['email'])

        if result:
            return JsonResponse({"details": "Password reset token sent"}, status=200)

        return JsonResponse({
            "details": "You must wait 5 minutes before requesting a new token", 
            'code': 'token_rate_limit'
        }, status=429)

    @action(methods=['POST'], detail=False)
    def reset_password(self, request: HttpRequest) -> JsonResponse:
        data = ResetPasswordSerializer(data=request.data)

        if not data.is_valid():
            return JsonResponse({"details": data.errors, 'code': 'invalid_data'}, status=400)
        
        validated_data = data.validated_data

        result: bool = service.reset_password(validated_data['email'], validated_data['token'], validated_data['new_password'])

        if result:
            return JsonResponse({"details": "Password reset successful"}, status=200)
        
        return JsonResponse({"details": "Invalid password reset token", 'code': 'invalid_reset_token'}, status=400)
    
class AuthenticatedAuthViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=False)
    def session(self, request: HttpRequest) -> JsonResponse:
        return service.get_session(request)
    
    @action(methods=['post'], detail=False)
    def logout(self, request: HttpRequest) -> JsonResponse:
        service.logout_session(request)
        
        return service.generate_logout_cookie()
    
    @action(methods=['post'], detail=False)
    def verify_email(self, request: HttpRequest) -> JsonResponse:
        serializer = VerifyEmailRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"details": serializer.errors}, status=400)

        user = request.user

        result = service.check_email_verification(user, serializer.data['code'])

        if result:
            response = service.generate_authentication_response(user)

            response['details'] = "Email verified"

            return response
        
        return JsonResponse({"details": "Invalid verification code", "code": "invalid_verification_code"}, status=400)

    @action(methods=['post'], detail=False)
    def request_email_verification_code(self, request: HttpRequest) -> JsonResponse:
        user = request.user

        result = service.resend_email_verification_code(user)

        if result:
            return JsonResponse({"details": "Verification email sent"}, status=200)
        
        return JsonResponse(
            {
                "details": "You need to wait 5 minutes to request a new verification code",
                "code": "code_rate_limit"
            }, 
            status=429
        )

    @action(methods=['post'], detail=False)
    def delete_account(self, request: HttpRequest) -> JsonResponse:
        user = request.user

        serializer = DeleteAccountRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                "details": serializer.errors,
                "code": "invalid_data"
            }, status=400)
        
        password = serializer.validated_data['password']

        if not user.check_password(password):
            return JsonResponse({
                "details": "Incorrect password",
                "code": "incorrect_password"
            }, status=400)
        
        service.delete_account(user)

        return service.generate_logout_cookie()

    @action(methods=['patch'], detail=False)
    def update_password(self, request: HttpRequest) -> JsonResponse:
        serializer = UpdatePasswordSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"details": serializer.errors, "code": "invalid_data"}, status=400)
        
        user = request.user

        validated_data = serializer.validated_data

        if user.has_user_changed_password_in_the_last_24_hours():
            return JsonResponse({
                "details": "You cannot change your password more than once in 24 hours",
                "code": "user_already_changed_password"
            }, status=429)

        if not user.check_password(validated_data['current_password']):
            return JsonResponse({"details": "Incorrect password", "code": "incorrect_password"}, status=400)
        
        if len(validated_data['new_password']) < 8:
            return JsonResponse({
                "code": "insecure_password",
                "details": "You must choose a more secure password"
            }, status=400)
        
        service.change_password(user, validated_data['new_password'])

        return JsonResponse({"details": "Password updated successfully"}, status=200)
    

@api_view(['POST'])
def refresh(request: HttpRequest) -> JsonResponse:
    refresh_token = request.COOKIES.get("user_r")

    if not refresh_token:
        return JsonResponse({"details": "Refresh token missing"}, status=400)

    token = service.process_refresh_token(refresh_token)

    if token is None:
        return JsonResponse({"details": "Invalid refresh token"}, status=400)
    
    return JsonResponse({
        "data": {
            "access_token": str(token.access_token)
        }
    }, status=200)