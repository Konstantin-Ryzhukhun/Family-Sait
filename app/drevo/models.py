# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils.safestring import mark_safe
from django import forms
from django.forms.widgets import NumberInput

from django_ckeditor_5.fields import CKEditor5Field
from sorl.thumbnail import get_thumbnail

class Family_tree(models.Model):
	GENDER_CHOICES = (
		('male', 'Мужчина'),
		('female', 'Женщина'),
	)
	name = models.CharField(u'Имя', max_length=255, null=True, blank=True)
	otchestvo = models.CharField(u'Отчество', max_length=255, null=True, blank=True)
	familiya = models.CharField(u'Фамилия', max_length=255, null=True, blank=True)
	image = models.ImageField (verbose_name='Фотография', upload_to='family_tree',  null=True, blank=True)
	parent = models.ForeignKey('Family_tree', on_delete=models.SET_NULL, null=True, blank=True)

	country = models.CharField(u'Страна', max_length=255, null=True, blank=True)
	city = models.CharField(u'Город', max_length=255, null=True, blank=True)
	phone = models.CharField(u'Телефон', max_length=255, null=True, blank=True)

	drevo_slug = models.SlugField(unique=True, max_length=255,  verbose_name='Url', db_index=True)

	opisanie_full = CKEditor5Field(verbose_name='Описание',default='', config_name='extends', null=True, blank=True)
	# parent = models.ForeignKey('self',blank=True, null=True ,related_name='children', verbose_name="Родитель", db_index=True, on_delete=models.CASCADE,)

	parents = models.ManyToManyField('Family_tree', verbose_name='Партнеры', blank=True, symmetrical=False, related_name='children')
	parents_m = models.ManyToManyField('Family_tree', verbose_name='Мать', blank=True, symmetrical=False, related_name='mother')
	parents_f = models.ManyToManyField('Family_tree', verbose_name='Отец', blank=True, symmetrical=False, related_name='father')

	gender = models.CharField(verbose_name='Пол',max_length=10, choices=GENDER_CHOICES, null=True, blank=True)

	date1 = models.DateField(u'Дата рождения', null=True, blank=True, )
	date2 = models.DateField(u'Дата смерти', null=True, blank=True, )


	active = models.BooleanField(default=True,verbose_name='Активность',)
	created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name="Дата")
	updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated at")


	def __str__(self):
		if self.familiya and self.name and self.otchestvo:
			return f"{self.familiya} {self.name} {self.otchestvo}"
		elif self.familiya and self.name:
			return f"{self.familiya} {self.name}"
		elif self.name and self.otchestvo:
			return f"{self.name} {self.otchestvo}"
		elif self.name:
			return self.name
		else:
			return str(self.id)


	
	def get_absolute_url(self):
		return "/drevo/%s/" % (self.drevo_slug)

	def fullname(self):			
		if self.familiya and self.name and self.otchestvo:
			return f"{self.familiya} {self.name} {self.otchestvo}"
		elif self.familiya and self.name:
			return f"{self.familiya} {self.name}"
		elif self.name and self.otchestvo:
			return f"{self.name} {self.otchestvo}"
		elif self.name:
			return self.name
		else:
			return str(self.id)
		
		
	def familiya_pr(self):
		if self.familiya:
			return self.familiya
		else:
			return ''

	def name_pr(self):
		if self.name:
			return self.name
		else:
			return ''
		
	def otchestvo_pr(self):
		if self.otchestvo:
			return self.otchestvo
		else:
			return ''

	def fulldata(self) -> str:
		if self.date2:
			formatted_date1 = self.date1.strftime("%d.%m.%Y")
			formatted_date2 = self.date2.strftime("%d.%m.%Y")
			return f"{formatted_date1} - {formatted_date2}"
		else:
			formatted_date1 = self.date1.strftime("%d.%m.%Y")
			return f"{formatted_date1}"



	class Meta:
		verbose_name = "Генеалогическое Дерево"
		verbose_name_plural = "Генеалогическое Дерево"
		ordering = ('created_at', )


	# картинка в админке
	def image_img(self,):
		if self.image:
			return mark_safe('<a href="{0}" target="_blank"><img src="{0}" width="100" /></a>' .format(self.image.url))
		else:
			return '(Нет изображения)'
	image_img.short_description = 'Фотография'



	# уменьшенная копия для древа
	def get_img_tovar_thumbnail(self):
		if self.image:
			a = self.image
			im = get_thumbnail(a, '150x150', format="WEBP", crop='center', )
			im2 = "/media/"+str(im)
			return str(im2)
		else:
			pass

	def image_tree(self):
		if self.image:
			a = self.image
			im = get_thumbnail(a, '70x70', format="WEBP", crop='center', )
			return str(im)
		else:
			pass




class Family_tree_files(models.Model):
	people = models.ForeignKey(Family_tree, verbose_name='Выбранные файлы', blank=True, null=True ,  on_delete=models.SET_NULL, related_name='family_tree_files')

	name = models.CharField(verbose_name='Название файла', max_length=255, blank=True, null=True, )
	file = models.FileField(verbose_name='Файл', upload_to= 'family_tree_files',  null=True, blank=True)

	created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name="Created at")
	updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated at")
	
	class Meta:
		verbose_name = "Документы, файлы"
		verbose_name_plural = "Документы, файлы"
		ordering = ["-created_at"]

	def __str__(self):
		return f"{self.name}"


class Family_tree_images(models.Model):
	people = models.ForeignKey(Family_tree, verbose_name='Выбранные фотографии', blank=True, null=True ,  on_delete=models.SET_NULL, related_name='family_tree_images')

	image = models.ImageField (verbose_name='Фотография', upload_to='family_tree_images2',  null=True, blank=True)

	created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name="Created at")
	updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated at")
	
	class Meta:
		verbose_name = "Изображения"
		verbose_name_plural = "Изображения"
		ordering = ["-created_at"]

	def __str__(self):
		return f"{self.id}"