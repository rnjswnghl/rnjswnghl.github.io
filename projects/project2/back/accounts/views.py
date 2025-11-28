from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models import User
from accounts.serializers import UserSignupSerializer, UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
import logging

logger = logging.getLogger(__name__)
User = get_user_model()


class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.debug(f"회원가입 요청 데이터: {request.data}")
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"회원가입 성공: {serializer.data.get('username')}")
            return Response({"message": "회원가입 성공"}, status=status.HTTP_201_CREATED)
        else:
            logger.warning(f"회원가입 실패: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        logger.debug(f"프로필 조회/수정 요청자: {self.request.user.username}")
        return self.request.user


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.debug(f"로그아웃 요청자: {request.user.username}")
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                logger.warning("refresh token 미제공")
                return Response({"error": "refresh token 필요"}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            logger.info(f"로그아웃 성공: {request.user.username}")
            return Response({"message": "로그아웃 성공"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            logger.error(f"로그아웃 에러: {e}", exc_info=True)
            return Response({"error": "로그아웃 실패"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    logger.debug(f"팔로우 요청자: {request.user.username}, 대상: {user_id}")
    try:
        target_user = get_object_or_404(User, id=user_id)

        if target_user == request.user:
            logger.warning(f"자기 자신 팔로우 시도: {request.user.username}")
            return Response({'error': '자기 자신은 팔로우할 수 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        if target_user in request.user.followings.all():
            request.user.followings.remove(target_user)
            logger.info(f"언팔로우 완료: {request.user.username} -> {target_user.username}")
            return Response({'message': '언팔로우 완료'})
        else:
            request.user.followings.add(target_user)
            logger.info(f"팔로우 완료: {request.user.username} -> {target_user.username}")
            return Response({'message': '팔로우 완료'})
    except Exception as e:
        logger.error(f"팔로우 에러: {e}", exc_info=True)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    logger.debug(f"회원 탈퇴 요청자: {request.user.username}")
    try:
        request.user.delete()
        logger.info(f"회원 탈퇴 완료: {request.user.username}")
        return Response({'message': '회원 탈퇴 완료'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        logger.error(f"회원 탈퇴 에러: {e}", exc_info=True)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        logger.debug(f"현재 사용자 정보 조회: {user.username}")
        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
        return Response(data)


class UserProfileByUsernameAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        logger.debug(f"다른 사용자 프로필 조회 요청: {username}")
        try:
            user = User.objects.get(username=username)
            serializer = UserProfileSerializer(user, context={'request': request})
            return Response(serializer.data)
        except User.DoesNotExist:
            logger.warning(f"사용자 없음: {username}")
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
