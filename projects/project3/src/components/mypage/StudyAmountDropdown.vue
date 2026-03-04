<template>
  <select class="form-select" :value="modelValue" @change="$emit('update:modelValue', Number($event.target.value))">
    <option disabled value="">학습량 선택</option>
    <option :value="0">하루 30분 이하</option>
    <option :value="1">하루 1~2시간</option>
    <option :value="2">하루 3시간 이상</option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-select {
  padding: 0.6rem 0.875rem;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  background: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  max-width: 300px;
}

.form-select:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
  transform: translateY(-1px);
}
</style>
