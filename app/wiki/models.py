# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from datetime import datetime
from django.utils import timezone

from django_ckeditor_5.fields import CKEditor5Field

#картинка в админке
from django.utils.safestring import mark_safe


# Категории базы знаний

class Wiki_cat(models.Model):
	name_block = models.CharField(u'Название', max_length=255, null=True, blank=True)
	active = models.BooleanField(default=True,verbose_name='Активность',)
	nomer_id = models.IntegerField(u'Номер сортировки',  null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name="Created at")
	updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated at")
	wiki_cat_slug = models.SlugField(unique=True, max_length=255,  verbose_name='Url', db_index=True)

	def __str__(self):
		return self.name_block

	# переопределение названий
	class Meta:
		verbose_name = "Категории базы знаний"
		verbose_name_plural = "Категории базы знаний"
		ordering = ["nomer_id"]

	def get_absolute_url(self):
		return "/wiki/%s/" % (self.wiki_cat_slug)
	
	def save(self, *args, **kwargs):
		if not self.wiki_cat_slug:
			lastid = Wiki_cat.objects.latest('id')
			self.wiki_cat_slug =  createslug(self.name_block)
		super(Wiki_cat, self).save(*args, **kwargs)



# Предмет

LANGUAGE_CHOICES = (
	("bsh",'BASH'),
	("c", 'C'),
	("cc", 'CC'),
	("cpp",'cpp'),
	("cs", 'CS'),
	("csh",'Shell'),
	("cyc",'CYC'),
	("cv", 'CV'),
	("htm",'HTM'),
	("html", 'HTML'),
	("java", 'JAVA'),
    ("js", 'JAVASCRIPT'),
	("m", 'M'),
	("mxml", 'MXML'),
	("perl", 'PERL'),
	("pl", 'PL'),
	("pm", 'PM'),
	("py", 'PYTHON'),
	("rb", 'Rubby'),
	("sh", 'Shell'),
	("xhtml", 'XHTML'),
	("xml",'XML'),
    ("xsl",'XSL'),
)


class Tasks (models.Model):
	name_block = models.CharField(u'Название задачи', max_length=255, unique=False, null=False, blank=False)
	kurs_cat = models.ForeignKey('Wiki_cat', verbose_name='задача относится к категории', default='',  null=True, on_delete=models.CASCADE,)
	opisanie_full = CKEditor5Field(verbose_name='Описание задачи полное',default='', config_name='extends', null=True, blank=True)
	opisanie_mini = CKEditor5Field(verbose_name='Описание краткое',default='', config_name='extends', null=True, blank=True)
	wiki_slug = models.SlugField(unique=True, max_length=255,  verbose_name='Url', db_index=True)
	language = models.CharField( verbose_name='выбрать язык подцветки кода', max_length=255, choices=LANGUAGE_CHOICES, default='', null=True, blank=True)

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
	
	def get_absolute_url(self):
		return "/wiki/%s/%s/" % (self.kurs_cat.wiki_cat_slug,self.wiki_slug,)


	# переопределение названий
	class Meta:
		verbose_name = "Задачи"
		verbose_name_plural = "Задача"
		ordering = ["-created_at"]
