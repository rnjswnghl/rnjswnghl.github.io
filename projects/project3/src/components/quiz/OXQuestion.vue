<template>
  <div class="ox-question">
    <div class="question-card">
      <p class="question-number">{{ displayNumber }}번</p>
      <p class="question-text">{{ question.question }}</p>
    </div>

    <div class="ox-buttons">
      <button class="btn-o" @click="submitAnswer('O')">O</button>
      <button class="btn-x" @click="submitAnswer('X')">X</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

// 문제 번호 표시용
const displayNumber = props.index + 1

// 사용자 정답 제출
function submitAnswer(userAnswer) {
  const isCorrect = userAnswer === props.question.correctAnswer
  // 부모에 정답 여부 전달
  emit('answered', isCorrect)
}

const emit = defineEmits(['answered'])
</script>

<style scoped>
.ox-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.question-card {
  background-color: #f0f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  width: 80%;
  text-align: center;
}

.question-number {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #888;
}

.question-text {
  font-size: 1.3rem;
  font-weight: bold;
}

.ox-buttons {
  display: flex;
  gap: 2rem;
}

.btn-o, .btn-x {
  width: 80px;
  height: 60px;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.btn-o {
  background-color: #4A90E2; /* 파랑 */
}

.btn-x {
  background-color: #E94F4F; /* 빨강 */
}
</style>
