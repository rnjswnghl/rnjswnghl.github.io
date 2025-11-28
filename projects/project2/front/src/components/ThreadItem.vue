<template>
  <div class="thread-item">
    <RouterLink v-if="thread.id" :to="{ name: 'ThreadDetailView', params: { id: thread.id } }" class="thread-link">
      <div class="thread-header">
        <div class="thread-user">
          <span class="username">작성자: {{ thread.author || '알 수 없음' }}</span>
        </div>
        <div class="thread-meta">
          <span class="thread-date">{{ formatDate(thread.created_at) }}</span>
          <div class="thread-stats">
            <span class="stat-item">
              <i class="fas fa-comment"></i>
              {{ thread.comment_count || 0 }}
            </span>
            <span class="stat-item">
              <i class="fas fa-heart"></i>
              {{ thread.like_count || 0 }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="thread-content">
        <h4 class="thread-title">{{ thread.title }}</h4>
        <p class="thread-excerpt">
          {{ thread.content && thread.content.length > 100
            ? thread.content.slice(0, 100) + '...'
            : thread.content || '내용을 불러올 수 없습니다.' }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  thread: {
    type: Object,
    required: true,
  },
})

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
</script>

<style scoped>
.thread-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.thread-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.thread-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.5rem;
}

.thread-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.thread-user {
  display: flex;
  align-items: center;
}

.username {
  font-weight: 600;
  color: #333;
}

.thread-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.thread-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.thread-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.stat-item i {
  font-size: 0.9rem;
}

.thread-content {
  margin-bottom: 1rem;
}

.thread-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  line-height: 1.4;
}

.thread-excerpt {
  margin: 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .thread-link {
    padding: 1rem;
  }

  .thread-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .thread-meta {
    width: 100%;
    justify-content: space-between;
  }

  .thread-title {
    font-size: 1.1rem;
  }

  .thread-excerpt {
    font-size: 0.9rem;
  }
}
</style>
