from rest_framework import serializers
from .models import Recommendation
from books.serializers import BookSerializer

class RecommendationSerializer(serializers.ModelSerializer):
    base_book = BookSerializer(read_only=True)
    recommended_book = BookSerializer(read_only=True)

    class Meta:
        model = Recommendation
        fields = ['id', 'user', 'base_book', 'recommended_book', 'reason', 'created_at']
        read_only_fields = ['id', 'created_at']
