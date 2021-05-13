from django.urls import path
from .views import (user_list, create_user, get_user, update_user, delete_user)

urlpatterns = [
    path('', user_list),
    path('create', create_user),
    path('<int:user_id>', get_user),
    path('update/<int:user_id>', update_user),
    path('delete/<int:user_id>', delete_user)
]
