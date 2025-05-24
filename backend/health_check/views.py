from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def healt(request):
    return HttpResponse("OK", status=200)