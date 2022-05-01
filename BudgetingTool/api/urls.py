from django.urls import path
from .views import IncomeView, CreateIncomeView, CreateUserView, LoginView, GetUserIncomesView, GetUserBillsView, CreateBillView
from .views import GetUserGoalsView, CreateGoalView
urlpatterns = [
    path('income', IncomeView.as_view()),
    path('create-income', CreateIncomeView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('login', LoginView.as_view()),
    path('get-incomes', GetUserIncomesView.as_view()),
    path('get-bills', GetUserBillsView.as_view()),
    path('create-bill', CreateBillView.as_view()),
    path('create-goal', CreateGoalView.as_view()),
    path('get-goals', GetUserGoalsView.as_view())
]
