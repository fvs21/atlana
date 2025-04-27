from typing import List
from rest_framework import serializers

from listing.models import Listing, PropertyListing
from django.core.files.uploadedfile import UploadedFile

from location.models import Location

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
    
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            'latitude',
            'longitude',
            'radius'
        ]

    def validate_radius(self, radius: float) -> float:
        if radius < 0:
            raise serializers.ValidationError("El radio no puede ser negativo")
        
        if radius < 100 or radius > 10000:
            raise serializers.ValidationError("El radio debe estar entre 100 y 10,000 metros")
        
        return radius
    
class CreatePropertyListingBodySerializer(serializers.ModelSerializer):
    sell = serializers.BooleanField(default=False)
    property_type = serializers.ChoiceField(choices=PropertyListing.TYPES)
    location = LocationSerializer()
    bedrooms = serializers.IntegerField(required=False)
    bathrooms = serializers.IntegerField(required=False)
    time_unit = serializers.ChoiceField(choices=PropertyListing.TIME_UNITS, required=True)

    class Meta:
        model = Listing
        fields = [
            'title',
            'description',
            'category',
            'price',
            'property_type',
            'location',
            'bedrooms',
            'bathrooms',
            'sell',
            'time_unit',
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
    location = LocationSerializer()
    class Meta:
        model = PropertyListing
        fields = [
            'sell',
            'location',
            'property_type',
            'bedrooms',
            'bathrooms',
            'time_unit'
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