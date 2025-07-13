from typing import List, Optional

from professor_rating.models import Professor

def get_professors() -> List[Professor]:
    return Professor.objects.all().order_by("name")

def get_professor_by_id(id: int) -> Optional[Professor]:
    return Professor.objects.filter(id=id).first()