<template>
  <button
    class="record-btn"
    :class="isRecording ? 'recording' : 'idle'"
    @click="toggleRecording"
  >
    {{ isRecording ? '녹화 중지' : '녹화 시작' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isRecording = ref(false)
// defineEmits 제네릭을 명시적 형태로 변경
const emit = defineEmits<{
  (e: 'start-record'): void
  (e: 'stop-record'): void
}>()

function toggleRecording() {
  isRecording.value = !isRecording.value
  if (isRecording.value) {
    emit('start-record')
  } else {
    emit('stop-record')
  }
}
</script>

<style scoped>
.record-btn {
  width: 100%;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

/* 녹화 전(시작) 상태: 파란색 */
.record-btn.idle {
  background-color: #6db3f2;
  box-shadow: 0 2px 6px rgba(0, 102, 204, 0.3);
}
.record-btn.idle:hover {
  background-color: #4a99d3;
}

/* 녹화 중 상태: 빨간색 */
.record-btn.recording {
  background-color: #f57c73;
  box-shadow: 0 2px 6px rgba(204, 0, 0, 0.3);
}
.record-btn.recording:hover {
  background-color: #dd5a53;
}
</style>
