import json
from channels.generic.websocket import AsyncWebsocketConsumer

from .serializers import ChatNotificationSerializer, MessageSerializer
from . import service

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
        text_data_json = json.loads(text_data)

        message_data = text_data_json['message']

        message = await service.new_message(self.chat_id, self.scope['user'], message_data)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.message',
                'message': MessageSerializer(message, context={'user': self.scope['user']}).data
            }
        )

        async for participant in message.chat.participants.all():
            if participant.id == self.scope['user'].id:
                continue

            await self.channel_layer.group_send(
                f'chats_user_{participant.id}',
                {
                    'type': 'chat_notification',
                    'message': ChatNotificationSerializer(message).data
                }
            )
        
    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'data': message
        }))