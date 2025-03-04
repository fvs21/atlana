from django.db import models

# Create your models here.
class Store(models.Model):
    creator = models.OneToOneField('user.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    about = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    banner = models.ForeignKey('image.Image', on_delete=models.SET_NULL, blank=True, null=True)