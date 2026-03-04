<template>
  <select class="form-select" :value="modelValue" @change="$emit('update:modelValue', Number($event.target.value))">
    <option disabled value="">시간대 선택</option>
    <option v-for="option in timeOptions" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])

const timeOptions = [
  { value: 1, label: '오전 (09:00~12:00)' },
  { value: 2, label: '오후 (13:00~18:00)' },
  { value: 3, label: '저녁 (19:00~22:00)' },
  { value: 4, label: '새벽 (23:00~06:00)' }
]
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
