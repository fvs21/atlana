from rest_framework import permissions
from django.http import HttpRequest

class IsGuest(permissions.BasePermission):
    message = "Already authenticated"

    def has_permission(self, request: HttpRequest, view):
        if(request.headers.get("Authorization")):
            return False
        
        if(request.COOKIES.get("user_r")):
            return False
        
        return True