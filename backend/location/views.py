from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from backend.permissions import GENERAL_AUTHENTICATION_PERMISSIONS
from location.serializers import LocationQuerySerializer
from . import service

# Create your views here.
class LocationViewSet(viewsets.ViewSet):
    permission_classes = GENERAL_AUTHENTICATION_PERMISSIONS
    def search_by_street(self, request: HttpRequest) -> JsonResponse:
        """
        Search for a location by street name.
        """
        query = request.GET.get('q', None)

        locations = service.find_location_by_street(query)

        return JsonResponse({
            "data": {
                "locations": LocationQuerySerializer(locations, many=True).data
            },
            "details": "Locations retrieved"
        }, status=200)