from rest_framework import serializers
from .models import Course, Category
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.forms import ValidationError


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'price', 'duration', 'video_id', 'created'] 


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name'] 


class CourseByCategory(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many=True) # shows category names instead of category id
    # categories = CategorySerializer(many=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'price', 'created', 'duration', 'video_id','categories'] 

    def to_internal_value(self, value):
        return value

