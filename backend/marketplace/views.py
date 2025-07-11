from rest_framework import viewsets

from backend.permissions import AuthenticatedViewSet
from .models import CATEGORIES
from .serializers import *
from . import service
from rest_framework.decorators import action
from django.http import HttpRequest, JsonResponse

# Create your views here.
class MarketplaceViewSet(AuthenticatedViewSet):
    @action(methods=['POST'], detail=False)
    def create_listing(self, request: HttpRequest) -> JsonResponse:
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
    def listing(self, request: HttpRequest, id: int) -> JsonResponse:
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
        
    @action(methods=['GET'], detail=False)
    def listings(self, request: HttpRequest) -> JsonResponse:
        """
        Get all listings
        """
        user = request.user
        listings = service.get_all_listings_by_university(user.university)

        return JsonResponse({
            "data": {
                "listings": ListingCardSerializer(listings, many=True).data
            },
        }, status=200)

    @action(methods=['GET'], detail=False)
    def listings_by_category(self, request: HttpRequest, cat: str) -> JsonResponse:
        """
        Get all listings by category
        """

        if not cat:
            return JsonResponse({
                "details": "category is required"
            }, status=400)
        
        if not cat in CATEGORIES:
            return JsonResponse({
                "details": "category is not valid"
            }, status=404)

        listings = service.get_listings_by_category(cat, request.user.university)

        return JsonResponse({
            "data": {
                "listings": ListingCardSerializer(listings, many=True).data
            },
        }, status=200)
    
    @action(methods=['GET'], detail=False)
    def property_listings_inside_bounds(self, request: HttpRequest) -> JsonResponse:
        '''
            Method to get a limited number of property listings inside given bounds
            Returns the coordinates of the listings and its respective prices and ids
        '''

        serializer = MapBoundsSerializer(data=request.query_params.dict())

        if not serializer.is_valid():
            return JsonResponse({
                'details': serializer.errors,
                'code': 'invalid_data'
            }, status=400)
        
        listings = service.filter_property_listings_inside_bounds(serializer.validated_data, request.user.university)

        return JsonResponse({
            "data": {
                "listings": ListingCardSerializer(listings, many=True).data
            },
            "details": "Property listings retrieved"
        }, status=200)
    
    @action(methods=['GET'], detail=False)
    def created_listings(self, request: HttpRequest) -> JsonResponse:
        """
        Get all created listings by user
        """
        user = request.user

        listings = service.get_listings_by_user(user)

        return JsonResponse({
            "data": {
                "listings": ListingCardSerializer(listings, many=True).data
            },
        }, status=200)
    
    @action(methods=['GET'], detail=False)
    def search(self, request: HttpRequest) -> JsonResponse:
        """
        Search listings by query
        """
        query = request.GET.get('query', '')

        listings = service.search_listings(query, request.user.university)

        return JsonResponse({
            "data": {
                "listings": ListingCardSerializer(listings, many=True).data
            },
        }, status=200)