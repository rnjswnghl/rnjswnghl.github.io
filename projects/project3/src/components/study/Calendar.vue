<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="nav-btn" @click="prevMonth">&lt;</button>
      <h3 class="month-title">{{ currentYear }}년 {{ currentMonth + 1 }}월</h3>
      <button class="nav-btn" @click="nextMonth">&gt;</button>
    </div>

    <div class="calendar-grid">
      <div class="day-name" v-for="day in weekDays" :key="day">{{ day }}</div>
      <div
        v-for="(day, index) in blankDays"
        :key="'b' + index"
        class="day empty"
      ></div>
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        :class="{
          'has-study': hasStudyOnDay(day),
          'today': isToday(day),
          'selected': selectedDay === day
        }"
        @mouseenter="showTooltip($event, day)"
        @mouseleave="hideTooltip"
        @click="selectDate(day)"
      >
        <span class="day-number">{{ day }}</span>
        <div v-if="hasStudyOnDay(day)" class="study-indicator">
          <span class="study-dot"></span>
        </div>
      </div>
    </div>

    <!-- 브리뷰 툴팁 -->
    <div
      v-if="showTooltipFlag && tooltipData"
      class="tooltip"
      :style="tooltipStyle"
    >
      <div class="tooltip-header">
        <h4>{{ tooltipData.date }}</h4>
        <span class="study-count">{{ tooltipData.studies.length }}개 스터디</span>
      </div>
      <div class="tooltip-content">
        <div
          v-for="study in tooltipData.studies"
          :key="study.id"
          class="study-item"
        >
          <div class="study-info">
            <div class="study-name">{{ study.name || study.studyName }}</div>
            <div class="study-time">{{ study.startTime }}</div>
          </div>
          <div class="countdown">
            <div class="countdown-label">시작까지</div>
            <div class="countdown-time">{{ getTimeUntilStudy(study) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'

interface StudySchedule {
  id: number
  studyId?: number
  name?: string
  studyName?: string
  category: string
  time: string
  schedule: string
  day_of_week: string
  startTime: string
  period: string[]
}

interface TooltipData {
  date: string
  studies: StudySchedule[]
}

const userStore = useUserStore()

const emit = defineEmits<{
  'date-select': [data: { date: string; studies: StudySchedule[] }]
}>()

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth())
const userStudies = ref<StudySchedule[]>([])
const showTooltipFlag = ref(false)
const tooltipData = ref<TooltipData | null>(null)
const tooltipStyle = ref({
  left: '0px',
  top: '0px'
})
const timer = ref<NodeJS.Timeout | null>(null)
const selectedDay = ref<number | null>(null)

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 로그인 상태 확인 - 스토어의 isLoggedIn 사용
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn
})

const daysInMonth = computed(() => {
  const days = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  return Array.from({ length: days }, (_, i) => i + 1)
})

const blankDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  return Array.from({ length: firstDay })
})

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function isToday(day: number) {
  const today = new Date()
  return currentYear.value === today.getFullYear() &&
         currentMonth.value === today.getMonth() &&
         day === today.getDate()
}

function hasStudyOnDay(day: number) {
  // 로그인하지 않은 경우 스터디가 없다고 처리
  if (!isLoggedIn.value) {
    return false
  }

  const date = new Date(currentYear.value, currentMonth.value, day)
  const dayOfWeek = weekDays[date.getDay()]

  return userStudies.value.some(study => {
    const studyDays = study.day_of_week.split(',')
    return studyDays.includes(dayOfWeek)
  })
}

function getStudiesOnDay(day: number): StudySchedule[] {
  if (!isLoggedIn.value) {
    return []
  }

  const date = new Date(currentYear.value, currentMonth.value, day)
  const dayOfWeek = weekDays[date.getDay()]

  return userStudies.value.filter(study => {
    const studyDays = study.day_of_week.split(',')
    return studyDays.includes(dayOfWeek)
  })
}

function showTooltip(event: MouseEvent, day: number) {
  const studies = getStudiesOnDay(day)
  if (studies.length === 0) return

  const date = new Date(currentYear.value, currentMonth.value, day)
  const dateString = `${date.getMonth() + 1}월 ${day}일 (${weekDays[date.getDay()]})`

  tooltipData.value = {
    date: dateString,
    studies: studies
  }

  const rect = (event.target as HTMLElement).getBoundingClientRect()
  tooltipStyle.value = {
    left: rect.left + window.scrollX + 'px',
    top: rect.bottom + window.scrollY + 5 + 'px'
  }

  showTooltipFlag.value = true
}

function hideTooltip() {
  showTooltipFlag.value = false
  tooltipData.value = null
}

function startTimer() {
  timer.value = setInterval(() => {
    // 매분마다 스터디 시간 체크
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    userStudies.value.forEach(study => {
      const [studyHour, studyMinute] = study.startTime.split(':').map(Number)
      if (currentHour === studyHour && Math.abs(currentMinute - studyMinute) <= 5) {
        console.log(`스터디 시작 예정: ${study.name} (${study.startTime})`)
      }
    })
  }, 60000) // 1분마다 체크
}

function selectDate(day: number) {
  selectedDay.value = day
  const studies = getStudiesOnDay(day)
  const date = new Date(currentYear.value, currentMonth.value, day)
  const dateString = `${date.getMonth() + 1}월 ${day}일 (${weekDays[date.getDay()]})`

  // 부모 컴포넌트에 선택된 날짜 정보 전달
  emit('date-select', {
    date: dateString,
    studies: studies
  })
}

function getTimeUntilStudy(study: StudySchedule): string {
  const now = new Date()
  const today = new Date()
  const studyTime = study.startTime.split(':')
  const studyHour = parseInt(studyTime[0])
  const studyMinute = parseInt(studyTime[1])

  // 오늘 스터디 시간 계산
  const studyDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), studyHour, studyMinute)

  // 이미 지난 시간이면 다음 스터디까지
  if (studyDateTime < now) {
    studyDateTime.setDate(studyDateTime.getDate() + 7) // 다음 주
  }

  const diff = studyDateTime.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}일 ${hours}시간`
  } else if (hours > 0) {
    return `${hours}시간 ${minutes}분`
  } else {
    return `${minutes}분`
  }
}

// 스터디 데이터 로드 - API 명세서에 없으므로 비활성화
async function loadUserStudies() {
  console.log('🔄 스터디 일정 캘린더 비활성화됨 - API 명세서에 해당 기능 없음')
  userStudies.value = []
}

onMounted(() => {
  loadUserStudies()
  startTimer()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

// 로그인 상태 변경 감지
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    loadUserStudies()
  } else {
    userStudies.value = []
  }
})
</script>

<style scoped>
.calendar {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.nav-btn {
  background: transparent;
  border: 2px solid #d79c94;
  color: #d79c94;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #d79c94;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.3);
}

.month-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.day-name {
  font-weight: 600;
  text-align: center;
  color: #6c757d;
  padding: 0.5rem;
  font-size: 0.9rem;
}

.day, .empty {
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #f8f9fa;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.day:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.day.has-study {
  background-color: #fff3cd;
  border: 2px solid #ffeaa7;
}

.day.today {
  background-color: #d79c94;
  color: white;
  font-weight: 600;
}

.day.today.has-study {
  background-color: #d79c94;
  color: white;
}

.day.selected {
  background-color: #d79c94;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.4);
}

.day.selected.has-study {
  background-color: #d79c94;
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.day-number {
  font-size: 0.9rem;
  font-weight: 500;
}

.study-indicator {
  position: absolute;
  bottom: 2px;
}

.study-dot {
  width: 6px;
  height: 6px;
  background-color: #d79c94;
  border-radius: 50%;
  display: block;
}

.day.today .study-dot {
  background-color: white;
}

/* 툴팁 스타일 */
.tooltip {
  position: fixed;
  z-index: 1000;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  min-width: 280px;
  border: 1px solid #e9ecef;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.tooltip-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #212529;
}

.study-count {
  background: #d79c94;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.study-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #d79c94;
}

.study-info {
  flex: 1;
}

.study-name {
  font-weight: 600;
  color: #212529;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.study-time {
  color: #6c757d;
  font-size: 0.8rem;
}

.countdown {
  text-align: right;
}

.countdown-label {
  font-size: 0.7rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.countdown-time {
  font-weight: 600;
  color: #d79c94;
  font-size: 0.9rem;
}

/* 반응형 */
@media (max-width: 768px) {
  .calendar {
    padding: 1rem;
  }

  .day, .empty {
    height: 40px;
  }

  .tooltip {
    min-width: 250px;
    left: 10px !important;
    right: 10px;
    width: calc(100vw - 20px);
  }
}
</style>
