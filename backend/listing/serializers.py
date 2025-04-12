from typing import List
from rest_framework import serializers

from listing.models import Listing, ListingColor, ListingOptions, ListingPrice, ListingSize, ListingSizeSpecification

'''
    Serializer for creating and modeling the prices of a listing
'''
class ListingPricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingPrice
        fields = [
            'min_units',
            'max_units',
            'price'
        ]

''''
    Serializer for creating listing color options
'''
class CreateListingColorOptionSerializer(serializers.ModelSerializer):
    image_index = serializers.IntegerField(required=False)

    class Meta:
        model = ListingColor
        fields = [
            'color_code',
            'color_name'
        ]

class ListingSizeSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingSizeSpecification
        fields = '__all__'

class CreateListingSizeOptionSerializer(serializers.ModelSerializer):
    specifications = ListingSizeSpecificationSerializer(required=False)
    class Meta:
        model = ListingSize
        fields = [
            'size',
            'specifications'
        ]

class CreateListingModelOptionSerializer(serializers.Serializer):
    pass

class CreateListingCustomizationOptionsSerializer(serializers.Serializer):
    colors = CreateListingColorOptionSerializer(many=True, required=False)
    sizes = CreateListingSizeOptionSerializer(many=True, required=False)
    models = CreateListingModelOptionSerializer(many=True, required=False)

    def validate_colors(self, value: List[CreateListingColorOptionSerializer]):
        if not value:
            raise serializers.ValidationError("At least one color option is required.")
        
        unique = set()
        indexes = set()
    
        for color in value:
            if not color.get('color_code') and not color.get('image_index'):
                raise serializers.ValidationError("Either color_code or image_index must be provided.")
            
            if color['color_name'] in unique:
                raise serializers.ValidationError("Duplicate color code found.")
            
            if color.get('image_index') is not None:
                if color['image_index'] in indexes:
                    raise serializers.ValidationError("Duplicate image index found.")
                
                if color['image_index'] < 0 or color['image_index'] >= len(value):
                    raise serializers.ValidationError("Image index out of range.")
                
                indexes.add(color['image_index'])
                
            unique.add(color['color_name'])

        return value
        

class CreateListingBodySerializer(serializers.Serializer):
    title = serializers.CharField(max_length=150)
    description = serializers.CharField(max_length=500)
    category = serializers.CharField(max_length=50)
    customizable = serializers.BooleanField(default=False)
    custom_options = CreateListingCustomizationOptionsSerializer(required=False)
    ready_to_ship = serializers.BooleanField(default=False)
    prices = serializers.ListField(child=ListingPricesSerializer())

class CreateListingSerializer(serializers.Serializer):
    data = serializers.JSONField()
    images = serializers.ListField(child=serializers.ImageField(), max_length=10)
    color_images = serializers.ListField(child=serializers.ImageField(), required=False, max_length=10)

    def validate_data(self, data):
        body_serializer = CreateListingBodySerializer(data=data)

        if not body_serializer.is_valid():
            raise serializers.ValidationError(body_serializer.errors)

        return body_serializer.validated_data

    def validate_images(self, images):
        if len(images) < 2:
            raise serializers.ValidationError("You must upload at least 2 images.")
        if len(images) > 10:
            raise serializers.ValidationError("You can only upload up to 10 images.")
        
        return images
    
class ListingColorOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingColor
        fields = [
            'image_url',
            'color_code',
            'color_name'
        ]

class ListingSizeOptionSerializer(serializers.ModelSerializer):
    specifications = ListingSizeSpecificationSerializer()

    class Meta:
        model = ListingSize
        fields = [
            'size',
            'specifications'
        ]
    
class ListingCustomizationOptions(serializers.ModelSerializer):
    colors = ListingColorOptionSerializer(many=True, required=False)
    sizes = ListingSizeOptionSerializer(many=True, required=False)

    class Meta:
        model = ListingOptions
        fields = [
            'colors',
            'sizes',
        ]
    
class ListingSerializer(serializers.ModelSerializer):
    prices = ListingPricesSerializer(many=True)
    options = ListingCustomizationOptions(many=True)
    
    class Meta:
        model = Listing
        fields = [
            'store',
            'title',
            'description',
            'category',
            'customizable',
            'ready_to_ship',
            'created_at',
            'images_urls',
            'prices',
            'options'
        ]