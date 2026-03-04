<template>
  <Toast v-if="visible" type="info" position="top-right">
    <template #default>
      <div class="toast-content">
        <div class="message-section">
          <div class="icon">📷</div>
          <div class="text">
            <div class="title">카메라 켜기 요청</div>
            <div class="description">{{ message }}</div>
          </div>
        </div>
        <div class="actions">
          <button class="camera-btn" @click="turnOnCamera">
            카메라 켜기
          </button>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Toast from '@/components/common/Toast.vue'

const props = defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  (e: 'turn-on-camera'): void
}>()

// Toast 표시 여부 제어
const visible = ref(true)

// 메시지가 바뀔 때마다 다시 보이도록 함
watch(
  () => props.message,
  () => {
    visible.value = true
  },
  { immediate: true }
)

// 카메라 켜기 버튼 클릭
function turnOnCamera() {
  emit('turn-on-camera')
  visible.value = false
}
</script>

<style scoped>
.toast-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 300px;
}

.message-section {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.text {
  flex: 1;
}

.title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #1a202c;
}

.description {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.4;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.camera-btn {
  background-color: #6db3f2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.camera-btn:hover {
  background-color: #5aa1e0;
}
</style>
