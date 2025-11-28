from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend


from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from .permissions import IsAuthorOrReadOnly
from .utils.openai_utils import generate_ai_image  # ✅ 정확한 경로로 import


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['book', 'author']

    def perform_create(self, serializer):
        book = serializer.validated_data.get('book')
        title = serializer.validated_data.get('title')
        content = serializer.validated_data.get('content')

        content_excerpt = content[:100] + "..." if len(content) > 100 else content

        prompt = (
            f"Create a vibrant, detailed, and artistic illustration inspired by the post titled '{title}', "
            f"which discusses the book '{book.title}'. "
            f"The post's excerpt reads: '{content_excerpt}'. "
            f"Focus on capturing the main themes and emotions conveyed by the post, "
            f"using rich colors, dynamic composition, and imaginative elements that reflect the book's atmosphere. "
            f"The illustration should be engaging, visually striking, and invite viewers to feel connected to the story."
        )

        try:
            ai_image_url = generate_ai_image(prompt)
            if not ai_image_url:
                raise Exception("AI 이미지 URL 없음")
        except Exception as e:
            print(f"AI 이미지 생성 실패: {e}")
            ai_image_url = 'https://via.placeholder.com/512'  # 기본 이미지 URL

        serializer.save(author=self.request.user, ai_image_url=ai_image_url)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        author_id = request.query_params.get('user')
        if author_id:
            queryset = queryset.filter(author_id=author_id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('created_at')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        # post_pk에 해당하는 댓글만 반환 (nested router 고려)
        return self.queryset.filter(post_id=self.kwargs['post_pk'])

    def perform_create(self, serializer):
        # 댓글 생성 시 post_id와 author를 같이 저장
        serializer.save(author=self.request.user, post_id=self.kwargs['post_pk'])


class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        if user in post.likes.all():
            post.likes.remove(user)
            liked = False
        else:
            post.likes.add(user)
            liked = True

        return Response({'liked': liked, 'like_count': post.likes.count()}, status=status.HTTP_200_OK)


class LikedPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(likes=self.request.user).order_by('-created_at')
