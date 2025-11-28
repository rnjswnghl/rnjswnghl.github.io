from django.db import models
from books.models import Book
from accounts.models import User

class Recommendation(models.Model):
    REASON_CHOICES = [
        ('author', '같은 저자'),
        ('genre', '같은 장르'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    base_book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='recommendation_sources')
    recommended_book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='recommendation_targets')
    reason = models.CharField(max_length=20, choices=REASON_CHOICES, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('base_book', 'recommended_book', 'reason')

    def __str__(self):
        return f"{self.base_book.title} → {self.recommended_book.title} ({self.reason})"
