# Generated by Django 4.0.2 on 2022-04-14 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_income_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='isLoggedIn',
            field=models.BooleanField(default=False),
        ),
    ]
