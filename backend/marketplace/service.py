from typing import List, Optional

from location.models import Location
from user.models import User
from listing.models import Listing
from django.contrib.postgres.search import SearchVector, SearchQuery

def get_all_listings() -> List[Listing]:
    return Listing.public.all()

def get_listings_by_category(category: str) -> List[Listing]:
    """
        Get all listings by category
    """
    return Listing.public.filter(category=category)

def get_public_listings_by_user(user: User) -> List[Listing]:
    """
        Get all listings by user that are not archived
    """
    return Listing.public.filter(creator=user).all()

def get_listings_by_user(user: User) -> List[Listing]:
    """
        Get all listings by user
    """
    return Listing.objects.filter(creator=user).order_by('-created_at').all()

def filter_property_listings_inside_bounds(bounds: dict) -> List[Listing]:
    '''
        Retrieves property listings that are inside the given bounds
        The bounds object represent to coordinates of the northeast and southwest corners of the bounding box
        Limits the number of listings to 15
    '''
    northeast = bounds['northeast']
    southwest = bounds['southwest']

    locations = Location.objects.filter(
        latitude__lte=northeast['lat'],
        latitude__gte=southwest['lat'],
        longitude__lte=northeast['lng'],
        longitude__gte=southwest['lng']
    )

    listings = Listing.public.filter(category='property_rentals').select_related('property__location').filter(
        property__location__in=locations
    )[:15]

    return listings

def search_listings(query: str) -> List[Listing]:
    """
        Search listings by query
        The query is a string that can be a part of the title or description of the listing
    """
    vector = SearchVector('title', 'description')
    search_query = SearchQuery(query)

    listings = Listing.public.annotate(search=vector).filter(search=search_query)
    return listings

def get_listing_by_id(id: int) -> Optional[Listing]:
    """
        Retrieve listing from public manager
    """

    return Listing.public.prefetch_related('images__image').select_related('creator').filter(id=id).first()