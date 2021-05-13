from django.contrib import admin
from django.urls import path, include
from .views import IsAuth

urlpatterns = [
    path('auth', IsAuth, name='auth')
]