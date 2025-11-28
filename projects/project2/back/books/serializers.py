from rest_framework import serializers
from .models import Book, Category, BookFolder, BookBookmark

class CategorySerializer(serializers.ModelSerializer):
    """카테고리 정보를 직렬화합니다."""
    
    class Meta:
        model = Category
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    """책 정보를 직렬화합니다."""
    
    category = CategorySerializer(read_only=True)  # 책과 연결된 카테고리 정보도 함께 출력
    cover = serializers.SerializerMethodField()    # cover 필드에 메서드 필드 사용

    class Meta:
        model = Book
        fields = [
            'id',                  # 책의 기본 키
            'title',               # 제목
            'sub_title',           # 부제목
            'author',              # 저자
            'pubdate',             # 출간일
            'publisher',           # 출판사
            'isbn',                # ISBN-10
            'description',         # 책 요약
            'cover',               # 표지 이미지 URL
            'pricestandard',       # 정가
            'customer_review_rank',# 리뷰 평점
            'category'             # 카테고리 정보
        ]
        
    def get_cover(self, obj):
        if obj.cover:
            # 기존 url에 coversum이 있다면 coverbig으로 교체
            return obj.cover.replace('/coversum/', '/cover/')
        return ''

class BookBookmarkSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    
    class Meta:
        model = BookBookmark
        fields = ['id', 'book', 'folder']

class BookFolderSerializer(serializers.ModelSerializer):
    bookmarks = BookBookmarkSerializer(many=True, read_only=True)
    
    class Meta:
        model = BookFolder
        fields = ['id', 'name', 'bookmarks']
