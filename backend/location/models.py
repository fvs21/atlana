from django.db import models

# Create your models here.
class Location(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    radius = models.DecimalField(max_digits=2, decimal_places=2, blank=True, null=True)