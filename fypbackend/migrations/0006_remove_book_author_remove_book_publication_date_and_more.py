# Generated by Django 4.2.3 on 2023-12-09 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fypbackend', '0005_alter_answerspost_isreply_alter_answerspost_parent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='author',
        ),
        migrations.RemoveField(
            model_name='book',
            name='publication_date',
        ),
        migrations.AddField(
            model_name='topic',
            name='order',
            field=models.PositiveIntegerField(null=True),
        ),
    ]