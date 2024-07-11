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
def wiki(request):

	wiki_cat_all = Wiki_cat.objects.all().order_by('nomer_id')
	tasks = Tasks.objects.filter(active=True)

	paginator = Paginator(tasks, 30)
	page = request.GET.get('page')
	try:
		tasks = paginator.page(page)
	except PageNotAnInteger:
		tasks = paginator.page(1)
	except EmptyPage:
		tasks = paginator.page(paginator.num_pages)


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

	response = render(request, 'wiki/index.html', {
		'wiki_cat_all':wiki_cat_all,
		'tasks':tasks,
		'username': username,
		'login_error': login_error, 
	})

	# if not request.user.is_authenticated:
	# 	return HttpResponseRedirect('/')
	# else:
	# 	return response
	return response

	

# @login_required
def wiki_cat(request, wiki_cat_slug):


	wiki_cat_all = Wiki_cat.objects.all().order_by('nomer_id')

	wiki_cat = get_object_or_404(Wiki_cat, wiki_cat_slug=wiki_cat_slug)
	tasks = Tasks.objects.filter(active=True, kurs_cat=wiki_cat)


	paginator = Paginator(tasks, 30)
	page = request.GET.get('page')
	try:
		tasks = paginator.page(page)
	except PageNotAnInteger:
		tasks = paginator.page(1)
	except EmptyPage:
		tasks = paginator.page(paginator.num_pages)

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

	response = render(request, 'wiki/wiki_cat.html', {
		'wiki_cat_all':wiki_cat_all,
		'wiki_cat':wiki_cat,
		'tasks':tasks,
		'username': username,
		'login_error': login_error, 
	})


	# if not request.user.is_authenticated:
	# 	return HttpResponseRedirect('/')
	# else:
	# 	return response
	return response
	

def wiki_full(request, wiki_cat_slug, wiki_slug):

	wiki_cat_all = Wiki_cat.objects.all().order_by('nomer_id')

	wiki_full = get_object_or_404(Tasks, wiki_slug=wiki_slug)

	tasks = Tasks.objects.filter(active=True, kurs_cat__id=wiki_full.kurs_cat.id).order_by('?').distinct()[:8]

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

	response = render(request, 'wiki/wiki_full.html', {
		'wiki_cat_all':wiki_cat_all,
		'wiki_full':wiki_full,
		'tasks':tasks,
		'username': username,
		'login_error': login_error, 
	})


	# if not request.user.is_authenticated:
	# 	return HttpResponseRedirect('/')
	# else:
	# 	return response
	return response