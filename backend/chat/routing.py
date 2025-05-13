from . import consumers
from django.urls import re_path

websockets_urlpatterns = [
    re_path(r"ws/chat/(?P<chat_id>\w+)/$", consumers.ChatConsumer.as_asgi()),
]