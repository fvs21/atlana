from rest_framework import serializers

from authentication.utils import AuthenticationUtils
from user.models import User

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        
        domain = value.split('@')[1]
        if domain != 'anahuacmayab.edu.mx':
            raise serializers.ValidationError("Email domain not allowed")

        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(validated_data['password'])

        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class ResetPasswordSerializer(serializers.Serializer):
    credential = serializers.CharField(required=True, error_messages={'required': 'Credential missing'})
    token = serializers.CharField(max_length=128)
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
    email = serializers.CharField(required=True, error_messages={'required': 'Email missing'})

class VerifyEmailRequestSerializer(serializers.Serializer):
    code = serializers.CharField(required=True, error_messages={'required': 'Code missing'})

class UpdatePhoneNumberRequestSerializer(serializers.Serializer):
    country_code = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)

    def validate_country_code(self, value):
        if not value.isdigit():
            raise serializers.ValidationError('Invalid country code')
        if not value in ["52"]:
            raise serializers.ValidationError('Country code not supported')
        
        return value