from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import *

# Create your views here.
class ListingsViewset(viewsets.ViewSet):
    @action(methods=['POST'], detail=False)
    def create_listing(self, request: HttpResponse) -> JsonResponse:
        request_serializer = CreateListingRequestSerializer(data=request.data)

        if not request_serializer.is_valid():
            return JsonResponse(request_serializer.errors, status=400)
        
        serializer = CreateListingBody(data=request_serializer.validated_data['data'])

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)
        
        print(serializer.validated_data)

        return JsonResponse({"details": "Recieved"}, status=201)