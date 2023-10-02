# Generated by Django 4.2.3 on 2023-07-20 10:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blog', '0016_alter_blogusers_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogusers',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='bloguser', to=settings.AUTH_USER_MODEL),
        ),
    ]
