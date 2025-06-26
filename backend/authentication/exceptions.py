from backend.exceptions import DefaultException


class UserDoesNotExistException(DefaultException):
    code = "user_does_not_exist"

    def __init__(self):
        super().__init__("El usuario que buscas no existe", 404, self.code)

class RefreshTokenBlacklistedException(DefaultException):
    code = "refresh_token_blacklisted"

    def __init__(self):
        super().__init__("Refresh token has been blacklisted", 409, self.code)

class RefreshTokenMissingException(DefaultException):
    code = "refresh_token_missing"

    def __init__(self):
        super().__init__("No refresh token found", 400, self.code)

class VerificationCodeExpiredException(DefaultException):
    code = "verification_code_expired"

    def __init__(self):
        super().__init__("Verification code expired", 400, self.code)

class UserAlreadyVerifiedException(DefaultException):
    code = "user_already_verified"

    def __init__(self, field: str):
        super().__init__(field, 400, self.code)

class VerificationConflictException(DefaultException):
    code = "verification_conflict"

    def __init__(self, field: str, detail="User has already verified"):
        super().__init__(f"{detail} {field}", 409, self.code)

class PhoneNumberAlreadyUsedException(DefaultException):
    code = "phone_number_used"

    def __init__(self):
        super().__init__("Phone number already in use", 409, self.code)

class UserAlreadyChangedPasswordException(DefaultException):
    code = "user_already_changed_password"

    def __init__(self):
        super().__init__("User has already changed password", 429, self.code)


class EmailError(DefaultException):
    code = "unexecpected_email_error"

    def __init__(self, detail: str):
        super().__init__(detail, 500, self.code)