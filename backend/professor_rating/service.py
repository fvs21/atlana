from typing import List

from professor_rating.models import Professor

def get_professors() -> List[Professor]:
    return Professor.objects.all().order_by("name")