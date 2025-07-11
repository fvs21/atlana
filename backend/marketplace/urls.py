from django.urls import path
from .views import MarketplaceViewSet

urlpatterns = [
    path('all', view=MarketplaceViewSet.as_view({'get': 'listings'}), name='marketplace-listings'),
    path('category/<str:cat>', view=MarketplaceViewSet.as_view({'get': 'listings_by_category'}), name='marketplace-listings-by-category'),
    path("property/bounds", view=MarketplaceViewSet.as_view({"get": "property_listings_inside_bounds"}), name="get_property_listings_in_bounds"),
    path('created', view=MarketplaceViewSet.as_view({'get': 'created_listings'}), name='marketplace-created-listings'),
    path('search', view=MarketplaceViewSet.as_view({'get': 'search'}), name='marketplace-listings-search'),

    path("listing", view=MarketplaceViewSet.as_view({"post": "create_listing"}), name="create_listing"),
    path("listing/property", view=MarketplaceViewSet.as_view({"post": "create_property_listing"}), name="create_property_listing"),
    path("listing/<int:id>", view=MarketplaceViewSet.as_view({"get": "listing", "delete": "delete_listing"}), name="get_listing"),
    path("archive/<int:id>", view=MarketplaceViewSet.as_view({"post": "archive_listing"}), name="archive_listing"),
]