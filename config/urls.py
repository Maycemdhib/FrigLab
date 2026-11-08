from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts.views import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Accounts
    path('api/accounts/register/', RegisterView.as_view(), name='register'),
    path('api/accounts/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   

    # Ingredients
    path('api/ingredients/', include('ingredients.urls')),
    # Recipes
    path('api/recipes/', include('recipes.urls')),
]