<template>
  <Modal :visible="true" @close="$emit('close')">
    <template #title>
      스탑워치 설정
    </template>

    <template #default>
      <div class="input-group">
        <label>시간 설정 :</label>
        <input v-model.number="minutes" type="number" min="0" /> 분
        <input v-model.number="seconds" type="number" min="0" max="59" /> 초
      </div>

      <div class="input-group">
        <label>
          <input type="checkbox" v-model="autoRepeat" />
          자동 반복
        </label>
      </div>
    </template>

    <template #footer>
      <Button @click="$emit('close')">취소</Button>
      <Button @click="confirm" class="primary">적용</Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/common/Modal.vue'
import Button from '@/components/common/Button.vue'

const minutes = ref(0)
const seconds = ref(0)
const autoRepeat = ref(false)

const emit = defineEmits<{
  (e: 'confirm', payload: { duration: number; autoRepeat: boolean }): void
  (e: 'close'): void
}>()

const confirm = () => {
  const duration = minutes.value * 60 + seconds.value
  if (duration > 0) {
    emit('confirm', { duration, autoRepeat: autoRepeat.value })
  } else {
    alert('1초 이상 설정해야 합니다.')
  }
}
</script>

<style scoped>
.input-group {
  margin: 1rem 0;
}
.input-group input {
  width: 60px;
  margin-left: 0.5rem;
}
</style>
