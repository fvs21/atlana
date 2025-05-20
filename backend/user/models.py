from datetime import timedelta
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

from image.models import Image
from location.models import Location

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, first_name, last_name, password, **extra_fields)
    
class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=35)
    last_name = models.CharField(max_length=35)

    country_code = models.CharField(max_length=3, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)

    email_verified_at = models.DateTimeField(null=True, blank=True)
    phone_verified_at = models.DateTimeField(null=True, blank=True)

    profile_picture = models.OneToOneField(Image, on_delete=models.CASCADE, null=True, blank=True)

    objects = UserManager()

    password_reset_token = models.CharField(max_length=128, null=True, blank=True)
    password_reset_token_created_at = models.DateTimeField(null=True, blank=True)
    password_updated_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password", "first_name", "last_name", "company_name"]

    def profile_picture_url(self):
        base = "http://localhost:8000"
        
        if self.profile_picture:
            return base + self.profile_picture.url
        
        return base + "/api/image/default-pfp.png"
    
    def has_email_verified(self) -> bool:
        return self.email_verified_at is not None
    
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def can_request_password_reset(self) -> bool:
        if self.password_reset_token_created_at is None:
            return True
        
        return self.password_reset_token_created_at + timedelta(minutes=5) <= timezone.now()
    
    def has_user_changed_password_in_the_last_24_hours(self) -> bool:
        if self.password_updated_at is None:
            return False
        
        return self.password_updated_at + timedelta(hours=24) >= timezone.now()
    

class VerificationData(models.Model):
    db_table = "verification_data"

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="verification_data") # add primary key later
    field = models.CharField(choices=[("email", "email"), ("phone", "phone")], max_length=5)
    code = models.CharField(max_length=128) # hashed code
    created_at = models.DateTimeField(auto_now_add=True)

    def set_new_code(self, code: str) -> None:
        self.code = code
        self.created_at = timezone.now()

        self.save()

    def __str__(self) -> str:
        return f"{self.user.first_name}, {self.field}: {self.code}"
    
    def can_request_new_code(self) -> bool:
        return self.created_at + timedelta(seconds=45) <= timezone.now()
    
    def is_code_expired(self) -> bool:
        return self.created_at + timedelta(minutes=5) < timezone.now()
    
class UserInformation(models.Model):
    db_table = "user_information"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="information")
    
    bio = models.TextField(null=True, blank=True)
    major = models.CharField(max_length=50, null=True, blank=True)
    semester = models.SmallIntegerField(null=True, blank=True)

    instagram = models.CharField(max_length=50, null=True, blank=True)