<template>
  <Transition name="slide-up">
    <div
      v-if="visible"
      class="study-notification-toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-content">
        <div class="study-info">
          <div class="study-name">{{ studyName }}</div>
          <div class="study-time">{{ remainingTime }} 후 시작</div>
        </div>
        <button class="close-btn" @click="closeToast" aria-label="알림 닫기">
          ×
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  studyName: string
  startTime: string
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const remainingTime = ref('')

const closeToast = () => {
  emit('close')
}

const updateRemainingTime = () => {
  const now = new Date()
  const [hours, minutes] = props.startTime.split(':').map(Number)
  const studyTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)

  const diff = studyTime.getTime() - now.getTime()
  const minutesLeft = Math.floor(diff / (1000 * 60))

  if (minutesLeft <= 0) {
    remainingTime.value = '곧 시작'
  } else if (minutesLeft < 60) {
    remainingTime.value = `${minutesLeft}분`
  } else {
    const hoursLeft = Math.floor(minutesLeft / 60)
    const remainingMinutes = minutesLeft % 60
    remainingTime.value = `${hoursLeft}시간 ${remainingMinutes}분`
  }
}

let timer: NodeJS.Timeout | null = null

onMounted(() => {
  updateRemainingTime()
  timer = setInterval(updateRemainingTime, 1000) // 1초마다 업데이트
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.study-notification-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2000;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.toast-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.study-info {
  flex: 1;
}

.study-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.2;
}

.study-time {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* 애니메이션 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

/* 반응형 */
@media (max-width: 768px) {
  .study-notification-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
    min-width: auto;
    max-width: none;
  }

  .study-name {
    font-size: 15px;
  }

  .study-time {
    font-size: 13px;
  }
}
</style>
