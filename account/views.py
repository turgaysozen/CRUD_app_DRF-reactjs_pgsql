from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

@api_view(['GET'])
def user_info(request):
    return Response({"user": request.user.username})
    
@api_view(['POST'])
def logout(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST) 
