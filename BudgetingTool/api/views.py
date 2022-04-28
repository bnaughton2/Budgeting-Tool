from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Income, User, Bill, Goal
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import IncomeSerializer, CreateIncomeSerializer, CreateUserSerializer, DisplayIncomeSerializer, DisplayBillSerializer, CreateBillSerializer
import hashlib

# Create your views here.
class IncomeView(generics.ListAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class GetUserIncomesView(APIView):
    serializerClass = DisplayIncomeSerializer

    def get(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            incomes = Income.objects.filter(userId=userId)
            data = IncomeSerializer(incomes, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)

class GetUserBillsView(APIView):
    serializerClass = DisplayBillSerializer

    def get(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            bills = Bill.objects.filter(userId=userId)
            data = DisplayBillSerializer(bills, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class CreateBillView(APIView):
    serializerClass = CreateBillSerializer

    def post(self, request, format=None):
        serializer = self.serializerClass(data=request.data)
        
        if serializer.is_valid():
            bill = serializer.data.get('bill')
            amount = serializer.data.get('amount')
            isRecurring = serializer.data.get('isRecurring')
            dueDate = serializer.data.get('dueDate')
            userId = request.session.get('userId')
            if userId != None:
                user = User.objects.filter(userId=userId)

                bill = Bill(bill=bill, amount=amount, isRecurring=isRecurring, dueDate=dueDate, userId=user[0])
                bill.save()
                return Response(CreateBillSerializer(bill).data, status=status.HTTP_201_CREATED)
            return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CreateIncomeView(APIView):
    serializerClass = CreateIncomeSerializer

    def post(self, request, format=None):
        serializer = self.serializerClass(data=request.data)
        
        if serializer.is_valid():
            income = serializer.data.get('income')
            amount = serializer.data.get('amount')
            isRecurring = serializer.data.get('isRecurring')
            userId = request.session.get('userId')
            if userId != None:
                user = User.objects.filter(userId=userId)

                income = Income(income=income, amount=amount, isRecurring=isRecurring, userId=user[0])
                income.save()
                return Response(IncomeSerializer(income).data, status=status.HTTP_201_CREATED)
            return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Bad Data...'}, status=status.HTTP_400_BAD_REQUEST)
        
        

class CreateUserView(APIView):
    serializerClass = CreateUserSerializer

    def post(self, request, format=None):
        serializer = self.serializerClass(data=request.data)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = User(email=email, password=hashlib.sha256(password.encode()).hexdigest())
            user.save()
            userResult = User.objects.filter(email=email, password=hashlib.sha256(password.encode()).hexdigest())
            self.request.session['userId'] = str(userResult[0].userId)
            return Response({"User Created":"User has been created..."}, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        email = request.data.get('email')
        password = request.data.get('password')
        if email != None and password != None:
            userResult = User.objects.filter(email=email, password=hashlib.sha256(password.encode()).hexdigest())
            if len(userResult) > 0:
                self.request.session['userId'] = str(userResult[0].userId)
                return Response({"User Created":"User has been logged in..."}, status=status.HTTP_200_OK)
            return Response({"Bad Request": "Invalid login credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': "Invalid post data"}, status=status.HTTP_400_BAD_REQUEST)