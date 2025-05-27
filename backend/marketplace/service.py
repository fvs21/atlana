from typing import List

from location.models import Location
from user.models import User
from listing.models import Listing


def get_all_listings() -> List[Listing]:
    return Listing.public.all()

def get_listings_by_category(category: str) -> List[Listing]:
    """
        Get all listings by category
    """
    return Listing.public.filter(category=category)

def get_listings_by_user(user: User) -> List[Listing]:
    """
        Get all listings by user
    """
    return Listing.public.filter(creator=user).all()

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

    listings = Listing.public.filter(category='property_rentals').filter(
        property__location__in=locations
    ).select_related('property')[:15]

    return listings
