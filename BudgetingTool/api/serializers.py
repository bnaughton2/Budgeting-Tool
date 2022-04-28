from rest_framework import serializers
from .models import Income, User, Bill, Goal

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
        fields = ('income', 'amount', 'isRecurring')

class CreateBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ('bill', 'amount', 'isRecurring', 'dueDate')
        
class DisplayBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ('billId', 'bill', 'amount', 'isRecurring', 'dueDate')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userId', 'email', 'password', 'createdOn')