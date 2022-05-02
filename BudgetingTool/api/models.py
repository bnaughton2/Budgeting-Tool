from django.db import models
import uuid
import datetime

# Create your models here.

class User(models.Model):
    userId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(null=False, unique=True)
    password = models.CharField(max_length=255, null=False)
    createdOn = models.DateField(default=datetime.date.today)

class Income(models.Model):
    incomeId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    income = models.TextField(null=False)
    amount = models.DecimalField(null=False, max_digits=15, decimal_places=2)
    isRecurring = models.BooleanField(null=False, default=False)
    date = models.DateField(default=datetime.date.today)
    userId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Bill(models.Model):
    billId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bill = models.TextField(null=False)
    amount = models.DecimalField(null=False, max_digits=15, decimal_places=2)
    isRecurring = models.BooleanField(null=False, default=False)
    dueDate = models.DateField(default=datetime.date.today)
    userId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Goal(models.Model):
    goalId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    goal = models.TextField(null=False)
    amountNeeded = models.DecimalField(null=False, max_digits=15, decimal_places=2)
    monthlyAmount = models.DecimalField(null=False, max_digits=15, decimal_places=2)
    completion = models.DecimalField(null=False, max_digits=4, decimal_places=2, default=0) 
    startDate = models.DateField(default=datetime.date.today)
    endDate = models.DateField(default=datetime.date.today)
    userId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)