from django.urls import path
from . import views

urlpatterns = [
   path("profile/<int:id>/", views.UserViewset.as_view({"get": "profile"}), name="profile"),
   path("profile/<int:id>/listings/", views.UserViewset.as_view({"get": "created_listings"}), name="created_listings"),
   path("edit", views.UserViewset.as_view({"put": "edit_profile"}), name="edit_profile"),
   path("pfp/update", views.UserViewset.as_view({"patch": "update_profile_picture"}), name="update_profile_picture"), 
   path("pfp", views.UserViewset.as_view({"delete": "remove_profile_picture"}), name="remove_profile_picture"),
]