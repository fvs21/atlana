from rest_framework import status
from django.http import JsonResponse

from backend.permissions import AuthenticatedViewSet
from rest_framework.decorators import action
from rest_framework.request import Request

from professor_rating.serializers import ProfessorSerializer, CreateProfessorSerializer

from . import service

# Create your views here.
class ProfessorRatingViewset(AuthenticatedViewSet):
    @action(detail=False, methods=["post"])
    def create_professor(self, request: Request) -> JsonResponse:
        serializer = CreateProfessorSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({
                "error": True,
                "details": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        professor = serializer.save()

        return JsonResponse({
            "error": False,
            "details": {
                "professor": ProfessorSerializer(professor).data
            }
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["get"])
    def professor(self, request: Request) -> JsonResponse:
        pass

    @action(detail=False, methods=["get"])
    def list_professors(self, request: Request) -> JsonResponse:
        professors = service.get_professors()

        return JsonResponse({
            "data": {
                "professors": ProfessorSerializer(professors, many=True).data
            },
            "error": False
        }, status=status.HTTP_200_OK)