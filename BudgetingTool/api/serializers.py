from rest_framework import serializers
from .models import Income

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('incomeId', 'income', 'amount', 'isRecurring', 'date', 'userId')

class CreateIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('income', 'amount', 'isRecurring', 'userId')