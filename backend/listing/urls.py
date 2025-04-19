from django.urls import path
from . import views

urlpatterns = [
    path("create", views.ListingsViewset.as_view({"post": "create_listing"}), name="create_listing"),
    path("<int:id>", views.ListingsViewset.as_view({"get": "get_listing"}), name="get_listing"),
]