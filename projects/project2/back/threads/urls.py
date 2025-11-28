from rest_framework_nested import routers
from django.urls import path, include
from .views import PostViewSet, CommentViewSet, ToggleLikeView, LikedPostListView

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)

posts_router = routers.NestedDefaultRouter(router, r'posts', lookup='post')
posts_router.register(r'comments', CommentViewSet, basename='post-comments')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(posts_router.urls)),
    path('posts/<int:pk>/toggle-like/', ToggleLikeView.as_view(), name='toggle-like'),
    path('liked/', LikedPostListView.as_view(), name='liked-posts'),
]
