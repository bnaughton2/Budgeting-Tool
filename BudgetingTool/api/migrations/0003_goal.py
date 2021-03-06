# Generated by Django 4.0.2 on 2022-05-01 03:28

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_delete_goal'),
    ]

    operations = [
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('goalId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('goal', models.TextField()),
                ('amountNeeded', models.DecimalField(decimal_places=2, max_digits=15)),
                ('monthlyAmount', models.DecimalField(decimal_places=2, max_digits=15)),
                ('isRecurring', models.BooleanField(default=False)),
                ('startDate', models.DateField(default=datetime.date.today)),
                ('endDate', models.DateField(default=datetime.date.today)),
                ('userId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
