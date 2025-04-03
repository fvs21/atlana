from rest_framework import serializers

from listing.models import Listing, ListingColor, ListingOptions, ListingPrice, ListingSize, ListingSizeSpecification

class ListingPricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingPrice
        fields = [
            'min_units',
            'max_units',
            'price'
        ]

class CreateListingColorOptionSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = ListingColor
        fields = [
            'image',
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
            'image_urls',
            'prices',
            'options'
        ]