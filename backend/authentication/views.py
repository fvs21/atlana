from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import HttpRequest, JsonResponse

from authentication.serializers import *
from user.serializers import UserSerializer
from . import service
from django.contrib.auth import authenticate
# Create your views here.

class AuthenticationViewSet(viewsets.ViewSet):
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

        return JsonResponse({
            'user': UserSerializer(user).data,
        }, status=201)
    
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
            return JsonResponse({"error": True, "message": data.errors}, status=400)

        result: bool = service.generate_and_send_password_reset_token(data.data['credential'])

        if result:
            return JsonResponse({"error": False, "message": "Password reset token sent"}, status=200)
        
        return JsonResponse({"error": True, "message": "User was not found"}, status=404)

    @action(methods=['POST'], detail=False)
    def reset_password(self, request: HttpRequest) -> JsonResponse:
        data = ResetPasswordSerializer(data=request.data)

        if not data.is_valid():
            return JsonResponse({"error": True, "message": data.errors}, status=400)

        result: bool = service.reset_password(data.data['credential'], data.data['password_reset_token'], data.data['new_password'])  

        if result:
            return JsonResponse({"error": False, "message": "Password reset successful"}, status=200)
        
        return JsonResponse({"error": True, "message": "Invalid password reset token"}, status=400)