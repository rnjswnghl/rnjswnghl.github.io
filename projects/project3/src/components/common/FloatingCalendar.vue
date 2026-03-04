<template>
  <div v-if="isLoggedIn" class="floating-calendar-wrapper">
    <!-- 플로팅 캘린더 버튼 -->
    <div
      ref="floatingButton"
      class="floating-calendar-btn"
      :class="{ 'expanded': isCalendarExpanded, 'dragging': isDragging }"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
      @mousedown="startDrag"
      @touchstart="startTouchDrag"
      @click="toggleCalendar"
    >
      <span class="calendar-icon">📅</span>
      <span class="toggle-text">{{ isCalendarExpanded ? '접기' : '일정' }}</span>
      <span class="drag-hint">⋮⋮</span>
    </div>

    <!-- 캘린더 팝업 -->
    <div
      v-if="isCalendarExpanded"
      class="calendar-popup"
      :style="{ left: position.x + 'px', top: position.y + 60 + 'px' }"
    >
      <div class="calendar-popup-header">
        <h3>내 스터디 일정</h3>
        <button class="close-btn" @click="toggleCalendar">×</button>
      </div>
      <div class="calendar-popup-content">
        <CalendarView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import CalendarView from '@/components/study/StudyCalendar.vue'

const userStore = useUserStore()

// 로그인 상태 확인 - 스토어의 isLoggedIn 사용
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn
})

const isCalendarExpanded = ref(false)
const position = ref({ x: 20, y: 100 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const floatingButton = ref<HTMLElement>()

// localStorage에서 위치 복원
function loadPosition() {
  const savedPosition = localStorage.getItem('floatingCalendarPosition')
  if (savedPosition) {
    try {
      const parsed = JSON.parse(savedPosition)
      position.value = parsed
    } catch (error) {
      console.error('저장된 위치 복원 실패:', error)
    }
  }
}

// 위치를 localStorage에 저장
function savePosition() {
  localStorage.setItem('floatingCalendarPosition', JSON.stringify(position.value))
}

function toggleCalendar() {
  if (!isDragging.value) {
    isCalendarExpanded.value = !isCalendarExpanded.value
  }
}

// 마우스 드래그 시작
function startDrag(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()

  isDragging.value = true
  const rect = floatingButton.value!.getBoundingClientRect()
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

// 터치 드래그 시작 (모바일 지원)
function startTouchDrag(event: TouchEvent) {
  event.preventDefault()
  event.stopPropagation()

  isDragging.value = true
  const rect = floatingButton.value!.getBoundingClientRect()
  const touch = event.touches[0]
  dragOffset.value = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  }

  document.addEventListener('touchmove', onTouchDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

// 마우스 드래그 중
function onDrag(event: MouseEvent) {
  if (!isDragging.value) return

  event.preventDefault()
  updatePosition(event.clientX, event.clientY)
}

// 터치 드래그 중
function onTouchDrag(event: TouchEvent) {
  if (!isDragging.value) return

  event.preventDefault()
  const touch = event.touches[0]
  updatePosition(touch.clientX, touch.clientY)
}

// 위치 업데이트 공통 함수
function updatePosition(clientX: number, clientY: number) {
  const newX = clientX - dragOffset.value.x
  const newY = clientY - dragOffset.value.y

  // 화면 경계 체크
  const maxX = window.innerWidth - 120 // 버튼 너비 고려
  const maxY = window.innerHeight - 60  // 버튼 높이 고려

  position.value = {
    x: Math.max(0, Math.min(newX, maxX)),
    y: Math.max(0, Math.min(newY, maxY))
  }
}

function stopDrag() {
  isDragging.value = false
  savePosition() // 드래그 종료 시 위치 저장
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onTouchDrag)
  document.removeEventListener('touchend', stopDrag)
}

// ESC 키로 캘린더 닫기
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isCalendarExpanded.value) {
    isCalendarExpanded.value = false
  }
}

// 윈도우 리사이즈 시 위치 조정
function handleResize() {
  const maxX = window.innerWidth - 120
  const maxY = window.innerHeight - 60

  position.value = {
    x: Math.min(position.value.x, maxX),
    y: Math.min(position.value.y, maxY)
  }
  savePosition() // 리사이즈 후 위치 저장
}

onMounted(() => {
  loadPosition() // 컴포넌트 마운트 시 저장된 위치 복원
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onTouchDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.floating-calendar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.floating-calendar-btn {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: grab;
  box-shadow: 0 4px 16px rgba(215, 156, 148, 0.4);
  transition: all 0.3s ease;
  pointer-events: auto;
  user-select: none;
  min-width: 80px;
  justify-content: center;
  touch-action: none; /* 터치 이벤트 최적화 */
}

.floating-calendar-btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(215, 156, 148, 0.5);
}

.floating-calendar-btn:active,
.floating-calendar-btn.dragging {
  cursor: grabbing;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(215, 156, 148, 0.6);
}

.floating-calendar-btn.expanded {
  background: var(--color-secondary);
  box-shadow: 0 4px 16px rgba(108, 117, 125, 0.4);
}

.floating-calendar-btn.expanded:hover {
  background: var(--color-secondary-dark);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.5);
}

.calendar-icon {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.floating-calendar-btn.expanded .calendar-icon {
  transform: rotate(180deg);
}

.toggle-text {
  font-family: var(--font-korean);
  white-space: nowrap;
}

.drag-hint {
  font-size: 12px;
  opacity: 0.7;
  margin-left: 4px;
  font-weight: 400;
}

.floating-calendar-btn:hover .drag-hint {
  opacity: 1;
}

.calendar-popup {
  position: absolute;
  background: white;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  pointer-events: auto;
  max-width: 480px;
  width: 420px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.calendar-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
  border-radius: 24px 24px 0 0;
}

.calendar-popup-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e9ecef;
  color: #495057;
  transform: scale(1.1);
}

.calendar-popup-content {
  padding: 20px;
  max-height: none;
  overflow: visible;
}

/* 반응형 */
@media (max-width: 768px) {
  .floating-calendar-btn {
    padding: 10px 14px;
    font-size: 12px;
    min-width: 70px;
  }

  .drag-hint {
    font-size: 10px;
  }

  .calendar-popup {
    width: 90vw;
    max-width: 90vw;
    left: 5vw !important;
    top: 80px !important;
  }

  .calendar-popup-content {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .calendar-popup {
    width: 95vw;
    max-width: 95vw;
    left: 2.5vw !important;
  }

  .calendar-popup-header {
    padding: 12px 16px;
  }

  .calendar-popup-header h3 {
    font-size: 14px;
  }

  .calendar-popup-content {
    padding: 12px;
  }
}
</style>

