from django.urls import path
from .views import IncomeView, CreateIncomeView, CreateUserView, LoginView, GetAllIncomesView

urlpatterns = [
    path('income', IncomeView.as_view()),
    path('create-income', CreateIncomeView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('login', LoginView.as_view()),
    path('get-incomes', GetAllIncomesView.as_view())
]
