<template>
    <button @click="toggleLike" :class="{ liked: isLiked }" class="like-button">
        ❤️ {{ likeCount }}
    </button>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '@/utils/api.js'  // api 인스턴스 import
  
  const props = defineProps({
    threadId: Number,
    initialLiked: Boolean,
    initialLikeCount: Number,
  })
  
  const emit = defineEmits(['update-like'])
  
  const isLiked = ref(props.initialLiked)
  const likeCount = ref(props.initialLikeCount)
  
  async function toggleLike() {
    try {
      // api.js에 맞게 경로 수정 (posts 포함)
      const res = await api.post(`threads/posts/${props.threadId}/toggle-like/`)
      isLiked.value = res.data.liked
      likeCount.value = res.data.like_count
      emit('update-like', { liked: isLiked.value, likeCount: likeCount.value })
    } catch (error) {
      alert('좋아요 토글 중 오류가 발생했습니다.')
    }
  }
  </script>
  
  <style scoped>
  .like-button {
    cursor: pointer;
    border: none;
    background: none;
    font-size: 1.2rem;
  }
  
  .liked {
    color: red;
  }
  </style>
  