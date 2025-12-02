<template>
  <div class="container my-5">
    <h3 class="section-title mb-4 text-center">최근 쓰레드</h3>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="thread in recentThreads" :key="thread.id" class="col">
        <div class="card h-100">
          <img 
            :src="getFullImageUrl(thread.ai_image_url)" 
            class="card-img-top thread-image" 
            :alt="thread.title"
          >
          <div class="card-body">
            <h5 class="card-title">{{ thread.title }}</h5>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <small class="text-muted">작성자: {{ thread.author }}</small>
              <small class="text-muted">{{ formatDate(thread.created_at) }}</small>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <RouterLink :to="{ name: 'ThreadDetailView', params: { id: thread.id }}" class="btn btn-outline-primary w-100">
              자세히 보기
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/utils/api'

const recentThreads = ref([])

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// 목데이터 (이미지 URL을 빈 문자열로 설정하여 기본 이미지 사용)
const mockThreads = [
  {
    id: 1,
    title: '불편한 편의점을 읽고',
    author: '독서왕',
    ai_image_url: '', // 빈 문자열로 설정하여 기본 이미지 사용
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: '달러구트 꿈 백화점 후기',
    author: '책벌레',
    ai_image_url: '',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: '미드나잇 라이브러리 추천합니다',
    author: '독서인',
    ai_image_url: '',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
]

const fetchRecentThreads = async () => {
  // 백엔드 없이 목데이터만 사용
  recentThreads.value = mockThreads
}

const getFullImageUrl = (imageUrl) => {
  if (!imageUrl) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3E이미지 없음%3C/text%3E%3C/svg%3E'
  if (imageUrl.startsWith('http')) return imageUrl
  return `${API_BASE_URL}${imageUrl}`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return '오늘'
  } else if (diffDays === 1) {
    return '어제'
  } else if (diffDays < 7) {
    return `${diffDays}일 전`
  } else {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

onMounted(() => {
  fetchRecentThreads()
})
</script>

<style scoped>
.section-title {
  font-family: 'Playfair Display', serif;
  color: #3e3a2f;
  border-bottom: 2px solid #e3d5a8;
  display: inline-block;
  padding-bottom: 0.3rem;
}

.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.thread-image {
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.btn-outline-primary {
  color: #0d6efd;
  border-color: #0d6efd;
  transition: all 0.2s ease-in-out;
}

.btn-outline-primary:hover {
  background-color: #0d6efd;
  color: white;
}
</style>
