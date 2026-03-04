<template>
  <div class="activity-log-wrapper">
    <div class="activity-log-header">
      <h2 class="title">{{ user?.nickname }}님의 스터디 활동 로그</h2>
      <p class="subtitle">스터디별 활동을 년도/월/주차/일별로 확인하세요</p>
    </div>

    <!-- 스터디 선택 드롭다운 -->
    <div class="study-selector">
      <label for="study-select-log" class="study-select-label">스터디 선택:</label>
      <select
        id="study-select-log"
        v-model="selectedStudyId"
        @change="onStudyChange"
        class="study-select"
      >
        <option value="all">전체 스터디</option>
        <option
          v-for="study in userStudies"
          :key="study.id"
          :value="study.id"
        >
          {{ study.name }} ({{ study.role === 'leader' ? '스터디장' : '멤버' }})
        </option>
      </select>
    </div>

    <!-- 선택된 스터디 정보 -->
    <div v-if="selectedStudy" class="selected-study-info">
      <p class="study-role">{{ selectedStudy.role === 'leader' ? '스터디장' : '멤버' }}</p>
    </div>

    <!-- 활동 타임라인 컴포넌트 -->
    <ActivityTimeline
      :selectedStudyId="selectedStudyId"
      :activityLogs="logs"
      @start-recovery-quiz="handleStartRecoveryQuiz"
    />

    <!-- 퀴즈 내용 확인 모달 -->
    <QuizModal
      v-if="selectedQuiz"
      :quiz="selectedQuiz!.quiz"
      :date="selectedQuiz!.date"
      @close="selectedQuiz = null"
    />

    <!-- 복습 퀴즈 모달 -->
    <div v-if="showReviewQuizModal" class="modal-overlay">
      <div class="review-quiz-modal">
        <div class="modal-header">
          <h3 class="modal-title">
            <span class="quiz-icon">📃</span>
            {{ selectedReviewName }} 복습 퀴즈
          </h3>
          <button class="close-icon" @click="closeReviewQuizModal">✕</button>
        </div>
        <div class="modal-content">
          <QuizPlayer
            :group-id="selectedStudy?.id?.toString() || ''"
            :quiz-id="`quiz-${selectedReviewDate}`"
            @close="closeReviewQuizModal"
            @quiz-completed="handleQuizCompleted"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useQuizStore } from '@/stores/quiz'
import { getActivityLog } from '@/api/user'
import QuizModal from '@/components/quiz/QuizModal.vue'
import QuizPlayer from '@/components/quiz/QuizPlayer.vue'
import ActivityTimeline from '@/components/activity/ActivityTimeline.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const user = userStore.user

// 스터디 관련 상태
const selectedStudyId = ref('all')
const userStudies = computed(() => user?.studies || [])

// 선택된 스터디 정보
const selectedStudy = computed(() => {
  if (selectedStudyId.value === 'all') return null
  return userStudies.value.find(study => study.id === Number(selectedStudyId.value))
})

const logs = ref<any[]>([])

// 최초 로드
onMounted(loadLogs)

// 스터디 변경 시 재조회
async function onStudyChange() {
  await loadLogs()
}

// 서버에서 활동 로그 로드
async function loadLogs() {
  try {
    console.log('📃 활동 로그 로드 시작 - 스터디 ID:', selectedStudyId.value)

    // 사용자 정보가 없으면 로드하지 않음
    if (!user) {
      console.log('📃 사용자 정보가 없어 활동 로그 로드를 건너뜁니다.')
      return
    }

    // 현재는 전체 활동 로그만 조회 (백엔드에서 스터디별 필터링 지원 시 수정)
    const response = await getActivityLog()
    console.log('활동 로그 응답:', response)

    // API 응답 구조에 맞게 데이터 추출
    let activityData = []
    if (response.data && response.data.data) {
      activityData = response.data.data
    } else if (response.data && Array.isArray(response.data)) {
      activityData = response.data
    } else {
      activityData = []
    }

    if (selectedStudyId.value === 'all') {
      // 전체 스터디 활동 로그
      logs.value = activityData
    } else {
      // 특정 스터디 활동 로그만 필터링
      const studyId = Number(selectedStudyId.value)
      logs.value = activityData.filter((log: any) =>
        log.studyId === studyId
      )
    }

    console.log('📃 로드된 활동 로그:', logs.value)

    // 활동 로그가 없으면 기본 스터디 정보로 더미 데이터 생성
    if (logs.value.length === 0) {
      logs.value = generateDefaultActivityData()
    }
  } catch (error) {
    console.error('활동 로그 로드 실패:', error)
    logs.value = generateDefaultActivityData()
  }
}

// 활동 로그가 없을 때 기본 데이터 생성
function generateDefaultActivityData() {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()

  if (selectedStudyId.value === 'all') {
    // 전체 스터디에 대한 기본 데이터
    return userStudies.value.map(study => ({
      id: `dummy-${study.id}`,
      studyId: study.id,
      studyName: study.name,
      role: study.role,
      date: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`,
      attendance: 'absent',
      participationMinutes: 0,
      quiz: [],
      isDummy: true // 더미 데이터 표시
    }))
  } else {
    // 특정 스터디에 대한 기본 데이터
    const study = selectedStudy.value
    if (!study) return []

    return [{
      id: `dummy-${study.id}`,
      studyId: study.id,
      studyName: study.name,
      role: study.role,
      date: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`,
      attendance: 'absent',
      participationMinutes: 0,
      quiz: [],
      isDummy: true // 더미 데이터 표시
    }]
  }
}

type QuizItem = { question: string; answer: string }
type QuizPayload = { date: string; quiz: QuizItem[] }

const selectedQuiz = ref<QuizPayload | null>(null)

// 퀴즈 스토어
const quizStore = useQuizStore()

// 복습 퀴즈 모달 상태
const showReviewQuizModal = ref(false)
const selectedReviewDate = ref('')
const selectedReviewName = ref('')

// 타임라인에서 복습 퀴즈 시작
const handleStartRecoveryQuiz = (day: { date: string; name: string }) => {
  // 복습 퀴즈 데이터 생성
  const quizSet = {
    id: `quiz-${day.date}`,
    groupId: selectedStudy.value?.id?.toString() || '1',
    title: `${day.name} 복습 퀴즈`,
    description: `${day.name}에 출석했던 퀴즈를 복습해보세요.`,
    questions: [
      {
        id: 'q-1',
        question: '스터디에서 가장 중요한 것은?',
        type: 'short-answer' as const,
        correctAnswer: '꾸준한 참여',
        explanation: '정답: 꾸준한 참여'
      },
      {
        id: 'q-2',
        question: '화상회의 중 마이크 사용법은?',
        type: 'short-answer' as const,
        correctAnswer: '발언 시에만 켜기',
        explanation: '정답: 발언 시에만 켜기'
      },
      {
        id: 'q-3',
        question: '스터디 자료는 언제 준비해야 하나요?',
        type: 'short-answer' as const,
        correctAnswer: '미리미리',
        explanation: '정답: 미리미리'
      },
      {
        id: 'q-4',
        question: '스터디 참여 시 지켜야 할 예의는?',
        type: 'short-answer' as const,
        correctAnswer: '시간 엄수',
        explanation: '정답: 시간 엄수'
      }
    ],
    totalQuestions: 4,
    createdAt: day.date,
    updatedAt: day.date
  }

  // 퀴즈 스토어에 저장
  quizStore.currentQuizSet = quizSet

  // 모달 표시
  selectedReviewDate.value = day.date
  selectedReviewName.value = day.name
  showReviewQuizModal.value = true
}

// 복습 퀴즈 모달 닫기
const closeReviewQuizModal = () => {
  showReviewQuizModal.value = false
  selectedReviewDate.value = ''
  selectedReviewName.value = ''
}

// 퀴즈 완료 처리
const handleQuizCompleted = (result: any) => {
  console.log('퀴즈 완료:', result)
  closeReviewQuizModal()
}

// 날짜 포맷
function formatDate(isoDate: string) {
  const d = new Date(isoDate)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

// 라우터 변경 감지하여 활동 로그 자동 로드
watch(
  () => route.path,
  async (newPath) => {
    if (newPath === '/mypage/log') {
      console.log('📃 활동로그 탭으로 이동됨 - 데이터 자동 로드')
      await loadLogs()
    }
  },
  { immediate: true }
)

// 사용자 정보 변경 시 활동 로그 자동 로드
watch(
  () => user,
  async (newUser) => {
    if (newUser && route.path === '/mypage/log') {
      console.log('📃 사용자 정보 변경됨 - 활동 로그 자동 로드')
      await loadLogs()
    }
  },
  { immediate: true }
)

// 컴포넌트 마운트 시 활동 로그 로드
onMounted(async () => {
  console.log('📃 StudyTimelineView 마운트됨')
  await loadLogs()
})


</script>

<style scoped>
.activity-log-wrapper {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e9ecef;
  min-height: calc(100vh - 200px);
  margin: 2rem auto;
  max-width: 1200px;
}

.activity-log-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e9ecef;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
}

/* 복습 퀴즈 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.review-quiz-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  background: #d79c94;
  color: white;
}

.modal-title {
  font-size: 1.4rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quiz-icon {
  font-size: 1.6rem;
}

.close-icon {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-icon:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-content {
  flex: 1;
  overflow: hidden;
  padding: 0;
}

.quiz-info {
  margin-bottom: 2rem;
}

.quiz-info p {
  font-size: 1rem;
  color: #495057;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.quiz-rules {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #d79c94;
}

.quiz-rules h4 {
  margin: 0 0 1rem 0;
  color: #212529;
  font-size: 1.1rem;
}

.quiz-rules ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #495057;
}

.quiz-rules li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.start-quiz-btn {
  background: #6db3f2;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-quiz-btn:hover {
  background: #5a9bd9;
  transform: translateY(-1px);
}

.cancel-btn {
  background: #6c757d;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

/* 스터디 선택기 스타일 */
.study-selector {
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.study-select-label {
  display: block;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.study-select {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #495057;
  transition: border-color 0.2s ease;
}

.study-select:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
}

.selected-study-info {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #d79c94;
  border-radius: 12px;
  color: white;
  text-align: center;
}

.study-role {
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .activity-log-wrapper {
    padding: 1.5rem;
  }

  .log-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .log-action {
    width: 100%;
  }

  .quiz-button {
    width: 100%;
    padding: 0.75rem 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .review-quiz-modal {
    width: 95%;
    margin: 1rem;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
