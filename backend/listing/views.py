from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action

from backend.permissions import GENERAL_AUTHENTICATION_PERMISSIONS
from .serializers import *
from . import service

class ListingsViewset(viewsets.ViewSet):
    permission_classes = GENERAL_AUTHENTICATION_PERMISSIONS

    @action(methods=['POST'], detail=False)
    def create_listing(self, request: HttpResponse) -> JsonResponse:
        user = request.user

        serializer = CreateListingRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                'details': serializer.errors,
                'code': 'invalid_data'
            }, status=400)
        
        listing = service.create_listing(
            user, 
            serializer.validated_data['data'],
            serializer.validated_data['images']
        )

        return JsonResponse({
            "data": {
                "listing": ListingSerializer(listing).data
            },
            "details": "Listing created"
        }, status=201)
    
    @action(methods=['POST'], detail=False)
    def create_property_listing(self, request: HttpRequest) -> JsonResponse:
        user = request.user

        serializer = CreatePropertyListingRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                'details': serializer.errors,
                'code': 'invalid_data'
            }, status=400)
        
        listing = service.create_property_listing(
            user, 
            serializer.validated_data['data'], 
            serializer.validated_data['images']
        )

        return JsonResponse({
            "data": {
                "listing": ListingSerializer(listing).data
            },
            "details": "Property listing created"
        }, status=201)

    @action(methods=['GET'], detail=False)
    def listing(self, request: HttpResponse, id: int) -> JsonResponse:
        listing = service.get_listing_by_id(id)
        user = request.user

        if not listing or listing.creator.university != user.university:
            return JsonResponse({
                'details': "Listing not found",
                'code': 'listing_not_found'
            }, status=404)
        
        if listing.archived and listing.creator != user:
            return JsonResponse({
                'details': "Listing not found",
                'code': 'listing_not_found'
            }, status=404) 
        
        return JsonResponse({
            "data": {
                "listing": ListingSerializer(listing).data
            },
            "details": "Listing retrieved"
        }, status=200)
    
    @action(methods=['DELETE'], detail=False)
    def delete_listing(self, request: HttpRequest, id: int) -> JsonResponse:
        user = request.user

        if not service.delete_listing(user, id):
            return JsonResponse({
                'details': "You do not have permission to delete this listing",
                'code': "listing_permission_denied"
            }, status=403)

        return JsonResponse({
            "details": "Listing deleted"
        }, status=204)
    
    @action(methods=['POST'], detail=False)
    def archive_listing(self, request: HttpRequest, id: int) -> JsonResponse:
        user = request.user

        if not service.archive_listing(user, id):
            return JsonResponse({
                'details': "You do not have permission to archive this listing",
                'code': "listing_permission_denied"
            }, status=403)

        return JsonResponse({
            "details": "Listing archived"
        }, status=204)