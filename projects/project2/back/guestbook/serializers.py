from rest_framework import serializers
from .models import GuestbookEntry

class GuestbookEntrySerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = GuestbookEntry
        fields = ['id', 'owner', 'author', 'author_username', 'emoji', 'created_at']
        read_only_fields = ['id', 'owner', 'author', 'created_at']
