from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserSignupView,
    UserProfileAPIView,
    UserProfileByUsernameAPIView,  # 여기에서 import
    LogoutView,
    CurrentUserView,
    follow_user,
    delete_account,
)

urlpatterns = [
    path("signup/", UserSignupView.as_view(), name="user-signup"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("profile/", UserProfileAPIView.as_view(), name="user-profile"),  # 현재 로그인한 사용자
    path("profile/<str:username>/", UserProfileByUsernameAPIView.as_view(), name="user-profile-by-username"),  # 특정 사용자
    path("follow/<int:user_id>/", follow_user, name="follow-user"),
    path("delete/", delete_account, name="delete-account"),
    path("current/", CurrentUserView.as_view(), name="current-user"),
]
