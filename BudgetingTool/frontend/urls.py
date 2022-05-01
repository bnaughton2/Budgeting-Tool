from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('income', index),
    path('login', index),
    path('signup', index),
    path('bill', index),
    path('goal', index)
]