from django.db import models

from .constants import TAGS

# Create your models here.

class Tag(models.Model):
    title = models.CharField(max_length=5, choices=TAGS)

class Course(models.Model):
    name = models.CharField()

class Professor(models.Model):
    name = models.CharField()
    average_rating = models.FloatField(default=0)
    recommendation_rate = models.FloatField(default=0)
    department = models.CharField()

    difficulty_level = models.FloatField(default=0)
    
class Rating(models.Model):
    comment = models.TextField(null=True, blank=True)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    mandatory_assistance = models.BooleanField()

    recommended = models.BooleanField()
    clarity = models.SmallIntegerField()
    help = models.SmallIntegerField()
    difficulty = models.SmallIntegerField()

    tags = models.ManyToManyField(Tag)

    created_at = models.DateField(auto_now_add=True)