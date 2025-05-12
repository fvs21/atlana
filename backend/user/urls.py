from django.urls import path
from . import views

urlpatterns = [
   path("profile/<int:id>/", views.ProfileViewset.as_view({"get": "profile"}), name="profile"),
   path("profile/<int:id>/listings/", views.ProfileViewset.as_view({"get": "created_listings"}), name="created_listings"),
]