<template>
  <div class="pomodoro-timer">
    <div
      class="progress-bar"
      :style="{
        width: progressWidth + '%',
        backgroundColor: isBreak ? '#4CAF50' : '#1976D2' // 더 진한 초록/파랑
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onUnmounted } from 'vue'

interface Props {
  focus: number
  break: number
  cycles: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'done'): void
}>()

const isBreak = ref(false)
const isRunning = ref(true)
const remainingTime = ref(props.focus * 60)
const currentCycle = ref(0)
const totalCycles = props.cycles

let interval: ReturnType<typeof setInterval> | null = null  // ✅ 타입 수정

const totalTime = computed(() =>
  isBreak.value ? props.break * 60 : props.focus * 60
)

const progressWidth = computed(() =>
  (remainingTime.value / totalTime.value) * 100
)

const startTimer = () => {
  if (interval) return  // 중복 방지
  interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      if (!isBreak.value) {
        isBreak.value = true
        remainingTime.value = props.break * 60
      } else {
        currentCycle.value++
        if (currentCycle.value >= totalCycles) {
          if (interval) clearInterval(interval)
          interval = null
          isRunning.value = false
          emit('done')
          return
        }
        isBreak.value = false
        remainingTime.value = props.focus * 60
      }
    }
  }, 1000)
}

watchEffect(() => {
  if (isRunning.value && !interval) startTimer()
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
})
</script>

<style scoped>
.pomodoro-timer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
}

.progress-bar {
  height: 6px;
  transition: width 1s linear;
}
</style>
