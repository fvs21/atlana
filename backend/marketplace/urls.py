from django.urls import path
from .views import MarketplaceViewSet

urlpatterns = [
    path('', view=MarketplaceViewSet.as_view({'get': 'get_listings'}), name='marketplace-listings'),
]