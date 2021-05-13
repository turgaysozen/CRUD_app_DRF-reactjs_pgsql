from django.urls import path
from .views import (course_list, create_course, get_course, update_course, delete_course)

urlpatterns = [
    path('', course_list),
    path('create', create_course),
    path('<int:course_id>', get_course),
    path('update/<int:course_id>', update_course),
    path('delete/<int:course_id>', delete_course)
]
