# Generated by Django 4.2.6 on 2023-11-06 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("farm_product", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="farm_products",
            name="state",
            field=models.CharField(default="등록대기", max_length=100),
        ),
    ]
