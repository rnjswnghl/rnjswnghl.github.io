<!-- src/components/study/AttendanceQuizModal.vue -->
<template>
  <div class="quiz-modal-overlay">
    <div class="quiz-modal">
      <div class="modal-header">
        <div class="modal-title">
          <span class="quiz-icon">📝</span>
          출석 퀴즈
        </div>
        <div class="study-info">
          {{ studyName }}
        </div>
      </div>

      <div class="modal-content">
        <div class="quiz-section">
          <div class="quiz-question">
            <h3>Q. {{ quiz.question }}</h3>
          </div>

          <div class="quiz-options">
            <button
              class="option-btn"
              :class="{
                selected: selectedAnswer === 'O',
                correct: showResult && quiz.answer === 'O',
                incorrect: showResult && selectedAnswer === 'O' && quiz.answer !== 'O'
              }"
              @click="selectAnswer('O')"
              :disabled="showResult"
            >
              <span class="option-text">O</span>
              <span class="option-label">맞습니다</span>
            </button>

            <button
              class="option-btn"
              :class="{
                selected: selectedAnswer === 'X',
                correct: showResult && quiz.answer === 'X',
                incorrect: showResult && selectedAnswer === 'X' && quiz.answer !== 'X'
              }"
              @click="selectAnswer('X')"
              :disabled="showResult"
            >
              <span class="option-text">X</span>
              <span class="option-label">틀렸습니다</span>
            </button>
          </div>
        </div>

        <div v-if="showResult" class="result-section">
          <div class="result-icon">
            {{ isCorrect ? '🎉' : '💡' }}
          </div>
          <div class="result-message">
            {{ isCorrect ? '정답입니다!' : '틀렸습니다.' }}
          </div>
          <div class="result-explanation">
            {{ quiz.explanation }}
          </div>
        </div>

        <div class="modal-actions">
          <Button
            v-if="!showResult"
            variant="primary"
            @click="submitAnswer"
            :disabled="!selectedAnswer"
          >
            답안 제출
          </Button>
          <Button
            v-else
            variant="primary"
            @click="handleComplete"
          >
            스터디룸 입장
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'

const props = defineProps<{
  studyId: number
  studyName: string
  category: string
  isLeader: boolean
  /** ✅ studyId와 동일한 값 (필수) */
  groupId: number
}>()

const emit = defineEmits<{
  close: []
  complete: [isLeader: boolean] // Changed to emit isLeader
}>()

const router = useRouter()

const selectedAnswer = ref<'O' | 'X' | null>(null)
const showResult = ref(false)
const isCorrect = ref(false)

onMounted(() => {
  console.debug('[AttendanceQuizModal] mounted props=', {
    studyId: props.studyId,
    studyName: props.studyName,
    category: props.category,
    isLeader: props.isLeader,
    groupId: props.groupId,
    typeOfGroupId: typeof props.groupId,
  })
})

const quizData = {
  IT: {
    question: 'JavaScript는 객체지향 프로그래밍 언어입니다.',
    answer: 'O',
    explanation: 'JavaScript는 프로토타입 기반의 객체지향 프로그래밍 언어입니다.'
  },
  어학: {
    question: '영어에서 "I am"의 축약형은 "I\'m"입니다.',
    answer: 'O',
    explanation: '맞습니다. "I am"은 "I\'m"으로 축약할 수 있습니다.'
  },
  자격증: {
    question: '정보처리기사는 국가기술자격증입니다.',
    answer: 'O',
    explanation: '정보처리기사는 한국산업인력공단에서 시행하는 국가기술자격증입니다.'
  },
  '공무원 / 임용': {
    question: '9급 공무원 시험은 매년 1회만 실시됩니다.',
    answer: 'X',
    explanation: '9급 공무원 시험은 보통 매년 2회 실시됩니다.'
  },
  '프로젝트 / 팀 활동': {
    question: 'Git은 분산 버전 관리 시스템입니다.',
    answer: 'O',
    explanation: 'Git은 분산 버전 관리 시스템으로, 여러 개발자가 협업할 수 있게 해줍니다.'
  },
  '취업 및 멘토': {
    question: '이력서에는 반드시 사진을 첨부해야 합니다.',
    answer: 'X',
    explanation: '이력서에 사진 첨부는 필수가 아닙니다. 회사나 직무에 따라 선택사항입니다.'
  }
}

const quiz = computed(() => {
  return quizData[props.category as keyof typeof quizData] || quizData['IT']
})

function selectAnswer(answer: 'O' | 'X') {
  if (showResult.value) return
  selectedAnswer.value = answer
}

function submitAnswer() {
  if (!selectedAnswer.value) return
  isCorrect.value = selectedAnswer.value === quiz.value.answer
  showResult.value = true
}

/** ✅ groupId는 반드시 숫자만 사용 */
function resolveGroupId(): number | null {
  const { groupId } = props
  const num = typeof groupId === 'string' ? Number(groupId) : groupId
  if (typeof num === 'number' && Number.isFinite(num)) return num
  return null
}

function handleComplete() {
  const gid = resolveGroupId()
  console.debug('[AttendanceQuizModal] handleComplete gid=', gid, 'props.groupId=', props.groupId)

  if (gid == null) {
    alert('groupId를 찾을 수 없습니다.')
    return
  }

  router.push({
    name: 'StudyPrejoin',
    params: { groupId: String(gid) },
  })

  emit('complete', props.isLeader) // Emitting isLeader
}
</script>

<style scoped>
/* (스타일 동일) */
.quiz-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:1000}
.quiz-modal{background:#fff;border-radius:16px;padding:2rem;width:90%;max-width:500px;box-shadow:0 10px 30px rgba(0,0,0,.3);animation:modalSlideIn .3s ease}
.modal-header{text-align:center;margin-bottom:2rem}
.modal-title{display:flex;align-items:center;justify-content:center;gap:.5rem;font-size:1.3rem;font-weight:600;color:#333;margin-bottom:.5rem}
.quiz-icon{font-size:1.5rem}
.study-info{font-size:.9rem;color:#666;background:#f8f9fa;padding:.5rem 1rem;border-radius:20px;display:inline-block}
.modal-content{text-align:center}
.quiz-section{margin-bottom:2rem}
.quiz-question{margin-bottom:2rem}
.quiz-question h3{font-size:1.1rem;color:#333;line-height:1.6;margin:0}
.quiz-options{display:flex;gap:1rem;justify-content:center}
.option-btn{display:flex;flex-direction:column;align-items:center;gap:.5rem;padding:1.5rem 2rem;border:2px solid #e9ecef;border-radius:12px;background:#fff;cursor:pointer;transition:all .3s ease;min-width:120px}
.option-btn:hover:not(:disabled){border-color:#d79c94;background:#fefefe}
.option-btn.selected{border-color:#d79c94;background:rgba(215,156,148,.1)}
.option-btn.correct{border-color:#28a745;background:rgba(40,167,69,.1)}
.option-btn.incorrect{border-color:#dc3545;background:rgba(220,53,69,.1)}
.option-text{font-size:2rem;font-weight:700;color:#333}
.option-label{font-size:.9rem;color:#666}
.result-section{margin-bottom:2rem;padding:1.5rem;background:#f8f9fa;border-radius:12px}
.result-icon{font-size:3rem;margin-bottom:1rem}
.result-message{font-size:1.2rem;font-weight:600;color:#333;margin-bottom:1rem}
.result-explanation{font-size:.95rem;color:#666;line-height:1.5;margin-bottom:1rem}
.modal-actions{display:flex;justify-content:center}
@keyframes modalSlideIn{from{opacity:0;transform:translateY(-20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
</style>
