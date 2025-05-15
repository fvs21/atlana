from user.models import User
from .models import Chat, Message
from rest_framework import serializers

class NewChatSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField()
    message = serializers.CharField(max_length=500)

class SenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'full_name',
            'profile_picture_url',
        ]

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            'id', 
            'sender', 
            'content', 
            'timestamp'
        ]

        read_only_fields = ['id', 'chat', 'sender', 'timestamp']

class ChatListItemSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    def get_participants(self, obj):
        other_participants = obj.participants.exclude(id=self.context['user'].id)
        return SenderSerializer(other_participants, many=True).data
    
    def get_last_message(self, obj):
        return MessageSerializer(obj.get_last_message(), context=self.context).data

    class Meta:
        model = Chat
        fields = [
            'id',
            'participants',
            'last_message',
        ]

class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()

    def get_participants(self, obj):
        other_participants = obj.participants.exclude(id=self.context['user'].id)
        return SenderSerializer(other_participants, many=True).data
    class Meta:
        model = Chat
        fields = [
            'id',
            'participants',
            'created_at'
        ]