from django.urls import path
from . import views

urlpatterns = [
    #authenticated
    path('create', view=views.StoreViewset.as_view({'post': 'create'}), name='store-create'),
    path('about', view=views.StoreViewset.as_view({'patch': 'update_about'}), name='update-about'),
    path('get', view=views.StoreViewset.as_view({'get': 'get_user_store'}), name='get-user-store'),
    path('listings', view=views.StoreViewset.as_view({'get': 'get_listings'}), name='get-listings'),

    #public
    path('<int:store_id>', view=views.PublicStoreViewset.as_view({'get': 'get_store'}), name='get-store'),
]