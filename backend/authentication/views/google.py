from django.http import HttpRequest, HttpResponseRedirect
from django.shortcuts import redirect
from requests import Response
from rest_framework.views import APIView

from authentication.utils.google import GoogleAccessTokens
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
            return Response({"details": serializer.errors, "error": True}, status=400)
        
        validated_data = serializer.validated_data

        code = validated_data.get("code", None)
        state = validated_data.get("state", None)
        error = validated_data.get("error", None)

        if error:
            return Response({"details": error, "error": True}, status=400)
        
        if code is None or state is None:
            return Response({"details": "Code and state required", "error": True}, status=400)
        
        session_state = request.session.get("google_oauth2_state")

        del request.session["google_oauth2_state"]

        if state != session_state:
            return Response({"details": "CSRF check failed.", "error": True}, status=400)
        
        google_tokens: GoogleAccessTokens = google_service.get_tokens(code=code)

        decoded_id_token = google_tokens.decode_id_token() #This dictionary contains all of the user's information

        user = google_service.get_or_create_google_user(user_info=decoded_id_token)

        return google_service.generate_authentication_response(user)