from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import JsonResponse
# Create your views here.

class AuthenticationViewSet(viewsets.ViewSet):
    @action(methods=['post'], detail=False)
    def register(self, request):
        return JsonResponse({'message': 'Hello, World!'})
