# Generated by Django 4.2.6 on 2023-11-06 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("product", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="sale_price",
            field=models.IntegerField(null=True),
        ),
    ]
