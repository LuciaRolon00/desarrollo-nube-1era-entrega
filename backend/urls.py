from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import RegisterView, MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # autenticación JWT
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Refresh
    path('api/register/', RegisterView.as_view(), name='register'), # Registro
    path('api/', include('api.urls')),
]