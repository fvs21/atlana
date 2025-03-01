from django.db import models
from django.utils.deconstruct import deconstructible
import os

@deconstructible
class PathName(object):
    def __init__(self, path):
        self.path = path

    def __call__(self, instance, filename):
        return os.path.join(self.path, instance.container, instance.image_name)

class Image(models.Model):
    image = models.ImageField(upload_to=PathName("images"))
    image_name = models.CharField(max_length=100, unique=True)
    image_type = models.CharField(max_length=100)
    image_url = models.CharField(max_length=100, unique=True)
    container = models.CharField(max_length=20)

    def delete(self, *args, **kwargs):
        self.image.delete()
        super(Image, self).delete(*args, **kwargs)