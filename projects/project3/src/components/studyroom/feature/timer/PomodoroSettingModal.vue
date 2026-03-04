<template>
  <Modal :visible="true" @close="onClose">
    <template #title>
      뽀모도로 타이머 설정
    </template>

    <!-- 바디 -->
    <div class="form-group">
      <label>
        집중 시간 (분)
        <input type="number" v-model.number="focus" min="1" max="120" />
      </label>

      <label>
        휴식 시간 (분)
        <input type="number" v-model.number="breakTime" min="1" max="60" />
      </label>

      <label>
        반복 횟수
        <input type="number" v-model.number="cycles" min="1" max="10" />
      </label>
    </div>

    <!-- 버튼 영역 -->
    <template #footer>
      <Button variant="secondary" @click="onClose">취소</Button>
      <Button variant="primary" @click="confirm">확인</Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/common/Modal.vue'
import Button from '@/components/common/Button.vue'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', config: { focus: number; break: number; cycles: number }): void
}>()

const focus = ref(25)
const breakTime = ref(5)
const cycles = ref(1)

function onClose() {
  emit('close')
}

function confirm() {
  // 유효성 검사
  if (focus.value < 1 || breakTime.value < 1 || cycles.value < 1) {
    alert('모든 값을 1 이상으로 설정해주세요.')
    return
  }

  if (focus.value > 120) {
    alert('집중 시간은 120분 이하로 설정해주세요.')
    return
  }

  if (breakTime.value > 60) {
    alert('휴식 시간은 60분 이하로 설정해주세요.')
    return
  }

  if (cycles.value > 10) {
    alert('반복 횟수는 10회 이하로 설정해주세요.')
    return
  }

  // 설정 적용
  emit('confirm', {
    focus: focus.value,
    break: breakTime.value,
    cycles: cycles.value
  })
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;
  color: #333;
}

input[type='number'] {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input[type='number']:focus {
  outline: none;
  border-color: #6db3f2;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
