import random
from email.utils import parseaddr

class AuthenticationUtils:
    @staticmethod
    def generate_verification_code() -> str:
        return str(random.randint(100000, 999999))
    
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