from django.db import models

# Create your models here.

class Chat(models.Model):
    participants = models.ManyToManyField('user.User', related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)
    has_messages = models.BooleanField(default=False)

    def get_last_message(self):        
        if not self.has_messages:
            return None
        
        return self.messages.order_by('-timestamp').first()
class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey('user.User', related_name='messages', on_delete=models.CASCADE)
    content = models.TextField(max_length=400)
    timestamp = models.DateTimeField(auto_now_add=True)
    seen_at = models.DateTimeField(null=True, blank=True)

    reply_to_listing = models.ForeignKey(
        'listing.Listing', 
        related_name='replies', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )

    reply_to = models.ForeignKey(
        'self', 
        related_name='replies', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"{self.sender.first_name}: {self.content[:20]}..."