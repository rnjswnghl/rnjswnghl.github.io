<template>
  <div class="calendar" @mouseleave="hideTooltip">
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
          'today': isToday(day)
        }"
        @mouseenter="showTooltip($event, day)"
        @mousemove="updateTooltipPosition($event)"
        @click="selectDate(day)"
      >
        <span class="day-number">{{ day }}</span>
        <div v-if="hasStudyOnDay(day)" class="study-indicator">
          <span class="study-dot"></span>
        </div>
      </div>
    </div>

    <!-- 프리뷰 툴팁 컴포넌트 -->
    <StudyPreviewTooltip
      :visible="showTooltipFlag"
      :data="tooltipData"
      :position="tooltipPosition"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import StudyPreviewTooltip from './StudyPreviewTooltip.vue'
import { getMyCalendar } from '@/api/calendar'
import type { StudySchedule } from '@/types/calendar'



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
const tooltipPosition = ref({ x: 0, y: 0 })
const timer = ref<NodeJS.Timeout | null>(null)
const currentHoverDay = ref<number | null>(null)
const loading = ref(false)

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 로그인 상태 확인 - 스토어의 isLoggedIn 사용
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn
})

// 사용자의 스터디 일정 가져오기
async function fetchUserStudySchedule() {
  if (!isLoggedIn.value) {
    console.log('🔍 사용자가 로그인하지 않음 - 스터디 일정 로드 건너뜀')
    return
  }

  try {
    loading.value = true
    console.log('🔍 사용자 스터디 일정 로드 시작')

    // 새로운 캘린더 API 사용
    const response = await getMyCalendar()
    console.log('🔍 캘린더 API 응답:', response)

    if (response.status === 'SUCCESS' && response.data) {
      // 캘린더 데이터를 스터디 일정으로 변환
      const allStudySchedules: StudySchedule[] = []

      response.data.forEach((calendarData: any) => {
        if (calendarData.studies && Array.isArray(calendarData.studies)) {
          calendarData.studies.forEach((study: any) => {
            const schedule: StudySchedule = {
              id: study.id,
              studyId: study.studyId,
              studyName: study.studyName,
              category: study.category,
              time: study.time,
              dayOfWeek: study.dayOfWeek,
              startTime: study.startTime,
              period: study.period
            }
            allStudySchedules.push(schedule)
          })
        }
      })

      userStudies.value = allStudySchedules
      console.log('✅ 최종 스터디 일정:', userStudies.value)
    } else {
      console.log('❌ 캘린더 데이터를 가져올 수 없음')
    }

  } catch (error) {
    console.error('❌ 사용자 스터디 일정 로드 실패:', error)
  } finally {
    loading.value = false
  }
}

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
    // dayOfWeek가 배열인 경우
    if (Array.isArray(study.dayOfWeek)) {
      return study.dayOfWeek.includes(dayOfWeek)
    }
    // dayOfWeek가 문자열인 경우 (쉼표로 구분된 경우)
    if (typeof study.dayOfWeek === 'string' && study.dayOfWeek.includes(',')) {
      const studyDays = study.dayOfWeek.split(',')
      return studyDays.includes(dayOfWeek)
    }
    // 단일 요일인 경우
    return study.dayOfWeek === dayOfWeek
  })
}

function getStudiesOnDay(day: number): StudySchedule[] {
  if (!isLoggedIn.value) {
    return []
  }

  const date = new Date(currentYear.value, currentMonth.value, day)
  const dayOfWeek = weekDays[date.getDay()]

  return userStudies.value.filter(study => {
    // dayOfWeek가 배열인 경우
    if (Array.isArray(study.dayOfWeek)) {
      return study.dayOfWeek.includes(dayOfWeek)
    }
    // dayOfWeek가 문자열인 경우 (쉼표로 구분된 경우)
    if (typeof study.dayOfWeek === 'string' && study.dayOfWeek.includes(',')) {
      const studyDays = study.dayOfWeek.split(',')
      return studyDays.includes(dayOfWeek)
    }
    // 단일 요일인 경우
    return study.dayOfWeek === dayOfWeek
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
  tooltipPosition.value = {
    x: rect.left + window.scrollX,
    y: rect.bottom + window.scrollY + 5
  }

  showTooltipFlag.value = true
  currentHoverDay.value = day
}

function updateTooltipPosition(event: MouseEvent) {
  if (!showTooltipFlag.value || !currentHoverDay.value) return

  const rect = (event.target as HTMLElement).getBoundingClientRect()
  tooltipPosition.value = {
    x: rect.left + rect.width + 10,
    y: rect.top - 50
  }
}

function hideTooltip() {
  showTooltipFlag.value = false
  tooltipData.value = null
  currentHoverDay.value = null
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
        console.log(`스터디 시작 예정: ${study.studyName} (${study.startTime})`)
      }
    })
  }, 60000) // 1분마다 체크
}

function selectDate(day: number) {
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
onMounted(() => {
  fetchUserStudySchedule()
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
    fetchUserStudySchedule()
  } else {
    userStudies.value = []
  }
})
</script>

<style scoped>
.calendar {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
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
  border-radius: 16px;
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
  gap: 0.6rem;
}

.day-name {
  font-weight: 600;
  text-align: center;
  color: #6c757d;
  padding: 0.6rem;
  font-size: 0.95rem;
}

.day, .empty {
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #f8f9fa;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.day:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-color: rgba(215, 156, 148, 0.2);
}

.day.has-study {
  background-color: #fff3cd;
  border: 2px solid #ffeaa7;
  box-shadow: 0 2px 8px rgba(255, 234, 167, 0.3);
}

.day.today {
  background-color: #d79c94;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.4);
}

.day.today.has-study {
  background-color: #d79c94;
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.day-number {
  font-size: 0.95rem;
  font-weight: 500;
}

.study-indicator {
  position: absolute;
  bottom: 3px;
}

.study-dot {
  width: 7px;
  height: 7px;
  background-color: #d79c94;
  border-radius: 50%;
  display: block;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.day.today .study-dot {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* 반응형 */
@media (max-width: 768px) {
  .calendar {
    padding: 1rem;
    max-width: 100%;
  }

  .day, .empty {
    height: 50px;
  }

  .calendar-grid {
    gap: 0.5rem;
  }

  .day-name {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .day-number {
    font-size: 0.9rem;
  }
}
</style>

