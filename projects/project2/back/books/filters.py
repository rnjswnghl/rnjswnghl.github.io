import django_filters
from .models import Book

class BookFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')       # 제목에 특정 단어 포함
    author = django_filters.CharFilter(field_name='author', lookup_expr='icontains')     # 저자 이름 포함
    publisher = django_filters.CharFilter(field_name='publisher', lookup_expr='icontains') # 출판사 이름 포함
    category = django_filters.NumberFilter(field_name='category__id')                    # 카테고리 ID로 필터링
    min_price = django_filters.NumberFilter(field_name='pricestandard', lookup_expr='gte') # 최소 가격 이상
    max_price = django_filters.NumberFilter(field_name='pricestandard', lookup_expr='lte') # 최대 가격 이하

    class Meta:
        model = Book
        fields = ['title', 'author', 'publisher', 'category', 'min_price', 'max_price']
