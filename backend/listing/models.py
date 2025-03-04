from django.db import models

# Create your models here.
class Listing(models.Model):
    store = models.ForeignKey('store.Store', on_delete=models.CASCADE, related_name='listings')
    title = models.CharField(max_length=150)
    about = models.CharField(max_length=500)
    customizable = models.BooleanField(default=False)
    ready_to_ship = models.BooleanField(default=False)
    made_to_order = models.BooleanField(default=False)

class ListingPrice(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    min_units = models.SmallIntegerField()
    max_units = models.SmallIntegerField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)