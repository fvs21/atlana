from typing import List
from rest_framework import serializers

from listing.models import Listing, PropertyListing
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
            'used'
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
    
class CreatePropertyListingBodySerializer(serializers.ModelSerializer):
    class Location(serializers.Serializer):
        latitude = serializers.FloatField()
        longitude = serializers.FloatField()

    property_type = serializers.ChoiceField(choices=PropertyListing.TYPES)
    sell = serializers.BooleanField(default=False)
    location = Location()
    aproximate_location = serializers.BooleanField(default=True)
    bedrooms = serializers.IntegerField(required=False)
    bathrooms = serializers.IntegerField(required=False)

    class Meta:
        model = Listing
        fields = [
            'title',
            'description',
            'category',
            'price',
        ]

class CreatePropertyListingRequestSerializer(serializers.Serializer):
    data = serializers.JSONField()
    images = serializers.ListField(child=serializers.ImageField())

    def validate_data(self, data) -> CreateListingBodySerializer:
        serializer = CreatePropertyListingBodySerializer(data=data)

        if not serializer.is_valid():
            raise serializers.ValidationError(serializer.errors)
        
        return serializer.validated_data
    
class PropertyListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyListing
        fields = [
            'listing',
            'sell',
            'aproximate_location',
            'location',
            'property_type',
            'bedrooms',
            'bathrooms'
        ]
    
class ListingSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()
    property = PropertyListingSerializer(required=False)

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
            'creator',
            'used',
            'property'
        ]