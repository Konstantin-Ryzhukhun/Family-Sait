# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from datetime import datetime
from django.utils import timezone

from django_ckeditor_5.fields import CKEditor5Field

#картинка в админке
from django.utils.safestring import mark_safe

import re



class TravelCart(models.Model):
	name_block = models.CharField(u'Название', max_length=255, unique=False, null=False, blank=False)
	opisanie = CKEditor5Field(verbose_name='Описание',default='', config_name='extends')

	date1 = models.CharField(u'Дата в кружке', max_length=255, unique=False, null=False, blank=False)
	date2 = models.DateField(default='', null=True, blank=True, verbose_name="Дата",)

	img_tovar = models.ImageField (u'Картинка', upload_to='img_tovar',  null=True, blank=True, max_length=255)
	video = models.CharField(u'Ссылка на видео(https://youtu.be/)', max_length=255,  null=True, blank=True)
	video2 = models.CharField(u'Ссылка на видео(/media/video/)', max_length=255,  null=True, blank=True)

	active = models.BooleanField(default=True,verbose_name='Активность',)
	created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name="Created at")
	updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated at")
	template_name = models.CharField(
		('Выбор шаблона'),
		max_length=70,
		blank=True,
	)

	def __str__(self):
		return self.name_block


	# переопределение названий
	class Meta:
		verbose_name = "Путешествия"
		verbose_name_plural = "Путешествия"
		ordering = ["-created_at"]

	def date2_2(self):
		pattern = re.compile(r'\w+')
		
		return self.date2.year




class TravelVideo(models.Model):

	travel_video_quality_choices = [
        ('option1', 'Full HD'),
        ('option2', 'HD'),
        ('option3', 'SD'),
    ]

	travel = models.ForeignKey(TravelCart, verbose_name='Выбранное путешествие', blank=True, null=True ,  on_delete=models.SET_NULL, related_name='travelvideo')

	name = models.CharField(verbose_name='Название', max_length=255, blank=True, null=True, )
	video = models.CharField(u'Ссылка на видео(https://youtu.be/)', max_length=255,  null=True, blank=True)
	video2 = models.CharField(u'Ссылка на видео(/media/video/)', max_length=255,  null=True, blank=True)



	travel_video_quality = models.CharField(verbose_name='Качество обложки', max_length=20, choices=travel_video_quality_choices, default=travel_video_quality_choices[0][0])

	created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name="Created at")
	updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated at")
	
	class Meta:
		verbose_name = "Видео из путешествия"
		verbose_name_plural = "Видео из путешествия"
		ordering = ["-created_at"]

	def __str__(self):
		return f"{self.name}"
	

	def video_id(self):
		a = self.video.replace("https://youtu.be/",'');
		return a
