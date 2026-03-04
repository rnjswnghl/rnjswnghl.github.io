<template>
  <!-- 이모지 패널 -->
  <div class="backdrop" @click.self="handleClose">
    <div class="picker">
      <button class="close-btn" @click="handleClose">✕</button>
      <div class="grid">
        <span
          v-for="e in emojis"
          :key="e"
          class="emoji-item"
          @click="handleSelect(e)"
        >{{ e }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 이모지 목록
const emojis = [
  '😀','😂','😍','😎','😭',
  '👍','🎉','🔥','❤️','🙏'
]

const emit = defineEmits<{
  (e: 'select', emoji: string): void
  (e: 'close'): void
}>()

function handleClose() {
  emit('close')
}

function handleSelect(emoji: string) {
  emit('select', emoji)
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000; /* 기존보다 높은 우선순위로 유지 */
}

.picker {
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  width: 300px;
  max-width: 90vw;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.emoji-item {
  font-size: 1.8rem;
  text-align: center;
  cursor: pointer;
}
</style>
