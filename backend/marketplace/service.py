from typing import List, Optional

from location.models import Location
from user.models import User
from .models import Listing, PropertyListing, ListingImage
from django.contrib.postgres.search import SearchVector, SearchQuery
from django.core.files.uploadedfile import UploadedFile
from image.service import upload_image
from location.models import Location
from .exceptions import ListingDoesNotExistException

def create_property_listing(user: User, body: dict, images: List[UploadedFile]) -> Listing:
    listing = create_listing(user, body, images)

    location = Location.objects.create(
        latitude=body['location']['latitude'],
        longitude=body['location']['longitude'],
        radius=body['location']['radius']
    )

    PropertyListing.objects.create(
        listing=listing,
        sell=body['sell'],
        property_type=body['property_type'],
        bedrooms=body.get('bedrooms', None),
        bathrooms=body.get('bathrooms', None),
        location=location,
        time_unit=body['time_unit'],
        air_conditioning=body.get('air_conditioned', False),
        furnished=body.get('furnished', False),
    )

    return listing
    

def create_listing(user: User, body: dict, images: List[UploadedFile]) -> Listing:
    """
        Create a listing with the given data
    """
    listing = Listing.objects.create(
        creator=user,
        title=body['title'],
        description=body['description'],
        category=body['category'],
        price=body['price'],
        used=body.get('used', None)
    )
    uploaded_images = [upload_image(image, "listing") for image in images]

    listing_images = ListingImage.objects.bulk_create([
        ListingImage(listing=listing, image=image)
        for image in uploaded_images
    ])

    listing.images.set(listing_images)
    listing.save()

    return listing

def get_listing_by_id(id: int) -> Optional[Listing]:
    """
        Get a listing by its id
    """

    return Listing.objects.select_related('creator').prefetch_related('images').filter(id=id).first()

def delete_listing(user: User, id: int) -> bool:
    """
        Delete a listing by its id
    """
    listing = get_listing_by_id(id)
    
    if not listing:
        raise ListingDoesNotExistException()
    
    if listing.creator != user:
        return False
    
    listing.delete()
    return True
    
def archive_listing(user: User, id: int) -> bool:
    """
        Archive a listing by its id
    """
    listing = get_listing_by_id(id)
    
    if not listing:
        raise ListingDoesNotExistException()
    
    if listing.creator != user:
        return False
    
    listing.archived = not listing.archived
    listing.save()
    return True

def get_all_listings() -> List[Listing]:
    return Listing.public.all()

def get_all_listings_by_university(university: str) -> List[Listing]:
    return Listing.public.filter(creator__university=university).all()

def get_listings_by_category(category: str, university: str) -> List[Listing]:
    """
        Get all listings by category
    """
    return Listing.public.filter(category=category, creator__university=university).all()

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

def filter_property_listings_inside_bounds(bounds: dict, university: str) -> List[Listing]:
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

    listings = Listing.public.filter(category='property_rentals', creator__university=university).select_related('property__location').filter(
        property__location__in=locations
    )[:15]

    return listings

def search_listings(query: str, university: str) -> List[Listing]:
    """
        Search listings by query
        The query is a string that can be a part of the title or description of the listing
    """
    vector = SearchVector('title', 'description')
    search_query = SearchQuery(query)

    listings = Listing.public.annotate(search=vector).filter(search=search_query, creator__university=university)
    return listings

def get_listing_by_id(id: int) -> Optional[Listing]:
    """
        Retrieve listing from public manager
    """

    return Listing.public.prefetch_related('images__image').select_related('creator').filter(id=id).first()