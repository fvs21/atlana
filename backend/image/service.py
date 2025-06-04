from io import BytesIO
from typing import Optional
from backend.settings import AWS_STORAGE_BUCKET_NAME, DEBUG, MEDIA_URL
from image.exceptions import ImageUploadException
from .models import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
import uuid
import os
import subprocess
import boto3
from botocore.exceptions import ClientError
import logging
import tempfile

def random_file_name(container, filename) -> str:
    extension = os.path.splitext(filename)[1]
    return container + str(uuid.uuid4()) + extension

def download_image(image_name: str) -> Optional[Image]:
    return Image.objects.filter(image_name=image_name).first()

def check_if_valid_image_type(image: InMemoryUploadedFile) -> None:
    return image.content_type in ['image/jpeg', 'image/jpg', 'image/png']

def upload_image(image: InMemoryUploadedFile, container: str) -> Optional[Image]:
    if not check_if_valid_image_type(image):
        raise ImageUploadException("Invalid image type", 400)
    
    image_name = random_file_name(container, image.name)

    stripped_image = strip_image_metadata(image)
    
    if stripped_image is None:
        return None
    
    try:
        created_image = Image(
            image=stripped_image, 
            image_name=image_name, 
            image_type=stripped_image.content_type, 
            container=container,
            image_url=("/api/image/" if DEBUG else MEDIA_URL) + str(image_name)
        )
    
        created_image.save()

        return created_image
    except Exception as e:
        logging.error(f"Error uploading image: {e}")
        return None
    
def strip_image_metadata(image: InMemoryUploadedFile) -> InMemoryUploadedFile:
    image_type = image.content_type.split('/')[1]

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{image_type}") as temp_file:
            for chunk in image.chunks():
                temp_file.write(chunk)
            image_path = temp_file.name

        result = subprocess.run(
            ["exiftool", "-all=", image_path, '-overwrite_original'],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            return None
        
        with open(image_path, 'rb') as f:
            buffer = BytesIO(f.read())
            stripped_image = InMemoryUploadedFile(
                buffer, 
                image.field_name, 
                image.name, 
                image.content_type, 
                size=os.path.getsize(image_path),
                charset=image.charset
            )
    finally:
        if os.path.exists(image_path):
            os.remove(image_path)

    return stripped_image

def generate_presigned_url(key: str, expiration=3600) -> str:
    s3 = boto3.client('s3', config=boto3.session.Config(signature_version='s3v4'))

    try:
        res = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': AWS_STORAGE_BUCKET_NAME, 'Key': key},
            ExpiresIn=expiration
        )
    except ClientError as e:
        logging.error(e)
        return None
        
    return res