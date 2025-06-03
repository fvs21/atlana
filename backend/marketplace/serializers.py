from rest_framework import serializers

from location.models import Location
from listing.models import Listing, PropertyListing

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