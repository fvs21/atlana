from typing import List

from listing.models import Listing


def get_all_listings() -> List[Listing]:
    return Listing.objects.all()