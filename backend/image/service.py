from typing import Optional
from image.exceptions import ImageUploadException
from .models import Image
from django.core.files.uploadedfile import UploadedFile
import uuid
import os
import subprocess

def random_file_name(container, filename) -> str:
    extension = os.path.splitext(filename)[1]
    return container + str(uuid.uuid4()) + extension

def download_image(image_name: str) -> Optional[Image]:
    return Image.objects.filter(image_name=image_name).first()

def check_if_valid_image_type(image: UploadedFile) -> None:
    return image.content_type in ['image/jpeg', 'image/jpg', 'image/png']

def upload_image(image: UploadedFile, container: str) -> Optional[Image]:
    if not check_if_valid_image_type(image):
        raise ImageUploadException("Invalid image type", 400)
    
    image_name = random_file_name(container, image.name)

    try:
        created_image = Image(
            image=image, 
            image_name=image_name, 
            image_type=image.content_type, 
            container=container,
            image_url="/api/image/" + str(image_name)
        )
    
        created_image.save()

        image_path = created_image.image.path

        return created_image
    except Exception:
        return None
    
def strip_image_metadata(image_path: str) -> bool:
    result = subprocess.run(
        ["exiftool", "-all=", image_path, '-overwrite_original'],
        capture_output=True,
        text=True
    )

    print(result.stdout)

    return result.returncode == 0