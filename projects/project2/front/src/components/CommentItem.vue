<template>
  <div class="comment-item">
    <div class="comment-header">
      <strong>{{ comment.author }}</strong>
      <span class="date">{{ formatDate(comment.created_at) }}</span>
    </div>

    <div class="comment-body">
      <p class="comment-content">{{ comment.content }}</p>

      <span
        v-if="comment.author === currentUser"
        @click="$emit('delete-comment', comment.id)"
        class="delete-text"
      >
        삭제
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  comment: Object,
  currentUser: String,
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}
</script>

<style scoped>
.comment-item {
  border-bottom: 1px solid #eee;
  padding: 0.5rem 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.comment-body {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.comment-content {
  margin: 0;
  white-space: pre-line;
  flex-grow: 1;
}

.delete-text {
  color: #ff4d4d;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
}

.delete-text:hover {
  text-decoration: underline;
}
</style>
