<template>
  <div class="menu-dropdown" @click.stop>
    <div class="menu-item" @click="handleClick('layout', $event)">레이아웃 변경</div>
    <div
      v-if="isLeader"
      class="menu-item"
      @click="handleClick('pomodoro', $event)"
    >
      뽀모도로
    </div>
    <div class="menu-item" @click="handleClick('stopwatch', $event)">스탑워치</div>
    <div class="menu-item" @click="handleClick('whiteboard', $event)">화이트보드</div>
    <div class="menu-item" @click="handleClick('screen', $event)">화면 공유</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLeader: boolean
}>()

const emit = defineEmits<{
  (e: 'click', name: 'layout' | 'pomodoro' | 'stopwatch' | 'whiteboard' | 'screen'): void
}>()

function handleClick(name: 'layout' | 'pomodoro' | 'stopwatch' | 'whiteboard' | 'screen', event: MouseEvent) {
  event.stopPropagation()
  console.log('[MenuDropdown] 선택한 항목:', name)
  emit('click', name)
}
</script>

<style scoped>
.menu-dropdown {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 4px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 160px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.menu-item {
  cursor: pointer;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: #f5f5f5;
}
</style>
