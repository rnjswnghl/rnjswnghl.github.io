<template>
  <div class="result-container">
    <h2 class="result-title">📊 퀴즈 결과 요약</h2>

    <div v-if="isReviewMode" class="review-mode-notice">
      <div class="notice-icon">📚</div>
      <h3>복습 모드 - 출석률 복구</h3>
      <p>결석한 날의 복습 퀴즈를 완료했습니다!</p>
    </div>

    <div class="result-summary-box">
      <p><strong>총 문제 수:</strong> {{ total }}문제</p>
      <p><strong>맞힌 문제 수:</strong> {{ correct }}문제</p>
      <p><strong>정답률:</strong> {{ accuracy }}%</p>
      <p v-if="date"><strong>활동 일자:</strong> {{ formatDate(date) }}</p>

      <div v-if="isReviewMode" class="attendance-recovery">
        <div class="recovery-info">
          <p><strong>출석률 복구:</strong>
            <span v-if="accuracy >= 70" class="success">✅ 성공</span>
            <span v-else class="failed">❌ 실패 (70% 이상 필요)</span>
          </p>
          <p v-if="accuracy >= 70" class="recovery-message">
            해당 날짜의 출석이 인정되었습니다!
          </p>
          <p v-else class="recovery-message">
            정답률 70% 이상 달성 시 출석률이 복구됩니다.
          </p>
        </div>
      </div>
    </div>

    <div class="result-buttons">
      <button v-if="!isReviewMode" class="btn retry" @click="retryQuiz">다시 풀기</button>
      <button v-if="isReviewMode && accuracy < 70" class="btn retry" @click="retryReviewQuiz">복습 퀴즈 다시 풀기</button>
      <button class="btn to-mypage" @click="goToMypage">마이페이지로 이동</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
const router = useRouter()
const route = useRoute()

// 쿼리 파라미터로부터 점수 전달 받기
const total = Number(route.query.total || 10)
const correct = Number(route.query.correct || 0)
const accuracy = Math.round((correct / total) * 100)
const date = route.query.date
const isReviewMode = computed(() => route.query.type === 'review' && route.query.mode === 'attendance-recovery')

function retryQuiz() {
  router.push('/ai-quiz')
}

function retryReviewQuiz() {
  router.push({
    path: '/ai-quiz',
    query: {
      date,
      type: 'review',
      mode: 'attendance-recovery'
    }
  })
}

function goToMypage() {
  router.push('/mypage/log')
}

function formatDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}
</script>

<style scoped>
.result-container {
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.result-title {
  font-size: 1.6rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.review-mode-notice {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.notice-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.review-mode-notice h3 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.review-mode-notice p {
  margin: 0;
  opacity: 0.9;
}

.result-summary-box {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
}

.attendance-recovery {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e0e0e0;
}

.recovery-info {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
}

.success {
  color: #4caf50;
  font-weight: 600;
}

.failed {
  color: #f44336;
  font-weight: 600;
}

.recovery-message {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.result-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.retry {
  background-color: #A3D5F7;
}

.retry:hover {
  background-color: #8bc5f0;
}

.to-mypage {
  background-color: #81C3D7;
}

.to-mypage:hover {
  background-color: #6bb3c7;
}
</style>
