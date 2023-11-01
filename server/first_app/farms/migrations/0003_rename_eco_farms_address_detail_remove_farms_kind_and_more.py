# Generated by Django 4.2.6 on 2023-11-01 00:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("farms", "0002_farms_created_at_farms_updated_at"),
    ]

    operations = [
        migrations.RenameField(
            model_name="farms",
            old_name="eco",
            new_name="address_detail",
        ),
        migrations.RemoveField(
            model_name="farms",
            name="kind",
        ),
        migrations.AddField(
            model_name="farms",
            name="mail_number",
            field=models.IntegerField(default=0),
        ),
    ]