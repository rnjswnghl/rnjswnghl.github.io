<template>
  <Toast
    type="info"
    position="bottom-left"
  >
    <div class="quiz-toast-content">
      <span>📝 퀴즈가 생성되었습니다!</span>
      <Button
        variant="primary"
        size="sm"
        @click="goToQuiz"
      >
        퀴즈 풀러가기
      </Button>
    </div>
  </Toast>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Toast from '@/components/common/Toast.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()

const goToQuiz = () => {
  router.push('/quiz/play') // 실제 라우터 경로에 맞게 수정 가능
}
</script>

<style scoped>
.quiz-toast-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>
