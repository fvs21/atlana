from django.urls import path
from .views import MarketplaceViewSet

urlpatterns = [
    path('all', view=MarketplaceViewSet.as_view({'get': 'get_listings'}), name='marketplace-listings'),
    path('category/<str:cat>', view=MarketplaceViewSet.as_view({'get': 'get_listings_by_category'}), name='marketplace-listings-by-category'),
]