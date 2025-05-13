from user.models import User
from .models import Message
from rest_framework import serializers

class SenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'full_name',
            'profile_picture_url',
        ]

class MessageSerializer(serializers.ModelSerializer):
    sender = SenderSerializer()

    class Meta:
        model = Message
        fields = [
            'id', 
            'chat', 
            'sender', 
            'content', 
            'timestamp'
        ]

        read_only_fields = ['id', 'chat', 'sender', 'timestamp']