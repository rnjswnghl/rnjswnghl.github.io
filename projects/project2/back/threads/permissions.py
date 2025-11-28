from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    읽기(GET, HEAD, OPTIONS) 요청은 누구나 가능.
    수정/삭제 요청은 작성자만 허용.
    """

    def has_object_permission(self, request, view, obj):
        # 읽기 권한은 모두 허용
        if request.method in permissions.SAFE_METHODS:
            return True
        # 작성자만 수정/삭제 가능
        return obj.author == request.user
