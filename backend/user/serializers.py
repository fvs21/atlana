from rest_framework import serializers

from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email', 
            'first_name', 
            'last_name', 
            'company_name', 
            'user_type', 
            'profile_picture_url'
        ]