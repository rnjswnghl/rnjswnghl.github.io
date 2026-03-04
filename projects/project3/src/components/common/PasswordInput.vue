<template>
  <div class="password-input-wrapper">
    <input
      :id="id"
      v-model="inputValue"
      :type="showPassword ? 'text' : 'password'"
      class="form-control password-input"
      :placeholder="placeholder"
      :required="required"
      :pattern="pattern"
      :maxlength="maxlength"
      @input="handleInput"
    />
    <button
      type="button"
      class="password-toggle-btn"
      @click="showPassword = !showPassword"
      :title="showPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
    >
      {{ showPassword ? '🙈' : '👀' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string | undefined
  id?: string
  placeholder?: string
  required?: boolean
  pattern?: string
  maxlength?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '비밀번호를 입력하세요',
  required: false,
  pattern: undefined,
  maxlength: undefined
})

const emit = defineEmits<Emits>()

const showPassword = ref(false)

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value: string) => emit('update:modelValue', value)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  padding-right: 3rem;
}

.password-toggle-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.password-toggle-btn:hover {
  background-color: #f8f9fa;
}
</style>
