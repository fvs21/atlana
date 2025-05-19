from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.permissions import GENERAL_AUTHENTICATION_PERMISSIONS

from .serializers import ChatListItemSerializer, ChatSerializer, CreateChatSerializer, MessageSerializer

from . import service

class ChatsViewset(viewsets.ViewSet):
    permission_classes = GENERAL_AUTHENTICATION_PERMISSIONS

    def get_user_chats(self, request: HttpRequest) -> JsonResponse:
        user = request.user

        chats = service.get_user_chats(user)

        return JsonResponse({
            "data": {
                "chats": ChatListItemSerializer(chats, many=True, context={"user": user}).data
            }
        }, status=200)
    
    def get_chat(self, request: HttpRequest, chat_id: int) -> JsonResponse:
        user = request.user

        if not service.chat_exists(chat_id):
            return JsonResponse({
                "details": "Chat does not exist",
                "code": "chat_does_not_exist"
            }, status=404)
        
        if not service.can_user_view_chat(user, chat_id):
            return JsonResponse({
                "details": "You do not have permission to view this chat",
                "code": "cannot_view_chat"
            }, status=403)
        
        chat, messages = service.get_chat_information(chat_id)

        return JsonResponse({
            "data": {
                "chat": ChatSerializer(chat, context={"user": user}).data,
                "messages": MessageSerializer(messages, context={'user': user}, many=True).data
            }
        }, status=200)
    
    def create_or_get_chat(self, request: HttpRequest) -> JsonResponse:
        user = request.user

        serializer = CreateChatSerializer(data=request.data, context={"user": user})

        if not serializer.is_valid():
            return JsonResponse({
                "details": serializer.errors,
                "code": "invalid_data"
            }, status=400)
        
        receiver_id = serializer.validated_data["receiver_id"]

        chat = service.get_or_create_chat(user, receiver_id)

        return JsonResponse({
            "data": {
                "chat_id": chat.id,
            }
        }, status=200)