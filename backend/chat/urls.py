from django.urls import path
from . import views

urlpatterns = [
    path("all", views.ChatsViewset.as_view({"get": "get_user_chats"}), name="chat-list"),
    path("<int:chat_id>", views.ChatsViewset.as_view({"get": "get_chat"}), name="chat-detail"),
]