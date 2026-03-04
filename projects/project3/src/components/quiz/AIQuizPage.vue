<template>
  <div class="quiz-page">
    <div class="quiz-header">
      <h2 class="quiz-number">{{ currentIndex + 1 }}번</h2>
      <div v-if="isReviewMode" class="review-mode-badge">📚 복습 모드 - 출석률 복구</div>
    </div>

    <OXQuestion
      v-if="currentQuestion && currentQuestion.type === 'OXQuestion'"
      :question="currentQuestion"
      :index="currentIndex"
      @answered="handleAnswer"
    />
    <PuzzleQuestion
      v-else-if="currentQuestion && currentQuestion.type === 'PuzzleQuestion'"
      :question="currentQuestion"
      :index="currentIndex"
      @answered="handleAnswer"
    />
    <div v-else-if="!currentQuestion" class="loading-state">
      <p>퀴즈를 불러오는 중...</p>
    </div>

    <AnswerFeedback :visible="showFeedback" :isCorrect="isCorrect" @close="handleNext" />

    <button v-if="!isLastQuestion" class="next-button" @click="handleNext">다음</button>
    <button v-else class="finish-button" @click="handleFinish">종료</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuizStore, type AIQuizData } from '@/stores/quiz'
import OXQuestion from '@/components/quiz/OXQuestion.vue'
import PuzzleQuestion from '@/components/quiz/PuzzleQuestion.vue'
import AnswerFeedback from '@/components/quiz/AnswerFeedback.vue'

type QuizType = 'OXQuestion' | 'PuzzleQuestion'
interface QuizQuestion {
  type: 'OXQuestion' | 'PuzzleQuestion'
  question: string
  correctAnswer: string | number
}

const router = useRouter()
const route = useRoute()
const quizStore = useQuizStore()
const loginId = localStorage.getItem('loginId') || 'alice'
const MAX_QUIZ_COUNT = 4

// Props 정의
interface Props {
  groupId?: string
  date?: string
  type?: string
  mode?: string
}

const props = withDefaults(defineProps<Props>(), {
  groupId: '',
  date: '',
  type: '',
  mode: ''
})

const questions = ref<QuizQuestion[]>([])
const currentIndex = ref(0)
const currentQuestion = computed(() => questions.value[currentIndex.value])
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)

const showFeedback = ref(false)
const isCorrect = ref(false)
const userAnswers = ref<boolean[]>([])
const score = ref(0)
const date = computed(() => props.date || route.query.date as string)
const groupId = computed(() => props.groupId || route.query.groupId as string)
const isReviewMode = computed(() => props.type === 'review' && props.mode === 'attendance-recovery')

// --- AI 문제 추출 ---
function extractAIQuizQuestions(): QuizQuestion[] {
  // 복습 모드일 때는 퀴즈 스토어에서 데이터 가져오기
  if (isReviewMode.value && quizStore.currentQuizSet) {
    console.log('🎯 복습 모드: 퀴즈 스토어에서 데이터 추출')
    const quizSet = quizStore.currentQuizSet
    
    const quizList: QuizQuestion[] = quizSet.questions.map((q: any, index: number) => {
      // 문제 타입 결정 (기본적으로 주관식으로 설정)
      let questionType: QuizQuestion['type'] = 'PuzzleQuestion'
      
      // O/X 문제인지 확인 (정답이 'O' 또는 'X'인 경우)
      if (q.correctAnswer === 'O' || q.correctAnswer === 'X' || 
          q.correctAnswer === 'o' || q.correctAnswer === 'x') {
        questionType = 'OXQuestion'
      }
      
      const question: QuizQuestion = {
        type: questionType,
        question: q.question,
        correctAnswer: q.correctAnswer
      }

      return question
    })
    
    console.log('✅ 복습 퀴즈 데이터 추출 완료:', quizList.length, '개')
    return quizList
  }

  // 기존 AI 퀴즈 로직
  if (!groupId.value) {
    console.log('⚠️ groupId가 없어 AI 퀴즈를 찾을 수 없습니다.')
    return []
  }

  const aiQuizData = quizStore.getAIQuizData(groupId.value)
  if (!aiQuizData || !aiQuizData.questions || aiQuizData.questions.length === 0) {
    console.log('⚠️ AI 퀴즈 데이터가 없습니다.')
    return []
  }

  console.log('🎯 AI 퀴즈 데이터에서 문제 추출:', aiQuizData.questions)
  
  const quizList: QuizQuestion[] = []

  // AI 응답에서 퀴즈 데이터 추출 및 타입 고정
  aiQuizData.questions.slice(0, 4).forEach((q: any, index: number) => {
    // O/X 문제 2개, 주관식 문제 2개로 고정
    let questionType: QuizQuestion['type']
    if (index < 2) {
      questionType = 'OXQuestion'  // 첫 2문제는 O/X
    } else {
      questionType = 'PuzzleQuestion'  // 나머지 2문제는 주관식
    }
    
    const question: QuizQuestion = {
      type: questionType,
      question: q.question,
      correctAnswer: q.answer
    }

    quizList.push(question)
  })

  return quizList
}

// --- 문제 추출 (AI 우선, 기본 문제는 백업용) ---
function extractQuizFromLogs(): QuizQuestion[] {
  // 1. AI 생성 문제 우선 시도
  const aiQuestions = extractAIQuizQuestions()
  if (aiQuestions.length > 0) {
    console.log('✅ AI 생성 문제 사용:', aiQuestions.length, '개')
    return aiQuestions
  }

  // 2. AI 문제가 없으면 기본 문제 사용 (fallback)
  console.log('⚠️ AI 문제가 없어 기본 문제를 사용합니다.')
  const fallbackQuestions = generateDefaultReviewQuiz()
  return fallbackQuestions.slice(0, 4) // 최대 4문제로 제한
}

// --- 기본 복습 퀴즈 생성 (공유 퀴즈가 없는 경우) ---
function generateDefaultReviewQuiz(): QuizQuestion[] {
  console.log('🔄 기본 복습 퀴즈 생성 시작')
  
  const defaultQuestions = [
    {
      question: '스터디에서 가장 중요한 것은?',
      answer: '꾸준한 참여'
    },
    {
      question: '화상회의 중 마이크 사용법은?',
      answer: '발언 시에만 켜기'
    },
    {
      question: '스터디 자료는 언제 준비해야 하나요?',
      answer: '미리미리'
    },
    {
      question: '스터디 참여 시 지켜야 할 예의는?',
      answer: '시간 엄수'
    }
  ]

  const types: QuizQuestion['type'][] = ['PuzzleQuestion', 'OXQuestion']

  const quizQuestions = defaultQuestions.map((q, index) => {
    // O/X 문제 2개, 주관식 문제 2개로 고정
    let questionType: QuizQuestion['type']
    if (index < 2) {
      questionType = 'OXQuestion'  // 첫 2문제는 O/X
    } else {
      questionType = 'PuzzleQuestion'  // 나머지 2문제는 주관식
    }
    
    const question: QuizQuestion = {
      type: questionType,
      question: q.question,
      correctAnswer: q.answer
    }

    return question
  })
  
  console.log('✅ 기본 복습 퀴즈 생성 완료:', quizQuestions.length, '개')
  return quizQuestions
}

// --- 배열 섞기 ---
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/* 정답 처리 */
function handleAnswer(ok: boolean) {
  isCorrect.value = ok
  showFeedback.value = true
  userAnswers.value[currentIndex.value] = ok
}

/* 다음 */
function handleNext() {
  showFeedback.value = false
  if (!isLastQuestion.value) currentIndex.value++
}

/* 종료 */
function handleFinish() {
  score.value = userAnswers.value.filter(Boolean).length
  router.push({
    path: '/quiz-result',
    query: {
      total: questions.value.length,
      correct: score.value,
      date: date.value,
      type: isReviewMode.value ? 'review' : 'normal',
      mode: isReviewMode.value ? 'attendance-recovery' : undefined,
    },
  })
}

// --- 퀴즈 초기화 ---
onMounted(() => {
  console.log('🎯 AIQuizPage 마운트됨')
  console.log('날짜 쿼리:', date.value)
  console.log('복습 모드:', isReviewMode.value)
  console.log('그룹 ID:', groupId.value)
  console.log('전체 쿼리 파라미터:', route.query)
  
  // AI 문제 우선 시도
  const allQuestions = extractQuizFromLogs()
  console.log('추출된 문제 수:', allQuestions.length)
  console.log('문제 목록:', allQuestions)
  
  if (allQuestions.length === 0) {
    console.log('❌ 문제를 불러올 수 없습니다.')
    alert('퀴즈 문제를 불러올 수 없습니다. 다시 시도해주세요.')
    router.push('/')
    return
  }
  
  // 최대 4문제로 제한하고 타입별로 정렬
  const limitedQuestions = allQuestions.slice(0, MAX_QUIZ_COUNT)
  
  // O/X 문제를 앞에, 주관식 문제를 뒤에 배치
  const sortedQuestions = [
    ...limitedQuestions.filter(q => q.type === 'OXQuestion'),
    ...limitedQuestions.filter(q => q.type === 'PuzzleQuestion')
  ]
  
  questions.value = sortedQuestions
  userAnswers.value = Array(questions.value.length).fill(false)
  
  console.log('✅ 최종 퀴즈 문제 설정 완료:', questions.value.length, '개')
  console.log('문제 타입별 정렬:', questions.value.map(q => q.type))
})
</script>
<style scoped>
.quiz-page {
  padding: 2rem;
  text-align: center;
}

.quiz-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.quiz-number {
  font-size: 1.5rem;
  margin: 0;
}

.review-mode-badge {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
}

.next-button,
.finish-button {
  margin-top: 2rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  color: white;
  transition: all 0.3s ease;
}

.next-button {
  background-color: #A3D5F7;
}

.next-button:hover {
  background-color: #8bc5f0;
  transform: translateY(-1px);
}

.finish-button {
  background-color: #81C3D7;
}

.finish-button:hover {
  background-color: #6bb3c7;
  transform: translateY(-1px);
}
</style>
