import logging
from pydoc import plain
from typing import Dict, Optional
from django.http import HttpRequest, JsonResponse
from authentication.utils import AuthenticationUtils
from user.models import User, VerificationData
from user.serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from backend.settings import REFRESH_TOKEN_DURATION
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from .exceptions import *
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def generate_tokens_for_user(user: User) -> Dict[str, str]:
    refresh_token = RefreshToken.for_user(user)

    refresh_token['verified'] = user.email_verified_at is not None

    return {
        "access_token": str(refresh_token.access_token),
        "refresh_token": str(refresh_token)
    }

def generate_authentication_response(user: User) -> JsonResponse:
    tokens = generate_tokens_for_user(user)

    response = JsonResponse(
        {
            "data": {
                "user": UserSerializer(user).data,
                "access_token": tokens["access_token"]
            }
        }, 
        status=201
    )

    response.set_cookie(
        "user_r", 
        tokens["refresh_token"], 
        httponly=True, 
        secure=False,  # Set to True in production
        samesite="Lax",
        expires=REFRESH_TOKEN_DURATION
    )

    return response

def send_verification_email(email: str, first_name: str, verification_code: str) -> None:
    html_message = render_to_string('email/verification.html', {
        'first_name': first_name,
        'verification_code': verification_code
    })

    text_message = strip_tags(html_message)

    send_mail(
        subject="Verifica tu cuenta",
        from_email="fvs9621@gmail.com",
        recipient_list=[email],
        html_message=html_message,
        fail_silently=False,
        message=text_message
    )

def generate_and_send_verification_code(user: User) -> None:
    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data = VerificationData(user=user, field="email", code=make_password(verification_code))
    verification_data.save()

    send_verification_email(
        email=user.email,
        first_name=user.first_name,
        verification_code=verification_code
    )

def get_session(request: HttpRequest) -> JsonResponse:
    user: User = request.user
    return JsonResponse({
        "data": {
            "user": UserSerializer(user).data
        }
    }, status=200)

def get_user_by_id(id: int) -> User:
    try:
        return User.objects.get(id=id)
    except User.DoesNotExist:
        raise UserDoesNotExistException()
    
def process_refresh_token(refresh_token: str) -> Optional[RefreshToken]:
    if not refresh_token:
        raise None
        
    try:
        token = RefreshToken(refresh_token)
        if token.check_blacklist():
            raise RefreshTokenBlacklistedException()
        return token
    except Exception as e:
        return None

def logout_session(request: HttpRequest) -> None:
    refresh_token = request.COOKIES.get("user_r")

    if not refresh_token:
        raise RefreshTokenMissingException()

    newToken = RefreshToken(refresh_token)
    newToken.blacklist()

def generate_logout_cookie() -> JsonResponse:
    response = JsonResponse({"details": "Logged out"}, status=200)
    response.delete_cookie("user_r")
    return response

def check_email_verification(user: User, verification_code: str) -> bool:
    '''
        Method to check if the email verification code the user provided is correct.
        Checks:
        - If the user has already verified their email
        - If the verification code is correct
        - If the verification code is expired (after checking if the code is correct)
    '''
    if user.email_verified_at is not None:
        raise UserAlreadyVerifiedException(field="email")

    verification_data = user.verification_data.filter(field="email").first()

    if verification_data is None:
        raise VerificationConflictException(detail="User has not changed email.", field="email")
    
    if not check_password(verification_code, verification_data.code):
        return False
    
    if verification_data.is_code_expired():
        raise VerificationCodeExpiredException()
    
    user.email_verified_at = timezone.now()
    user.save()

    verification_data.delete()
    return True

def resend_email_verification_code(user: User) -> bool:
    verification_data = user.verification_data.filter(field="email").first()

    if verification_data is None:
        raise VerificationConflictException(field="email")
    
    if not verification_data.can_request_new_code():
        return False
    
    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data.set_new_code(make_password(verification_code))

    verification_data.save()

    send_verification_email(
        email=user.email,
        first_name=user.first_name,
        verification_code=verification_code
    )

    return True

def get_user_by_unknown_credential(credential: str) -> Optional[User]:
    credential_type = AuthenticationUtils.determine_credential_type(credential)

    if credential_type == "email":
        return User.objects.filter(email=credential).first()
    elif credential_type == "phone":
        return User.objects.filter(phone=credential).first()
    
    return None

def generate_and_send_password_reset_token(credential: str) -> bool:
    '''
        Method to generate a password reset token for the user.
        Returns
        - True if the token was generated and sent
        - False if the user has already requested a password reset token in the last 5 minutes
        - Raises UserDoesNotExistException if the user does not exist
        - Raises UserAlreadyChangedPasswordException if the user has changed their password in the last 24 hours
    '''
    user = User.objects.filter(email=credential).first()

    if user is None:
        raise UserDoesNotExistException()
    
    if not user.can_request_password_reset():
        return False
    
    if user.has_user_changed_password_in_the_last_24_hours():
        raise UserAlreadyChangedPasswordException()
    
    password_reset_token: str = AuthenticationUtils.generate_reset_password_token()

    user.password_reset_token = make_password(password_reset_token)
    user.password_reset_token_created_at = timezone.now()

    logging.info(f"Password reset token for {user.email}: http://localhost:5173/reset-password?token={password_reset_token}&email={user.email}")

    user.save()
    
    return True

def reset_password(email: str, password_reset_token: str, new_password: str) -> bool:
    user = User.objects.filter(email=email).first()

    if user is None:
        raise UserDoesNotExistException()
    
    if not check_password(password_reset_token, user.password_reset_token):
        return False
    
    user.set_password(new_password)
    user.password_reset_token = None
    user.password_reset_token_created_at = None
    user.password_updated_at = timezone.now()

    user.save()

    return True

def update_phone_number(user: User, data: dict) -> bool:
    country_code = data.get("country_code")
    phone_number = data.get("phone_number")

    full_phone_number = f"{country_code}{phone_number}"

    if user.phone_number == full_phone_number:
        return False

    if User.objects.filter(phone_number=full_phone_number).exists():
        raise PhoneNumberAlreadyUsedException()
    
    user.phone_number = full_phone_number
    user.country_code = country_code

    user.save()

    generate_and_send_phone_verification_sms(user)

    return True

def generate_and_send_phone_verification_sms(user: User) -> None:
    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data = VerificationData(user=user, field="phone", code=make_password(verification_code))
    verification_data.save()

    #TODO
    #send phone number verification code

    logging.info(f"Verification code for {user.phone_number}: {verification_code}")

def check_phone_verification(user: User, code: str) -> bool:
    if user.phone_verified_at is not None:
        raise UserAlreadyVerifiedException(field="phone")

    verification_data = user.verification_data.filter(field="phone").first()

    if verification_data is None:
        raise VerificationConflictException(detail="User has not changed phone number.", field="phone")
    
    if not check_password(code, verification_data.code):
        return False
    
    if verification_data.is_code_expired():
        raise VerificationCodeExpiredException()
    
    user.phone_verified_at = timezone.now()
    user.save()

    verification_data.delete()

    return True
    
def resend_phone_verification_code(user: User) -> bool:
    verification_data = user.verification_data.filter(field="phone").first()

    if verification_data is None:
        raise VerificationConflictException(field="phone")
    
    if not verification_data.can_request_new_code():
        return False
    
    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data.set_new_code(make_password(verification_code))
    verification_data.save()

    #TODO

    logging.info(f"Verification code for {user.phone_number}: {verification_code}")

    return True