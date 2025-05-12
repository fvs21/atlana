from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from listing.serializers import ListingSerializer

from .models import User
from .serializers import ProfileSerializer

from marketplace.service import get_listings_by_user

# Create your views here.
class ProfileViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def profile(self, request: HttpRequest, id: int) -> JsonResponse:
        user = User.objects.filter(id=id).first()

        if not user:
            return JsonResponse({
                "code": "user_not_found",
                "details": "User not found"
            }, status=404)
        
        return JsonResponse({
            "data": {
                "profile": ProfileSerializer(user).data
            }
        }, status=200)
    
    def created_listings(self, request: HttpRequest, id: int) -> JsonResponse:
        user = User.objects.filter(id=id).first()

        if not user:
            return JsonResponse({
                "code": "user_not_found",
                "details": "User not found"
            }, status=404)
        
        listings = get_listings_by_user(user)
        
        return JsonResponse({
            "data": {
                "listings": ListingSerializer(listings, many=True).data
            }
        }, status=200)

class UserViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]