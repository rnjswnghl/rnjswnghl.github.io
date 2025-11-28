from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from books.models import Book
from books.serializers import BookSerializer
from django.shortcuts import get_object_or_404

class BookRecommendationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, book_id):
        base_book = get_object_or_404(Book, id=book_id)

        # 같은 저자 도서 추천 (자기 자신 제외)
        author_books = Book.objects.filter(
            author=base_book.author
        ).exclude(id=book_id)[:10]

        # 같은 카테고리 도서 추천 (자기 자신 제외)
        category_books = Book.objects.filter(
            category=base_book.category
        ).exclude(id=book_id)[:10]

        # 랜덤 추천 도서 10권 (자기 자신 제외)
        random_books = Book.objects.exclude(id=book_id).order_by('?')[:10]

        return Response({
            'authorBooks': BookSerializer(author_books, many=True).data,
            'categoryBooks': BookSerializer(category_books, many=True).data,
            'randomBooks': BookSerializer(random_books, many=True).data,
        })
