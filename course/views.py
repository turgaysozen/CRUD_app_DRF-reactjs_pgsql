from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Course
from .serializers import CourseSerializer, CourseByCategory, CategorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets, status
from .models import Course, Category

class CourseViewSet(viewsets.ViewSet):
    def course_list(self, request):
        courses = Course.objects.all()
        serializer = CourseByCategory(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create_course(self, request):
        # course_serializer = CourseSerializer(data=request.data)
        course_serializer = CourseByCategory(data=request.data)
        if course_serializer.is_valid(raise_exception=True):
            course_serializer.save()
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        return Response({"message": "course could not create!"}, status=status.HTTP_400_BAD_REQUEST)

    def get_course(self, request, course_id):
        qs = Course.objects.filter(id=course_id)
        if not qs:
            return Response({"message": "course could not find!"}, status=status.HTTP_404_NOT_FOUND)
        obj = qs.first()
        serializer = CourseByCategory(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update_course(self, request, course_id):
        qs = Course.objects.filter(id=course_id)
        if not qs:
            return Response({"message": "course could not find!"}, status=status.HTTP_404_NOT_FOUND)
        obj = qs.first()
        serializer = CourseByCategory(instance=obj, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"message": "course could not update!"}, status=status.HTTP_400_BAD_REQUEST)

    def delete_course(self, request, course_id):
        qs = Course.objects.filter(id=course_id)
        if not qs:
            return Response({"message": "course could not find!"}, status=status.HTTP_404_NOT_FOUND)
        obj = qs.first()
        obj.delete()
        return Response({"message": "course deleted!"}, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ViewSet):
    def get_categories(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CourseHomeViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def course_home_list(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def course_query(self, request):
        course_by_category = Course.objects.filter()
        serializer = CourseByCategory(course_by_category, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
