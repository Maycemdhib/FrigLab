from rest_framework import serializers


class ManualIngredientSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    quantity = serializers.FloatField(default=1)
    unit = serializers.CharField(max_length=50, required=False, allow_blank=True)
    expiration_date = serializers.DateField(required=False, allow_null=True)