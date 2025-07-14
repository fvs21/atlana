from django.db import models

from .constants import DEPARTMENTS, GRADES, TAGS

# Create your models here.

class Tag(models.Model):
    title = models.CharField(max_length=5, choices=TAGS, unique=True)

class Course(models.Model):
    name = models.CharField(max_length=50)

class Professor(models.Model):
    name = models.CharField(max_length=70)
    department = models.CharField(max_length=4, choices=DEPARTMENTS)

    recommendation_rate = models.FloatField(default=0)

    difficulty_level = models.FloatField(default=0)

    average_rating = models.FloatField(default=0)

    rating_count = models.SmallIntegerField(default=0)
    
class Rating(models.Model):
    comment = models.TextField(null=True, blank=True)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='ratings')

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    mandatory_assistance = models.BooleanField()

    recommended = models.BooleanField()
    quality = models.SmallIntegerField()
    difficulty = models.SmallIntegerField()

    tags = models.ManyToManyField(Tag)

    grade_achieved = models.CharField(max_length=3, choices=GRADES)

    created_at = models.DateField(auto_now_add=True)