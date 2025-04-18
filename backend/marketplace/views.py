from rest_framework import viewsets

from listing.serializers import ListingSerializer
from . import service
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.http import HttpRequest, JsonResponse

# Create your views here.
class MarketplaceViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=['GET'], detail=False)
    def get_listings(self, request: HttpRequest) -> JsonResponse:
        """
        Get all listings
        """
        listings = service.get_all_listings()

        return JsonResponse({
            "data": {
                "listings": ListingSerializer(listings, many=True).data
            },
        }, status=200)