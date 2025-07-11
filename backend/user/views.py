from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets

from backend.permissions import GENERAL_AUTHENTICATION_PERMISSIONS
from marketplace.serializers import ListingSerializer

from .models import User
from .serializers import ProfileSerializer, UpdateProfilePictureSerializer, UserInformationSerializer, UserSerializer

from marketplace.service import get_public_listings_by_user
from image.service import upload_image

# Create your views here.
class UserViewset(viewsets.ViewSet):
    permission_classes = GENERAL_AUTHENTICATION_PERMISSIONS

    def profile(self, request: HttpRequest, id: int) -> JsonResponse:
        user = User.objects.filter(id=id).select_related('information').first() 

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
        
        listings = get_public_listings_by_user(user)
        
        return JsonResponse({
            "data": {
                "listings": ListingSerializer(listings, many=True).data
            }
        }, status=200)

    def edit_profile(self, request: HttpRequest) -> JsonResponse:
        user: User = request.user

        if not user.has_information():
            serializer = UserInformationSerializer(data={**request.data, "user": user.id})
        else:
            serializer = UserInformationSerializer(user.information, data=request.data, partial=True)

        if not serializer.is_valid():
            return JsonResponse({
                "code": "invalid_data",
                "details": serializer.errors
            }, status=400)
        
        serializer.save()

        return JsonResponse({
            "data": {
                "user": UserSerializer(user).data,
            },
            "details": "Profile updated successfully"
        }, status=200)
    
    def update_profile_picture(self, request: HttpRequest) -> JsonResponse:
        user: User = request.user

        serializer = UpdateProfilePictureSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                "code": "invalid_data",
                "details": serializer.errors
            }, status=400)
        
        image = serializer.validated_data.get("image")

        uploaded_image = upload_image(image, "pfp")

        if not uploaded_image:
            return JsonResponse({
                "code": "image_upload_failed",
                "details": "Image upload failed"
            }, status=500)
        
        if user.profile_picture:
            user.profile_picture.delete()
        
        user.profile_picture = uploaded_image
        user.save()

        return JsonResponse({
            "data": {
                "user": UserSerializer(user).data,
            },
            "details": "Profile picture updated successfully"
        }, status=200)
    
    def remove_profile_picture(self, request: HttpRequest) -> JsonResponse:
        user: User = request.user

        if user.profile_picture:
            user.profile_picture.delete()
            user.profile_picture = None
            user.save()
        
        return JsonResponse({
            "data": {
                "user": UserSerializer(user).data,
            },
            "details": "Profile picture removed successfully"
        }, status=200)