from django.contrib import admin
from django.urls import path, include
from .views import AccountViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('user', AccountViewSet.as_view({
        'get': 'user_info'
    })),
    path('logout', AccountViewSet.as_view({
        'post': 'logout'
    })),
    # path('user', user_info, name='user_info'),
    # path('logout', logout, name='logout'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]