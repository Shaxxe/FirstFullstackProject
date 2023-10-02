from rest_framework import serializers
from blog.models import Post,BlogUsers
from django.contrib.auth.models import User
from django.forms import ValidationError


class BlogUsersSerializer(serializers.HyperlinkedModelSerializer):    
    class Meta:
        model = BlogUsers
        fields = ('bio',"date_of_birth","profile_picture")

    def validate_bio(self, data):
        if len(data) < 10:
            raise ValidationError("Bio çok kısa")
        return data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'] 
        )
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  

class ApiUserSerializer(serializers.HyperlinkedModelSerializer):
    bloguser = BlogUsersSerializer()
    class Meta:
        model = User
        fields = ['username', 'url', 'email', 'groups',"bloguser"]

    def update(self, instance, validated_data):
        bloguser = validated_data.pop("bloguser")
        print("bloguser",bloguser)
        bloguser_serializer = BlogUsersSerializer(data=bloguser,instance=instance.bloguser)
        if bloguser_serializer.is_valid():
            bloguser_serializer.save()
        return super().update(instance, validated_data)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    bloguser = BlogUsersSerializer()

    class Meta:
        model = User
        fields = ['username', 'url', 'email', 'groups', 'bloguser']

    def update(self, instance, validated_data):
        bloguser_data = validated_data.pop("bloguser")

        bloguser_instance = instance.bloguser

        bloguser_instance.bio = bloguser_data.get('bio', bloguser_instance.bio)
        bloguser_instance.date_of_birth = bloguser_data.get('date_of_birth', bloguser_instance.date_of_birth)
        bloguser_instance.profile_picture = bloguser_data.get('profile_picture', bloguser_instance.profile_picture)
        bloguser_instance.save()

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        return instance