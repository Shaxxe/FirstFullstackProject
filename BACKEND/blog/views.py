from django.core.paginator import Paginator
from requests import Response
from .models import Post,BlogUsers
from django.utils import timezone
from .forms import PostForm,UserForm,ContactForm
from django.shortcuts import redirect, render, get_object_or_404
from django.db.models.functions import TruncYear,TruncMonth
from django.db.models import Count
from rest_framework import viewsets,permissions,status
from .serializers import ImageSerializer
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from auth.serializers import ApiUserSerializer




def post_list(request, year=None, month=None):
    months = None
    form=ContactForm()       
    if year:
        posts = Post.objects.filter(published_date__year=year)
    else:
        posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')

    years = Post.objects.annotate(year=TruncYear("published_date")).values("year").annotate(num=Count("id"))
    paginator = Paginator(posts, 10)
    page_number = request.GET.get("page", 0)
    print(page_number)
    page_obj = paginator.get_page(page_number)

    if request.method =='POST':
        form=ContactForm(request.POST)
        if form.is_valid():
            fullName =  form.cleaned_data['fullName']
            email = form.cleaned_data['email']
            message =  form.cleaned_data['message']

            html = render_to_string('contactform.html',{'fullName' : fullName, 'email' : email, 'message' : message,})

            send_mail(fullName, message, email, ['muratozturk3734@hotmail.com'], html_message=html)
        else:
            form=ContactForm()       

    return render(request, 'post_list.html', {"page_obj": page_obj, "years": years, "months": months, 'form': form})

def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            print(post.author)
            return redirect('post_list')
    else:
        form = PostForm()
        return render(request, 'post_edit.html', {'form': form})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    Post.objects.get(pk=pk)
    return render(request, 'post_detail.html', {'post': post})  


def profile(request):
    user = request.user
    try:
        blog_user = BlogUsers.objects.get(user=user)
    except BlogUsers.DoesNotExist:
        blog_user = None

    context = {"user": user, "blog_user": blog_user}

    if request.method == "POST":
        form = UserForm(request.POST, request.FILES, instance=blog_user)
        if form.is_valid():
            form.save()
            return render(request, template_name='profile.html', context=context)
    else:
        form = UserForm(instance=blog_user)
        context["form"] = form

    return render(request, template_name='profile.html', context=context)




def month_archive(request, year,):
    posts = Post.objects.filter(published_date__year=year,)
    months = posts.annotate(month=TruncMonth("published_date")).values("month").annotate(num=Count("id"))


    print(year)
    context = {'posts': posts,"months": months,"year":year}
    return render(request, 'month_archive.html', context)




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = ApiUserSerializer
    permission_classes = [permissions.AllowAny ]

class ImageViewSet(viewsets.ModelViewSet):
    queryset = BlogUsers.objects.all().order_by('-user__date_joined')
    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly ]

