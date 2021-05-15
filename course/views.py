from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Course
from .serializers import CourseSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['GET'])
def course_list(request):
    print(request.user)
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data, status=200)

@api_view(['POST'])
def create_course(request):
    course_serializer = CourseSerializer(data=request.data)
    if course_serializer.is_valid(raise_exception=True):
        course_serializer.save()
        return Response(course_serializer.data, status=201)
    return Response({}, 400)

@api_view(['GET'])
def get_course(request, course_id):
    qs = Course.objects.filter(id=course_id)
    if not qs:
        return Response({}, status=404)
    obj = qs.first()
    serializer = CourseSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['PUT'])
def update_course(request, course_id):
    qs = Course.objects.filter(id=course_id)
    if not qs:
        return Response({}, status=404)
    obj = qs.first()
    serializer = CourseSerializer(instance=obj, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=200)
    return Response({}, 400)

@api_view(['DELETE'])
def delete_course(request, course_id):
    qs = Course.objects.filter(id=course_id)
    if not qs:
        return Response({}, 404)
    obj = qs.first()
    obj.delete()
    return Response({"Course deleted"}, status=200)