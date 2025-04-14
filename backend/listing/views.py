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

        if not user.has_store():
            return JsonResponse({
                "details": "No has registrado una tienda",
                "code": "no_store"
            }, status=403)

        serializer = CreateListingSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                'details': serializer.errors,
                'code': 'invalid_data'
            }, status=400)
        
        listing = service.create_listing(
            user.store, 
            {
                **serializer.validated_data['data'], 
                'color_images': serializer.validated_data['color_images']
            }, 
            serializer.validated_data['images']
        )

        return JsonResponse({
            "data": {
                "listing": ListingSerializer(listing).data
            },
            "details": "Listing created"
        }, status=201)
