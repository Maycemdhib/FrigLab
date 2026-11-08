from django.db import models
from django.contrib.auth.models import User


class Ingredient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    quantity = models.FloatField(default=1)
    unit = models.CharField(max_length=50, blank=True)
    expiration_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name