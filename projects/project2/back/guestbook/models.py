from django.db import models
from django.conf import settings

# Create your models here.

class GuestbookEntry(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='guestbook_received',  # 이 유저의 프로필에 달린 글들
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='guestbook_entries',  # 이 유저가 남긴 글들
    )
    emoji = models.CharField(max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.author.username} ➡ {self.owner.username} : {self.emoji}'

    class Meta:
        ordering = ['-created_at']
