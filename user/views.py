from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import User
from .serializers import UserSerializer

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=200)

@api_view(['POST'])
def create_user(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid(raise_exception=True):
        user_serializer.save()
        return Response(user_serializer.data, status=201)
    return Response({}, 400)

@api_view(['GET'])
def get_user(request, user_id):
    qs = User.objects.filter(id=user_id)
    if not qs:
        return Response({}, status=404)
    obj = qs.first()
    serializer = UserSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['PUT'])
def update_user(request, user_id):
    qs = User.objects.filter(id=user_id)
    if not qs:
        return Response({}, status=404)
    obj = qs.first()
    serializer = UserSerializer(instance=obj, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=200)
    return Response({}, 400)

@api_view(['DELETE'])
def delete_user(request, user_id):
    qs = User.objects.filter(id=user_id)
    if not qs:
        return Response({}, 404)
    obj = qs.first()
    obj.delete()
    return Response({"User deleted"}, status=200)