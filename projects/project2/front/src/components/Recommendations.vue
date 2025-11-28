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

const fetchRecommendations = async () => {
  try {
    const res = await axios.get(`/api/recommendations/by-book/${props.bookId}/`)
    authorBooks.value = res.data.authorBooks || []
    categoryBooks.value = (res.data.categoryBooks || []).slice(0, 10) // 최대 10권 제한
    randomBooks.value = res.data.randomBooks || []

    authorPage.value = 0
    categoryPage.value = 0
    randomPage.value = 0
  } catch (error) {
    console.error('추천 도서를 불러오는 데 실패했습니다.', error)
    authorBooks.value = []
    categoryBooks.value = []
    randomBooks.value = []
  }
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