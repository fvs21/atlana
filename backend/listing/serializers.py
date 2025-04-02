from rest_framework import serializers

from listing.models import Listing, ListingPrice

class ListingPricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingPrice
        fields = [
            'min_units',
            'max_units',
            'price'
        ]

class CreateListingBodySerializer(serializers.Serializer):
    title = serializers.CharField(max_length=150)
    description = serializers.CharField(max_length=500)
    customizable = serializers.BooleanField(default=False)
    ready_to_ship = serializers.BooleanField(default=False)
    prices = serializers.ListField(child=ListingPricesSerializer())

class CreateListingSerializer(serializers.Serializer):
    data = serializers.JSONField()
    images = serializers.ListField(child=serializers.ImageField(), max_length=10)

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
    
class ListingSerializer(serializers.ModelSerializer):
    prices = ListingPricesSerializer(many=True)
    
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
            'image_urls',
            'prices'
        ]