from django.db import models

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=150)
    state = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    street = models.CharField(max_length=150)
    zip_code = models.CharField(max_length=10)
    number = models.CharField(max_length=5, blank=True, null=True)