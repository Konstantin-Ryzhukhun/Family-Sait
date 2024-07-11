#coding: utf-8

from django.urls import path, re_path
from app.drevo import views


urlpatterns = [
	path('drevo/api/', views.drevo_api, name='drevo_api'),
    path('drevo/', views.drevo, name='drevo'),
	# path('drevo/drevo_reload/', views.drevo_reload, name='drevo_reload'),
	path('drevo/<drevo_slug>/', views.drevo_full, name='drevo_full'),
]