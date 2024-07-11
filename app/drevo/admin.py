from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django.shortcuts import redirect

from django.contrib.admin.helpers import ActionForm
from django.utils.translation import gettext_lazy as _
# Register your models here.
from django.contrib.admin.helpers import ACTION_CHECKBOX_NAME
from .models import *


class Family_tree_filesInline(admin.TabularInline):
    fields = ['name','file']
    model = Family_tree_files
    extra = 3
    insert_after = 'img_tovar'

    def get_extra(self, request, obj=None, **kwargs):
        extra = 3
        if obj:
            if obj.family_tree_files.count():
                return 1
            else:
                return 3
        return extra


class Family_tree_imagesInline(admin.TabularInline):
    fields = ['image']
    model = Family_tree_images
    extra = 3
    insert_after = 'img_tovar'

    def get_extra(self, request, obj=None, **kwargs):
        extra = 3
        if obj:
            if obj.family_tree_files.count():
                return 3
            else:
                return 3
        return extra


class Family_treeAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Основные настройки', {'fields': [

           'familiya', 'name', 'otchestvo',  'drevo_slug', 'country',
'city', 
'phone', 'image', 'opisanie_full', 'gender', 'date1',  'date2',
                'parents_m', 'parents_f', 'parents', 
              'active',  ]}),

    ]
    list_display = ["pk", 'image_img',  'gender', 'familiya', 'name', 'otchestvo', 
                    # 'date1',  'date2', 'get_parents', 
                    'get_parents_m', 'get_parents_f', 'get_parents',  
                    'active', ]
    list_filter = ['active', ]
    search_fields = ["pk", 'name', 'otchestvo','familiya']
    list_per_page = 30
    list_display_links = ["pk",  ]
    list_editable = [ 'name','gender', 'otchestvo', 'familiya',
                    #   'date1',  'date2',  
                      'active',]

    filter_horizontal = (
        'parents_m', 'parents_f', 'parents', 
    )

    inlines = [
        Family_tree_imagesInline,
        Family_tree_filesInline,
        
    ]

    #автозаполнение slug
    prepopulated_fields = {"drevo_slug": ("name", "otchestvo", "familiya")}

    # actions = ['drevo_reload2']  # Добавляем наше кастомное действие в список действий


    def get_parents_m(self, obj):
        return ", ".join([str(parent) for parent in obj.parents_m.all()])
    get_parents_m.short_description = 'Мать'

    def get_parents_f(self, obj):
        return ", ".join([str(parent) for parent in obj.parents_f.all()])
    get_parents_f.short_description = 'Отец'

    def get_parents(self, obj):
        return ", ".join([str(parent) for parent in obj.parents.all()])
    get_parents.short_description = 'Партнеры'


    # def changelist_view(self, request, extra_context=None):
    #     if 'action' in request.POST and request.POST['action'] == 'drevo_reload2':
    #         if not request.POST.getlist(ACTION_CHECKBOX_NAME):
    #             post = request.POST.copy()
    #             for u in Family_tree.objects.all():
    #                 post.update({ACTION_CHECKBOX_NAME: str(u.id)})
    #             request._set_post(post)
    #     return super(Family_treeAdmin, self).changelist_view(request, extra_context)
    
    
    # def drevo_reload2(self, request, extra_context=None):
        
    #     print("1")

    #     return redirect('drevo_reload')

    # drevo_reload2.short_description = "Перезагрузить древо"  # Название кастомного действия
    # drevo_reload2.actions_selection_counter = False


    class Meta:
        model = Family_tree



admin.site.register(Family_tree, Family_treeAdmin)