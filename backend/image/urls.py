from django.urls import path
from . import views

urlpatterns = [
    path("<str:image_name>", views.retrieve_image, name="downloadImage"),
]