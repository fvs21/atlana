from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

@shared_task
def send_new_message_email(sender_name: str, receiver_email: str, content: str) -> bool:
    
    subject = f"{sender_name} te ha enviado un mensaje"

    html_message = render_to_string("email/new_message.html", {
        "sender_name": sender_name,
        "message": content
    })

    plain_message = strip_tags(html_message)

    try:
        send_mail(subject, plain_message, "mail@atlana.mx", [receiver_email], html_message=html_message)
        return True
    except Exception as e:
        return False
    
@shared_task
def send_reply_to_listing_email(sender_name: str, receiver_email: str, content: str, listing_name: str) -> bool:
    subject = f"{sender_name} te ha respondido en un anuncio"

    html_message = render_to_string("email/replied_to_listing.html", {
        "sender_name": sender_name,
        "listing_name": listing_name,   
        "message": content
    })

    plain_message = strip_tags(html_message)

    try:
        send_mail(subject, plain_message, "mail@atlana.mx", [receiver_email], html_message=html_message)
        return True
    except Exception as e:
        return False