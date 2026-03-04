<template>
  <div v-if="visible" class="feedback-overlay">
    <div
      class="feedback-box"
      :class="{ correct: isCorrect, incorrect: !isCorrect }"
    >
      <p class="feedback-text">
        {{ isCorrect ? '정답입니다!' : '틀렸습니다!' }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  isCorrect: Boolean
})

const emit = defineEmits(['close'])

// 0.5초 후 자동 닫기
if (props.visible) {
  setTimeout(() => {
    emit('close')
  }, 500)
}
</script>

<style scoped>
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.feedback-box {
  padding: 1.5rem 2.5rem;
  border-radius: 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.correct {
  background-color: #81C784; /* 초록색 */
}

.incorrect {
  background-color: #E57373; /* 빨간색 */
}

.feedback-text {
  margin: 0;
}
</style>
