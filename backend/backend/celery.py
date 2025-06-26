import os 
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.broker_url = f'redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0'
app.autodiscover_tasks()