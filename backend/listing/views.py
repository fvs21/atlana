import stat
from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import *
from . import service
from authentication.service import get_user_by_id
from rest_framework.permissions import IsAuthenticated

class ListingsViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=['POST'], detail=False)
    def create_listing(self, request: HttpResponse) -> JsonResponse:
        user = get_user_by_id(request.user.id)

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
        user = get_user_by_id(request.user.id)

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

        if not listing:
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