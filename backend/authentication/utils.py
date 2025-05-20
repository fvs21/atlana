import random
from email.utils import parseaddr
import string

class AuthenticationUtils:
    @staticmethod
    def generate_verification_code() -> str:
        return str(random.SystemRandom().randint(100000, 999999))
    
    @staticmethod
    def is_email(credential: str) -> bool:
        parsed = parseaddr(credential)
        return len(parsed[1])

    @staticmethod
    def is_phone_number(credential: str) -> bool:
        return credential.isnumeric() and len(credential) >= 7
    
    @staticmethod
    def determine_credential_type(credential: str) -> str:
        if AuthenticationUtils.is_email(credential):
            return "email"
        elif AuthenticationUtils.is_phone_number(credential):
            return "phone"
        
        return "username"
    
    @staticmethod
    def generate_reset_password_token() -> str:
        return ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(32))