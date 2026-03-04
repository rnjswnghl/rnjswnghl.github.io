<template>
  <div class="form-group">
    <label class="form-label">학습량 (1일 기준)</label>
    <select class="form-select" :value="modelValue" @change="$emit('update:modelValue', Number($event.target.value))">
      <option disabled value="">학습량 선택</option>
      <option :value="0">하루 30분 이하</option>
      <option :value="1">하루 1~2시간</option>
      <option :value="2">하루 3시간 이상</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number], // 문자열로 들어올 수 있음
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-select {
  max-width: 300px;
}
</style>
