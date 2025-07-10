from django.http import HttpRequest, HttpResponseRedirect
from django.shortcuts import redirect
from requests import Response
from rest_framework.views import APIView
from ..services import google as google_service
from ..serializers.google import GoogleOAuthCallbackSerializer

class GoogleLoginRedirect(APIView):
    def get(self, request: HttpRequest) -> HttpResponseRedirect:
        authorization_url, state = google_service.get_authorization_url()

        request.session["google_oauth2_state"] = state

        return redirect(authorization_url)
    
class GoogleLoginCallback(APIView):
    def get(self, request: HttpRequest):
        serializer = GoogleOAuthCallbackSerializer(data=request.GET)

        if not serializer.is_valid():
            return Response({"details": serializer.errors}, status=400)
        
        validated_data = serializer.validated_data

        code = validated_data['code']
        state = validated_data['state']
        error = validated_data['error']

        if error:
            return Response({"details": error}, status=400)
        
        if code is None or state is None:
            return Response({"details": "Code and state required"}, status=400)
            