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
    // 백엔드 없이 목데이터만 사용
    isLiked.value = !isLiked.value
    if (isLiked.value) {
      likeCount.value += 1
    } else {
      likeCount.value = Math.max(0, likeCount.value - 1)
    }
    emit('update-like', { liked: isLiked.value, likeCount: likeCount.value })
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
  