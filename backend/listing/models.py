from django.db import models
from django.utils import timezone

# Create your models here.
class Listing(models.Model):
    store = models.ForeignKey('store.Store', on_delete=models.CASCADE, related_name='listings')
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    customizable = models.BooleanField(default=False)
    ready_to_ship = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def image_urls(self) -> list[str]:
        return [
            image.get_image_url() 
            for image in self.images.all()
        ]

class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ForeignKey('image.Image', on_delete=models.CASCADE)

    def get_image_url(self):
        return "http://localhost:8000" + self.image.image_url

class ListingPrice(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='prices')
    min_units = models.SmallIntegerField()
    max_units = models.SmallIntegerField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)