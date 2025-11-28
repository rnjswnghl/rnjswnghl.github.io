from rest_framework.permissions import BasePermission

class IsAuthorOrOwnerOrReadOnly(BasePermission):
    """
    GET 요청은 모두 허용 (읽기 가능)
    작성자(author)나 주인(owner)만 수정, 삭제 가능
    """
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # 작성자나 주인만 권한 있음
        return obj.author == request.user or obj.owner == request.user
