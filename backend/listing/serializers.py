from typing import List
from rest_framework import serializers

from listing.models import Listing
from django.core.files.uploadedfile import UploadedFile

'''
    Serializer for creating and modeling the prices of a listing
'''

class CreateListingBodySerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'title',
            'description',
            'category',
            'price',
        ]

class CreateListingRequestSerializer(serializers.Serializer):
    data = serializers.JSONField()
    images = serializers.ListField(child=serializers.ImageField())

    def validate_data(self, data) -> CreateListingBodySerializer:
        serializer = CreateListingBodySerializer(data=data)

        if not serializer.is_valid():
            raise serializers.ValidationError(serializer.errors)
        
        return serializer.validated_data
    
    def validate_images(self, images: List[UploadedFile]) -> List[UploadedFile]:
        if len(images) > 6:
            raise serializers.ValidationError("No puedes subir más de 6 imágenes")
        
        return images
    
class ListingSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()

    def get_creator(self, obj: Listing):
        return {
            'id': obj.creator.id,
            'name': f"{obj.creator.first_name} {obj.creator.last_name}",
            'profile_picture': obj.creator.profile_picture_url()
        }
    
    class Meta:
        model = Listing
        fields = [
            'id',
            'title',
            'description',
            'category',
            'price',
            'images_urls',
            'created_at',
            'creator'
        ]