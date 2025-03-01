from rest_framework import exceptions
from rest_framework.views import exception_handler
from django.http import JsonResponse

class DefaultException(exceptions.APIException):
    def __init__(self, detail=None,status_code=None, code=None):
        super().__init__(detail, status_code)
        self.status_code = status_code
        self.code = code


def custom_exception_handler(exc, context):
    if(isinstance(exc, DefaultException)):
        response_data = {
            'code': exc.code,
            'detail': exc.detail,
            'error': True
        }

        return JsonResponse(response_data, status=exc.status_code)

    response = exception_handler(exc, context)
    if response is not None:
        response.data = {
            'error': response.data
        }
        
    return response