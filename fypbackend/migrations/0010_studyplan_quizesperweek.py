# Generated by Django 4.2.3 on 2023-12-23 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fypbackend', '0009_studyplan_is_completed_studyplan_is_public'),
    ]

    operations = [
        migrations.AddField(
            model_name='studyplan',
            name='QuizesPerWeek',
            field=models.IntegerField(default=1),
        ),
    ]