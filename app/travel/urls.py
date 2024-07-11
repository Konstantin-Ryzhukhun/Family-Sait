#coding: utf-8

from django.urls import path, re_path
from app.travel import views


urlpatterns = [
     path('travel/', views.travel, name='travel'),
]