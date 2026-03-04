<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  value?: any  // ✅ 추가: 클릭 시 넘길 값
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const base = 'custom-btn'
  const variantClass = `btn-${props.variant}`
  const sizeClass = `btn-${props.size}`
  return [base, variantClass, sizeClass, props.disabled && 'btn-disabled']
})

function handleClick(event: MouseEvent) {
  emit('click', props.value ?? event)  // ✅ value가 있으면 그걸 emit, 없으면 MouseEvent 전달
}
</script>

<style scoped>
.custom-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
  line-height: 1.5;
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  min-height: 2rem;
}

.btn-md {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-base);
  min-height: 2.5rem;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  min-height: 3rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 2px 4px rgba(215, 156, 148, 0.2);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(215, 156, 148, 0.3);
}

.btn-secondary {
  background: var(--color-secondary);
  color: white;
  box-shadow: 0 2px 4px rgba(246, 114, 128, 0.2);
}

.btn-secondary:hover {
  background: #ee5c6b;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(246, 114, 128, 0.3);
}

.btn-success {
  background: #63c76a;
  color: white;
  box-shadow: 0 2px 4px rgba(99, 199, 106, 0.2);
}

.btn-success:hover {
  background: #4ebd56;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(99, 199, 106, 0.3);
}

.btn-danger {
  background: #f67280;
  color: white;
  box-shadow: 0 2px 4px rgba(246, 114, 128, 0.2);
}

.btn-danger:hover {
  background: #ee5c6b;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(246, 114, 128, 0.3);
}

.btn-warning {
  background: var(--color-accent);
  color: #444;
  box-shadow: 0 2px 4px rgba(251, 210, 106, 0.2);
}

.btn-warning:hover {
  background: #f9c947;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(251, 210, 106, 0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(215, 156, 148, 0.3);
}

.btn-disabled {
  background: var(--color-text-muted) !important;
  color: var(--color-text-secondary) !important;
  cursor: not-allowed;
  pointer-events: none;
  border: none;
  transform: none !important;
  box-shadow: none !important;
}

@media (max-width: 768px) {
  .btn-sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
  }

  .btn-md {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-sm);
  }

  .btn-lg {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: var(--font-size-base);
  }
}
</style>
