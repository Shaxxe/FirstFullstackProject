from django.shortcuts import render
from requests import Response
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def do_logout(request):
    request.user.auth_token.delete()

    return Response({"success": "Successfully logged out."}, status=200)


@api_view(['GET'])
def current_user(request):
    if not request.user.is_anonymous:
        user = request.user
        return Response({
            'username': user.username,
        })
    else:
        return Response({'message': 'User is not authenticated.'}, status=401)

class CustomAuthToken(ObtainAuthToken):

    def auth(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
