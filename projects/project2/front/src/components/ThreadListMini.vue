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
import axios from 'axios'

const recentThreads = ref([])

const fetchRecentThreads = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/threads/posts/')
    recentThreads.value = response.data.slice(0, 3) // 최근 3개만 가져오기
  } catch (error) {
    console.error('최근 쓰레드를 불러오는데 실패했습니다:', error)
  }
}

const getFullImageUrl = (imageUrl) => {
  if (!imageUrl) return ''
  if (imageUrl.startsWith('http')) return imageUrl
  return `http://localhost:8000${imageUrl}`
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
