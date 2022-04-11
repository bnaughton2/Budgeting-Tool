from django.urls import path
from .views import IncomeView, CreateIncomeView, CreateUserView

urlpatterns = [
    path('income', IncomeView.as_view()),
    path('create-income', CreateIncomeView.as_view()),
    path('create-user', CreateUserView.as_view())
]
