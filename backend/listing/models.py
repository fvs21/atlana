from typing import List
from django.db import models

from image.service import generate_presigned_url
from backend.settings import DEBUG, SERVER_BASE_URL
from location.models import Location

# Create your models here.

CATEGORIES = [
    'electronics',
    'furniture',
    'clothing',
    'sports',
    'food',
    'scholar',
    'vehicles',
    'property_rentals',
    'other',
    'music'
]

class PublicListingManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(archived=False)

class Listing(models.Model):
    CATEGORIES_CHOICES = [
        (category, category.capitalize())
        for category in CATEGORIES
    ]

    creator = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='listings')
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=50, choices=CATEGORIES_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    used = models.BooleanField(blank=True, null=True)

    archived = models.BooleanField(default=False)

    objects = models.Manager()
    public = PublicListingManager()

    def images_urls(self) -> List[str]:
        return [
            image.get_image_url() 
            for image in self.images.all()
        ]

    def is_property(self) -> bool:
        return hasattr(self, 'property')
    
    def first_image(self) -> str:
        return self.images.all()[0].get_image_url()

class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ForeignKey('image.Image', on_delete=models.CASCADE)

    def get_image_url(self):
        if not DEBUG:
            return generate_presigned_url(
                key=self.image.key
            )
        else:
            return SERVER_BASE_URL + self.image.image_url


class PropertyListing(models.Model):
    TYPES = [
        ('apartment', 'Apartment'),
        ('house', 'House'),
        ('townhouse', 'Townhouse'),
        ('villa', 'Villa'),
        ('studio', 'Studio'),
        ('room only', 'Room Only'),
    ]

    TIME_UNITS = [
        ('day', 'Day'),
        ('week', 'Week'),
        ('month', 'Month'),
    ]

    listing = models.OneToOneField(Listing, on_delete=models.CASCADE, related_name='property')
    time_unit = models.CharField(max_length=5, choices=TIME_UNITS)
    sell = models.BooleanField(default=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='property')

    property_type = models.CharField(max_length=9, choices=TYPES)
    bedrooms = models.SmallIntegerField(blank=True, null=True)
    bathrooms = models.SmallIntegerField(blank=True, null=True)
    air_conditioning = models.BooleanField(default=False)
    furnished = models.BooleanField(default=False)