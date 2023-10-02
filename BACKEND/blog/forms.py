from django import forms
from .models import Post,BlogUsers


class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ['title', 'text', 'detail', 'image']

class UserForm(forms.ModelForm):
    class Meta:
        model = BlogUsers
        fields = ['date_of_birth','profile_picture','bio']

class ContactForm(forms.Form):
    fullName = forms.CharField(max_length=50,required=True)
    email = forms.EmailField(required=True)
    message = forms.CharField(max_length=200,widget=forms.Textarea)
        