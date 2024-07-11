#coding: utf-8

from django.urls import path, re_path
from app.wiki import views


urlpatterns = [
     path('wiki/', views.wiki, name='wiki'),
     path('wiki/<wiki_cat_slug>/', views.wiki_cat, name='wiki_cat'),
	path('wiki/<wiki_cat_slug>/<wiki_slug>/', views.wiki_full, name='wiki_full'),
]
