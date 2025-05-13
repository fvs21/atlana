from rest_framework import serializers


from .models import User

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    class Meta:
        model = User
        fields = [
            'id',
            'email', 
            'first_name', 
            'last_name',
            'full_name', 
            'profile_picture_url',
            'has_email_verified',
        ]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name', 
            'last_name', 
            'profile_picture_url',
            'information'
        ]

        extra_kwargs = {
            'information': {
                'required': False,
                'allow_null': True
            }
        }