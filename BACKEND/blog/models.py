from django.conf import settings
from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



class Post(models.Model):
    id = models.IntegerField(primary_key=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = RichTextField(blank = True, null=True)
    detail = RichTextField(blank = True, null=True)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    image = models.ImageField(upload_to="test",null=True, blank=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
    
class BlogUsers(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="bloguser")
    bio = models.TextField()
    date_of_birth = models.DateField(blank=True, null=True)
    profile_picture = models.ImageField(default='profile_pictures/default.jpg',upload_to='profile_pictures')

    def __str__(self):
        return self.user.username

