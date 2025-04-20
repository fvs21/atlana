from django.db import models
# Create your models here.

CATEGORIES = [
    'electronics',
    'furniture',
    'clothing',
    'sports',
    'scholar',
    'vehicles',
    'departments'
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
    stock = models.IntegerField(default=0, blank=True, null=True)

    def images_urls(self) -> list[str]:
        return [
            image.get_image_url() 
            for image in self.images.all()
        ]

class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ForeignKey('image.Image', on_delete=models.CASCADE)

    def get_image_url(self):
        return "http://localhost:8000" + self.image.image_url
