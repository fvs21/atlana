from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from authentication.service import get_user_by_id
from store.serializers import CreateStoreSerializer, StoreSerializer

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
    
    @action(detail=False, methods=['put'])
    def setup(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        store = user.store

        if store is None:
            return JsonResponse({
                'details': 'You do not have a store',
                'code': 'no_store'
            }, status=400)
        
        serializer = StoreSerializer(store, data=request.data, partial=True)

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
        }, status=200)
        