<template>
  <form @submit.prevent="submitForm" class="thread-form">
    <div>
      <label for="title">제목</label>
      <input id="title" v-model="form.title" type="text" required />
    </div>

    <div>
      <label for="content">내용</label>
      <textarea id="content" v-model="form.content" required rows="10"></textarea>
    </div>

    <div>
      <label for="created_at">작성일</label>
      <input id="created_at" v-model="form.created_at" type="date" required />
    </div> 

    <button type="submit" :disabled="isLoading">
      {{ isLoading ? '등록 중...' : '등록' }}
      <span v-if="isLoading" class="spinner"></span>
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { createThread } from '@/utils/api' // API 경로는 실제 위치에 맞게 조정하세요

const props = defineProps({
  bookId: { type: Number, required: true }
})

const emit = defineEmits(['submitted'])
const toast = useToast()

const form = ref({
  title: '',
  content: '',
  created_at: new Date().toISOString().split('T')[0],  // 기본 오늘 날짜
  ai_image_url: 'https://via.placeholder.com/150',  // AI 이미지 URL 기본값
})

const isLoading = ref(false)  // 로딩 상태

const submitForm = async () => {
  isLoading.value = true  // 로딩 시작
  try {
    await createThread({
      book: props.bookId,
      title: form.value.title,
      content: form.value.content,
      created_at: form.value.created_at,
      ai_image_url: form.value.ai_image_url,
    })

    toast.success('쓰레드가 성공적으로 등록되었습니다.')

    // 폼 초기화
    form.value.title = ''
    form.value.content = ''
    form.value.created_at = new Date().toISOString().split('T')[0]
    form.value.ai_image_url = 'https://via.placeholder.com/150'

    emit('submitted')
  } catch (error) {
    toast.error('쓰레드 등록에 실패했습니다.')
    console.error('등록 오류 상세:', error.response?.data || error)
  } finally {
    isLoading.value = false  // 로딩 종료
  }
}
</script>

<style scoped>
.thread-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  background-color: #2c2c2c;
  color: #eee;
  border: 1px solid #555;
  border-radius: 6px;
}

textarea {
  resize: vertical;
}

button {
  align-self: flex-start;
  position: relative;
  padding: 0.6rem 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #45a049;
}

/* 로딩 스피너 스타일 */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #eee;
  border-top: 2px solid #4caf50;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
