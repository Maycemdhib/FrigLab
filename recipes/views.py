from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ManualIngredientSerializer


class ManualIngredientListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ManualIngredientSerializer(data=request.data, many=True)

        if serializer.is_valid():
            return Response(
                {
                    'message': 'Ingredients received successfully!',
                    'ingredients': serializer.validated_data
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    