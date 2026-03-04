<template>
  <div class="activity-timeline">

    <!-- 스터디별 활동 -->
    <div v-for="study in studyActivities" :key="study.id" class="study-section">
      <div class="study-header">
        <div class="study-info">
          <h4 class="study-name">{{ study.name }}</h4>
          <span class="study-role">{{ study.role === 'leader' ? '스터디장' : '멤버' }}</span>
        </div>
        <div class="study-stats">
          <div class="stat-item">
            <span class="stat-label">총 활동</span>
            <span class="stat-value">{{ study.totalActivities }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">출석률</span>
            <span class="stat-value">{{ study.attendanceRate }}%</span>
          </div>
        </div>
      </div>

      <!-- 년도별 활동 -->
      <div v-for="year in study.years" :key="year.key" class="year-section">
        <div
          class="year-header"
          :class="{ expanded: expandedYears.includes(year.key) }"
          @click="toggleYear(year.key)"
        >
          <div class="year-icon">📅</div>
          <div class="year-content">
            <div class="year-title">{{ year.name }}</div>
            <div class="year-count">{{ year.totalActivities }}개 활동</div>
          </div>
          <div class="expand-arrow" :class="{ rotated: expandedYears.includes(year.key) }">▶</div>

          <!-- 더미 데이터일 때 안내 메시지 오버레이 -->
          <div v-if="isDummyData" class="dummy-data-overlay">
            <div class="dummy-data-notice">
              <p class="notice-text">📝 아직 활동 기록이 없습니다. 스터디에 참여하면 활동 로그가 표시됩니다.</p>
            </div>
          </div>
        </div>

        <!-- 월별 활동 (년도 확장 시) -->
        <div v-if="expandedYears.includes(year.key)" class="year-children">
          <div class="month-grid">
            <div v-for="month in year.months" :key="month.key" class="month-card">
              <div
                class="month-card-header"
                :class="{ expanded: expandedMonths.includes(month.key) }"
                @click="toggleMonth(month.key)"
              >
                <div class="month-card-icon">📆</div>
                <div class="month-card-content">
                  <div class="month-card-title">{{ month.name }}</div>
                  <div class="month-card-count">{{ month.totalActivities }}개 활동</div>
                </div>
                <div class="month-card-arrow" :class="{ rotated: expandedMonths.includes(month.key) }">▶</div>
              </div>

              <!-- 주차별 활동 (월 확장 시) -->
              <div v-if="expandedMonths.includes(month.key)" class="month-card-children">
                <div v-for="week in month.weeks" :key="week.key" class="week-section">
                  <div
                    class="week-header"
                    :class="{ expanded: expandedWeeks.includes(week.key) }"
                    @click="toggleWeek(week.key)"
                  >
                    <div class="week-icon">📝</div>
                    <div class="week-content">
                      <div class="week-title">{{ week.name }}주차</div>
                      <div class="week-count">{{ week.totalActivities }}개 활동</div>
                    </div>
                    <div class="expand-arrow" :class="{ rotated: expandedWeeks.includes(week.key) }">▶</div>
                  </div>

                  <!-- 일별 활동 (주차 확장 시) -->
                  <div v-if="expandedWeeks.includes(week.key)" class="week-children">
                    <div v-for="day in week.days" :key="day.key" class="day-section">
                      <div class="day-header">
                        <div class="day-icon">📅</div>
                        <div class="day-content">
                          <div class="day-title">{{ day.name }}</div>
                          <div class="day-status">
                            <span
                              :class="['status-badge', day.attendance]"
                            >
                              {{ getAttendanceText(day.attendance) }}
                            </span>
                          </div>
                        </div>
                        <div class="day-actions">
                          <button
                            v-if="day.attendance === 'present' && day.quiz.length > 0"
                            @click="showQuizDetail(day)"
                            class="action-btn quiz-btn"
                          >
                            퀴즈 확인
                          </button>
                          <button
                            v-else-if="day.attendance === 'absent'"
                            @click="showAttendanceRecovery(day)"
                            class="action-btn recovery-btn"
                          >
                            출석 복구
                          </button>
                          <span v-else class="action-btn disabled">활동 없음</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 퀴즈 상세 모달 -->
    <div v-if="showQuizModal" class="modal-overlay" @click.self="closeQuizModal">
      <div class="quiz-modal">
        <div class="modal-header">
          <h3 class="modal-title">
            <span class="quiz-icon">📝</span>
            {{ selectedDay?.name }} 퀴즈 내용
          </h3>
          <button class="close-icon" @click="closeQuizModal">✕</button>
        </div>
        <div class="modal-content">
          <div class="quiz-actions">
            <button @click="startReviewQuiz" class="review-quiz-btn">
              <span class="btn-icon">🎯</span>
              복습 퀴즈 풀기
            </button>
          </div>
          <div class="quiz-preview">
            <h4>퀴즈 미리보기</h4>
            <div v-for="(quiz, index) in selectedDay?.quiz" :key="index" class="quiz-item">
              <div class="quiz-question">
                <span class="question-number">Q{{ index + 1 }}.</span>
                {{ quiz.question }}
              </div>
              <div class="quiz-answer">
                <span class="answer-label">A.</span>
                {{ quiz.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 복습 퀴즈 플레이어 모달 -->
    <div v-if="showReviewQuizPlayer" class="modal-overlay">
      <div class="quiz-player-modal">
        <div class="modal-header">
          <h3 class="modal-title">
            <span class="quiz-icon">🎯</span>
            {{ selectedDay?.name }} 복습 퀴즈
          </h3>
          <button class="close-icon" @click="closeReviewQuizPlayer">✕</button>
        </div>
        <div class="modal-content">
          <QuizPlayer
            :group-id="selectedDay?.studyId?.toString() || ''"
            :quiz-id="selectedDay?.quizId || ''"
            @close="closeReviewQuizPlayer"
            @quiz-completed="handleQuizCompleted"
          />
        </div>
      </div>
    </div>

    <!-- 출석률 복구 퀴즈 모달 -->
    <div v-if="showRecoveryModal" class="modal-overlay" @click.self="closeRecoveryModal">
      <div class="recovery-modal">
        <div class="modal-header">
          <h3 class="modal-title">
            <span class="quiz-icon">📃</span>
            {{ selectedDay?.name }} 출석률 복구 퀴즈
          </h3>
          <button class="close-icon" @click="closeRecoveryModal">✕</button>
        </div>
        <div class="modal-content">
          <div class="recovery-info">
            <p>결석한 날의 복습 퀴즈를 풀어 출석률을 복구할 수 있습니다.</p>
            <div class="recovery-rules">
              <h4>퀴즈 규칙</h4>
              <ul>
                <li>총 10문제가 출제됩니다</li>
                <li>정답률 70% 이상 달성 시 출석률이 복구됩니다</li>
                <li>퀴즈는 한 번만 풀 수 있습니다</li>
                <li>시간 제한은 없습니다</li>
              </ul>
            </div>
          </div>
          <div class="modal-actions">
            <button class="start-quiz-btn" @click="startRecoveryQuiz">
              복습 퀴즈 시작하기
            </button>
            <button class="cancel-btn" @click="closeRecoveryModal">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import QuizPlayer from '@/components/quiz/QuizPlayer.vue'
import { useQuizStore } from '@/stores/quiz'

interface Quiz {
  question: string
  answer: string
}

interface DayActivity {
  key: string
  name: string
  date: string
  attendance: 'present' | 'absent' | 'late'
  participationMinutes: number
  quiz: Quiz[]
  studyId?: number
  quizId?: string
}

interface WeekActivity {
  key: string
  name: string
  totalActivities: number
  days: DayActivity[]
}

interface MonthActivity {
  key: string
  name: string
  totalActivities: number
  weeks: WeekActivity[]
}

interface YearActivity {
  key: string
  name: string
  totalActivities: number
  months: MonthActivity[]
}

interface StudyActivity {
  id: number
  name: string
  role: string
  totalActivities: number
  attendanceRate: number
  years: YearActivity[]
}

interface Props {
  selectedStudyId: string | number
  activityLogs: any[] | any // 배열 또는 객체(API 응답 구조)를 허용
}

const props = defineProps<Props>()

interface Emits {
  (e: 'start-recovery-quiz', day: DayActivity): void
}

const emit = defineEmits<Emits>()

// 퀴즈 스토어
const quizStore = useQuizStore()

// 확장 상태 관리
const expandedYears = ref<string[]>([])
const expandedMonths = ref<string[]>([])
const expandedWeeks = ref<string[]>([])

// 모달 상태
const showQuizModal = ref(false)
const showRecoveryModal = ref(false)
const showReviewQuizPlayer = ref(false)
const selectedDay = ref<DayActivity | null>(null)

// 더미 데이터인지 확인
const isDummyData = computed(() => {
  const activityLogs = Array.isArray(props.activityLogs) ? props.activityLogs : []
  return activityLogs.length > 0 && activityLogs.some((log: any) => log.isDummy)
})

// 실제 활동 로그 데이터를 사용하여 스터디별 활동 데이터 생성
const studyActivities = computed((): StudyActivity[] => {
  // activityLogs가 배열이 아닌 경우 안전하게 처리
  const activityLogs = Array.isArray(props.activityLogs) ? props.activityLogs : []

  if (!activityLogs || activityLogs.length === 0) {
    return []
  }

  // 더미 데이터일 때는 단순한 구조로 생성
  if (isDummyData.value) {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()

    return activityLogs.map((log: any) => {
      return {
        id: log.studyId,
        name: log.studyName,
        role: log.role,
        totalActivities: 1,
        attendanceRate: 0,
        years: [{
          key: currentYear.toString(),
          name: `${currentYear}년`,
          totalActivities: 1,
          months: [{
            key: `${currentYear}-${String(currentMonth).padStart(2, '0')}`,
            name: `${currentMonth}월`,
            totalActivities: 1,
            weeks: [{
              key: `${currentYear}-${String(currentMonth).padStart(2, '0')}-1`,
              name: '1',
              totalActivities: 1,
              days: [{
                key: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`,
                name: `${currentMonth}월 ${currentDay}일`,
                date: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`,
                attendance: 'absent',
                participationMinutes: 0,
                quiz: []
              }]
            }]
          }]
        }]
      }
    })
  }

  // 실제 데이터일 때는 기존 로직 사용
  // 활동 로그를 스터디별로 그룹화
  const studyGroups = new Map()

  activityLogs.forEach((log: any) => {
    const studyId = log.studyId || 'unknown'
    if (!studyGroups.has(studyId)) {
      studyGroups.set(studyId, {
        id: studyId,
        name: log.studyName || `스터디 ${studyId}`,
        role: log.role || 'member',
        totalActivities: 0,
        attendanceRate: 0,
        activities: []
      })
    }

    const study = studyGroups.get(studyId)
    study.activities.push(log)
    study.totalActivities++

    if (log.attendance === 'present') {
      study.attendanceRate = ((study.activities.filter((a: any) => a.attendance === 'present').length / study.totalActivities) * 100)
    }
  })

  // 스터디별 데이터를 년/월/주/일 구조로 변환
  return Array.from(studyGroups.values()).map(study => {
    const years = transformActivitiesToTimeline(study.activities)
    return {
      ...study,
      years
    }
  })
})

// 활동 로그를 타임라인 구조로 변환하는 함수
function transformActivitiesToTimeline(activities: any[]): YearActivity[] {
  const yearMap = new Map()

  activities.forEach(activity => {
    const date = new Date(activity.date)
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const week = getWeekOfMonth(date)

    // 년도별 그룹화
    if (!yearMap.has(year)) {
      yearMap.set(year, {
        key: year,
        name: `${year}년`,
        totalActivities: 0,
        months: new Map()
      })
    }

    const yearData = yearMap.get(year)
    yearData.totalActivities++

    // 월별 그룹화
    if (!yearData.months.has(month)) {
      yearData.months.set(month, {
        key: `${year}-${month}`,
        name: `${parseInt(month)}월`,
        totalActivities: 0,
        weeks: new Map()
      })
    }

    const monthData = yearData.months.get(month)
    monthData.totalActivities++

    // 주차별 그룹화
    if (!monthData.weeks.has(week)) {
      monthData.weeks.set(week, {
        key: `${year}-${month}-${week}`,
        name: week.toString(),
        totalActivities: 0,
        days: []
      })
    }

    const weekData = monthData.weeks.get(week)
    weekData.totalActivities++

    // 일별 데이터
    weekData.days.push({
      key: activity.date,
      name: formatDate(activity.date),
      date: activity.date,
      attendance: activity.attendance || 'absent',
      participationMinutes: activity.participationMinutes || 0,
      quiz: activity.quiz || []
    })
  })

  // Map을 배열로 변환하고 정렬
  return Array.from(yearMap.values()).map((year: any) => ({
    ...year,
    months: Array.from(year.months.values()).map((month: any) => ({
      ...month,
      weeks: Array.from(month.weeks.values()).map((week: any) => ({
        ...week,
        days: week.days.sort((a: DayActivity, b: DayActivity) => new Date(b.date).getTime() - new Date(a.date).getTime())
      })).sort((a: any, b: any) => parseInt(b.key.split('-')[2]) - parseInt(a.key.split('-')[2]))
    })).sort((a: any, b: any) => parseInt(b.key.split('-')[1]) - parseInt(a.key.split('-')[1]))
  })).sort((a: any, b: any) => parseInt(b.key) - parseInt(a.key))
}

// 월의 몇 번째 주차인지 계산
function getWeekOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const firstDayWeek = firstDay.getDay()
  const dayOfMonth = date.getDate()
  return Math.ceil((dayOfMonth + firstDayWeek) / 7)
}

// 날짜 포맷팅
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const weekday = weekdays[date.getDay()]
  return `${month}월 ${day}일 (${weekday})`
}

// 토글 함수들
const toggleYear = (yearKey: string) => {
  const index = expandedYears.value.indexOf(yearKey)
  if (index > -1) {
    expandedYears.value.splice(index, 1)
  } else {
    expandedYears.value.push(yearKey)
  }
}

const toggleMonth = (monthKey: string) => {
  const index = expandedMonths.value.indexOf(monthKey)
  if (index > -1) {
    expandedMonths.value.splice(index, 1)
  } else {
    expandedMonths.value.push(monthKey)
  }
}

const toggleWeek = (weekKey: string) => {
  const index = expandedWeeks.value.indexOf(weekKey)
  if (index > -1) {
    expandedWeeks.value.splice(index, 1)
  } else {
    expandedWeeks.value.push(weekKey)
  }
}

// 출석 상태 텍스트
const getAttendanceText = (attendance: string): string => {
  switch (attendance) {
    case 'present': return '출석'
    case 'absent': return '결석'
    case 'late': return '지각'
    default: return '미정'
  }
}

// 퀴즈 상세 보기
const showQuizDetail = (day: DayActivity) => {
  // 퀴즈 데이터가 있으면 실제 퀴즈를 생성하고 플레이어를 시작
  if (day.quiz && day.quiz.length > 0) {
    // 퀴즈 데이터를 스토어에 저장
    const quizSet = {
      id: `quiz-${day.date}`,
      groupId: day.studyId?.toString() || '1',
      title: `${day.name} 복습 퀴즈`,
      description: `${day.name}에 출석했던 퀴즈를 복습해보세요.`,
      questions: day.quiz.map((q, index) => ({
        id: `q-${day.date}-${index}`,
        question: q.question,
        type: 'short-answer' as const,
        correctAnswer: q.answer,
        explanation: `정답: ${q.answer}`
      })),
      totalQuestions: day.quiz.length,
      createdAt: day.date,
      updatedAt: day.date
    }

    // 퀴즈 스토어에 저장
    quizStore.currentQuizSet = quizSet

    selectedDay.value = {
      ...day,
      studyId: parseInt(day.key.split('-')[0]), // 날짜에서 년도를 studyId로 사용
      quizId: `quiz-${day.date}` // 날짜를 기반으로 quizId 생성
    }
    showReviewQuizPlayer.value = true
  } else {
    // 퀴즈 데이터가 없으면 기본 모달 표시
    selectedDay.value = day
    showQuizModal.value = true
  }
}

// 출석률 복구 퀴즈 보기
const showAttendanceRecovery = (day: DayActivity) => {
  selectedDay.value = day
  showRecoveryModal.value = true
}

// 모달 닫기
const closeQuizModal = () => {
  showQuizModal.value = false
  selectedDay.value = null
}

const closeRecoveryModal = () => {
  showRecoveryModal.value = false
  selectedDay.value = null
}

// 복습 퀴즈 시작
const startRecoveryQuiz = () => {
  if (selectedDay.value) {
    emit('start-recovery-quiz', selectedDay.value)
    closeRecoveryModal()
  }
}

// 복습 퀴즈 플레이어 시작
const startReviewQuiz = () => {
  if (selectedDay.value) {
    showReviewQuizPlayer.value = true
    closeQuizModal()
  }
}

// 복습 퀴즈 플레이어 닫기
const closeReviewQuizPlayer = () => {
  showReviewQuizPlayer.value = false
  selectedDay.value = null
}

// 퀴즈 완료 처리
const handleQuizCompleted = (result: any) => {
  console.log('퀴즈 완료:', result)
  closeReviewQuizPlayer()
}
</script>

<style scoped>
.activity-timeline {
  padding: 1.5rem;
  background: #f8f9fa;
  min-height: calc(100vh - 300px);
}

.timeline-title {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 800;
  color: #d79c94;
  letter-spacing: -0.5px;
}

.timeline-subtitle {
  margin: 0;
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
}

.study-section {
  margin-bottom: 2.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.study-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.study-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: #d79c94;
  color: white;
  position: relative;
  overflow: hidden;
}



.study-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.study-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
}

.study-role {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.study-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 80px;
}

.stat-label {
  display: block;
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-value {
  display: block;
  font-size: 1.3rem;
  font-weight: 800;
}

.year-section {
  border-bottom: 1px solid #f1f3f4;
}

.year-section:last-child {
  border-bottom: none;
}

.year-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
}

.year-header:hover {
  background: #f8f9fa;
  border-color: #d79c94;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(215, 156, 148, 0.1);
}

.year-header.expanded {
  background: #f8f9fa;
  border-color: #d79c94;
  box-shadow: 0 8px 24px rgba(215, 156, 148, 0.15);
}

.year-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  color: #d79c94;
  background: rgba(215, 156, 148, 0.1);
  padding: 0.5rem;
  border-radius: 10px;
}

.year-content {
  flex: 1;
}

.year-title {
  font-weight: 700;
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 0.3rem;
  letter-spacing: -0.3px;
}

.year-count {
  font-size: 0.95rem;
  color: #6c757d;
  font-weight: 500;
}

.expand-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.expand-arrow.rotated {
  transform: rotate(90deg);
}

.year-children {
  background: white;
  border-top: 1px solid #e9ecef;
  padding: 2rem;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.month-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e9ecef;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.month-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #d79c94;
}

.month-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #a8d8ea;
  color: white;
  position: relative;
}

.month-card-header:hover {
  background: #a8d8ea;
}

.month-card-header.expanded {
  background: #5a9bd9;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.month-card-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 12px;
}

.month-card-content {
  flex: 1;
}

.month-card-title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

.month-card-count {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 500;
}

.month-card-arrow {
  font-size: 0.9rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem;
  border-radius: 8px;
}

.month-card-arrow.rotated {
  transform: rotate(90deg);
}

.month-card-children {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1rem;
}

.week-section {
  border-bottom: 1px solid #dee2e6;
}

.week-section:last-child {
  border-bottom: none;
}

.week-header {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  position: relative;
}

.week-header:hover {
  background: #f8f9fa;
  border-color: #8fcf94;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(143, 207, 148, 0.1);
}

.week-header.expanded {
  background: #f8f9fa;
  border-color: #8fcf94;
  box-shadow: 0 4px 12px rgba(143, 207, 148, 0.15);
}

.week-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  color: #8fcf94;
  background: rgba(143, 207, 148, 0.1);
  padding: 0.4rem;
  border-radius: 8px;
}

.week-content {
  flex: 1;
}

.week-title {
  font-weight: 600;
  font-size: 1rem;
  color: #495057;
  margin-bottom: 0.2rem;
  letter-spacing: -0.1px;
}

.week-count {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
}

.week-children {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.day-section {
  margin-bottom: 0.75rem;
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.day-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(215, 156, 148, 0.3);
}

.day-section:last-child {
  margin-bottom: 0;
}

.day-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  position: relative;
}

.day-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.day-content {
  flex: 1;
}

.day-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 0.25rem;
}

.day-status {
  display: flex;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-badge.present {
  background: #8fcf94;
  color: white;
}

.status-badge.absent {
  background: #f67280;
  color: white;
}

.status-badge.late {
  background: #fbd26a;
  color: #333;
}

.day-actions {
  flex-shrink: 0;
}

.action-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-btn.quiz-btn {
  background: #6db3f2;
  color: white;
}

.action-btn.quiz-btn:hover {
  background: #5a9bd9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(109, 179, 242, 0.3);
}

.action-btn.recovery-btn {
  background: #f67280;
  color: white;
}

.action-btn.recovery-btn:hover {
  background: #e55a6a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(246, 114, 128, 0.3);
}

.action-btn.disabled {
  background: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  box-shadow: none;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.quiz-modal,
.recovery-modal {
  background: white;
  border-radius: 20px;
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #e9ecef;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: #d79c94;
  color: white;
  position: relative;
  overflow: hidden;
}



.modal-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.quiz-icon {
  font-size: 1.4rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 12px;
}

.close-icon {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.close-icon:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-content {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.quiz-item {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.quiz-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(215, 156, 148, 0.2);
}

.quiz-item:last-child {
  margin-bottom: 0;
}

.quiz-question {
  margin-bottom: 1rem;
  font-weight: 600;
  color: #495057;
  line-height: 1.6;
  font-size: 1rem;
}

.question-number {
  background: #6db3f2;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  margin-right: 0.8rem;
  font-weight: 700;
  font-size: 0.9rem;
}

.quiz-answer {
  color: #28a745;
  font-weight: 600;
  line-height: 1.6;
  font-size: 0.95rem;
  background: rgba(40, 167, 69, 0.1);
  padding: 0.8rem;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.answer-label {
  color: #28a745;
  margin-right: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
}

.recovery-info {
  margin-bottom: 1.5rem;
}

.recovery-info p {
  margin-bottom: 1rem;
  color: #495057;
  line-height: 1.6;
}

.recovery-rules {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.recovery-rules h4 {
  margin: 0 0 0.75rem 0;
  color: #495057;
  font-size: 1rem;
}

.recovery-rules ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #6c757d;
}

.recovery-rules li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.start-quiz-btn,
.cancel-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.start-quiz-btn {
  background: #6db3f2;
  color: white;
}

.start-quiz-btn:hover {
  background: #5a9bd9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(109, 179, 242, 0.3);
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(108, 117, 125, 0.3);
}

/* 더미 데이터 안내 메시지 오버레이 */
.dummy-data-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dummy-data-notice {
  margin: 0;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 2px dashed #dee2e6;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  max-width: 90%;
}

.notice-text {
  margin: 0;
  color: #6c757d;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

/* 복습 퀴즈 관련 스타일 */
.quiz-actions {
  margin-bottom: 1.5rem;
  text-align: center;
}

.review-quiz-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6db3f2 0%, #5a9bd9 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(109, 179, 242, 0.3);
}

.review-quiz-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(109, 179, 242, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
}

.quiz-preview {
  border-top: 1px solid #e9ecef;
  padding-top: 1.5rem;
}

.quiz-preview h4 {
  margin: 0 0 1rem 0;
  color: #495057;
  font-size: 1.1rem;
  font-weight: 600;
}

.quiz-player-modal {
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.quiz-player-modal .modal-content {
  flex: 1;
  overflow: hidden;
  padding: 0;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .activity-timeline {
    padding: 0.5rem;
  }

  .timeline-header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .timeline-title {
    font-size: 1.5rem;
  }

  .study-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1.5rem;
  }

  .study-stats {
    gap: 1rem;
  }

  .year-children {
    padding: 1rem;
  }

  .month-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .month-card-header {
    padding: 1.2rem;
  }

  .day-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .day-actions {
    width: 100%;
  }

  .action-btn {
    width: 100%;
    padding: 0.75rem 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .start-quiz-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style>
