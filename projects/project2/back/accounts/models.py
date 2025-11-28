from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    GENDER_CHOICES = [
        ('M', '남자'),
        ('F', '여자'),
    ]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='M')
    photo = models.ImageField(upload_to='user_profiles/', blank=True)
    reading_amount = models.PositiveIntegerField(default=0)
    favorite_categories = models.ManyToManyField('books.Category', blank=True)

    # 🔽 팔로우 기능 (self-referencing M2M)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)

    def __str__(self):
        return self.username
