from rest_framework import serializers


from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email', 
            'first_name', 
            'last_name', 
            'profile_picture_url',
            'country_code',
            'phone_number',
            'has_email_verified',
            'has_phone_verified',
        ]