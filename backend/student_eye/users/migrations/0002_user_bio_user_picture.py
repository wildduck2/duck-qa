# Generated by Django 5.0.13 on 2025-03-14 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.TextField(blank=True, default='', verbose_name='Bio'),
        ),
        migrations.AddField(
            model_name='user',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures', verbose_name='Profile Picture'),
        ),
    ]
