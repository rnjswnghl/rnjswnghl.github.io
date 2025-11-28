from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import GuestbookEntry
from .serializers import GuestbookEntrySerializer
from .permissions import IsAuthorOrOwnerOrReadOnly

class GuestbookListCreateView(generics.ListCreateAPIView):
    serializer_class = GuestbookEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return GuestbookEntry.objects.filter(owner_id=user_id).order_by('-created_at')

    def perform_create(self, serializer):
        owner_id = self.kwargs['user_id']
        serializer.save(author=self.request.user, owner_id=owner_id)


class GuestbookEntryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GuestbookEntry.objects.all()
    serializer_class = GuestbookEntrySerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrOwnerOrReadOnly]
    lookup_field = 'id'


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def guestbook_entry_delete(request, entry_id):
    try:
        entry = GuestbookEntry.objects.get(id=entry_id)
    except GuestbookEntry.DoesNotExist:
        return Response({'detail': '삭제할 방명록 항목이 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': f'알 수 없는 오류 발생: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # 권한 검사
    if entry.author != request.user and entry.owner != request.user:
        return Response({'detail': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)

    try:
        entry.delete()
    except Exception as e:
        return Response({'detail': f'삭제 중 오류 발생: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_204_NO_CONTENT)
