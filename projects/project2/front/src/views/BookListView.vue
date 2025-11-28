<template>
  <div class="book-list-view container py-5">
    <h1 class="text-center mb-5 title">도서 탐색</h1>

    <div class="row">
      <!-- 좌측 필터 영역 -->
      <div class="col-lg-3 mb-4">
        <div class="filter-box p-4 shadow-sm rounded-4 d-flex flex-column gap-4">
          <!-- 검색창 -->
          <BookSearch
            v-model:searchQuery="searchQuery"
            v-model:searchField="searchField"
            v-model:selectedCategory="selectedCategory"
            @triggerSearch="handleSearch"
          />
        </div>
      </div>

      <!-- 우측 도서 목록 -->
      <div class="col-lg-9">
        <div v-if="searchStatus" class="mb-3 text-secondary text-end small">
          {{ searchStatus }}
        </div>

        <div class="row g-4">
          <div class="col-12 col-md-6" v-for="book in books" :key="book.id">
            <div class="book-card p-3 shadow-sm rounded-4 h-100">
              <BookCard :book="book" />
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-center mt-5">
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">로딩 중...</span>
          </div>
        </div>

        <div v-if="books.length === 0 && !loading" class="text-center mt-5 text-muted">
          검색 결과가 없습니다.
        </div>

        <div v-if="error" class="alert alert-danger mt-4">
          도서 불러오기 실패: {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BookCard from '@/components/BookCard.vue'
import BookSearch from '@/components/BookSearch.vue'

const route = useRoute()

const books = ref([])
const searchQuery = ref('')
const searchField = ref('all')
const selectedCategory = ref(route.query.category || '')
const error = ref(null)
const loading = ref(false)
const searchStatus = ref('')

const fetchBooks = async () => {
  loading.value = true
  error.value = null
  searchStatus.value = '검색 중...'

  try {
    const params = {}
    if (searchQuery.value.trim()) params.search = searchQuery.value.trim()
    if (searchField.value && searchField.value !== 'all') params.searchField = searchField.value
    if (selectedCategory.value) params.category = selectedCategory.value

    const res = await axios.get('http://localhost:8000/api/books/book-list/', { params })
    books.value = res.data.results || res.data
    searchStatus.value = `검색 결과 ${books.value.length}건`
  } catch (err) {
    error.value = err.message || '알 수 없는 오류가 발생했습니다.'
    searchStatus.value = '검색 실패'
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  fetchBooks()
}

onMounted(() => {
  fetchBooks()
})

// 카테고리 쿼리 변경 감지
watch(() => route.query.category, (newVal) => {
  selectedCategory.value = newVal || ''
  fetchBooks()
})
</script>


<style scoped>
.book-list-view {
  font-family: 'Noto Serif KR', serif;
  background-color: #f8f9fa;
}

.title {
  font-weight: 600;
  color: #333;
  letter-spacing: 1px;
}

.filter-box {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.book-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
}
</style>
