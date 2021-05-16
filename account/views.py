from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, viewsets


class AccountViewSet(viewsets.ViewSet):
    def user_info(self, request):
        return Response({"user": request.user.username})
        
    def logout(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST) 
