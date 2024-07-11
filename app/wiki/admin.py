# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import *
from django.utils.html import format_html

from django.contrib.contenttypes.admin import GenericTabularInline

from django.utils.safestring import mark_safe


# Функции фильтрации для массовой публикации/снятия с публикации.
def all_post(modeladmin, reguest, queryset):
    for qs in queryset:
        print (qs.title)

def complete_post(modeladmin, reguest, queryset):
    queryset.update(active=True)
complete_post.short_description = 'Опубликовать выбранные'

def incomplete_post(modeladmin, reguest, queryset):
    queryset.update(active=False)
incomplete_post.short_description = 'Снять с публикации'



class Wiki_catAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Основные настройки',        {'fields': [
            'name_block', 
            'wiki_cat_slug',
            'active',

            ]}),
    ]
    list_display = ['name_block', 'nomer_id', 'wiki_cat_slug', 'active',]
    list_display_links = ["name_block",]
    list_editable = ['active', 'nomer_id', 'wiki_cat_slug',]
    list_filter = [ "active","created_at",]
    search_fields = ["name_block"]
    list_per_page = 30

    #автозаполнение slug
    prepopulated_fields = {"wiki_cat_slug": ("name_block",)}
    actions = [all_post, complete_post, incomplete_post]


    class Meta:
        model = Wiki_cat

# # ////////////////////////////////////////////


class TasksAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Основные настройки',        {'fields': [
            'name_block',
            'wiki_slug', 
            'kurs_cat',
            'language',
            'opisanie_full',
            'opisanie_mini',
            'active',

              ]}),
    ]
    list_display = ['name_block', 'wiki_slug',  'kurs_cat','active',]
    list_display_links = ["name_block",]
    list_editable = ['active', 'wiki_slug',  'kurs_cat',]
    list_filter = [ 'kurs_cat',"active","created_at",]
    search_fields = ["name_block"]
    list_per_page = 30

    actions = [all_post, complete_post, incomplete_post]

    #автозаполнение slug
    prepopulated_fields = {"wiki_slug": ("name_block",)}

    class Meta:
        model = Tasks



admin.site.register(Wiki_cat, Wiki_catAdmin, )
admin.site.register(Tasks, TasksAdmin, )