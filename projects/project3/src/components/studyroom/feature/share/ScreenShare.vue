<template>
  <div class="overlay">
    <div class="popup">
      <h2>📺 화면 공유</h2>
      <button @click="startScreenShare" class="share-btn">화면 공유 시작</button>
      <button @click="$emit('close')" class="cancel-btn">닫기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  ownerId: number // 공유자 ID
}>()

const emit = defineEmits<{
  (e: 'start', stream: MediaStream | null, ownerId?: number): void
  (e: 'close'): void
}>()

// 화면 공유 시작
const startScreenShare = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })

    // 공유 시작 → stream + ownerId 전달
    emit('start', stream, props.ownerId)
    emit('close')

    // 공유 종료 감지 → 상위 컴포넌트에 종료 알림
    stream.getVideoTracks()[0].addEventListener('ended', () => {
      console.log('📴 화면 공유 종료됨')
      emit('start', null) // stream 종료 시 null 전달
    })
  } catch (err) {
    console.error('❌ 화면 공유 실패:', err)
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  min-width: 320px;
  text-align: center;
}

.share-btn,
.cancel-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.share-btn {
  background-color: #6db3f2;
  color: white;
}

.cancel-btn {
  background-color: #ddd;
  color: #333;
  margin-left: 1rem;
}
</style>
