from turtle import st
from rest_framework import serializers

from location.serializers import CreateLocationSerializer
from .models import Store

class CreateStoreSerializer(serializers.ModelSerializer):
    store_location = serializers.JSONField()

    class Meta:
        model = Store
        fields = ['name', 'store_location', 'creator']

    def validate_store_location(self, value):
        serializer = CreateLocationSerializer(data=value)

        return serializer.save()
    
    def create(self, validated_data):
        store_location = validated_data.pop('store_location')

        store = Store.objects.create(**validated_data, store_location=store_location)

        return store

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['name', 'store_location', 'creator', 'about', 'banner']