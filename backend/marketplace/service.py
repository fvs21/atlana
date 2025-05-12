from typing import List

from user.models import User
from listing.models import Listing


def get_all_listings() -> List[Listing]:
    return Listing.objects.all()

def get_listings_by_category(category: str) -> List[Listing]:
    """
        Get all listings by category
    """
    return Listing.objects.filter(category=category)

def get_listings_by_user(user: User) -> List[Listing]:
    """
        Get all listings by user
    """
    return Listing.objects.filter(creator=user).all()