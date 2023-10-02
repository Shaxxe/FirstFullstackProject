from django.contrib import admin
from django.urls import path
from auth.views import CustomAuthToken
from blog import views as blogviews
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from rest_framework import routers
from auth.viewsets import RegisterViewSet,UserProfileViewSet
from blog.viewset import BlogPostViewSet
from auth import views as authviews



routerapi = routers.DefaultRouter()
routerapi.register(r'users', blogviews.UserViewSet)
routerapi.register(r'profile-pictures', blogviews.ImageViewSet)
routerapi.register(r'post',BlogPostViewSet,basename="blogList")


routerauth = routers.DefaultRouter()
routerauth.register(r'register', RegisterViewSet,basename="register")
routerauth.register(r'profilevalues', UserProfileViewSet,basename="profilevalues")



routersite = routers.DefaultRouter()
routersite.register(r'create', BlogPostViewSet,basename="blogCreate")


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', blogviews.post_list, name='post_list'),
    path('auth/',include(routerauth.urls)),
    path('site/', include(routersite.urls)),
    path('post/<int:pk>/', blogviews.post_detail, name='post_detail'),
    path('post/new/', blogviews.post_new, name='post_new'),
    path('accounts/', include('allauth.urls')),
    path('profile/', blogviews.profile, name='profile'),
    path("articles/<int:year>", blogviews.month_archive, name='blog_by_year_month'),
    path('api/', include(routerapi.urls)),
    path('user/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('currentuser/', authviews.current_user, name='user'),
    path('logout/', authviews.do_logout, name='user'),






] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

