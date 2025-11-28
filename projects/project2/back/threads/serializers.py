from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, Comment
from books.serializers import BookSerializer
from books.models import Book

class UserSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'photo']

    def get_photo(self, obj):
        profile = getattr(obj, 'profile', None)
        if profile and hasattr(profile, 'photo'):
            return profile.photo.url if profile.photo else None
        return None

# 1. 작가 상세 정보용 시리얼라이저 (AI 이미지, 소개 포함)
class AuthorSerializer(serializers.ModelSerializer):
    ai_image_url = serializers.SerializerMethodField()
    introduction = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'ai_image_url', 'introduction']

    def get_ai_image_url(self, obj):
        # obj = User instance
        # AI에서 받아온 사진 URL을 User 모델 혹은 다른 곳에서 가져오는 로직을 구현해야 함
        # 예: User 모델에 프로필 이미지 URL 필드가 있다고 가정
        # 만약 없다면 별도 저장소에서 가져오는 방법 구현 필요
        profile = getattr(obj, 'profile', None)  # 예: User에 OneToOneProfile 관계 시
        if profile and hasattr(profile, 'ai_image_url'):
            return profile.ai_image_url
        # 임시 반환값
        return 'https://example.com/default_author_image.jpg'

    def get_introduction(self, obj):
        # AI에서 받은 작가 소개도 마찬가지로 User 또는 프로필 모델에 저장되어 있어야 함
        profile = getattr(obj, 'profile', None)
        if profile and hasattr(profile, 'introduction'):
            return profile.introduction
        return "작가 소개가 없습니다."

# 2. 댓글 시리얼라이저
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_at']

# 3. 포스트 시리얼라이저
class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    book_detail = BookSerializer(source='book', read_only=True)

    ai_image_url = serializers.URLField(read_only=True)  # AI 이미지 URL (포스트 관련)

    class Meta:
        model = Post
        fields = [
            'id', 'author', 'title', 'content',
            'book', 'book_detail',
            'ai_image_url',
            'created_at', 'updated_at',
            'comments', 'like_count', 'is_liked',
        ]

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        return user.is_authenticated and obj.likes.filter(id=user.id).exists()
