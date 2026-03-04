<template>
  <header class="toolbar">
    <div class="main-tools">
      <button
        v-for="t in toolOptions"
        :key="t.name"
        :class="{ selected: tool === t.value }"
        @click="emit('select-tool', t.value)"
        :title="t.name"
      >
        <component :is="t.icon" :size="20" />
      </button>

      <input
        v-if="tool === 'color'"
        type="color"
        :value="color"
        @input="(e) => emit('update-color', (e.target as HTMLInputElement).value)"
        title="색상 선택"
      />
    </div>

    <div v-if="tool === 'eraser'" class="eraser-size">
      지우개 크기
      <input
        type="range"
        :value="eraserSize"
        min="5"
        max="50"
        @input="(e) => emit('update-eraser-size', Number((e.target as HTMLInputElement).value))"
      />
    </div>

    <div v-if="tool === 'shape'" class="shape-tools">
      <button
        v-for="s in shapeOptions"
        :key="s.name"
        :class="{ selected: shape === s.value }"
        @click="emit('select-shape', s.value)"
      >
        {{ s.icon }}
      </button>
    </div>

    <button class="close-btn" @click="emit('close')">❌ 닫기</button>
  </header>
</template>

<script setup lang="ts">
import { Pencil, Eraser, Square, Text, Palette } from 'lucide-vue-next'
import type { Component } from 'vue'

defineProps<{
  tool: string
  shape: string
  color: string
  eraserSize: number
}>()

const emit = defineEmits<{
  (e: 'select-tool', value: string): void
  (e: 'select-shape', value: string): void
  (e: 'update-color', value: string): void
  (e: 'update-eraser-size', value: number): void
  (e: 'close'): void
}>()

const toolOptions = [
  { name: '펜', value: 'pen', icon: Pencil },
  { name: '지우개', value: 'eraser', icon: Eraser },
  { name: '도형', value: 'shape', icon: Square },
  { name: '텍스트', value: 'text', icon: Text },
  { name: '색상', value: 'color', icon: Palette },
]

const shapeOptions = [
  { name: '사각형', value: 'rect', icon: '⬛' },
  { name: '원', value: 'circle', icon: '⚪' },
  { name: '삼각형', value: 'triangle', icon: '🔺' },
  { name: '다각형', value: 'polygon', icon: '🔷' },
]
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  background-color: #f0f4f8;
  padding: 8px 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10001;
}
.selected {
  background-color: #d0e8ff;
  border-radius: 4px;
}
.close-btn {
  margin-left: auto;
  margin-right: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px 8px;
}
</style>
