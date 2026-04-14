<template>
  <div v-if="visible" class="modal-backdrop" @click.self="handleClose">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- HEADER -->
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title">알림</slot>
          </h5>
          <button class="close-btn" @click="handleClose" aria-label="닫기">&times;</button>
        </div>

        <!-- BODY -->
        <div class="modal-body">
          <slot />
        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <slot name="footer">
            <button class="btn-outline" @click="handleClose">닫기</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
interface Props {
  visible: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  },
  { immediate: true },
)
</script>

<style scoped>
/* 배경 블러 & 어둡게 */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

/* 모달 박스 */
.modal-dialog {
  background: var(--color-background);
  border-radius: 0.75rem;
  width: 90%;
  max-width: 500px;
  padding: var(--spacing-lg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.25s ease;
  max-height: 86vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
}

/* 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

/* 닫기 버튼 */
.close-btn {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  line-height: 1;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.2s ease;
  padding: var(--spacing-xs);
  border-radius: 0.25rem;
}

.close-btn:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}

/* 바디 */
.modal-body {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
  overflow-y: auto;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* 푸터 */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

/* 기본 버튼 */
.btn-outline {
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 0.5rem;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.2rem rgba(215, 156, 148, 0.25);
}

.btn-outline:hover {
  background-color: var(--color-surface);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 768px) {
  .modal-dialog {
    width: 95%;
    padding: var(--spacing-md);
  }

  .modal-title {
    font-size: var(--font-size-lg);
  }

  .modal-body {
    font-size: var(--font-size-sm);
  }

  .btn-outline {
    font-size: var(--font-size-sm);
    padding: var(--spacing-xs) var(--spacing-md);
  }
}
</style>
