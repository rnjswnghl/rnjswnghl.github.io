from rest_framework import serializers
from accounts.models import User
from books.models import Category
import logging
from django.contrib.auth import get_user_model
import json
import time

logger = logging.getLogger(__name__)
User = get_user_model()

class SimpleUserSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'photo']

    def get_photo(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    favorite_categories = CategorySerializer(many=True, read_only=True)
    favorite_category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        write_only=True,
        source='favorite_categories'
    )
    photo = serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email',
            'first_name', 'last_name', 'gender',
            'photo', 'reading_amount',
            'favorite_categories',
            'favorite_category_ids'
        ]
        read_only_fields = ['id', 'username', 'email']


class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'password_confirmation', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'password_confirmation': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirmation')
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    favorite_categories = CategorySerializer(many=True, read_only=True)
    favorite_category_ids = serializers.CharField(
        write_only=True,
        required=False,
        source='favorite_categories'
    )
    followers = SimpleUserSerializer(many=True, read_only=True)
    followings = SimpleUserSerializer(many=True, read_only=True)
    is_following = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email',
            'first_name', 'last_name', 'gender',
            'photo', 'reading_amount',
            'favorite_categories', 'favorite_category_ids',
            'followers', 'followings', 'is_following',
            'photo_url'
        ]
        read_only_fields = ['id', 'username', 'email']
        
    def get_is_following(self, obj):
        request = self.context.get('request')
        try:
            if request and hasattr(request, 'user') and request.user.is_authenticated:
                if hasattr(request.user, 'followings'):
                    is_following = obj in request.user.followings.all()
                    logger.debug(f"사용자 {request.user.username}가 {obj.username} 팔로잉 여부: {is_following}")
                    return is_following
        except Exception as e:
            logger.error(f"is_following 계산 오류: {e}", exc_info=True)
        return False

    def get_photo(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                timestamp = int(time.time())
                url = request.build_absolute_uri(obj.photo.url)
                return f"{url}?t={timestamp}"
            return obj.photo.url
        return None

    def validate_favorite_category_ids(self, value):
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            raise serializers.ValidationError("Invalid JSON format")
