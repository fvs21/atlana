from rest_framework import serializers

from location.models import Location
from .models import Listing, PropertyListing
from typing import List
from rest_framework import serializers
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

    def validate_used(self, used) -> bool:
        if self.initial_data.get('category') in ["food", "property_rentals"]:
            return None
        
        if used is None:
            raise serializers.ValidationError("Debes especificar si el producto es nuevo o usado")
        
        return used

class CreateListingRequestSerializer(serializers.Serializer):
    data = serializers.JSONField()
    images = serializers.ListField(child=serializers.ImageField(), max_length=10)

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
    air_conditioning = serializers.BooleanField(default=False, required=False)
    furnished = serializers.BooleanField(default=False, required=False)

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
            'air_conditioning',
            'furnished'
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
            'time_unit',
            'air_conditioning',
            'furnished',
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
            'property',
            'archived'
        ]

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['latitude', 'longitude']

class PropertyListingCardSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = PropertyListing
        fields = [
            'location',
            'time_unit',
        ]

class ListingCardSerializer(serializers.ModelSerializer):
    property = PropertyListingCardSerializer(required=False)
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
            'price',
            'images_urls',
            'creator',
            'property',
            'archived'
        ]

class MapBoundsSerializer(serializers.Serializer):
    northeast = serializers.CharField()
    southwest = serializers.CharField()

    def validate(self, data):
        northeast = data.get('northeast')
        southwest = data.get('southwest')

        northeast_lat, northeast_lng = map(float, northeast.split(','))
        southwest_lat, southwest_lng = map(float, southwest.split(','))

        return {
            'northeast': {
                'lat': northeast_lat,
                'lng': northeast_lng
            },
            'southwest': {
                'lat': southwest_lat,
                'lng': southwest_lng
            }
        }