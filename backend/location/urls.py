from django.urls import path
from . import views

urlpatterns = [
    path('search', views.LocationViewSet.as_view({'get': 'search_by_street'}), name='search_location'),
]