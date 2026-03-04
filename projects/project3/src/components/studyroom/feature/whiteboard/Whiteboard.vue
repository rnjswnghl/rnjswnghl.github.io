<template>
  <div class="whiteboard-container">
    <Toolbar
      :tool="tool"
      :shape="shape"
      :color="color"
      :eraser-size="eraserSize"
      @selectTool="selectTool"
      @selectShape="selectShape"
      @updateColor="handleUpdateColor"
      @updateEraserSize="handleUpdateEraserSize"
      @close="$emit('close')"
    />

    <CanvasLayer
      :tool="tool"
      :shape="shape"
      :color="color"
      :eraser-size="eraserSize"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Toolbar from './Toolbar.vue'
import CanvasLayer from './CanvasLayer.vue'

// 부모에게 close 이벤트 전달
defineEmits(['close'])

// 상태 정의
const tool = ref<'pen' | 'eraser' | 'text' | 'shape' | 'color'>('pen')
const shape = ref<'rect' | 'circle' | 'triangle' | 'polygon'>('rect')
const color = ref('#000000')
const eraserSize = ref(20)

// 툴 선택 핸들러
function selectTool(val: typeof tool.value) {
  tool.value = val
}

// 도형 선택 핸들러
function selectShape(val: typeof shape.value) {
  shape.value = val
}

// 색상 업데이트 핸들러
function handleUpdateColor(val: string) {
  color.value = val
}

// 지우개 크기 업데이트 핸들러
function handleUpdateEraserSize(val: number) {
  eraserSize.value = val
}
</script>

<style scoped>
.whiteboard-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 9999;
}
</style>
