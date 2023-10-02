from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import BlogCreateSerializer
from .models import Post
from .serializers import PostDetailSerializer, PostListSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostListSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return super().get_serializer_class()
        else:
            return PostDetailSerializer

    def create(self, request, *args, **kwargs):
        if not request.user.is_anonymous:
            serializer = BlogCreateSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("Invalid user", status=status.HTTP_400_BAD_REQUEST)
