from rest_framework import serializers

from authentication.utils import AuthenticationUtils
from user.models import User

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'user_type', 'company_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            company_name=validated_data['company_name'],
            user_type=validated_data['user_type']
        )

        user.set_password(validated_data['password'])

        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class ResetPasswordSerializer(serializers.Serializer):
    credential = serializers.CharField(required=True, error_messages={'required': 'Credential missing'})
    password_reset_token = serializers.CharField(max_length=128)
    new_password = serializers.CharField(max_length = 20)
    confirm_password = serializers.CharField(max_length = 20)

    def validate_credential(self, value):
        if AuthenticationUtils.determine_credential_type(value) == "username":
            raise serializers.ValidationError("User not found")
        return value

    def validate_new_password(self, value):
        if not 8 <= len(value) <= 20:
            raise serializers.ValidationError('You must choose a more secure password')
        return value
    
    def validate_confirm_password(self, value):
        if value != self.new_password:
            raise serializers.ValidationError('Password don\' match')
        return value

class ForgotPasswordRequestSerializer(serializers.Serializer):
    credential = serializers.CharField(required=True, error_messages={'required': 'Credential missing'})

class VerifyEmailRequestSerializer(serializers.Serializer):
    code = serializers.CharField(required=True, error_messages={'required': 'Code missing'})