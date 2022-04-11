from rest_framework import serializers
from .models import Income, User

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('incomeId', 'income', 'amount', 'isRecurring', 'date', 'userId')

class CreateIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('income', 'amount', 'isRecurring', 'userId')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')