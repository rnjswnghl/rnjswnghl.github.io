<template>
  <div class="puzzle-question">
    <div class="question-card">
      <p class="question-number">{{ displayNumber }}번</p>
      <p class="question-text">{{ question.question }}</p>
    </div>

    <div class="input-area">
      <input
        type="text"
        v-model="userInput"
        :disabled="isSubmitted"
        placeholder="정답을 입력하세요"
        @keyup.enter="submitAnswer"
      />
      <button @click="submitAnswer" :disabled="isSubmitted">제출</button>
    </div>

    <p v-if="isSubmitted" class="result-text">
      {{ isCorrect ? '정답입니다!' : '틀렸습니다!' }}
    </p>
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

const emit = defineEmits(['answered'])

const displayNumber = props.index + 1
const userInput = ref('')
const isSubmitted = ref(false)
const isCorrect = ref(false)

function submitAnswer() {
  if (isSubmitted.value) return

  isSubmitted.value = true
  isCorrect.value = userInput.value.trim() === props.question.correctAnswer
  emit('answered', isCorrect.value)
}
</script>

<style scoped>
.puzzle-question {
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

.input-area {
  display: flex;
  gap: 1rem;
  align-items: center;
}

input[type="text"] {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 250px;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #81C3D7;
  color: white;
  cursor: pointer;
}

.result-text {
  font-size: 1rem;
  color: #666;
}
</style>
