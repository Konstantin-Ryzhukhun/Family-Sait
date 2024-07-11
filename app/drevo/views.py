# -*- coding: utf-8 -*-
from __future__ import unicode_literals

#авторизация по паролю
from django.contrib.auth.models import User

#авторизация на сайте
from django.contrib import auth
from django.contrib.auth.decorators import login_required

from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponsePermanentRedirect, HttpResponseRedirect

from app.drevo.models import *
from django.contrib import messages
from django.shortcuts import redirect

from django.shortcuts import redirect
from django.shortcuts import get_object_or_404

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

import graphviz

@csrf_exempt
def drevo_api(request):
	if request.method=='GET':
		# BALKANGraph OrgChart JS
		# https://fr-balkangraph.azurewebsites.net/api/OrgChartJS   
		return HttpResponse("BALKANGraph OrgChart JS")
	if request.method=='POST':
		try:
			data = json.loads(request.body)

			# input_data = {
			# 	"n": [
			# 		{"p": [2, null, null, 250, 120], "c": [3, 6], "q": [50, 20, 35, 20], "g": 3, "e": 40},
			# 		{"p": [3, 2, null, 250, 120], "q": [50, 20, 35, 20], "i": 1},
   
			# 		{"p": [6, 2, null, 250, 120], "c": [7, 8], "q": [50, 20, 35, 20], "g": 3, "e": 40},
			# 		{"p": [7, 6, null, 250, 120], "q": [50, 20, 35, 20], "i": 1},
   
			# 		{"p": [8, 6, null, 250, 120], "q": [50, 20, 35, 20]}
			# 	]
			# }
			# FamilyTree.templates.myTemplate.size = [250, 120];
			# 250 и 120 это ширина и высота карточки
			
			# Ваша логика обработки данных
			# print(data)
			# Пример: создание нового словаря с обработанными данными
			processed_data = {}

			r_value = data['r'][0]
			# print(r_value)

			for index, item in enumerate(data['n']):
				# print(item)
				g = item['p'][0]
				g1 = item['p'][3]
				g2 = item['p'][4]
				
				if index < r_value:
					vert = 0
				else:
					# print(index)
					vert = 180 * (index - 1)
				
				gor = 0

				processed_data[str(g)] = {"p":[gor,vert,g1,g2]}
			print(processed_data)


			# return JsonResponse(processed_data)
			
		except json.JSONDecodeError:
			# return JsonResponse({'error': 'Invalid JSON'}, status=400)
			print("жопа")
		
		DrevoConfig = {
			# "2": {
			# 	"p": [
			# 	-290, движение по горизонтали - лево + право
				# 0, движение по вертикали - вверх + вниз
			# 	250,
			# 	120
			# 	]
			# },
   			"2": {
				"p": [
				-290,
				0,
				250,
				120
				]
			},
			"3": {
				"p": [
				0,
				0,
				250,
				120
				]
			},
			"6": {
				"p": [
				-145,
				180,
				250,
				120
				]
			},
			"7": {
				"p": [
				145,
				180,
				250,
				120
				]
			},
			"8": {
				"p": [
				0,
				360,
				250,
				120
				]
			}
		}
		return JsonResponse(DrevoConfig, safe=False)


# @login_required
def drevo(request):

	text = "ГЕНЕАЛОГИЧЕСКОЕ ДЕРЕВО:"

	family_tree = Family_tree.objects.filter(active=True)

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




	response = render(request, 'drevo/index.html', {
		'text':text,
		'family_tree':family_tree,
		'username': username,
		'login_error': login_error, 
	})

	return response

	# response_login = render(request, 'login.html', {
	# 	'text':text,
	# 	'username': username,
	# 	'login_error': login_error, 
	# })

	# if not request.user.is_authenticated:
	# 	return response_login
	# else:
	# 	return response
	




def drevo_full(request, drevo_slug):

	drevo_full = get_object_or_404(Family_tree, drevo_slug=drevo_slug)

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

	response = render(request, 'drevo/drevo_full.html', {
		'drevo_full':drevo_full,
		'username': username,
		'login_error': login_error, 
	})

	return response


	# if not request.user.is_authenticated:
	# 	return HttpResponseRedirect('/')
	# else:
	# 	return response














# def drevo_reload(request):
# 	# Добавляем сообщение об успешном выполнении действия
# 	messages.success(request, "Древо успешно перезагружено.")

# 	# Возвращаемся на предыдущую страницу
# 	return redirect(request.META.get('HTTP_REFERER', 'admin:index'))


# def drevo_reload(request):
# 	nodes = Family_tree.objects.all()
# 	dot = graphviz.Digraph()
	
# 	# for node in nodes:
# 	# 	if node.parent:
# 	# 		dot.edge(str(node.parent.id), str(node.id))
# 	# 	else:
# 	# 		dot.node(str(node.id), label=node.name + " " + node.otchestvo  + " " + node.familiya)


# 	for node in nodes:
# 		# Получаем имя, отчество и фамилию узла
# 		full_name = f"{node.name}\n{node.otchestvo}\n{node.familiya}"

# 		# Если у узла нет родителя, добавляем его как отдельный узел
# 		if not node.parents.exists():
# 			dot.node(str(node.id), label=full_name)
# 		else:
# 			# Если у узла есть родители, добавляем связи к каждому родителю
# 			for parent in node.parents.all():
# 				parent_full_name = f"{parent.name}\n{parent.otchestvo}\n{parent.familiya}"
# 				dot.edge(str(parent.id), str(node.id))


# 	dot.render('/home/profiru/rkediplom/media/family_tree/family_tree_graph', format='png', view=True)

# 	# with open('/home/profiru/rkediplom/media/family_tree/family_tree_graph.png', 'rb') as f:
# 	# 	image_data = f.read()

# 	messages.success(request, "Древо успешно перезагружено.")

# 	# return HttpResponse(image_data, content_type='image/png')
# 	return redirect(request.META.get('HTTP_REFERER', 'admin:index'))





