from rest_framework.routers import DefaultRouter
from rest_framework import routers
from .views import JuegoViewSet, ContactoViewSet
from django.urls import path

router = DefaultRouter()
router.register(r"juegos", JuegoViewSet, basename="juego")
router.register(r'contacto', ContactoViewSet)

urlpatterns = router.urls