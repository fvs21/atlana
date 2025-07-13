from django.urls import path
from .views import ProfessorRatingViewset

urlpatterns = [
    path("professor", view=ProfessorRatingViewset.as_view({'get': 'list_professors', 'post': 'create_professor'})),
    path("professor/<int:id>", view=ProfessorRatingViewset.as_view({'get': 'professor', 'post': 'rate_professor'})),
    path("courses", view=ProfessorRatingViewset.as_view({'get': 'search_course'}))
]