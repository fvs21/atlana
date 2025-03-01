from backend.exceptions import DefaultException


class ImageUploadException(DefaultException):
    code: str = "image_upload_failed"

    def __init__(self, detail=None, status_code=400):
        super().__init__(detail, status_code, self.code)