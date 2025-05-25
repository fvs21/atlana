from . import consumers
from django.urls import re_path, path

websockets_urlpatterns = [
    path("api/ws/chats/", consumers.UserChatsConsumer.as_asgi()),
    re_path(r"api/ws/chat/(?P<chat_id>\w+)/$", consumers.ChatConsumer.as_asgi()),
]