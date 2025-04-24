from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets

from location.serializers import LocationQuerySerializer
from . import service

# Create your views here.
class LocationViewSet(viewsets.ViewSet):
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