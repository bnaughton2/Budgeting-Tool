from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Income, User
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import IncomeSerializer, CreateIncomeSerializer

# Create your views here.
class IncomeView(generics.ListAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class CreateIncomeView(APIView):
    serializerClass = CreateIncomeSerializer

    def post(self, request, format=None):
        serializer = self.serializerClass(data=request.data)
        if serializer.is_valid():
            income = serializer.data.get('income')
            amount = serializer.data.get('amount')
            isRecurring = serializer.data.get('isRecurring')
            userId = serializer.data.get('userId')
            user = User.objects.filter(userId=userId)
            
            income = Income(income=income, amount=amount, isRecurring=isRecurring, userId=user)
            income.save()
            return Response(IncomeSerializer(income).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)