# Generated by Django 4.2.3 on 2024-01-25 06:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fypbackend', '0016_studyplan_similarity_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studyplan',
            name='similarity_score',
        ),
    ]