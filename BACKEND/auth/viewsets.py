from rest_framework import viewsets,mixins
from rest_framework.response import Response
from .serializers import RegisterSerializer,BlogUsersSerializer
from blog.models import BlogUsers
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly,AllowAny

class RegisterViewSet(viewsets.ModelViewSet):
    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=201)
        return Response(serializer.errors, status=400)

    
class LogoutViewSet(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    
    
    def destroy(self, request):
        request.user.auth_token.delete()
        return Response({"success": "Successfully logged out."}, status=200)
    
class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = BlogUsersSerializer
    queryset = BlogUsers.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_object(self):
        user = self.request.user.bloguser
        return user
    
