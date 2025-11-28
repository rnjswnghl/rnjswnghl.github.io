from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import fetch_books_by_topic, save_json
from .models import Book, Category, BookFolder, BookBookmark
from .serializers import BookSerializer, CategorySerializer, BookFolderSerializer, BookBookmarkSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.db.models import Q

from rest_framework import viewsets, permissions, status
from django.http import JsonResponse
from .utils import fetch_author_info_from_wikipedia
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend]  # SearchFilter 제거
    filterset_fields = ['category']  # 여전히 필터 가능

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', '')
        search_field = self.request.query_params.get('searchField', '')

        if search:
            if search_field == 'title':
                queryset = queryset.filter(title__icontains=search)
            elif search_field == 'author':
                queryset = queryset.filter(author__icontains=search)
            elif search_field == 'publisher':
                queryset = queryset.filter(publisher__icontains=search)
            else:  # 전체 or 미지정일 경우
                queryset = queryset.filter(
                    Q(title__icontains=search) |
                    Q(author__icontains=search) |
                    Q(publisher__icontains=search)
                )

        return queryset

    def list(self, request, *args, **kwargs):
        print("🔍 [요청 파라미터] =>", request.query_params)
        response = super().list(request, *args, **kwargs)
        print("📦 [응답 데이터] =>", response.data)
        return response

class BookFetchView(APIView):
    def get(self, request, topic):
        books = fetch_books_by_topic(topic)
        save_json(books, f"{topic}_books.txt")
        return Response({"message": f"{len(books)}권의 {topic} 도서 데이터를 저장했습니다."})


class BookImportView(APIView):
    def get(self, request):
        topic = request.query_params.get('topic', '문학')
        books = fetch_books_by_topic(topic)

        category, _ = Category.objects.get_or_create(name=topic)
        saved_count = 0

        for book in books:
            title = book.get('title', '').strip()
            author = book.get('author', '').strip()
            if not title or Book.objects.filter(title=title, author=author).exists():
                continue

            Book.objects.create(
                title=title,
                sub_title=book.get('sub_title', '').strip() or None,
                author=author,
                publisher=book.get('publisher', ''),
                pubdate=book.get('pubDate', '')[:10] or None,
                isbn=book.get('isbn', ''),
                description=book.get('description', ''),
                cover=book.get('cover', ''),
                pricestandard=book.get('priceStandard', 0),
                customer_review_rank=book.get('customerReviewRank', 0),
                category=category,
            )
            saved_count += 1

        save_json(books, f"{topic}_books.txt")

        return Response({
            "message": f"{saved_count}권의 '{topic}' 도서를 DB에 저장하고 파일로도 저장했습니다."
        })
        
class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BookFolderViewSet(viewsets.ModelViewSet):
    serializer_class = BookFolderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BookFolder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookBookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookBookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BookBookmark.objects.filter(folder__user=self.request.user)

    def create(self, request, *args, **kwargs):
        folder_id = request.data.get('folder_id')
        book_id = request.data.get('book_id')

        if not folder_id or not book_id:
            return Response({'error': 'folder_id and book_id are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            folder = BookFolder.objects.get(id=folder_id, user=request.user)
            book = Book.objects.get(id=book_id)
        except (BookFolder.DoesNotExist, Book.DoesNotExist):
            return Response({'error': 'Invalid folder or book'}, status=status.HTTP_404_NOT_FOUND)

        # 중복 체크
        if BookBookmark.objects.filter(folder=folder, book=book).exists():
            return Response({'error': 'Already bookmarked in this folder'}, status=status.HTTP_400_BAD_REQUEST)

        bookmark = BookBookmark.objects.create(folder=folder, book=book)
        serializer = self.get_serializer(bookmark)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        folder_id = request.data.get('folder_id')

        if not folder_id:
            return Response({'error': 'folder_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            folder = BookFolder.objects.get(id=folder_id, user=request.user)
        except BookFolder.DoesNotExist:
            return Response({'error': 'Invalid folder'}, status=status.HTTP_404_NOT_FOUND)

        # 같은 폴더로의 이동 체크
        if instance.folder.id == folder.id:
            return Response({'error': 'Already in this folder'}, status=status.HTTP_400_BAD_REQUEST)

        # 다른 폴더에 같은 책이 있는지 체크
        if BookBookmark.objects.filter(folder=folder, book=instance.book).exists():
            return Response({'error': 'Book already exists in target folder'}, status=status.HTTP_400_BAD_REQUEST)

        instance.folder = folder
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# def author_info(request):
#     author_name = request.GET.get('name')
#     if not author_name:
#         return JsonResponse({"error": "Author name is required"}, status=400)
    
#     info = fetch_author_info_from_wikipedia(author_name)
#     return JsonResponse(info)

@api_view(['GET'])
def author_info(request):
    try:
        name = request.GET.get('name')
        print(f"author_info called with name={name}")

        if not name:
            return Response({"error": "name parameter is required"}, status=400)

        # 괄호 및 괄호 안 내용 제거 (예: "한강 (지은이)" -> "한강")
        import re
        clean_name = re.sub(r'\s*\(.*?\)\s*', '', name).strip()
        print(f"Cleaned author name: {clean_name}")

        result = fetch_author_info_from_wikipedia(clean_name)  # utils에 있는 함수 호출
        print(f"Wikipedia API result: {result.get('description', '')[:100]}")


        return Response({"author_info": result})
    except Exception as e:
        print(f"Exception in author_info: {e}")
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_bookmark(request, book_id):
    try:
        # BookBookmark 모델에서 해당 사용자의 북마크 확인
        bookmark = BookBookmark.objects.filter(
            folder__user=request.user,
            book_id=book_id
        ).exists()
        return Response({'is_bookmarked': bookmark})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_bookmark(request, book_id):
    try:
        # 사용자의 북마크 중에서 해당 도서를 찾아 삭제
        bookmark = BookBookmark.objects.filter(
            folder__user=request.user,
            book_id=book_id
        ).first()
        
        if not bookmark:
            return Response({'error': '북마크를 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
            
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
