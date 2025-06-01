from listing.models import Listing
from user.models import User
from .models import Chat, Message
from rest_framework import serializers
from django.db.models import Q

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

class ChatNotificationSerializer(serializers.ModelSerializer):
    sender = SenderSerializer()
    chat_id = serializers.IntegerField(source='chat.id')

    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'content',
            'chat_id',
            'timestamp'
        ]

class ChatListItemSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    unread_messages = serializers.SerializerMethodField()

    def get_participants(self, obj):
        other_participants = obj.participants.exclude(id=self.context['user'].id)
        return SenderSerializer(other_participants, many=True).data
    
    def get_last_message(self, obj):
        return MessageSerializer(obj.get_last_message(), context=self.context).data
    
    def get_unread_messages(self, obj):
        if not obj.has_messages:
            return 0

        return obj.messages.filter(seen_at__isnull=True).filter(~Q(sender__id=self.context['user'].id)).count()

    class Meta:
        model = Chat
        fields = [
            'id',
            'participants',
            'last_message',
            'unread_messages'
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

class CreateChatSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField()
    
    def validate_receiver_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("Receiver does not exist")

        if value == self.context['user'].id:
            raise serializers.ValidationError("You cannot create a chat with yourself")
        
        return value
    
class ListingReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'id',
            'title',
            'first_image'
        ]
    
class MessageSerializer(serializers.ModelSerializer):
    reply_to_listing = ListingReplySerializer(read_only=True)

    class Meta:
        model = Message
        fields = [
            'id', 
            'sender', 
            'content', 
            'timestamp',
            'seen_at',
            'reply_to_listing',
            'reply_to'
        ]

        read_only_fields = ['id', 'sender', 'timestamp', 'seen_at', 'reply_to_listing', 'reply_to']

class SendMessageEventSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=500)
    reply_to_listing = serializers.IntegerField(required=False, allow_null=True)
    reply_to = serializers.IntegerField(required=False, allow_null=True)

class ConsumerEventSerializer(serializers.Serializer):
    type = serializers.CharField()
    data = serializers.JSONField()

    def validate_type(self, value):
        if value not in ['send_message', 'read_chat']:
            raise serializers.ValidationError("Invalid event type")
        return value
    
    def validate_data(self, value):
        if self.initial_data['type'] == 'send_message':
            '''
                Serialize and validate the data for sending a message.
            '''
            serializer = SendMessageEventSerializer(data=value)

            if not serializer.is_valid():
                raise serializers.ValidationError(serializer.errors)
            
            return serializer.validated_data
        
        elif self.initial_data['type'] == 'read_chat':
            return None