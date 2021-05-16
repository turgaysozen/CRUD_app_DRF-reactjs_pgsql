from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets, status


class UserViewSet(viewsets.ViewSet):
    def user_list(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create_user(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response({"message": "user could not create!"}, status=status.HTTP_400_BAD_REQUEST)

    def get_user(self, request, user_id):
        qs = User.objects.filter(id=user_id)
        if not qs:
            return Response({"message": "user could not find!"}, status=status.HTTP_404_NOT_FOUND)
        obj = qs.first()
        serializer = UserSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update_user(self, request, user_id):
        qs = User.objects.filter(id=user_id)
        if not qs:
            return Response({"message": "user could not find!"}, status=status.HTTP_404_NOT_FOUND)
        obj = qs.first()
        serializer = UserSerializer(instance=obj, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "user could not update!"}, status=status.HTTP_400_BAD_REQUEST)

    def delete_user(self, request, user_id):
        qs = User.objects.filter(id=user_id)
        if not qs:
            return Response({"message": "user could not find!"}, status=status.HTTP_404_NOT_FOUND)
        obj = qs.first()
        obj.delete()
        return Response({"message": "user deleted!"}, status=status.HTTP_200_OK)