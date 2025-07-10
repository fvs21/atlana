from typing import Tuple
from urllib.parse import urlencode
from django.conf import settings
from ..utils.google import generate_state_token

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
API_URI = "/api/auth/google/login/callback"

#Permissions
SCOPES = [ 
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid"
]

def get_redirect_uri() -> str:
    base_url = settings.BASE_BACKEND_URL
    return base_url + API_URI

def get_google_client_id() -> str:
    return settings.GOOGLE_CLIENT_ID

def get_authorization_url() -> Tuple[str, str]:
    redirect_uri = get_redirect_uri()

    state = generate_state_token()

    params = {
        "response_type": "code",
        "client_id": get_google_client_id(),
        "scope": " ".join(SCOPES),
        "state": state,
        "redirect_uri": redirect_uri,
        "hd": "anahuacmayab.edu.mx",
        "include_granted_scopes": "true",
        "prompt": "select_account",
        "access_type": "offline"
    }

    query_params = urlencode(params)

    authorization_url = f"{GOOGLE_AUTH_URL}?{query_params}"

    return authorization_url, state