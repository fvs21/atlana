from django.urls import path
from .views import MarketplaceViewSet

urlpatterns = [
    path('all', view=MarketplaceViewSet.as_view({'get': 'get_listings'}), name='marketplace-listings'),
]