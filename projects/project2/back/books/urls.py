from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'book-list', views.BookViewSet)
router.register(r'folders', views.BookFolderViewSet, basename='bookfolder')
router.register(r'bookmarks', views.BookBookmarkViewSet, basename='bookbookmark')

urlpatterns = [
    path('', include(router.urls)),
    path('import-books/', views.BookImportView.as_view(), name='import-books'),
    path('fetch/<str:topic>/', views.BookFetchView.as_view(), name='book-fetch'),
    path('categories/', views.CategoryListAPIView.as_view(), name='category-list'),
    path('author-info/', views.author_info, name='author-info'),
    path('bookmarks/check/<int:book_id>/', views.check_bookmark, name='check-bookmark'),
    path('bookmarks/<int:book_id>/', views.delete_bookmark, name='delete-bookmark'),
]