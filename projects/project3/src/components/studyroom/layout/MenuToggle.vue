<template>
  <div class="menu-wrapper" ref="menuRef">
    <button @click.stop="toggleMenu" class="menu-button">☰ 메뉴</button>
    <MenuDropdown
      v-if="isOpen"
      class="dropdown"
      :isLeader="isLeader"
      @click="handleMenuClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MenuDropdown from './MenuDropdown.vue'

// ✅ props: isLeader 여부 받기
const props = defineProps<{
  isLeader: boolean
}>()

// ✅ emit 정의
const emit = defineEmits<{
  (e: 'select-tool', name: string): void
}>()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleMenuClick = (name: string) => {
  console.log('[MenuToggle] 선택한 메뉴:', name)
  emit('select-tool', name)
  isOpen.value = false
}

// 드롭다운 바깥 클릭 시 닫기
const handleOutsideClick = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.menu-wrapper {
  position: relative;
}

.menu-button {
  padding: 0.5rem 1rem;
  background-color: #A3D5F7;
  color: white;
  font-weight: bold;
  border: 1px solid #4a99d3;
}

.dropdown {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 8px;
}
</style>
