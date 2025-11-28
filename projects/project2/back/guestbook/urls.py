from django.urls import path
from .views import GuestbookListCreateView, GuestbookEntryDetailView

urlpatterns = [
    path('<int:user_id>/', GuestbookListCreateView.as_view(), name='guestbook-user'),
    path('entry/<int:id>/', GuestbookEntryDetailView.as_view(), name='guestbook-entry-detail'),
]
