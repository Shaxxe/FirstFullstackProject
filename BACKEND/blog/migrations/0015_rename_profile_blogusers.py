# Generated by Django 4.2.3 on 2023-07-17 13:28

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blog', '0014_rename_users_profile'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Profile',
            new_name='BlogUsers',
        ),
    ]
