from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from authentication.service import get_user_by_id
from listing.serializers import ListingSerializer
from store.models import Store
from store.serializers import CreateStoreSerializer, EditAboutSerializer, StoreSerializer
import listing.service as listing_service

class StoreViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def create(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        serializer = CreateStoreSerializer(data={**request.data, 'creator': user.id})

        if not serializer.is_valid():
            return JsonResponse({
                'details': serializer.errors,
                'code': 'invalid_data'
            }, status=400)
        
        store = serializer.save()

        return JsonResponse({
            'data': {
                'store': StoreSerializer(store).data
            }
        }, status=201)
    
    @action(detail=False, methods=['get'])
    def get_user_store(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        try:
            store = user.store
        except user.store.RelatedObjectDoesNotExist:
            return JsonResponse({
                'details': 'You do not have a store',
                'code': 'no_store'
            }, status=400)
        
        return JsonResponse({
            'data': {
                'store': StoreSerializer(store).data
            }
        }, status=200)

    @action(detail=False, methods=['patch']) 
    def update_about(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        try:
            store = user.store
        except user.store.RelatedObjectDoesNotExist:
            return JsonResponse({
                'details': 'You do not have a store',
                'code': 'no_store'
            }, status=400)
        
        serializers = EditAboutSerializer(store, data=request.data, partial=True)

        if not serializers.is_valid():
            return JsonResponse({
                'details': serializers.errors,
                'code': 'invalid_data'
            }, status=400)
        
        saved_store = serializers.save()

        return JsonResponse({
            'data': {
                'store': StoreSerializer(saved_store).data
            }
        }, status=200)
    
    @action(detail=False, methods=['get'])
    def get_listings(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        if not user.has_store():
            return JsonResponse({
                "details": "No has registrado una tienda",
                "code": "no_store"
            }, status=403)

        listings = listing_service.get_created_listings(user.store)

        return JsonResponse({
            "data": {
                "listings": ListingSerializer(listings, many=True).data
            },
            "details": "Listings retrieved"
        }, status=200)

class PublicStoreViewset(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def get_store(self, request: HttpRequest, store_id: int) -> JsonResponse:
        store = Store.objects.filter(id=store_id).first()

        if not store:
            return JsonResponse({
                'details': 'Store does not exist',
                'code': 'store_not_found'
            }, status=404)

        return JsonResponse({
            'data': {
                'store': StoreSerializer(store).data
            }
        }, status=200)