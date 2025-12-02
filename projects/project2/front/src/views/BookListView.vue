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

// 이미지 import
import cover1 from '@/assets/cover/불편한편의점.jpg'
import cover2 from '@/assets/cover/달러구트꿈백화점.jpg'
import cover3 from '@/assets/cover/미드나잇라이브러리.jpg'
import cover4 from '@/assets/cover/코스모스.jpg'
import cover5 from '@/assets/cover/해커와화가.jpg'
import cover6 from '@/assets/cover/클린코드.jpg'

// 목데이터
const mockBooks = [
  {
    id: 1,
    title: '불편한 편의점',
    author: '김호연',
    cover: cover1,
    customer_review_rank: 1,
    category: { id: 1, name: '소설/시/희곡' },
    publisher: '나무옆의자',
    publishedDate: '2021-04-20',
    description: '편의점에서 일하며 만나는 다양한 사람들의 이야기'
  },
  {
    id: 2,
    title: '달러구트 꿈 백화점',
    author: '이미예',
    cover: cover2,
    customer_review_rank: 2,
    category: { id: 1, name: '소설/시/희곡' },
    publisher: '팩토리나인',
    publishedDate: '2020-07-08',
    description: '꿈을 판매하는 특별한 백화점의 이야기'
  },
  {
    id: 3,
    title: '미드나잇 라이브러리',
    author: '매트 헤이그',
    cover: cover3,
    customer_review_rank: 3,
    category: { id: 1, name: '소설/시/희곡' },
    publisher: '인플루엔셜',
    publishedDate: '2021-03-15',
    description: '인생의 무한한 가능성을 탐구하는 소설'
  },
  {
    id: 4,
    title: '코스모스',
    author: '칼 세이건',
    cover: cover4,
    customer_review_rank: 4,
    category: { id: 2, name: '인문학' },
    publisher: '사이언스북스',
    publishedDate: '2006-12-20',
    description: '우주와 인간에 대한 깊이 있는 탐구'
  },
  {
    id: 5,
    title: '해커와 화가',
    author: '폴 그레이엄',
    cover: cover5,
    customer_review_rank: 5,
    category: { id: 5, name: '컴퓨터/모바일' },
    publisher: '한빛미디어',
    publishedDate: '2011-06-20',
    description: '프로그래밍과 창의성에 대한 통찰'
  },
  {
    id: 6,
    title: '클린 코드',
    author: '로버트 C. 마틴',
    cover: cover6,
    customer_review_rank: 6,
    category: { id: 5, name: '컴퓨터/모바일' },
    publisher: '인사이트',
    publishedDate: '2013-12-24',
    description: '읽기 좋고 깨끗한 코드를 작성하는 방법'
  }
]

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

  // 백엔드 없이 목데이터만 사용
  setTimeout(() => {
    let filteredBooks = [...mockBooks]
    
    // 검색어 필터링
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.trim().toLowerCase()
      filteredBooks = filteredBooks.filter(book => {
        if (searchField.value === 'title') {
          return book.title.toLowerCase().includes(query)
        } else if (searchField.value === 'author') {
          return book.author.toLowerCase().includes(query)
        } else {
          return book.title.toLowerCase().includes(query) || 
                 book.author.toLowerCase().includes(query) ||
                 (book.description && book.description.toLowerCase().includes(query))
        }
      })
    }
    
    // 카테고리 필터링
    if (selectedCategory.value) {
      const categoryId = parseInt(selectedCategory.value)
      filteredBooks = filteredBooks.filter(book => book.category.id === categoryId)
    }
    
    books.value = filteredBooks
    searchStatus.value = `검색 결과 ${books.value.length}건`
    loading.value = false
  }, 300) // 로딩 효과를 위한 딜레이
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
