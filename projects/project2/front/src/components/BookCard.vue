<template>
  <router-link :to="{ name: 'BookDetailView', params: { bookId: book.id } }" class="book-link">
    <div class="book-card">
      <img :src="book.cover" :alt="book.title" class="book-cover" />
      <div class="book-info">
        <h5 class="book-title" :title="book.title">{{ book.title }}</h5>
        <p class="book-author" :title="formattedAuthors">{{ formattedAuthors }}</p>
        <p class="book-category">{{ book.category?.name || '분류 없음' }}</p>
        <p class="book-publisher">{{ book.publisher }}</p>
        <p class="book-published-date">{{ formattedDate }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  book: { type: Object, required: true }
})

// 저자명 3명 이상 줄임 처리
const formattedAuthors = computed(() => {
  if (!props.book.author) return ''
  const authors = props.book.author.split(',').map(a => a.trim())
  if (authors.length <= 3) return authors.join(', ')
  return `${authors.slice(0, 2).join(', ')} 외 ${authors.length - 2}명`
})

// 출판일 포맷팅
const formattedDate = computed(() => {
  if (!props.book.publishedDate) return ''
  const date = new Date(props.book.publishedDate)
  return date.toLocaleDateString()
})
</script>

<style scoped>
.book-card {
  display: flex;
  background-color: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  width: 100%;
  max-width: 620px;
  min-height: 250px;
}

.book-card:hover {
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.05);
  transform: translateY(-4px);
}

.book-cover {
  width: 180px;
  height: 280px;
  background-color: #111;
  padding: 0.5rem;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.book-info {
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
  flex: 1;
  min-height: 250px;
  color: #ccc;
  font-family: 'Noto Sans KR', sans-serif;
}

.book-title {
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #f0f0f0;
  display: -webkit-box;
  -webkit-line-clamp: 2;  /* 최대 2줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author,
.book-category,
.book-publisher,
.book-published-date {
  font-size: 1rem;
  font-weight: 600;
  color: #ccc;
  display: -webkit-box;
  -webkit-line-clamp: 2;  /* 1~2줄 정도 보이게 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
