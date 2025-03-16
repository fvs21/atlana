from turtle import st
from rest_framework import serializers

from location.serializers import CreateLocationSerializer
from .models import Store
from image.service import upload_image

class CreateStoreSerializer(serializers.ModelSerializer):
    '''
    serializer used to create a store
    '''
    store_location = serializers.JSONField()

    class Meta:
        model = Store
        fields = ['name', 'store_location', 'creator']

    def validate_store_location(self, value):
        serializer = CreateLocationSerializer(data=value)

        serializer.is_valid(raise_exception=True)

        return serializer.save()
    
    def create(self, validated_data):
        store_location = validated_data.pop('store_location')

        store = Store.objects.create(**validated_data, store_location=store_location)

        return store

class StoreSerializer(serializers.ModelSerializer):
    '''
    serializer used to map and display store details
    '''
    class Meta:
        model = Store
        fields = [
            'id', 
            'name', 
            'store_location', 
            'creator', 
            'about', 
            'banner'
        ]

class EditStoreSerializer(serializers.ModelSerializer):
    banner = serializers.ImageField()
    class Meta:
        model = Store
        fields = ['name', 'about', 'banner']

    def validate_banner(self, value):
        image_file = upload_image(value, 'banner')

        return image_file

    def update(self, instance, validated_data: dict):
        instance.name = validated_data.get('name', instance.name)
        instance.about = validated_data.get('about', instance.about)
        instance.banner = validated_data.get('banner', instance.banner)

        instance.save()

        return instance
    
class EditAboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['about']

    def update(self, instance, validated_data: dict):
        instance.about = validated_data.get('about', instance.about)

        instance.save()

        return instance