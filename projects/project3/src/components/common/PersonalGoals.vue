<template>
  <section class="personal-section">
    <div class="container">
      <div class="personal-content">
        <h2>『 {{ nickname }} 』님의 목표</h2>
        <div class="personal-grid">
          <!-- 나의 다짐 -->
          <div class="personal-card commitment-card">
            <div class="card-header">
              <span class="card-icon">📌</span>
              <h3>나의 다짐</h3>
            </div>
            <div class="card-content">
              <div v-if="commitment" class="commitment-display">
                <p class="commitment-text">『 {{ commitment }} 』</p>
              </div>
              <div v-else class="empty-state">
                <p>다짐을 설정해주세요</p>
                <button class="btn-link" @click="goToMyPage">마이페이지에서 설정</button>
              </div>
            </div>
          </div>

          <!-- D-day -->
          <div class="personal-card dday-card">
            <div class="card-header">
              <span class="card-icon">📅</span>
              <h3>D-day</h3>
            </div>
            <div class="card-content">
              <div v-if="selectedDate" class="dday-display">
                <div v-if="ddayDescription" class="dday-description">
                  {{ ddayDescription }} 까지
                </div>
                <div class="dday-number">{{ dDay }}</div>
                <div class="dday-text">일 남았습니다</div>
              </div>
              <div v-else class="empty-state">
                <p>목표 날짜를 설정해주세요</p>
                <button class="btn-link" @click="goToMyPage">마이페이지에서 설정</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  nickname: string
}

const { nickname } = defineProps<Props>()
const router = useRouter()

// 나의 다짐 관련
const commitment = ref('')

// D-day 관련
const selectedDate = ref<Date | null>(null)
const dDay = ref('')
const ddayDescription = ref('')

// 로컬스토리지 키
const DDAY_STORAGE_KEY = 'user_dday'
const DDAY_DESC_STORAGE_KEY = 'user_dday_description'
const COMMITMENT_STORAGE_KEY = 'user_commitment'

function goToMyPage() {
  router.push('/mystudy')
}

// D-day 계산
function calculateDDay() {
  if (!selectedDate.value) return
  const today = new Date()
  const target = new Date(selectedDate.value)
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  dDay.value = diff > 0 ? diff.toString() : '0'
}

// 로컬스토리지에서 데이터 로드
function loadPersonalData() {
  try {
    // 다짐 데이터 로드
    const storedCommitment = localStorage.getItem(COMMITMENT_STORAGE_KEY)
    if (storedCommitment) {
      commitment.value = storedCommitment
    }

    // D-day 데이터 로드
    const storedDate = localStorage.getItem(DDAY_STORAGE_KEY)
    const storedDescription = localStorage.getItem(DDAY_DESC_STORAGE_KEY)

    if (storedDate) {
      selectedDate.value = new Date(storedDate)
      calculateDDay()
    }

    if (storedDescription) {
      ddayDescription.value = storedDescription
    }
  } catch (err) {
    console.error('❌ 로컬스토리지에서 개인 데이터 로드 실패:', err)
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadPersonalData()
})
</script>

<style scoped>
/* 개인 섹션 */
.personal-section {
  padding: var(--spacing-2xl) 0;
  background: var(--color-surface);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}

.personal-content {
  text-align: center;
}

.personal-content h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xl);
}

.personal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  max-width: 800px;
  margin: 0 auto;
}

.personal-card {
  background: var(--color-surface);
  border-radius: 1rem;
  padding: var(--spacing-xl);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.personal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-primary);
}

.card-icon {
  font-size: var(--font-size-2xl);
}

.card-header h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.card-content {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 다짐 카드 */
.commitment-card {
  position: relative;
  overflow: hidden;
}

.commitment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(45deg, rgba(215, 156, 148, 0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(215, 156, 148, 0.05) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(215, 156, 148, 0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(215, 156, 148, 0.05) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  opacity: 0.3;
  pointer-events: none;
}

.commitment-card::after {
  content: '✏️';
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 3rem;
  opacity: 0.1;
  pointer-events: none;
}

.commitment-display {
  text-align: center;
  position: relative;
  z-index: 1;
}

.commitment-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  line-height: 1.5;
  font-weight: var(--font-weight-medium);
  margin: 0;
}

/* D-day 카드 */
.dday-display {
  text-align: center;
}

.dday-number {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
  animation: bounce 2s ease-in-out infinite;
  display: inline-block;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

.dday-number:hover {
  animation: colorPulse 1s ease-in-out infinite;
}

@keyframes colorPulse {
  0%, 100% {
    color: var(--color-primary);
  }
  50% {
    color: #e74c3c;
  }
}

.dday-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
}

.dday-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.4;
  font-weight: var(--font-weight-medium);
}

/* 빈 상태 */
.empty-state {
  text-align: center;
  color: var(--color-text-secondary);
}

.empty-state p {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

.btn-link {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  text-decoration: underline;
  font-size: var(--font-size-sm);
  transition: color 0.2s ease;
}

.btn-link:hover {
  color: var(--color-primary-dark);
}

/* 반응형 */
@media (max-width: 768px) {
  .personal-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .personal-content h2 {
    font-size: var(--font-size-2xl);
  }

  .card-header h3 {
    font-size: var(--font-size-lg);
  }

  .dday-number {
    font-size: var(--font-size-3xl);
  }

  .commitment-text {
    font-size: var(--font-size-base);
  }

  .commitment-card::after {
    font-size: 2rem;
    right: 15px;
  }
}
</style>
