from django.db import models
import uuid

# Create your models here.

class User(models.Model):
    userId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(null=False, unique=True)
    password = models.CharField(max_length=255, null=False)
    createdOn = models.DateTimeField(auto_now_add=True)

class Income(models.Model):
    incomeId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    income = models.TextField(null=False)
    amount = models.DecimalField(null=False, max_digits=15, decimal_places=2)
    isRecurring = models.BooleanField(null=False, default=False)
    date = models.DateTimeField(auto_now_add=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)