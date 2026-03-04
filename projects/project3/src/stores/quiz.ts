import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { QuizSet, QuizQuestion, QuizState } from '@/types/quiz'
import { getQuizSets, getQuizSet, submitQuizResult } from '@/api/quiz'

// AI 생성 퀴즈 데이터 타입
export interface AIQuizData {
  groupId: string
  questions: {
    quiz: string
    quizType: 'subject' | 'ox'
    answer: string
  }[]
  generatedAt: string
}

export const useQuizStore = defineStore('quiz', () => {
  // 상태
  const quizSets = ref<QuizSet[]>([])
  const currentQuizSet = ref<QuizSet | null>(null)
  const currentQuestionIndex = ref(0)
  const userAnswers = ref<Record<string, string>>({})
  const isCompleted = ref(false)
  const startTime = ref<Date | null>(null)
  const endTime = ref<Date | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // AI 생성 퀴즈 데이터 저장소
  const aiQuizData = ref<AIQuizData | null>(null)

  // 계산된 속성
  const currentQuestion = computed(() => {
    if (!currentQuizSet.value || currentQuestionIndex.value >= currentQuizSet.value.questions.length) {
      return null
    }
    return currentQuizSet.value.questions[currentQuestionIndex.value]
  })

  const totalQuestions = computed(() => currentQuizSet.value?.questions.length || 0)

  const progress = computed(() => {
    if (totalQuestions.value === 0) return 0
    return Math.round((currentQuestionIndex.value / totalQuestions.value) * 100)
  })

  const hasNextQuestion = computed(() => {
    return currentQuestionIndex.value < (totalQuestions.value - 1)
  })

  const hasPreviousQuestion = computed(() => {
    return currentQuestionIndex.value > 0
  })

  const correctAnswersCount = computed(() => {
    let count = 0
    Object.entries(userAnswers.value).forEach(([questionId, userAnswer]) => {
      const question = currentQuizSet.value?.questions.find(q => q.id === questionId)
      if (question && userAnswer === question.correctAnswer) {
        count++
      }
    })
    return count
  })

  // 액션
  async function fetchQuizSets(groupId: string) {
    try {
      isLoading.value = true
      error.value = null
      const sets = await getQuizSets(groupId)
      quizSets.value = sets
      console.log('✅ 퀴즈 세트 목록 로드 완료:', sets.length)
    } catch (err: any) {
      error.value = err.message || '퀴즈 목록을 불러오는데 실패했습니다.'
      console.error('❌ 퀴즈 세트 목록 로드 실패:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function loadQuizSet(groupId: string, quizId: string) {
    try {
      isLoading.value = true
      error.value = null
      const quizSet = await getQuizSet(groupId, quizId)
      currentQuizSet.value = quizSet
      resetQuizState()
      console.log('✅ 퀴즈 세트 로드 완료:', quizSet.title)
    } catch (err: any) {
      error.value = err.message || '퀴즈를 불러오는데 실패했습니다.'
      console.error('❌ 퀴즈 세트 로드 실패:', err)
    } finally {
      isLoading.value = false
    }
  }

  function resetQuizState() {
    currentQuestionIndex.value = 0
    userAnswers.value = {}
    isCompleted.value = false
    startTime.value = new Date()
    endTime.value = null
    error.value = null
  }

  function nextQuestion() {
    if (hasNextQuestion.value) {
      currentQuestionIndex.value++
    } else {
      completeQuiz()
    }
  }

  function previousQuestion() {
    if (hasPreviousQuestion.value) {
      currentQuestionIndex.value--
    }
  }

  function goToQuestion(index: number) {
    if (index >= 0 && index < totalQuestions.value) {
      currentQuestionIndex.value = index
    }
  }

  function submitAnswer(questionId: string, answer: string) {
    userAnswers.value[questionId] = answer
    console.log(`✅ 답변 제출: ${questionId} = ${answer}`)
  }

  function completeQuiz() {
    isCompleted.value = true
    endTime.value = new Date()
    console.log('🎯 퀴즈 완료!')
  }

  function clearQuiz() {
    currentQuizSet.value = null
    resetQuizState()
    console.log('🧹 퀴즈 상태 초기화 완료')
  }

  // AI 퀴즈 데이터 설정
  function setAIQuizData(data: AIQuizData) {
    aiQuizData.value = data
    console.log('🎯 AI 퀴즈 데이터 저장됨:', data)
  }

  // AI 퀴즈 데이터 조회
  function getAIQuizData(groupId?: string): AIQuizData | null {
    if (!aiQuizData.value) return null
    if (groupId && aiQuizData.value.groupId !== groupId) return null
    return aiQuizData.value
  }

  // AI 퀴즈 데이터 초기화
  function clearAIQuizData() {
    aiQuizData.value = null
  }

  return {
    // 상태
    quizSets,
    currentQuizSet,
    currentQuestionIndex,
    userAnswers,
    isCompleted,
    startTime,
    endTime,
    isLoading,
    error,
    aiQuizData,

    // 계산된 속성
    currentQuestion,
    totalQuestions,
    progress,
    hasNextQuestion,
    hasPreviousQuestion,
    correctAnswersCount,

    // 액션
    fetchQuizSets,
    loadQuizSet,
    resetQuizState,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitAnswer,
    completeQuiz,
    clearQuiz,
    setAIQuizData,
    getAIQuizData,
    clearAIQuizData
  }
})
