from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.decorators import api_view

@api_view(['GET'])
def IsAuth(request):
    if request.user.is_authenticated:
        return Response({"is_auth": True})
    return Response({"is_auth": False})