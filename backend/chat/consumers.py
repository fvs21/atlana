import json
from typing import Dict
from channels.generic.websocket import AsyncWebsocketConsumer

from chat.models import Message

from .serializers import ConsumerEventSerializer, MessageSerializer, ChatNotificationSerializer
from . import service
from channels.db import database_sync_to_async

class UserChatsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_anonymous:
            self.close()
            return
        
        self.user_id = self.scope['user'].id
        self.room_group_name = f'chats_user_{self.user_id}'

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def chat_notification(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'type': 'chat_notification',
            'data': message
        }))

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_anonymous:
            self.close()
            return
        
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = f'chat_{self.chat_id}'

        if not await service.can_user_join_chat(self.scope['user'], self.chat_id):
            await self.close()
            return
        
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        json_data = json.loads(text_data)
        serializer = ConsumerEventSerializer(data=json_data)

        if not serializer.is_valid():
            print("Invalid data received:", serializer.errors)
            return
        
        json_data = serializer.validated_data

        if json_data['type'] == 'send_message':
            await self.receive_chat_message(json_data['data'])
        elif json_data['type'] == 'read_chat':
            await self.receive_read_chat()

    async def receive_chat_message(self, data: Dict):
        if 'reply_to_listing' in data:
            message = await service.reply_to_listing(
                self.chat_id,
                self.scope['user'],
                data['content'],
                data['reply_to_listing']
            )
        elif 'reply_to' in data:
            message = await service.reply_to(
                self.chat_id,
                self.scope['user'],
                data['content'],
                data['reply_to']
            )
        else:
            message = await service.new_message(
                self.chat_id, 
                self.scope['user'], 
                data['content']
            )

        if not message:
            print("Failed to create message")
            return

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.message',
                'message': MessageSerializer(message, context={'user': self.scope['user']}).data
            }
        )

        participants = message.chat.participants.all()

        for participant in participants:
            if participant.id == self.scope['user'].id:
                continue

            await self.channel_layer.group_send(
                f'chats_user_{participant.id}',
                {
                    'type': 'chat_notification',
                    'message': ChatNotificationSerializer(message).data
                }
            )

    async def receive_read_chat(self):
        res = await service.mark_chat_as_read(self.chat_id, self.scope['user'])

        if not res:
            return

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.read',
                'user': self.scope['user'].id
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'data': message
        }))

    async def chat_read(self, event):
        await self.send(text_data=json.dumps({
            'type': 'chat_read',
            'data': {
                "user": event['user']
            }
        }))