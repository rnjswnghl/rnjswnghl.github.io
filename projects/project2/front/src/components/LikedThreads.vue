<template>
  <div class="liked-threads">
    <div v-if="threads.length === 0" class="empty-state">
      <i class="fas fa-heart"></i>
      <p>아직 좋아요한 쓰레드가 없습니다.</p>
    </div>
    <div v-else class="thread-list">
      <div v-for="thread in threads" :key="thread.id" class="thread-item" @click="goToThreadDetail(thread.id)" style="cursor: pointer;">
        <div class="thread-header">
          <h3>{{ thread.title }}</h3>
          <span class="thread-date">{{ new Date(thread.created_at).toLocaleDateString() }}</span>
        </div>
        <div class="thread-content">
          <p>{{ thread.content }}</p>
        </div>
        <div class="thread-footer">
          <div class="thread-meta">
            <span class="author">{{ thread.author }}</span>
            <span class="book">{{ thread.book_detail?.title }}</span>
          </div>
          <div class="thread-stats">
            <span class="likes">
              <i class="fas fa-heart"></i>
              {{ thread.like_count }}
            </span>
            <span class="comments">
              <i class="fas fa-comment"></i>
              {{ thread.comments.length }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

const router = useRouter()
const threads = ref([])

const goToThreadDetail = (threadId) => {
  router.push(`/threads/${threadId}`)
}

const fetchLikedThreads = async () => {
  try {
    console.log('좋아요한 쓰레드 요청 시작')
    const response = await api.get('threads/liked/')
    console.log('좋아요한 쓰레드 응답:', response.data)
    threads.value = response.data
  } catch (error) {
    console.error('좋아요한 쓰레드 로딩 실패:', error)
    console.error('에러 상세:', error.response?.data)
  }
}

onMounted(() => {
  fetchLikedThreads()
})
</script>

<style scoped>
.liked-threads {
  padding: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state i {
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.thread-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.thread-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.thread-item:hover {
  transform: translateY(-2px);
}

.thread-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.thread-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.thread-date {
  color: #666;
  font-size: 0.9rem;
}

.thread-content {
  color: #444;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.thread-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.thread-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.thread-stats {
  display: flex;
  gap: 1rem;
}

.thread-stats span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.thread-stats i {
  color: #ff6b6b;
}

.thread-stats .comments i {
  color: #4da3ff;
}
</style> 