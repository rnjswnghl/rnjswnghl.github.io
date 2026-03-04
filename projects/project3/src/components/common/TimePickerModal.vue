<template>
  <div v-if="visible" class="time-picker-overlay" @click="handleOverlayClick">
    <div class="time-picker-modal" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">시간대 선택</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>

      <div class="time-grid">
        <button
          v-for="time in timeOptions"
          :key="time.value"
          class="time-option"
          :class="{ selected: selectedTime === time.value }"
          @click="selectTime(time.value)"
        >
          {{ time.label }}
        </button>
      </div>

      <div class="modal-footer">
        <Button variant="outline" @click="$emit('close')">취소</Button>
        <Button variant="primary" @click="confirmSelection">확인</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/common/Button.vue'

interface Props {
  visible: boolean
  modelValue?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 정각 시간 옵션 (24시간 형식)
const timeOptions = [
  { value: '06:00', label: '오전 6:00' },
  { value: '07:00', label: '오전 7:00' },
  { value: '08:00', label: '오전 8:00' },
  { value: '09:00', label: '오전 9:00' },
  { value: '10:00', label: '오전 10:00' },
  { value: '11:00', label: '오전 11:00' },
  { value: '12:00', label: '오후 12:00' },
  { value: '13:00', label: '오후 1:00' },
  { value: '14:00', label: '오후 2:00' },
  { value: '15:00', label: '오후 3:00' },
  { value: '16:00', label: '오후 4:00' },
  { value: '17:00', label: '오후 5:00' },
  { value: '18:00', label: '오후 6:00' },
  { value: '19:00', label: '오후 7:00' },
  { value: '20:00', label: '오후 8:00' },
  { value: '21:00', label: '오후 9:00' },
  { value: '22:00', label: '오후 10:00' },
  { value: '23:00', label: '오후 11:00' },
  { value: '00:00', label: '오전 12:00' },
  { value: '01:00', label: '오전 1:00' },
  { value: '02:00', label: '오전 2:00' },
  { value: '03:00', label: '오전 3:00' },
  { value: '04:00', label: '오전 4:00' },
  { value: '05:00', label: '오전 5:00' }
]

const selectedTime = computed({
  get: () => props.modelValue || '',
  set: (value: string) => emit('update:modelValue', value)
})

function selectTime(time: string) {
  selectedTime.value = time
}

function confirmSelection() {
  if (selectedTime.value) {
    emit('close')
  }
}

function handleOverlayClick() {
  emit('close')
}
</script>

<style scoped>
.time-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.time-picker-modal {
  background: white;
  border-radius: 1rem;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #e9ecef;
  color: #495057;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  padding: 2rem;
  max-height: 400px;
  overflow-y: auto;
}

.time-option {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  background: white;
  color: #495057;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.time-option:hover {
  border-color: #d79c94;
  color: #d79c94;
  transform: translateY(-1px);
}

.time-option.selected {
  background-color: #d79c94;
  border-color: #d79c94;
  color: white;
  box-shadow: 0 2px 8px rgba(215, 156, 148, 0.3);
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

/* 스크롤바 스타일링 */
.time-grid::-webkit-scrollbar {
  width: 6px;
}

.time-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.time-grid::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.time-grid::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .time-picker-modal {
    width: 95%;
    margin: 1rem;
  }

  .time-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
    padding: 1.5rem;
  }

  .modal-header,
  .modal-footer {
    padding: 1rem 1.5rem;
  }

  .time-option {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
}
</style>
