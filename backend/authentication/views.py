from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import HttpRequest, JsonResponse

from authentication.serializers import *
from user.serializers import UserSerializer
from . import service
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from backend.permissions import IsGuest
from rest_framework.decorators import api_view

class AuthenticationViewSet(viewsets.ViewSet):
    permission_classes = [IsGuest]

    @action(methods=['post'], detail=False)
    def register(self, request: HttpRequest):
        serializer = RegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                'details': serializer.errors,
                'code': 'registration_failed'
            }, status=400)
        
        user = serializer.save()

        service.generate_and_send_verification_email(user)

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

        if user is None:
            return JsonResponse({
                'details': 'Invalid credentials',
                'code': 'login_failed'
            }, status=400)
        
        return service.generate_authentication_response(user)

    @action(methods=["POST"], detail=False)
    def forgot_password(self, request: HttpRequest) -> JsonResponse:
        data = ForgotPasswordRequestSerializer(data=request.data)

        if not data.is_valid():
            return JsonResponse({"details": data.errors}, status=400)

        result: bool = service.generate_and_send_password_reset_token(data.data['credential'])

        if result:
            return JsonResponse({"details": "Password reset token sent"}, status=200)
        
        return JsonResponse({"details": "User was not found", 'code': 'user_does_not_exist'}, status=404)

    @action(methods=['POST'], detail=False)
    def reset_password(self, request: HttpRequest) -> JsonResponse:
        data = ResetPasswordSerializer(data=request.data)

        if not data.is_valid():
            return JsonResponse({"details": data.errors, 'code': 'reset_password_error'}, status=400)

        result: bool = service.reset_password(data.data['credential'], data.data['password_reset_token'], data.data['new_password'])  

        if result:
            return JsonResponse({"details": "Password reset successful"}, status=200)
        
        return JsonResponse({"details": "Invalid password reset token", 'code': 'invalid_reset_token'}, status=400)
    
class AuthenticatedAuthViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=False)
    def session(self, request: HttpRequest):
        return service.get_session(request)
    
    @action(methods=['post'], detail=False)
    def logout(self, request: HttpRequest):
        service.logout_session(request)
        
        return service.generate_logout_cookie()
    
    @action(methods=['post'], detail=False)
    def verify_email(self, request: HttpRequest):
        serializer = VerifyEmailRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"details": serializer.errors}, status=400)

        user = service.get_user_by_id(request.user.id)

        result = service.check_email_verification(user, serializer.data['verification_code'])

        if result:
            return JsonResponse({"details": "Email verified"}, status=200)
        
        return JsonResponse({"details": "Invalid verification code", "code": "invalid_verification_code"}, status=400)

    @action(methods=['post'], detail=False)
    def request_email_verification(self, request: HttpRequest):
        user = service.get_user_by_id(request.user.id)

        result = service.resend_email_verification_code(user)

        if result:
            return JsonResponse({"details": "Verification email sent"}, status=200)
        
        return JsonResponse({"details": "You need to wait 5 minutes to request a new verification code"}, status=429)
    
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