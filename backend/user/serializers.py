from rest_framework import serializers
from .models import User, UserInformation

class UserInformationSerializer(serializers.ModelSerializer):
    university = serializers.SerializerMethodField()

    def get_university(self, obj):
        return obj.user.get_university_name()
    
    class Meta:
        model = UserInformation
        fields = [
            'user',
            'bio',
            'major',
            'semester',
            'instagram',
            'university'
        ]

        extra_kwargs = {
            'user': {
                'required': False,
            }
        }

    def create(self, validated_data):
        user = validated_data.pop('user')

        user_information = UserInformation.objects.create(user=user, **validated_data)
        return user_information

    def update(self, instance, validated_data):
        instance.bio = validated_data.get('bio', instance.bio)
        instance.major = validated_data.get('major', instance.major)
        instance.semester = validated_data.get('semester', instance.semester)
        instance.instagram = validated_data.get('instagram', instance.instagram)
        instance.save()
        return instance
        

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    information = UserInformationSerializer()

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
            'information',
        ]

class ProfileSerializer(serializers.ModelSerializer):
    information = UserInformationSerializer()
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    class Meta:
        model = User
        fields = [
            'id',
            'full_name',
            'profile_picture_url',
            'information'
        ]

class UpdateProfilePictureSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)

    def validate_image(self, value):
        if not value.content_type in ['image/jpeg', 'image/jpg', 'image/png']:
            raise serializers.ValidationError("Invalid image type")
        
        return value