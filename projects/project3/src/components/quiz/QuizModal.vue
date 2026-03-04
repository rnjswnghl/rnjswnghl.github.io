<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-header">
        <h3 id="modal-title" class="modal-title">
          <span class="quiz-icon">📝</span>
          {{ formattedDate }} 퀴즈 내용
        </h3>
        <button class="close-icon" @click="$emit('close')">✕</button>
      </div>

      <div v-if="quiz.length > 0" class="quiz-container">
        <div class="quiz-summary">
          <p class="quiz-count">총 <strong>{{ quiz.length }}문제</strong>의 퀴즈가 있었습니다.</p>
        </div>

        <div class="quiz-list">
          <div v-for="(item, index) in quiz" :key="index" class="quiz-card">
            <div class="quiz-number">{{ index + 1 }}</div>
            <div class="quiz-content">
              <p class="question">{{ item.question }}</p>
              <div class="answer-section">
                <span class="answer-label">정답:</span>
                <span class="answer-text">{{ item.answer }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-quiz">
        <div class="no-quiz-icon">📚</div>
        <h4>오늘은 공유된 퀴즈가 없어요</h4>
        <p>스터디 진행 중에 퀴즈가 공유되면 여기서 확인할 수 있습니다.</p>
      </div>

      <div class="modal-footer">
        <button class="close-button" @click="$emit('close')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  date: String,
  quiz: Array
})

// 날짜 포맷
const formattedDate = new Date(props.date).toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// ✅ ESC 키로 모달 닫기
const emit = defineEmits(['close'])

onMounted(() => {
  const handleEsc = (e) => {
    if (e.key === 'Escape') emit('close')
  }
  window.addEventListener('keydown', handleEsc)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEsc)
  })
})
</script>

<style scoped>
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

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-height: 85vh;
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
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.modal-title {
  font-size: 1.4rem;
  margin: 0;
  color: #212529;
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
  color: #6c757d;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-icon:hover {
  background: #e9ecef;
  color: #495057;
}

.quiz-container {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.quiz-summary {
  background: #e3f2fd;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.quiz-count {
  margin: 0;
  font-size: 1rem;
  color: #1976d2;
  font-weight: 500;
}

.quiz-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quiz-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.quiz-number {
  background: #d79c94;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.quiz-content {
  flex: 1;
}

.question {
  font-size: 1rem;
  font-weight: 500;
  color: #212529;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
}

.answer-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.answer-label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.answer-text {
  background: #d4edda;
  color: #155724;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.no-quiz {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #6c757d;
}

.no-quiz-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-quiz h4 {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #495057;
}

.no-quiz p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
  text-align: center;
}

.close-button {
  background: #d79c94;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #c88a82;
  transform: translateY(-1px);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .quiz-container {
    padding: 1.5rem;
  }

  .quiz-card {
    padding: 1rem;
  }

  .modal-footer {
    padding: 1rem 1.5rem;
  }
}
</style>
