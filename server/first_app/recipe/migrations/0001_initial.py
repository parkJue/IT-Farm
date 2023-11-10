# Generated by Django 4.2.6 on 2023-11-06 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('recipe_id', models.AutoField(primary_key=True, serialize=False)),
                ('nickname', models.CharField(max_length=100)),
                ('subject', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('photo', models.CharField(max_length=255, null=True)),
                ('regdate', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]