"""
URL configuration for rkediplom project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

# поиск
from modules.search.views import TagJson

from app.drevo.views import *
from app.travel.views import *
from app.wiki.views import *

#Переопределение названий
from django.contrib import admin
admin.site.site_title = "rkediplom"
admin.site.site_header = "rkediplom" 
admin.site.site_url = "/" 

urlpatterns = [
    path('rk_admin/', admin.site.urls),
	path('logout/', views.logout, name='logout'),

    #поиск
    path('hashtag.json', TagJson.as_view()),
    

    path('', views.index,  name='index'),
    
    # path('index', views.index,  name='index'),

    path('', include('app.drevo.urls')),
    path('', include('app.travel.urls')),
    path('', include('app.wiki.urls')),
	
    path("ckeditor5/", include('django_ckeditor_5.urls')),
	
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'rkediplom.views.handler404'
handler500 = 'rkediplom.views.handler500'
handler403 = 'rkediplom.views.handler403'
handler400 = 'rkediplom.views.handler400'


