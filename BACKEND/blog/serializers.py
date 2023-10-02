from rest_framework import serializers
from .models import BlogUsers,Post



class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BlogUsers
        fields =["profile_picture"]

class PostListSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.StringRelatedField()
    class Meta:
        model=Post
        fields=["id","title","text","author","created_date","image"]

class PostDetailSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.StringRelatedField()
    class Meta:
        model=Post
        fields=["id","title","text","detail","author","created_date","image"]   

class BlogCreateSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    image = serializers.ImageField()
    
    class Meta:
        model=Post
        fileds=["id","title","text","detail","author","created_date","image"]
        fields = '__all__'

    def to_internal_value(self, data):
        user = self.context["request"].user
        data["author"] = user.pk
        return super().to_internal_value(data)