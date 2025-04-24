from rest_framework import serializers

from location.models import Location

class CreateLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            'name', 
            'country', 
            'state', 
            'city', 
            'street', 
            'zip_code', 
            'number'
        ]

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class LocationQuerySerializer(serializers.Serializer):
    display_name = serializers.CharField(required=True)
    lat = serializers.FloatField(required=True)
    lon = serializers.FloatField(required=True)