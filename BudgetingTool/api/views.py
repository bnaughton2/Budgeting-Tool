from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Income, User
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import IncomeSerializer, CreateIncomeSerializer, CreateUserSerializer
import hashlib

# Create your views here.
class IncomeView(generics.ListAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class CreateIncomeView(APIView):
    serializerClass = CreateIncomeSerializer

    def post(self, request, format=None):
        serializer = self.serializerClass(data=request.data)
        #userResult = User.objects.filter(email=email)
        
        if serializer.is_valid():
            income = serializer.data.get('income')
            amount = serializer.data.get('amount')
            isRecurring = serializer.data.get('isRecurring')
            userId = serializer.data.get('userId')
            user = User.objects.filter(userId=userId)

            income = Income(income=income, amount=amount, isRecurring=isRecurring, userId=user[0])
            income.save()
            return Response(IncomeSerializer(income).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        
        

class CreateUserView(APIView):
    serializerClass = CreateUserSerializer

    def post(self, request, format=None):
        serializer = self.serializerClass(data=request.data)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = User(email=email, password=hashlib.sha256(password.encode()).hexdigest(), isLoggedIn=True)
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
            userResult = User.objects.filter(email=email, password=hashlib.sha256(password.encode()).hexdigest(), isLoggedIn=True)
            if len(userResult) > 0:
                self.request.session['userId'] = str(userResult[0].userId)
                return Response({"User Created":"User has been logged in..."}, status=status.HTTP_200_OK)
            return Response({"Bad Request": "Invalid login credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': "Invalid post data"}, status=status.HTTP_400_BAD_REQUEST)