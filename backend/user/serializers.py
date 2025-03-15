from rest_framework import serializers

from store.models import Store

from .models import User

class UserSerializer(serializers.ModelSerializer):
    has_store_created = serializers.SerializerMethodField()

    def get_has_store_created(self, obj):
        return Store.objects.filter(creator=obj).exists()

    class Meta:
        model = User
        fields = [
            'email', 
            'first_name', 
            'last_name', 
            'company_name', 
            'user_type', 
            'profile_picture_url',
            'country_code',
            'phone_number',
            'has_email_verified',
            'has_phone_verified',
            'has_store_created'
        ]