
from calendar import c
from typing import List, Tuple

from django.dispatch import receiver

from user.models import User
from chat.models import Chat, Message
from django.db.models import Max
from django.utils import timezone
from django.db.models import Q
from marketplace.service import get_listing_by_id
from channels.db import database_sync_to_async

async def can_user_join_chat(user: User, chat_id: int) -> bool:
    """
        Check if the user can join the chat.
    """
    return await Chat.objects.filter(id=chat_id, participants=user).aexists()

async def get_chat_by_id(chat_id: int) -> Chat:
    """
        Get a chat by its ID.
    """
    return await Chat.objects.prefetch_related('participants').aget(id=chat_id)

async def new_message(chat_id: int, sender: User, message: str) -> Message:
    """
        Create a new message in the chat.
    """
    chat = await get_chat_by_id(chat_id)

    message = await Message.objects.acreate(
        chat=chat,
        sender=sender,
        content=message
    )

    if not chat.has_messages:
        chat.has_messages = True
        await chat.asave()

    return message

async def reply_to_listing(chat_id: int, sender: User, message: str, listing_id: int) -> Message:
    listing = await database_sync_to_async(get_listing_by_id)(listing_id)
    
    if not listing:
        return None

    chat = await get_chat_by_id(chat_id)
    receiver = await chat.participants.exclude(id=sender.id).afirst()

    if not listing.creator == receiver:
        return None

    message = await Message.objects.acreate(
        chat=chat,
        sender=sender,
        content=message,
        reply_to_listing=listing
    )

    return message

async def reply_to(chat_id: int, sender: User, message: str, message_id: int) -> Message:
    chat = await get_chat_by_id(chat_id)

    message_to_reply = await Message.objects.filter(id=message_id, chat=chat).afirst()

    if not message_to_reply:
        return None

    message = await Message.objects.acreate(
        chat=chat,
        sender=sender,
        content=message,
        reply_to=message_to_reply
    )

    return message

async def mark_chat_as_read(chat_id: int, user: User) -> bool:
    """
        Mark all messages in the chat as read for the user.
    """
    messages = Message.objects.filter(
        chat__id=chat_id, seen_at__isnull=True
    ).filter(~Q(sender=user))

    if not await messages.aexists():
        return False
    
    await messages.aupdate(seen_at=timezone.now())
    return True


def get_user_chats(user: User) -> List[Chat]:
    """
        Get all chats for a user.
        Ignore created chats with no messages.
    """

    return Chat.objects.annotate(
        last_message_timestamp=Max('messages__timestamp')
    ).prefetch_related('participants__profile_picture').order_by('-last_message_timestamp').filter(participants=user, has_messages=True).all()

def chat_exists(chat_id: int) -> bool:
    """
        Check if a chat exists.
    """
    return Chat.objects.filter(id=chat_id).exists()

def can_user_view_chat(user: User, chat_id: int) -> bool:
    """
        Check if the user can view chat messages.
    """
    chat = Chat.objects.filter(id=chat_id).first()

    if not chat:
        return False
    
    return user in chat.participants.all()

def get_chat_information(chat_id: int) -> Tuple[Chat, List[Message]]:
    """
        Get chat information and messages.
    """
    chat = Chat.objects.prefetch_related('messages__reply_to_listing').filter(id=chat_id).first()

    messages = chat.messages.all().order_by('-timestamp')

    return chat, messages

    
def can_create_chat(user: User, receiver_id: int) -> bool:
    """
        Check if a new chat can be created.
        Check if:
        - The receiver exists
        - The sender is not the same as the receiver
    """

    receiver = User.objects.filter(id=receiver_id).first()

    if not receiver:
        return False

    if receiver == user:
        return False

    return True

def get_or_create_chat(sender: User, receiver_id: int) -> Chat:
    """
        Get or create a chat between two users.
        If the chat already exists, return it.
        If the chat does not exist, create it and add the participants.
    """
    chat, created = Chat.objects.filter(participants=sender).filter(participants__id=receiver_id).get_or_create()

    if created:
        chat.participants.add(sender)
        chat.participants.add(receiver_id)
        chat.save()

    return chat