<template>
  <div class="form-group">
    <label class="form-label">선호 시간대</label>
    <select class="form-select" :value="modelValue" @change="$emit('update:modelValue', Number($event.target.value))">
      <option disabled value="">시간대 선택</option>
      <option v-for="option in timeOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number], // 처음 진입 시 공백일 수 있으므로 문자열도 허용
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
  max-width: 300px;
}
</style>
