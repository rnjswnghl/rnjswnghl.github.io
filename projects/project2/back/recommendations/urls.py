from django.urls import path
from .views import BookRecommendationView

urlpatterns = [
    path('by-book/<int:book_id>/', BookRecommendationView.as_view(), name='book-recommendation'),
]
