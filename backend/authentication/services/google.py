from typing import Dict, Tuple
from urllib.parse import urlencode
from django.conf import settings
from django.http import HttpResponseRedirect
from django.shortcuts import redirect

from user.models import User

from ..exceptions import GoogleAuthenticationException
from ..utils.google import GoogleAccessTokens, generate_state_token
import requests
from ..services import service as authentication_service
from django.utils import timezone

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_ACCESS_TOKEN_OBTAIN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

REFRESH_TOKEN_DURATION = settings.REFRESH_TOKEN_DURATION
DEBUG = settings.DEBUG

API_URI = "/api/auth/google/login/callback"

#Permissions
SCOPES = [ 
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid"
]
CLIENT_SECRET = settings.GOOGLE_CLIENT_SECRET
CLIENT_ID = settings.GOOGLE_CLIENT_ID

def get_redirect_uri() -> str:
    base_url = settings.BASE_BACKEND_URL
    return base_url + API_URI

def get_authorization_url() -> Tuple[str, str]:
    redirect_uri = get_redirect_uri()

    state = generate_state_token()

    params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "scope": " ".join(SCOPES),
        "state": state,
        "redirect_uri": redirect_uri,
        "include_granted_scopes": "true",
        "prompt": "select_account",
        "access_type": "offline"
    }

    query_params = urlencode(params)

    authorization_url = f"{GOOGLE_AUTH_URL}?{query_params}"

    return authorization_url, state

def get_tokens(*, code: str) -> GoogleAccessTokens:
    redirect_uri = get_redirect_uri()

    data = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code"
    }

    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)

    if not response.ok:
        raise GoogleAuthenticationException("Failed to obtain access token from Google.")
    
    tokens = response.json()

    return GoogleAccessTokens(
        id_token=tokens['id_token'],
        access_token=tokens['access_token']
    )

def get_user_info(*, google_tokens: GoogleAccessTokens) -> Dict:
    access_token = google_tokens.access_token

    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={"access_token": access_token}
    )

    if not response.ok:
        raise GoogleAuthenticationException("Failed to obtain user info from Google")
    
    return response.json()

def get_or_create_google_user(email: str, user_info: Dict) -> User:
    if not User.objects.filter(email=email).exists():
        user = User.objects.create(
            email=email,
            first_name=user_info["given_name"],
            last_name=user_info["family_name"],
            email_verified_at=timezone.now(),
            university=user_info.get("hd", "anahuacmayab.edu.mx")
        )
        user.save()
        return user
    else:
        return User.objects.get(email=email)

def generate_authentication_response(user: User) -> HttpResponseRedirect:
    tokens = authentication_service.generate_tokens_for_user(user)

    response = redirect("http://localhost:5173/marketplace")

    response.set_cookie(
        "user_r", 
        tokens["refresh_token"], 
        httponly=True, 
        secure=False if DEBUG else True,  # Set to True in production
        samesite="Lax",
        expires=REFRESH_TOKEN_DURATION,
        domain="localhost" if DEBUG else ".atlana.mx"
    )

    return response