from django.db import models
from django.contrib.auth import get_user_model

class Category(models.Model):
    name = models.CharField(max_length=100)                 # 카테고리 이름 (예: 소설, 경제, 과학 등)
    aladin_category_id = models.PositiveIntegerField(null=True, blank=True, unique=True)  # 알라딘에서 제공하는 카테고리 ID

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=300)                                                                # 책 제목
    sub_title = models.CharField(max_length=300, null=True, blank=True, help_text="책의 부제목 (있다면)")     # 부제목
    author = models.CharField(max_length=200)                                                               # 저자 이름
    publisher = models.CharField(max_length=100, null=True, blank=True)                                     # 출판사명
    pubdate = models.DateField(null=True, blank=True)                                                       # 출간일 (YYYY-MM-DD 형식)
    isbn = models.CharField(max_length=20, unique=True)                                                      # ISBN-13 코드 (중복 불가)
    description = models.TextField()                                                                        # 책 요약 또는 소개글
    cover = models.URLField()                                                                               # 책 표지 이미지의 URL
    pricestandard = models.PositiveIntegerField()                                                           # 책의 정가
    customer_review_rank = models.PositiveIntegerField()                                                    # 사용자 리뷰 평점 (0~10)
    category = models.ForeignKey(                                                                           # 책의 카테고리 (예: 역사, 문학 등)
        Category, 
        on_delete=models.SET_NULL,                                                                          # 카테고리가 삭제되면 NULL로 설정
        null=True, 
        blank=True,
        related_name='books'                                                                                # 역참조할 때 category.books.all() 형태로 가능
    )

    def __str__(self):
        return self.title  # 관리자 페이지나 쉘에서 객체명을 책 제목으로 표시


User = get_user_model()

class BookFolder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='book_folders')  # 사용자 별 폴더
    name = models.CharField(max_length=100)  # 폴더 이름

    class Meta:
        unique_together = ['user', 'name']  # 같은 이름의 폴더 중복 불가

    def __str__(self):
        return f"{self.user.username} - {self.name}"


class BookBookmark(models.Model):
    folder = models.ForeignKey(BookFolder, on_delete=models.CASCADE, related_name='bookmarks')  # 속한 폴더
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='bookmarked_by')      # 찜한 책
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['folder', 'book']  # 같은 책을 같은 폴더에 중복 저장하지 않도록

    def __str__(self):
        return f"{self.folder.name} - {self.book.title}"
