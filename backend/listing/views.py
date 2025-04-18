from django.http import HttpResponse, JsonResponse
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

        print(listing)

        return JsonResponse({
            "data": {
                "listing": ListingSerializer(listing).data
            },
            "details": "Listing created"
        }, status=201)
