<!-- src/components/studyroom/feature/popup/QuizGeneratedToast.vue -->
<template>
  <Toast v-if="visible" position="top-right" :auto-hide="false" class="w-80 z-50">
    <template #default>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-lg">🎯</span>
          <p class="text-sm font-semibold">퀴즈가 생성되었습니다!</p>
        </div>
        <p class="text-xs text-gray-600 mb-3">GPT가 업로드된 파일을 분석하여 퀴즈를 만들었어요</p>

        <!-- ✅ 퀴즈 보기 버튼 -->
        <BaseButton
          @click="handleViewQuiz"
          variant="primary"
          size="sm"
        >
          퀴즈 보기
        </BaseButton>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts">
import Toast from '@/components/common/Toast.vue'
import BaseButton from '@/components/common/Button.vue'

/**
 * GPT 퀴즈 생성 완료 알림 토스트
 */
const props = defineProps<{
  visible: boolean
}>()

/**
 * 이벤트:
 * - view-quiz: 퀴즈 보기 요청
 */
const emit = defineEmits<{
  (e: 'view-quiz'): void
}>()

function handleViewQuiz() {
  emit('view-quiz')
}
</script>

