from typing import Optional
from channels.db import database_sync_to_async
from user.models import User
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import AnonymousUser

@database_sync_to_async
def get_user_from_token(token: str) -> Optional[User]:
    try:
        token = AccessToken(token)
        user_id = token.payload.get("user_id")
        return User.objects.get(id=user_id)
    except (User.DoesNotExist, Exception):
        return AnonymousUser()
    
'''
    Asgi middleware to authenticate users using JWT tokens
'''
class JWTAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        token = scope["query_string"].decode().split("=")[1] if b"token=" in scope["query_string"] else None
        scope["user"] = await get_user_from_token(token) if token else AnonymousUser()

        return await self.app(scope, receive, send)
    