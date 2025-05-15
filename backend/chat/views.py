from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import ChatListItemSerializer, ChatSerializer, MessageSerializer

from . import service
from authentication.service import get_user_by_id

class ChatsViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_user_chats(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        chats = service.get_user_chats(user)

        return JsonResponse({
            "data": {
                "chats": ChatListItemSerializer(chats, many=True, context={"user": user}).data
            }
        }, status=200)
    
    def get_chat(self, request: HttpRequest, chat_id: int) -> JsonResponse:
        user = get_user_by_id(request.user.id)

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