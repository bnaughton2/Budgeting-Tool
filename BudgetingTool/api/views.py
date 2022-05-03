from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Income, User, Bill, Goal
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import IncomeSerializer, CreateIncomeSerializer, CreateUserSerializer, DisplayIncomeSerializer, DisplayBillSerializer, CreateBillSerializer
from .serializers import DisplayGoalSerializer, CreateGoalSerializer
import hashlib
import datetime
from django.db.models import Q
from datetime import date, datetime
import json

# Create your views here.
class IncomeView(generics.ListAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer


class DeleteIncomeView(APIView):
    serializerClass = DisplayIncomeSerializer

    def delete(self, request, format=None):
        incomeId = request.data.get('incomeId')
        if incomeId != None:
            income = Income.objects.filter(incomeId=incomeId).delete()
            return Response({'Success': 'Row Deleted'}, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserIncomesView(APIView):
    serializerClass = DisplayIncomeSerializer

    def get(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            incomes = Income.objects.filter(userId=userId)
            data = IncomeSerializer(incomes, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserIncomesByMonthView(APIView):
    serializerClass = DisplayIncomeSerializer

    def post(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            date = request.data.get('date')
            date = datetime.strptime(date, '%Y-%m')
            incomes = Income.objects.filter(userId=userId, isRecurring=True, date__year__lte=date.year, date__month__lte=date.month) | Income.objects.filter(userId=userId, date__year=date.year, date__month=date.month)
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


class GetUserBillsByMonthView(APIView):
    serializerClass = DisplayBillSerializer

    def post(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            date = request.data.get('date')
            date = datetime.strptime(date, '%Y-%m')
            bills = Bill.objects.filter(userId=userId, isRecurring=True, dueDate__year__lte=date.year, dueDate__month__lte=date.month) | Bill.objects.filter(userId=userId, dueDate__year=date.year, dueDate__month=date.month)
            data = DisplayBillSerializer(bills, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserGoalsView(APIView):
    serializerClass = DisplayGoalSerializer

    def get(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            goals = Goal.objects.filter(userId=userId)
            for goal in goals:
                monthlyAmount = goal.__dict__['monthlyAmount']
                amountNeeded = goal.__dict__['amountNeeded']
                today = date.today()
                numMonths = (today.year - goal.__dict__['startDate'].year) * 12 + (today.month - goal.__dict__['startDate'].month)
                goal.__dict__['completion'] = round(((numMonths * monthlyAmount) / amountNeeded)  * 100)
            data = DisplayGoalSerializer(goals, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserGoalsByMonthView(APIView):
    serializerClass = DisplayGoalSerializer

    def post(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            date = request.data.get('date')
            date = datetime.strptime(date, '%Y-%m')
            # goals =  Goal.objects.filter(userId=userId, startDate__year__lte=date.year, startDate__month__lte=date.month, endDate__year__gte=date.year, endDate__month__gte=date.month)
            goals =  Goal.objects.filter(userId=userId, startDate__lte=date, endDate__gte=date)
            for goal in goals:
                monthlyAmount = goal.__dict__['monthlyAmount']
                amountNeeded = goal.__dict__['amountNeeded']
                today = date.today()
                numMonths = (today.year - goal.__dict__['startDate'].year) * 12 + (today.month - goal.__dict__['startDate'].month)
                goal.__dict__['completion'] = round(((numMonths * monthlyAmount) / amountNeeded)  * 100)
            data = DisplayGoalSerializer(goals, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserIncomesAmount(APIView):
    def post(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            date = request.data.get('date')
            date = datetime.strptime(date, '%Y-%m')
            incomes = Income.objects.filter(userId=userId, isRecurring=True, date__year__lte=date.year, date__month__lte=date.month) | Income.objects.filter(userId=userId, date__year=date.year, date__month=date.month)
            totalAmount = 0
            for income in incomes:
                amount = income.__dict__['amount']
                totalAmount = totalAmount + amount
            x = {"amount": float(totalAmount)}
            return Response(json.dumps(x), status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserBillsAmount(APIView):
    def post(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            date = request.data.get('date')
            date = datetime.strptime(date, '%Y-%m')
            bills = Bill.objects.filter(userId=userId, isRecurring=True, dueDate__year__lte=date.year, dueDate__month__lte=date.month) | Bill.objects.filter(userId=userId, dueDate__year=date.year, dueDate__month=date.month)
            totalAmount = 0
            for bill in bills:
                amount = bill.__dict__['amount']
                totalAmount = totalAmount + amount
            x = {"amount": float(totalAmount)}
            return Response(json.dumps(x), status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserGoalsAmount(APIView):
    def post(self, request, format=None):
        userId = request.session.get('userId')
        if userId != None:
            date = request.data.get('date')
            date = datetime.strptime(date, '%Y-%m')
            # goals =  Goal.objects.filter(userId=userId, startDate__year__lte=date.year, startDate__month__lte=date.month, endDate__year__gte=date.year, endDate__month__gte=date.month)
            goals =  Goal.objects.filter(userId=userId, startDate__lte=date, endDate__gte=date)
            totalAmount = 0
            for goal in goals:
                monthlyAmount = goal.__dict__['monthlyAmount']
                today = date.today()
                numMonths = (today.year - goal.__dict__['startDate'].year) * 12 + (today.month - goal.__dict__['startDate'].month)
                totalAmount = totalAmount + (numMonths * monthlyAmount)
            x = {"amount": float(totalAmount)}
            return Response(json.dumps(x), status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)


class CreateGoalView(APIView):
    serializerClass = CreateGoalSerializer

    def post(self, request, format=None):
        serializer = self.serializerClass(data=request.data)
        
        if serializer.is_valid():
            goal = serializer.data.get('goal')
            amountNeeded = serializer.data.get('amountNeeded')
            monthlyAmount = serializer.data.get('monthlyAmount')
            startDate = serializer.data.get('startDate')
            endDate = serializer.data.get('endDate')
            userId = request.session.get('userId')
            if userId != None:
                user = User.objects.filter(userId=userId)

                goal = Goal(goal=goal, monthlyAmount=monthlyAmount, amountNeeded=amountNeeded, startDate=startDate, endDate=endDate, userId=user[0])
                goal.save()
                return Response(CreateGoalSerializer(goal).data, status=status.HTTP_201_CREATED)
            return Response({'Bad Request': 'Not logged in...'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Bad Data...'}, status=status.HTTP_400_BAD_REQUEST)


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
        return Response({'Bad Request': 'Bad Data...'}, status=status.HTTP_400_BAD_REQUEST)


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
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


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