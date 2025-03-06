from django.db import models

# Create your models here.
class Location(models.Model):
    country = models.CharField(max_length=150)
    state = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    street = models.CharField(max_length=150)
    zip_code = models.CharField(max_length=10)
    house_number = models.CharField(max_length=5)