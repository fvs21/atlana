
from typing import Tuple
from user.models import User
from chat.models import Chat, Message


async def can_user_join_chat(user: User, chat_id: int) -> bool:
    """
        Check if the user can join the chat.
    """
    # Assuming you have a Chat model with a ManyToMany relationship with User

    try:
        chat = await Chat.objects.aget(id=chat_id)
        return user in chat.participants.all()
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

async def new_message(chat: Chat, sender: User, message: str) -> Message:
    """
        Create a new message in the chat.
    """
    return await chat.messages.acreate(sender=sender, content=message)