from django.contrib import admin

# Register your models here.

from .models import Juego

@admin.register(Juego)
class JuegoAdmin(admin.ModelAdmin):
    list_display = ("id", "titulo", "descripcion")