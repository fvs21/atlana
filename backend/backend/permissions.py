from rest_framework import permissions
from django.http import HttpRequest
from rest_framework.permissions import IsAuthenticated

class IsGuest(permissions.BasePermission):
    message = "Already authenticated"

    def has_permission(self, request: HttpRequest, view):
        if(request.headers.get("Authorization")):
            return False
        
        if(request.COOKIES.get("user_r")):
            return False
        
        return True
    
class IsEmailVerified(permissions.BasePermission):
    message = "Email not verified"

    def has_permission(self, request: HttpRequest, view):
        if not request.user.is_authenticated:
            return True
        
        return request.user.has_email_verified()

GENERAL_AUTHENTICATION_PERMISSIONS = [
    IsAuthenticated,
    IsEmailVerified
]