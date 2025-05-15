
from typing import List, Tuple
from user.models import User
from chat.models import Chat, Message


async def can_user_join_chat(user: User, chat_id: int) -> bool:
    """
        Check if the user can join the chat.
    """
    # Assuming you have a Chat model with a ManyToMany relationship with User

    try:
        return await Chat.objects.filter(id=chat_id, participants=user).aexists()

    except Chat.DoesNotExist:
        return False
    
async def can_create_chat(user: User, receiver_id: int) -> bool:
    """
        Check if a new chat can be created.
        Check if:
        - The receiver exists
        - The sender is not the same as the receiver
        - A chat does not already exist between the user and the receiver
    """

    try:
        receiver = await User.objects.aget(id=receiver_id)

        if receiver == user:
            return False

        return not await Chat.objects.filter(participants=user).filter(participants__id=receiver_id).aexists()
    
    except User.DoesNotExist:
        return False

async def create_chat(sender: User, receiver_id: int, message: str) -> Tuple[Chat, Message]:
    receiver = await User.objects.aget(id=receiver_id)

    chat = await Chat.objects.acreate()

    await chat.participants.aadd(sender)
    await chat.participants.aadd(receiver)
    await chat.asave()

    message = await chat.messages.acreate(sender=sender, content=message)

    return chat, message

async def new_message(chat_id: int, sender: User, message: str) -> Message:
    """
        Create a new message in the chat.
    """
    chat = await Chat.objects.aget(id=chat_id)

    return await Message.objects.acreate(
        chat=chat,
        sender=sender,
        content=message
    )

def get_user_chats(user: User) -> List[Chat]:
    """
        Get all chats for a user.
    """
    return Chat.objects.filter(participants=user).all()

def get_chat_messages(chat_id: int) -> List[Message]:
    """
        Get all messages for a chat.
    """
    chat = Chat.objects.filter(id=chat_id).first()

    if not chat:
        return []

    return chat.messages.all()

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
    chat = Chat.objects.filter(id=chat_id).first()

    if not chat:
        return None, []

    messages = chat.messages.all().order_by('-timestamp')

    return chat, messages