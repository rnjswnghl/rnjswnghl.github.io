<template>
  <div
    class="toast-container"
    :class="position"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-message" :class="type">
      <slot>
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
  type?: 'success' | 'error' | 'info'
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  position: 'top-right',
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 2000;
  padding: var(--spacing-md);
  pointer-events: none;
}

.toast-message {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  text-align: center;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1.5;
  border: 1px solid var(--color-border);

  /* ✅ 클릭 가능하게 명시 */
  pointer-events: auto;
  animation: slideIn 0.3s ease;
}

.toast-message.success {
  background-color: #F0FDF4;
  color: #166534;
  border-color: #BBF7D0;
}

.toast-message.error {
  background-color: #FEF2F2;
  color: #991B1B;
  border-color: #FECACA;
}

.toast-message.info {
  background-color: #EFF6FF;
  color: #1E40AF;
  border-color: #BFDBFE;
}

.top-right {
  top: var(--spacing-md);
  right: var(--spacing-md);
}

.bottom-right {
  bottom: var(--spacing-md);
  right: var(--spacing-md);
}

.top-left {
  top: var(--spacing-md);
  left: var(--spacing-md);
}

.bottom-left {
  bottom: var(--spacing-md);
  left: var(--spacing-md);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .toast-container {
    padding: var(--spacing-sm);
  }

  .toast-message {
    min-width: 240px;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
  }

  .top-right,
  .bottom-right,
  .top-left,
  .bottom-left {
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    bottom: var(--spacing-sm);
    left: var(--spacing-sm);
  }
}
</style>
