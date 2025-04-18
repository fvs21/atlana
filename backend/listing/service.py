from typing import List
from django.core.files.uploadedfile import UploadedFile
from image.service import upload_image
from listing.models import Listing
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

    listing.images.set(uploaded_images)
    listing.save()

    return listing