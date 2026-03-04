<template>
  <div v-if="visible" class="quiz-modal-overlay" @click.self="$emit('close')">
    <div class="quiz-modal">
      <!-- 퀴즈 헤더 -->
      <div class="quiz-header">
        <h2 class="quiz-title">오늘의 AI 퀴즈</h2>
        <div class="quiz-progress">{{ currentIndex + 1 }} / {{ actualQuestions.length }}</div>
      </div>

      <!-- 퀴즈 내용 -->
      <div class="quiz-content">
        <!-- 문제가 없을 때 -->
        <div v-if="!actualQuestions || actualQuestions.length === 0" class="no-questions">
          <div class="no-questions-icon">📚</div>
          <h3>AI 퀴즈가 생성되지 않았습니다</h3>
          <p>업로드한 파일을 기반으로 AI가 퀴즈를 생성하지 못했습니다.</p>
          <p class="no-questions-hint">파일 내용을 확인하고 다시 업로드해주세요.</p>
          
          <!-- 디버깅 정보 추가 -->
          <div class="debug-info">
            <p><strong>디버깅 정보:</strong></p>
            <p>groupId: {{ props.groupId || 'undefined' }}</p>
            <p>스토어 퀴즈 데이터: {{ aiQuizData ? '있음' : '없음' }}</p>
            <p>실제 사용할 문제 수: {{ actualQuestions ? actualQuestions.length : 'undefined' }}</p>
            <p>스토어 데이터: {{ JSON.stringify(aiQuizData, null, 2) }}</p>
          </div>
          
          <!-- 해결 방법 안내 -->
          <div class="solution-guide">
            <h4>💡 해결 방법:</h4>
            <ul>
              <li>PDF 또는 텍스트 파일인지 확인해주세요</li>
              <li>파일 내용이 충분한 텍스트를 포함하고 있는지 확인해주세요</li>
              <li>파일을 다시 업로드해보세요</li>
              <li>브라우저를 새로고침하고 다시 시도해보세요</li>
            </ul>
          </div>
          
          <button class="close-button" @click="$emit('close')">닫기</button>
        </div>

        <!-- 문제 표시 -->
        <div v-else-if="!showFeedback && !showCompletion && currentQuestion" class="question-section">
          <div class="question-content">
            <h3 class="question-text">{{ currentQuestion.quiz }}</h3>
            
            <!-- OX 문제인 경우 -->
            <div v-if="currentQuestion.quizType === 'ox'" class="answer-options">
              <button 
                class="answer-btn" 
                :class="{ selected: userAnswer === 'O' }"
                @click="selectAnswer('O')"
              >
                O
              </button>
              <button 
                class="answer-btn" 
                :class="{ selected: userAnswer === 'X' }"
                @click="selectAnswer('X')"
              >
                X
              </button>
            </div>
            
            <!-- 주관식 문제인 경우 -->
            <div v-else class="answer-input">
              <input
                v-model="userAnswer"
                type="text"
                placeholder="정답을 입력하세요"
                class="answer-field"
                @keyup.enter="submitAnswer"
              />
            </div>
            
            <button 
              class="submit-btn" 
              @click="submitAnswer"
              :disabled="!userAnswer"
            >
              {{ isLastQuestion ? '완료' : '다음' }}
            </button>
          </div>
        </div>

        <!-- 정답/오답 피드백 -->
        <div v-if="showFeedback && currentQuestion" class="feedback-section">
          <div class="feedback-icon" :class="isCorrect ? 'correct' : 'incorrect'">
            {{ isCorrect ? 'O' : 'X' }}
          </div>
          <div class="feedback-text">
            {{ isCorrect ? '정답입니다!' : '틀렸습니다!' }}
          </div>
          <div class="correct-answer" v-if="!isCorrect">
            정답: {{ currentQuestion.answer }}
          </div>
        </div>

        <!-- 완료 메시지 -->
        <div v-if="showCompletion" class="completion-section">
          <div class="completion-icon">🎉</div>
          <h3 class="completion-title">오늘 문제를 다 풀었습니다!</h3>
          <p class="completion-subtitle">수고하셨습니다.</p>
          <button class="close-button" @click="$emit('close')">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import type { QuizResponse } from '@/types/quiz'

interface Props {
  visible: boolean
  groupId?: string // groupId를 받아서 스토어에서 해당 그룹의 퀴즈 데이터를 가져옴
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const quizStore = useQuizStore()

// 상태 변수
const currentIndex = ref(0)
const userAnswer = ref('')
const showFeedback = ref(false)
const showCompletion = ref(false)
const isCorrect = ref(false)

// 스토어에서 퀴즈 데이터 가져오기
const aiQuizData = computed(() => {
  if (!props.groupId) return null
  return quizStore.getAIQuizData(props.groupId)
})

// 실제 사용할 퀴즈 목록
const actualQuestions = computed(() => {
  if (aiQuizData.value && aiQuizData.value.questions && aiQuizData.value.questions.length > 0) {
    console.log('✅ 스토어에서 퀴즈 데이터 가져옴:', aiQuizData.value.questions)
    console.log('✅ 퀴즈 개수:', aiQuizData.value.questions.length)
    return aiQuizData.value.questions
  } else {
    console.log('⚠️ 스토어에 퀴즈 데이터가 없음')
    console.log('🔍 aiQuizData:', aiQuizData.value)
    return []
  }
})

// 계산된 속성
const currentQuestion = computed(() => {
  const q = actualQuestions.value[currentIndex.value]
  
  if (!q) {
    console.warn('⚠️ 현재 문제가 없습니다')
    return null
  }
  
  return q
})

const isLastQuestion = computed(() => {
  const result = currentIndex.value === actualQuestions.value.length - 1
  console.log('🔍 마지막 문제 여부:', result)
  return result
})

// 답변 선택
function selectAnswer(answer: string) {
  userAnswer.value = answer
}

// 답변 제출
function submitAnswer() {
  console.log('🔍 답변 제출 시작')
  console.log('🔍 사용자 답변:', userAnswer.value)
  console.log('🔍 현재 문제:', currentQuestion.value)
  
  if (!userAnswer.value || !currentQuestion.value) {
    console.warn('⚠️ 답변 또는 문제가 없습니다')
    return
  }

  // 정답 확인
  isCorrect.value = checkAnswer(userAnswer.value, currentQuestion.value.answer)
  console.log('🔍 정답 여부:', isCorrect.value)
  console.log('🔍 사용자 답변:', userAnswer.value)
  console.log('🔍 정답:', currentQuestion.value.answer)
  
  // 피드백 표시
  showFeedback.value = true
  console.log('✅ 피드백 표시 시작')
  
  // 0.5초 후 다음 문제로 또는 완료
  setTimeout(() => {
    console.log('⏰ 피드백 타이머 완료')
    showFeedback.value = false
    
    if (isLastQuestion.value) {
      // 마지막 문제 완료
      console.log('🎉 마지막 문제 완료, 완료 화면 표시')
      showCompletion.value = true
    } else {
      // 다음 문제로
      console.log('➡️ 다음 문제로 이동')
      nextQuestion()
    }
  }, 500)
}

// 정답 확인
function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const result = String(userAnswer).toLowerCase() === String(correctAnswer).toLowerCase()
  console.log('🔍 정답 확인:', {
    userAnswer: userAnswer.toLowerCase(),
    correctAnswer: String(correctAnswer).toLowerCase(),
    result
  })
  return result
}

// 다음 문제로
function nextQuestion() {
  console.log('🔍 다음 문제로 이동 시작')
  console.log('🔍 현재 인덱스:', currentIndex.value)
  
  currentIndex.value++
  userAnswer.value = ''
  
  console.log('✅ 다음 문제로 이동 완료')
  console.log('�� 새로운 인덱스:', currentIndex.value)
}

// 모달이 열릴 때 초기화
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    currentIndex.value = 0
    userAnswer.value = ''
    showFeedback.value = false
    showCompletion.value = false
    isCorrect.value = false
  }
})
</script>

<style scoped>
.quiz-modal-overlay {
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

.quiz-modal {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.quiz-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.quiz-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.quiz-progress {
  font-size: 1rem;
  color: #666;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
}

.quiz-content {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.question-section {
  text-align: center;
  width: 100%;
}

.question-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.question-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.6;
  padding: 0 1rem;
}

.answer-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.answer-btn {
  width: 80px;
  height: 80px;
  border: 3px solid #e0e0e0;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.answer-btn:hover {
  transform: scale(1.1);
  border-color: #999;
}

.answer-btn.selected {
  border-color: #2196F3;
  background: #2196F3;
  color: white;
}

.answer-input {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 1rem auto;
}

.answer-field {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.answer-field:focus {
  border-color: #2196F3;
}

.submit-btn {
  background: #2196F3;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #1976D2;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  color: #888;
}

.feedback-section {
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.feedback-icon {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.feedback-icon.correct {
  color: #4CAF50;
}

.feedback-icon.incorrect {
  color: #f44336;
}

.feedback-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.correct-answer {
  font-size: 1rem;
  color: #666;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: inline-block;
}

.completion-section {
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.completion-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.completion-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.completion-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin: 0 0 2rem 0;
}

.close-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-button:hover {
  background: #45a049;
}

.no-questions {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
}

.no-questions-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-questions h3 {
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.no-questions p {
  font-size: 1rem;
  color: #888;
  margin-bottom: 1.5rem;
}

.no-questions-hint {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.5rem;
}

.debug-info {
  background: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 0.75rem;
  margin: 1rem 0;
  font-family: monospace;
  font-size: 0.8rem;
  text-align: left;
  max-height: 200px;
  overflow-y: auto;
}

.debug-info p {
  margin: 0.25rem 0;
}

.debug-info strong {
  color: #495057;
}

.solution-guide {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
}

.solution-guide h4 {
  margin: 0 0 0.5rem 0;
  color: #495057;
  font-size: 1rem;
}

.solution-guide ul {
  margin: 0;
  padding-left: 1.5rem;
}

.solution-guide li {
  margin: 0.25rem 0;
  color: #6c757d;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .quiz-modal {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .answer-btn {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .question-text {
    font-size: 1.1rem;
  }
}
</style>
