<template>
  <div v-if="selectedDays.length > 0" class="schedule-item">
    <label class="sub-label">요일별 시간 설정</label>
    <div class="day-time-settings">
      <div
        v-for="day in selectedDays"
        :key="day"
        class="day-time-item"
      >
        <div class="day-label">{{ day }}요일</div>
        <div class="time-settings">
          <div class="time-input-group">
            <label class="time-label">시작 시간</label>
            <div class="time-input-wrapper">
              <input
                :value="dayTimes[day]?.startDisplay || ''"
                type="text"
                class="form-control time-input"
                placeholder="시작 시간"
                readonly
                @click="openTimePicker(day, 'start')"
              />
              <button
                type="button"
                class="time-picker-btn"
                @click="openTimePicker(day, 'start')"
              >
                🕛
              </button>
            </div>
          </div>
          <div class="time-separator">~</div>
          <div class="time-input-group">
            <label class="time-label">종료 시간</label>
            <div class="time-input-wrapper">
              <input
                :value="dayTimes[day]?.endDisplay || ''"
                type="text"
                class="form-control time-input"
                placeholder="종료 시간"
                readonly
                @click="openTimePicker(day, 'end')"
              />
              <button
                type="button"
                class="time-picker-btn"
                @click="openTimePicker(day, 'end')"
              >
                🕐
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface DayTime {
  start: string
  end: string
  startDisplay: string
  endDisplay: string
}

interface Props {
  selectedDays: string[]
}

interface Emits {
  (e: 'timeSelect', day: string, type: 'start' | 'end'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 요일별 시간 데이터
const dayTimes = reactive<Record<string, DayTime>>({})

// props의 selectedDays가 변경될 때 dayTimes 초기화
watch(() => props.selectedDays, (newDays: string[]) => {
  newDays.forEach((day: string) => {
    if (!dayTimes[day]) {
      dayTimes[day] = { start: '', end: '', startDisplay: '', endDisplay: '' }
    }
  })
}, { immediate: true })

// 시간 선택 모달 열기
const openTimePicker = (day: string, type: 'start' | 'end') => {
  // dayTimes 초기화
  if (!dayTimes[day]) {
    dayTimes[day] = { start: '', end: '', startDisplay: '', endDisplay: '' }
  }
  emit('timeSelect', day, type)
}

// 외부에서 시간 업데이트
const updateTime = (day: string, type: 'start' | 'end', time: string) => {
  if (!dayTimes[day]) {
    dayTimes[day] = { start: '', end: '', startDisplay: '', endDisplay: '' }
  }

  dayTimes[day][type] = time

  // 표시용 시간 변환
  const hour = parseInt(time.split(':')[0])
  const ampm = hour >= 12 ? '오후' : '오전'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  dayTimes[day][`${type}Display`] = `${ampm} ${displayHour}:00`
}

// 현재 시간 값 가져오기
const getCurrentTime = (day: string, type: 'start' | 'end') => {
  return dayTimes[day]?.[type] || ''
}

// 모든 시간 데이터 가져오기
const getAllTimes = () => {
  return dayTimes
}

// 컴포넌트 메서드 노출
defineExpose({
  updateTime,
  getCurrentTime,
  getAllTimes
})
</script>

<style scoped>
/* 요일별 시간 설정 스타일 */
.day-time-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.day-time-item {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid #e9ecef;
}

.day-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.time-settings {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time-label {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.time-separator {
  font-size: 1.2rem;
  color: #6c757d;
  font-weight: 600;
  margin-top: 1.5rem;
}

/* 시간 입력 스타일 */
.time-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.time-input {
  padding-right: 3rem;
  cursor: pointer;
}

.time-picker-btn {
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

.time-picker-btn:hover {
  background-color: #f8f9fa;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .time-settings {
    flex-direction: column;
    gap: 1rem;
  }

  .time-separator {
    margin-top: 0;
    text-align: center;
  }
}
</style>
