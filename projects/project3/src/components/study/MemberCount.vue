<template>
  <div class="form-group">
    <label class="form-label">인원수</label>
    <div class="member-buttons">
      <Button
        v-for="range in memberOptions"
        :key="range"
        type="button"
        class="btn-member"
        :class="{ selected: modelValue === range }"
        @click="$emit('update:modelValue', range)"
      >
        {{ range }}명
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/common/Button.vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const memberOptions = ['2~3', '4~6', '7~10', '11~15', '16+']
</script>

<style scoped>
.member-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-member {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-member:hover {
  background-color: #f0f0f0;
}

.btn-member.selected {
  background-color: #5e48f3;
  color: white;
  border-color: #5e48f3;
}
</style>
