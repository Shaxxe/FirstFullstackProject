# Generated by Django 4.2.3 on 2023-07-12 14:45

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_alter_post_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='detail',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]
