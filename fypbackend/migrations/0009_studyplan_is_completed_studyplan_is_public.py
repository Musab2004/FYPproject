# Generated by Django 4.2.3 on 2023-12-11 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fypbackend', '0008_rename_current_academic_level_studyplan_academic_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='studyplan',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='studyplan',
            name='is_public',
            field=models.BooleanField(default=False),
        ),
    ]