from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from . import service
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def retrieve_image(request: HttpRequest, image_name: str):
    image = service.download_image(image_name)

    if image is None:
        return HttpResponse(status=404)
    
    return HttpResponse(image.image, content_type=image.image_type)