from typing import List
from django.core.files.uploadedfile import UploadedFile
from image.service import upload_image
from listing.models import Listing, ListingImage
from user.models import User

def create_listing(user: User, body: dict, images: List[UploadedFile]) -> Listing:
    """
        Create a listing with the given data
    """
    listing = Listing.objects.create(
        creator=user,
        title=body['title'],
        description=body['description'],
        category=body['category'],
        price=body['price']
    )

    uploaded_images = [upload_image(image, "listing") for image in images]

    listing_images = ListingImage.objects.bulk_create([
        ListingImage(listing=listing, image=image)
        for image in uploaded_images
    ])

    listing.images.set(listing_images)
    listing.save()

    return listing

def get_listing_by_id(id: int) -> Listing:
    """
        Get a listing by its id
    """
    return Listing.objects.filter(id=id).first()
