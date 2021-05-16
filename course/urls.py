from django.urls import path
from .views import CourseViewSet

urlpatterns = [
    path('', CourseViewSet.as_view({
        'get': 'course_list',
    })),
    path('create', CourseViewSet.as_view({
        'post': 'create_course'
    })),
    path('<int:course_id>', CourseViewSet.as_view({
        'get': 'get_course'
    })),
    path('update/<int:course_id>', CourseViewSet.as_view({
        'put': 'update_course'
    })),
    path('delete/<int:course_id>', CourseViewSet.as_view({
        'delete': 'delete_course'
    })),
]
