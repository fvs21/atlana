from typing import Dict, List, Optional

from professor_rating.models import Course, Professor, Rating
from django.db.models import F, ExpressionWrapper, FloatField, Prefetch
from django.db.models.functions import Lower
from django.contrib.postgres.lookups import Unaccent

def get_professors(name: Optional[str], course: Optional[int], department: Optional[str], tags: Optional[List[int]]) -> List[Professor]:
    professors = Professor.objects.order_by("name")

    if name is not None:    
        professors = professors.annotate(name_search=Lower(Unaccent('name'))).filter(name_search__contains=name.lower())

    if course is not None:
        professors = professors.filter(ratings__course_id=course)

    if department is not None:
        professors = professors.filter(department=department)

    if len(tags):
        professors = professors.filter(ratings__tags__title__in=tags)

    return professors.distinct()

def get_professor_by_id(id: int) -> Optional[Professor]:
    return Professor.objects.filter(id=id).first()

def get_professor_by_id_complete(id: int) -> Optional[Professor]:
    ''' 
        Load the professor alongside all of their Ratings, and Tags.
    '''

    ratings = Prefetch(
        "ratings",
        queryset=Rating.objects.select_related('course').prefetch_related('tags')
    )

    return Professor.objects.prefetch_related(ratings).filter(id=id).first()

def find_courses_by_name(name: str) -> List[Course]:
    if not name:
        return []

    listings = Course.objects.filter(name__unaccent__icontains=name).all()
    return listings

def find_professors_by_name(name: str) -> List[Professor]:
    if not name:
        return []

    professors = Professor.objects.filter(name__unaccent__icontains=name).order_by('name').all()

    return professors

def create_rating(data: Dict) -> Rating:
    rating = Rating.objects.create(
        professor=data['professor'],
        comment=data['comment'],
        course=data['course'],
        mandatory_assistance=data['mandatory_assistance'],
        quality=data['quality'],
        difficulty=data['difficulty'],
        grade_achieved = data['grade_achieved'],
        recommended=data['recommended']
    )

    rating.tags.set(data['tags'])

    Professor.objects.filter(id=rating.professor.id).update(
        average_rating = ExpressionWrapper(
            (F("average_rating") * F("rating_count") + rating.quality) / (F("rating_count") + 1),
            output_field=FloatField()
        ),
        difficulty_level = ExpressionWrapper(
            (F("difficulty_level") * F("rating_count") + rating.difficulty) / (F("rating_count") + 1),
            output_field=FloatField()
        ),
        recommendation_rate = ExpressionWrapper(
            (F("recommendation_rate") * F("rating_count") + (1 if rating.recommended else 0)) / (F("rating_count") + 1),
            output_field=FloatField()
        ),
        rating_count = F("rating_count") + 1,
    )

    return rating

def get_professor_tags(professor: Professor) -> List[str]:
    ratings = professor.ratings.all()

    unique_tags = set()

    for rate in ratings:
        for tag in rate.tags.all():
            unique_tags.add(tag.get_title_display())

    return list(unique_tags)