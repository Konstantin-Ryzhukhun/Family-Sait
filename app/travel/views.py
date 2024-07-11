# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from .models import *

#авторизация по паролю
from django.contrib.auth.models import User

#авторизация на сайте
from django.contrib import auth
from django.contrib.auth.decorators import login_required

from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponsePermanentRedirect, HttpResponseRedirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.shortcuts import redirect
from django.shortcuts import get_object_or_404

# @login_required
def travel(request):

	travel = TravelCart.objects.filter(active=True).order_by('-date2')

	# авторизация под админом
	username = auth.get_user(request).username
	login_error = ''
	if request.method=='POST' and 'autorization' in request.POST:
		username = request.POST.get('username',)
		password = request.POST.get('password',)
		user = auth.authenticate(username=username, password=password)
		if user is not None:
			auth.login(request, user)
			return HttpResponseRedirect('/')
		else:
			login_error = 'Пользователь не найден'

	response = render(request, 'travel/index.html', {
		'travel':travel,
		'username': username,
		'login_error': login_error, 
	})

	# if not request.user.is_authenticated:
	# 	return HttpResponseRedirect('/')
	# else:
	# 	return response

	return response