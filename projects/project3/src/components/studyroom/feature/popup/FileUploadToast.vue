<!-- src/components/studyroom/feature/popup/FileUploadToast.vue -->
<template>
  <Toast v-if="visible" position="bottom-right" :auto-hide="false" class="w-80 z-50">
    <template #default>
      <div class="p-4">
        <p class="text-sm font-semibold mb-1">스터디 종료 10분 전입니다!</p>
        <p class="text-xs text-gray-600 mb-3">오늘 학습한 파일을 업로드해주세요</p>

        <!-- ✅ 프로젝트 공통 버튼 재사용 -->
        <BaseButton
          @click="handleUpload"
          variant="primary"
          size="sm"
        >
          파일 업로드
        </BaseButton>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts">
import Toast from '@/components/common/Toast.vue'
import BaseButton from '@/components/common/Button.vue'

/**
 * 부모가 표시 여부를 완전히 제어하도록 리팩터링:
 * - visible: 토스트 표시 여부 (필수)
 */
const props = defineProps<{
  visible: boolean
}>()

/**
 * 이벤트:
 * - open-modal: 모달 열어달라는 신호(권장, 새 이름)
 * - upload: 기존 호환용 이벤트(이미 쓰고 있다면 그대로 동작)
 */
const emit = defineEmits<{
  (e: 'open-modal'): void
  (e: 'upload'): void
}>()

function handleUpload() {
  // 하위 호환: 기존 'upload'도 함께 발행
  emit('open-modal')
  emit('upload')
  // ❌ 토스트 숨김은 하지 않음: "업로드 완료 전까지 유지"를 위해 부모가 상태 관리
}
</script>
