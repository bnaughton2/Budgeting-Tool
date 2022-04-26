from rest_framework import serializers
from .models import Income, User

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('incomeId', 'income', 'amount', 'isRecurring', 'date', 'userId')
    
class DisplayIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('incomeId', 'income', 'amount', 'isRecurring', 'date')

class CreateIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('income', 'amount', 'isRecurring', 'userId')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userId', 'email', 'password', 'createdOn')