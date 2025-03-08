from django.urls import path
from . import views

urlpatterns = [
    path('create', view=views.StoreViewset.as_view({'post': 'create'}), name='store-create'),
]