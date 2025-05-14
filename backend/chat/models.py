from django.db import models

# Create your models here.

class Chat(models.Model):
    participants = models.ManyToManyField('user.User', related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)

    def get_last_message(self):        
        return self.messages.order_by('-timestamp').first()

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey('user.User', related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username}: {self.content[:20]}..."