from django.urls import path
from .views import CourseViewSet, CourseHomeViewSet, CategoryHomeViewSet

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
    path('categories', CategoryHomeViewSet.as_view({
        'get': 'get_categories',
    })),

    path('home', CourseHomeViewSet.as_view({
        'get': 'course_home_list',
    })),
    # path('course_by_cat', CourseHomeViewSet.as_view({
    #     'get': 'course_query',
    # })),
    path('courses_by_category/<int:category_id>', CourseHomeViewSet.as_view({
        'get': 'courses_by_category',
    })),
]
