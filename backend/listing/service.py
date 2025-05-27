from typing import List, Optional
from django.core.files.uploadedfile import UploadedFile
from image.service import upload_image
from listing.models import Listing, ListingImage, PropertyListing
from location.models import Location
from user.models import User
from listing.exceptions import ListingDoesNotExistException

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
        time_unit=body['time_unit']
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

    return Listing.objects.filter(id=id).first()

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
    
    listing.archived = True
    listing.save()
    return True