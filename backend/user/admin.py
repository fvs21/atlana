from django.contrib import admin

from .models import User, UserInformation, VerificationData


admin.site.register(User)
admin.site.register(UserInformation)
admin.site.register(VerificationData)