<template>
  <div v-if="book" class="book-detail-container">
    <div class="top-section">
      <div class="book-info-column">
        <img :src="book.cover" :alt="book.title" class="book-cover" />
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author">저자: {{ book.author }}</p>
        <p class="book-publisher">출판사: {{ book.publisher }}</p>
        <p class="book-published-date">출간일: {{ book.pubdate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  book: {
    type: Object,
    required: true,
  }
})

const formattedDate = computed(() => {
  if (!props.book.publishedDate) return ''
  const date = new Date(props.book.publishedDate)
  return date.toLocaleDateString()
})
</script>

<style scoped>
.book-detail-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: #eee;
}
.top-section {
  display: flex;
  gap: 4rem;
}
.book-info-column {
  flex: 1;
  background-color: #1e1e1e;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  text-align: center;
}
.book-cover {
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #111;
  object-fit: contain;
}
.book-title {
  font-weight: 800;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #f0f0f0;
}
.book-author,
.book-publisher,
.book-published-date {
  font-size: 1rem;
  margin-bottom: 0.3rem;
  color: #a6cee3;
}
.book-description-column {
  flex: 2;
  background-color: #282828;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  font-size: 1.1rem;
  line-height: 1.5;
  color: #ccc;
  overflow-wrap: break-word;
}

</style>
