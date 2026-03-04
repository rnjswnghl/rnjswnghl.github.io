<template>
  <div class="stopwatch-overlay">
    <div class="stopwatch-box">
      <h2>⏱ 스탑워치</h2>
      <div class="time-display">{{ formattedTime }}</div>

      <div class="controls">
        <button @click="togglePause">{{ isPaused ? '▶ 재시작' : '⏸ 일시정지' }}</button>
        <button @click="reset">🔁 리셋</button>
        <button @click="$emit('close')">❌ 닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

interface Props {
  setting: {
    duration: number // 초 단위
    autoRepeat: boolean
  }
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'end']) // ✅ end 이벤트 추가

const timeLeft = ref(props.setting.duration)
const isPaused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null // ✅ 수정된 부분

const formattedTime = computed(() => {
  const min = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
  const sec = (timeLeft.value % 60).toString().padStart(2, '0')
  return `${min}:${sec}`
})

const startTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (!isPaused.value && timeLeft.value > 0) {
      timeLeft.value--
    } else if (timeLeft.value === 0) {
      if (props.setting.autoRepeat) {
        timeLeft.value = props.setting.duration
      } else {
        clearInterval(timer!)
        emit('end') // ✅ 종료 이벤트 발생
      }
    }
  }, 1000)
}

const togglePause = () => {
  isPaused.value = !isPaused.value
}

const reset = () => {
  timeLeft.value = props.setting.duration
  isPaused.value = false
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.stopwatch-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 타이머 외 영역 클릭 방지 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.stopwatch-box {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  pointer-events: auto;
}

.time-display {
  font-size: 3rem;
  margin: 1rem 0;
  font-weight: bold;
}

.controls button {
  margin: 0.3rem;
  padding: 0.5rem 1rem;
}
</style>
