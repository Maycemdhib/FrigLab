from django.urls import path
from .views import ManualIngredientListView

urlpatterns = [
    path('manual/', ManualIngredientListView.as_view(), name='manual-ingredients'),
]