from rest_framework import viewsets

from backend.permissions import GENERAL_AUTHENTICATION_PERMISSIONS
from listing.models import CATEGORIES
from .serializers import ListingCardSerializer, MapBoundsSerializer
from . import service
from rest_framework.decorators import action
from django.http import HttpRequest, JsonResponse

# Create your views here.
class MarketplaceViewSet(viewsets.ViewSet):
    permission_classes = GENERAL_AUTHENTICATION_PERMISSIONS

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