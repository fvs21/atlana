from django.core.management.base import BaseCommand
from image.models import Image
from django.core.files import File
from dotenv import load_dotenv
import os

load_dotenv()

class Command(BaseCommand):
    def handle(self, **options):
        image = Image(image_name="default-pfp.png", image_type="image/png", image_url="/api/image/default-pfp.png", container="pfp")

        path = os.path.join(os.environ.get('BASE_PATH'), 'images/pfp/default-pfp.png')

        image.image.save('default-pfp.png', File(open(path, 'rb')))

        image.save()

        image.image.name = "images/pfp/default-pfp.png"
        image.save()