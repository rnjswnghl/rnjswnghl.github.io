<template>
  <footer class="footer-menu">
    <MenuToggle :isLeader="props.isLeader" @select-tool="handleMenuClick" />
    <button @click="onChangeBackground">배경화면 조정</button>
    <button @click="onToggleMic">
      {{ micOn ? '마이크 off' : '마이크 on' }}
    </button>
    <button @click="onToggleCamera">
      {{ cameraOn ? '카메라 off' : '카메라 on' }}
    </button>

    <!-- 이모지 선택기 열기용 버튼 -->
    <button @click="emitEmojiClick">😊</button>

    <button @click="onExit">나가기</button>
  </footer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import MenuToggle from './MenuToggle.vue'

const props = defineProps<{
  isLeader: boolean
  micOn: boolean
  cameraOn: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
  (e: 'change-background'): void
  (e: 'toggle-mic'): void
  (e: 'toggle-camera'): void
  (e: 'emojiClick'): void          // 피커 열기용 이벤트 (이전의 'emoji'와 분리)
  (e: 'emoji', coords: { x: number; y: number }): void // 실제 이모지 좌표 이벤트
  (e: 'exit'): void
  (e: 'open-stopwatch-setting'): void
  (e: 'open-pomodoro-setting'): void
  (e: 'stop-pomodoro'): void
  (e: 'open-whiteboard'): void
  (e: 'open-screen-share'): void
}>()

function handleMenuClick(tool: string) {
  if (tool === 'stopwatch') {
    emit('open-stopwatch-setting')
  } else if (tool === 'pomodoro') {
    if (props.isLeader) {
      emit('open-pomodoro-setting')
    }
  } else if (tool === 'stop-pomodoro') {
    if (props.isLeader) {
      emit('stop-pomodoro')
    }
  } else if (tool === 'whiteboard') {
    emit('open-whiteboard')
  } else if (tool === 'screen') {
    emit('open-screen-share')
  }
}

function onChangeBackground() {
  emit('change-background')
}

function onToggleMic() {
  emit('toggle-mic')
}

function onToggleCamera() {
  emit('toggle-camera')
}

// 새로 분리한 이모지 피커 토글용 이벤트 emit 함수
function emitEmojiClick() {
  emit('emojiClick')
}

function onExit() {
  emit('exit')
}
</script>

<style scoped>
.footer-menu {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  position: relative;
}

button {
  background-color: #a3d5f7;
  color: white;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border: 1px solid #4a99d3;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #81c3d7;
}
</style>
