from django.urls import path
from .views import UserViewSet

urlpatterns = [
    path('', UserViewSet.as_view({
        'get': 'user_list'
    })),
    path('create', UserViewSet.as_view({
        'post': 'create_user'
    })),
    path('<int:user_id>', UserViewSet.as_view({
        'get': 'get_user'
    })),
    path('update/<int:user_id>', UserViewSet.as_view({
        'put': 'update_user'
    })),
    path('delete/<int:user_id>', UserViewSet.as_view({
        'delete': 'delete_user'
    })),
]
