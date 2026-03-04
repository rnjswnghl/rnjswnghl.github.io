<template>
  <div class="search-input">
    <label class="form-label">스터디명</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      class="form-control"
      placeholder="검색할 스터디명을 입력하세요"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.search-input {
  margin-bottom: 1.5rem;
}
</style>
