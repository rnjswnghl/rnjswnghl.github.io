<template>
  <div class="recommendations-container container mt-4 p-3 bg-light rounded">
    <div class="row align-items-center position-relative" style="flex-wrap: nowrap;">
      <!-- 1열: 저자 기반 추천 -->
      <RecommendationColumn
        :title="`저자 ${bookAuthor}의 다른 작품`"
        :books="authorBooks"
        :currentBook="currentAuthorBook"
        :page="authorPage"
        @prev="prevAuthorPage"
        @next="nextAuthorPage"
        :defaultCover="defaultCover"
        emptyText="해당 저자의 다른 책이 없습니다."
      />

      <!-- 원래 세로 구분선 스타일 -->
      <div class="vertical-divider d-none d-md-block"></div>

      <!-- 2열: 카테고리 기반 추천 -->
      <RecommendationColumn
        :title="`카테고리 ${bookCategory}의 추천 도서`"
        :books="categoryBooks"
        :currentBook="currentCategoryBook"
        :page="categoryPage"
        @prev="prevCategoryPage"
        @next="nextCategoryPage"
        :defaultCover="defaultCover"
        emptyText="해당 카테고리의 추천 도서가 없습니다."
      />

      <div class="vertical-divider d-none d-md-block"></div>

      <!-- 3열: 랜덤 추천 -->
      <RecommendationColumn
        title="랜덤 추천 도서"
        :books="randomBooks"
        :currentBook="currentRandomBook"
        :page="randomPage"
        @prev="prevRandomPage"
        @next="nextRandomPage"
        :defaultCover="defaultCover"
        emptyText="추천 도서가 없습니다."
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import RecommendationColumn from '@/components/RecommendationColumn.vue'

const props = defineProps({
  bookId: Number,
  bookAuthor: String,
  bookCategory: String
})

const defaultCover = '/images/default-cover.jpg'

const authorBooks = ref([])
const categoryBooks = ref([])
const randomBooks = ref([])

const authorPage = ref(0)
const categoryPage = ref(0)
const randomPage = ref(0)

// 이미지 import
import cover1 from '@/assets/cover/불편한편의점.jpg'
import cover2 from '@/assets/cover/달러구트꿈백화점.jpg'
import cover3 from '@/assets/cover/미드나잇라이브러리.jpg'
import cover4 from '@/assets/cover/코스모스.jpg'
import cover5 from '@/assets/cover/해커와화가.jpg'
import cover6 from '@/assets/cover/클린코드.jpg'

// 목데이터 - 전체 도서 목록
const allMockBooks = [
  { id: 1, title: '불편한 편의점', author: '김호연', cover: cover1, category: { name: '소설/시/희곡' } },
  { id: 2, title: '달러구트 꿈 백화점', author: '이미예', cover: cover2, category: { name: '소설/시/희곡' } },
  { id: 3, title: '미드나잇 라이브러리', author: '매트 헤이그', cover: cover3, category: { name: '소설/시/희곡' } },
  { id: 4, title: '코스모스', author: '칼 세이건', cover: cover4, category: { name: '인문학' } },
  { id: 5, title: '해커와 화가', author: '폴 그레이엄', cover: cover5, category: { name: '컴퓨터/모바일' } },
  { id: 6, title: '클린 코드', author: '로버트 C. 마틴', cover: cover6, category: { name: '컴퓨터/모바일' } }
]

const fetchRecommendations = async () => {
  // 백엔드 없이 목데이터만 사용
  const currentBook = allMockBooks.find(b => b.id === props.bookId)
  if (!currentBook) {
    authorBooks.value = []
    categoryBooks.value = []
    randomBooks.value = []
    return
  }

  // 저자 기반 추천 (현재 도서 제외)
  authorBooks.value = allMockBooks.filter(b => 
    b.author === currentBook.author && b.id !== currentBook.id
  )

  // 카테고리 기반 추천 (현재 도서 제외)
  categoryBooks.value = allMockBooks.filter(b => 
    b.category.name === currentBook.category.name && b.id !== currentBook.id
  ).slice(0, 10)

  // 랜덤 추천 (현재 도서 제외)
  const randomList = allMockBooks.filter(b => b.id !== currentBook.id)
  randomBooks.value = randomList.sort(() => Math.random() - 0.5).slice(0, 3)

  authorPage.value = 0
  categoryPage.value = 0
  randomPage.value = 0
}

onMounted(fetchRecommendations)

watch(() => props.bookId, fetchRecommendations)

const currentAuthorBook = computed(() => authorBooks.value[authorPage.value] || null)
const currentCategoryBook = computed(() => categoryBooks.value[categoryPage.value] || null)
const currentRandomBook = computed(() => randomBooks.value[randomPage.value] || null)

// 순환 로직: 끝에서 다음 누르면 처음으로, 처음에서 이전 누르면 마지막으로
const prevAuthorPage = () => {
  if (authorBooks.value.length === 0) return
  authorPage.value = (authorPage.value - 1 + authorBooks.value.length) % authorBooks.value.length
}
const nextAuthorPage = () => {
  if (authorBooks.value.length === 0) return
  authorPage.value = (authorPage.value + 1) % authorBooks.value.length
}

const prevCategoryPage = () => {
  if (categoryBooks.value.length === 0) return
  categoryPage.value = (categoryPage.value - 1 + categoryBooks.value.length) % categoryBooks.value.length
}
const nextCategoryPage = () => {
  if (categoryBooks.value.length === 0) return
  categoryPage.value = (categoryPage.value + 1) % categoryBooks.value.length
}

const prevRandomPage = () => {
  if (randomBooks.value.length === 0) return
  randomPage.value = (randomPage.value - 1 + randomBooks.value.length) % randomBooks.value.length
}
const nextRandomPage = () => {
  if (randomBooks.value.length === 0) return
  randomPage.value = (randomPage.value + 1) % randomBooks.value.length
}
</script>

<style scoped>
.vertical-divider {
  width: 2px;
  background: lightcoral;
  margin: 2px;
  padding: 2px;
  height: 180px;
  border-radius: 1px;
  opacity: 0.6;
}
</style>