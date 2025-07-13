from typing import Dict, List, Optional

from professor_rating.models import Course, Professor, Rating
from django.db.models import F, ExpressionWrapper, FloatField

def get_professors() -> List[Professor]:
    return Professor.objects.all().order_by("name")

def get_professor_by_id(id: int) -> Optional[Professor]:
    return Professor.objects.filter(id=id).first()

def find_courses_by_name(name: str) -> List[Course]:
    if not name:
        return []

    listings = Course.objects.filter(name__unaccent__icontains=name).all()
    return listings

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