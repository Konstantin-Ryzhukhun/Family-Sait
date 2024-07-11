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


class TravelVideoInline(admin.TabularInline):
    fields = ['name','video','video2', 'travel_video_quality']
    model = TravelVideo
    extra = 3
    insert_after = 'img_tovar'

    def get_extra(self, request, obj=None, **kwargs):
        extra = 3
        if obj:
            if obj.travelvideo.count():
                return 1
            else:
                return 3
        return extra


class TravelCartAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Основные настройки',        {'fields': [
            'name_block', 
            'opisanie',
			'date1',
			'date2',
			'img_tovar',
			# 'video',
			# 'video2',
            'active',

            ]}),
    ]
    list_display = ['name_block', 'date1', 'date2', 'active',]
    list_display_links = ["name_block",]
    list_editable = ['active', 'date1', 'date2', ]
    list_filter = [ "active","created_at",]
    search_fields = ["name_block"]
    list_per_page = 30

    inlines = [
        TravelVideoInline,
    ]


    actions = [all_post, complete_post, incomplete_post]


    class Meta:
        model = TravelCart


class TravelVideoAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Основные настройки',        {'fields': [
            'travel', 
            'name',
			'video',
			'video2',
            'travel_video_quality',

            ]}),
    ]
    list_display = ['name',  'travel', 'video', 'video2', 'travel_video_quality']
    list_display_links = ["name",]
    list_editable = ['travel', 'video', 'video2', 'travel_video_quality' ]
    search_fields = ["name"]
    list_per_page = 30

    actions = [all_post, complete_post, incomplete_post]


    class Meta:
        model = TravelVideo

# # ////////////////////////////////////////////
        

admin.site.register(TravelCart, TravelCartAdmin, )
admin.site.register(TravelVideo, TravelVideoAdmin, )