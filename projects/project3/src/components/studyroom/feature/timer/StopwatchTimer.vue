<template>
  <div class="stopwatch-timer">
    ⏱ {{ formattedTime }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  startTimestamp: number
}>()

const now = ref(Date.now())
let intervalId: number | undefined = undefined

const elapsed = computed(() => Math.floor((now.value - props.startTimestamp) / 1000))

const formattedTime = computed(() => {
  const h = Math.floor(elapsed.value / 3600)
  const m = Math.floor((elapsed.value % 3600) / 60)
  const s = elapsed.value % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

onMounted(() => {
  intervalId = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.stopwatch-timer {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  color: #333;
}
</style>
