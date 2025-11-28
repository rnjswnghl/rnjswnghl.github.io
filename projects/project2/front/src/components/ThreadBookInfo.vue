<template>
  <div v-if="isValidBook" class="thread-book-info" @click="goToBookDetail" style="cursor: pointer;">
    <div>
      <img 
        v-if="book.cover && book.cover !== ''" 
        :src="fixedCover" 
        alt="책 이미지" 
        class="book-thumbnail" 
      />
      <p v-else>표지 이미지가 없습니다.</p>
    </div>
    <div class="book-details">
      <h4 class="book-title">{{ book.title }}</h4>
      <p class="book-author">저자: {{ book.author }}</p>
    </div>

    <!-- 구분선 -->
    <hr class="book-divider-line" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: [Object, null],
    default: null,
  },
})

const router = useRouter()

const isValidBook = computed(() => {
  return props.book && typeof props.book === 'object'
})

const fixedCover = computed(() => {
  if (!isValidBook.value || !props.book.cover) return ''
  if (props.book.cover.startsWith('http')) {
    return props.book.cover
  } else if (props.book.cover.startsWith('//')) {
    return 'https:' + props.book.cover
  } else {
    return props.book.cover
  }
})

function goToBookDetail() {
  if (isValidBook.value && props.book.id) {
    router.push(`/books/${props.book.id}`)
  }
}
</script>

<style scoped>
.thread-book-info {
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-bottom: 3rem;
  cursor: pointer; /* 마우스 커서 포인터로 */
}
.book-thumbnail {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.book-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
}
.book-title {
  font-weight: 700;
  font-size: 1.2rem;
  color: #333;
  margin: 0;
}
.book-author {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

</style>
