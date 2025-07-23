from rest_framework import status
from django.http import JsonResponse

from backend.permissions import AuthenticatedViewSet
from rest_framework.decorators import action
from rest_framework.request import Request

from .serializers import ProfessorPageSerializer, ProfessorSerializer, CreateProfessorSerializer, RateProfessorSerializer, RatingSerializer, SearchCoursesSerializer
from rest_framework.pagination import PageNumberPagination

from . import service

class ProfessorPaginator(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_number'
    max_page_size = 12

# Create your views here.
class ProfessorRatingViewset(AuthenticatedViewSet):
    pagination_class = ProfessorPaginator

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
    def professor(self, request: Request, id: int) -> JsonResponse:
        professor = service.get_professor_by_id(id)

        if not professor:
            return JsonResponse({
                "error": True,
            }, status=status.HTTP_404_NOT_FOUND)
        
        return JsonResponse({
            "data": {
                "professor": ProfessorPageSerializer(professor).data,
                "ratings": {
                    "count": professor.ratings.count(),
                    "list": RatingSerializer(professor.ratings.order_by('-created_at').all(), many=True).data
                }
            },
            "error": False
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def list_professors(self, request: Request) -> JsonResponse:
        query_params = request.query_params

        professors = service.get_professors(
            name=query_params.get('name'),
            course=query_params.get('course')
        )

        paginator = self.pagination_class()

        result_page = paginator.paginate_queryset(queryset=professors, request=request)

        serializer = ProfessorSerializer(result_page, many=True)

        return JsonResponse({
            "data": {
                "professors": paginator.get_paginated_response(serializer.data).data
            },
            "error": False
        }, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['get'])
    def professor_name(self, request: Request, id: int) -> JsonResponse:
        professor = service.get_professor_by_id(id)

        if not professor:
            return JsonResponse({
                "error": True
            }, status=status.HTTP_404_NOT_FOUND)
        
        return JsonResponse({
            "data": {
                "professor": {
                    "name": professor.name,
                    "department": professor.get_department_display()
                }
            }
        }, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def rate_professor(self, request: Request, id: int) -> JsonResponse:
        serializer = RateProfessorSerializer(data={**request.data, "professor": id})

        if not serializer.is_valid():
            return JsonResponse({
                "details": serializer.errors,
                "error": True
            }, status=status.HTTP_400_BAD_REQUEST)
        
        service.create_rating(serializer.validated_data)

        return JsonResponse({
            "error": False
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def search_course(self, request: Request) -> JsonResponse:
        query_params = request.query_params.dict()

        if not 'q' in query_params:
            return JsonResponse({
                "error": True
            }, status=status.HTTP_400_BAD_REQUEST)
        
        courses = service.find_courses_by_name(query_params['q'])

        return JsonResponse({
            "data": {
                "courses": SearchCoursesSerializer(courses, many=True).data
            },
            "error": False
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def search_professor(self, request: Request) -> JsonResponse:
        query_params = request.query_params.dict()

        if not 'q' in query_params:
            return JsonResponse({
                "error": True
            }, status=status.HTTP_400_BAD_REQUEST)
        
        name = query_params['q']
        professors = service.find_professors_by_name(name)

        return JsonResponse({
            "data": {
                "professors": ProfessorSerializer(professors, many=True).data
            },
            "error": False
        }, status=status.HTTP_200_OK)