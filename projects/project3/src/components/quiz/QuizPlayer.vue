<!-- src/components/quiz/QuizPlayer.vue -->
<template>
  <div class="quiz-player">
    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>퀴즈를 불러오는 중...</p>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="error-state">
      <h3>❌ 오류가 발생했습니다</h3>
      <p>{{ error }}</p>
      <button @click="retryLoad" class="retry-btn">다시 시도</button>
    </div>

    <!-- 퀴즈 완료 상태 -->
    <div v-else-if="isCompleted" class="completion-state">
      <div class="completion-header">
        <h2>🎯 퀴즈 완료!</h2>
        <div class="score-display">
          <span class="score">{{ correctAnswersCount }}</span>
          <span class="total">/ {{ totalQuestions }}</span>
        </div>
        <p class="score-text">
          정답률: {{ Math.round((correctAnswersCount / totalQuestions) * 100) }}%
        </p>
      </div>

      <div class="completion-actions">
        <button @click="reviewAnswers" class="review-btn">답안 검토</button>
        <button @click="restartQuiz" class="restart-btn">다시 시작</button>
        <button @click="closeQuiz" class="close-btn">닫기</button>
      </div>
    </div>

    <!-- 퀴즈 진행 상태 -->
    <div v-else-if="currentQuestion" class="quiz-content">
      <!-- 진행률 표시 -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        <span class="progress-text">{{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
      </div>

      <!-- 문제 표시 -->
      <div class="question-container">
        <h3 class="question-text">{{ currentQuestion.question }}</h3>

        <!-- 객관식 옵션 -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="options-container">
          <label
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-item"
            :class="{ selected: userAnswers[currentQuestion.id] === option }"
          >
            <input
              type="radio"
              :name="`question-${currentQuestion.id}`"
              :value="option"
              :checked="userAnswers[currentQuestion.id] === option"
              @change="submitAnswer(currentQuestion.id, option)"
            />
            <span class="option-text">{{ option }}</span>
          </label>
        </div>

        <!-- OX 문제 -->
        <div v-else-if="currentQuestion.type === 'true-false'" class="options-container">
          <label class="option-item" :class="{ selected: userAnswers[currentQuestion.id] === 'true' }">
            <input
              type="radio"
              :name="`question-${currentQuestion.id}`"
              value="true"
              :checked="userAnswers[currentQuestion.id] === 'true'"
              @change="submitAnswer(currentQuestion.id, 'true')"
            />
            <span class="option-text">✅ 맞음</span>
          </label>
          <label class="option-item" :class="{ selected: userAnswers[currentQuestion.id] === 'false' }">
            <input
              type="radio"
              :name="`question-${currentQuestion.id}`"
              value="false"
              :checked="userAnswers[currentQuestion.id] === 'false'"
              @change="submitAnswer(currentQuestion.id, 'false')"
            />
            <span class="option-text">❌ 틀림</span>
          </label>
        </div>

        <!-- 주관식 -->
        <div v-else-if="currentQuestion.type === 'short-answer'" class="short-answer-container">
          <input
            v-model="userAnswers[currentQuestion.id]"
            type="text"
            class="answer-input"
            placeholder="답을 입력하세요..."
            @input="submitAnswer(currentQuestion.id, userAnswers[currentQuestion.id])"
          />
        </div>
      </div>

      <!-- 네비게이션 버튼 -->
      <div class="navigation-buttons">
        <button
          @click="previousQuestion"
          :disabled="!hasPreviousQuestion"
          class="nav-btn prev-btn"
        >
          ← 이전
        </button>

        <button
          @click="nextQuestion"
          :disabled="!userAnswers[currentQuestion.id]"
          class="nav-btn next-btn"
        >
          {{ hasNextQuestion ? '다음 →' : '완료' }}
        </button>
      </div>
    </div>

    <!-- 퀴즈가 없는 경우 -->
    <div v-else class="no-quiz-state">
      <h3>📝 퀴즈가 없습니다</h3>
      <p>이 스터디 그룹에는 아직 퀴즈가 생성되지 않았습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import type { QuizSet } from '@/types/quiz'

const props = defineProps<{
  groupId: string
  quizId?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'quiz-completed', result: any): void
}>()

const quizStore = useQuizStore()

// 계산된 속성들
const isLoading = computed(() => quizStore.isLoading)
const error = computed(() => quizStore.error)
const currentQuestion = computed(() => quizStore.currentQuestion)
const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex)
const totalQuestions = computed(() => quizStore.totalQuestions)
const progress = computed(() => quizStore.progress)
const hasNextQuestion = computed(() => quizStore.hasNextQuestion)
const hasPreviousQuestion = computed(() => quizStore.hasPreviousQuestion)
const isCompleted = computed(() => quizStore.isCompleted)
const userAnswers = computed(() => quizStore.userAnswers)
const correctAnswersCount = computed(() => quizStore.correctAnswersCount)

// 액션들
const nextQuestion = () => quizStore.nextQuestion()
const previousQuestion = () => quizStore.previousQuestion()
const submitAnswer = (questionId: string, answer: string) => quizStore.submitAnswer(questionId, answer)

function retryLoad() {
  if (props.quizId) {
    quizStore.loadQuizSet(props.groupId, props.quizId)
  } else {
    quizStore.fetchQuizSets(props.groupId)
  }
}

function reviewAnswers() {
  // 답안 검토 모드로 전환 (구현 필요)
  console.log('답안 검토 모드')
}

function restartQuiz() {
  quizStore.resetQuizState()
}

function closeQuiz() {
  quizStore.clearQuiz()
  emit('close')
}

// 컴포넌트 마운트 시 퀴즈 로드
onMounted(async () => {
  if (props.quizId) {
    // 특정 퀴즈 로드
    await quizStore.loadQuizSet(props.groupId, props.quizId)
  } else {
    // 퀴즈 목록 로드 후 첫 번째 퀴즈 선택
    await quizStore.fetchQuizSets(props.groupId)
    if (quizStore.quizSets.length > 0) {
      await quizStore.loadQuizSet(props.groupId, quizStore.quizSets[0].id)
    }
  }
})
</script>

<style scoped>
.quiz-player {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.loading-state, .error-state, .completion-state, .no-quiz-state {
  text-align: center;
  padding: 3rem 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  color: #666;
  font-weight: 600;
}

.question-container {
  margin-bottom: 2rem;
}

.question-text {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-item:hover {
  border-color: #2196F3;
  background: #f8f9ff;
}

.option-item.selected {
  border-color: #2196F3;
  background: #e3f2fd;
}

.option-item input[type="radio"] {
  margin-right: 0.8rem;
  transform: scale(1.2);
}

.option-text {
  font-size: 1rem;
  color: #333;
}

.short-answer-container {
  margin-top: 1rem;
}

.answer-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.answer-input:focus {
  outline: none;
  border-color: #2196F3;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.nav-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev-btn {
  background: #6c757d;
  color: white;
}

.prev-btn:hover:not(:disabled) {
  background: #5a6268;
}

.next-btn {
  background: #007bff;
  color: white;
}

.next-btn:hover:not(:disabled) {
  background: #0056b3;
}

.completion-header {
  text-align: center;
  margin-bottom: 2rem;
}

.score-display {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
}

.score {
  color: #4CAF50;
}

.total {
  color: #666;
}

.score-text {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.review-btn, .restart-btn, .close-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.review-btn {
  background: #17a2b8;
  color: white;
}

.restart-btn {
  background: #28a745;
  color: white;
}

.close-btn {
  background: #6c757d;
  color: white;
}

.retry-btn {
  padding: 0.8rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
</style>

