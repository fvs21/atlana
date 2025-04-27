from time import time_ns
from typing import List
from django.db import models

from location.models import Location
# Create your models here.

CATEGORIES = [
    'electronics',
    'furniture',
    'clothing',
    'sports',
    'scholar',
    'vehicles',
    'property_rentals'
]

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

    def images_urls(self) -> List[str]:
        return [
            image.get_image_url() 
            for image in self.images.all()
        ]

    def is_property(self) -> bool:
        return hasattr(self, 'property')

class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ForeignKey('image.Image', on_delete=models.CASCADE)

    def get_image_url(self):
        return "http://localhost:8000" + self.image.image_url


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