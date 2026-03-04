<template>
  <div class="home">
    <!-- 메인 섹션 -->
    <section class="main-section">
      <div class="container">
        <div class="main-content">
          <div class="main-text">
            <h1 class="main-title">FocusMate</h1>
            <p class="main-subtitle">
              나만의 스터디를 찾아보세요
            </p>
            <div class="main-actions">
              <button class="btn-primary" @click="goToStudyList">
                스터디 목록 보기
              </button>
              <button class="btn-secondary" @click="goToSearch">
                스터디 검색하기
              </button>
            </div>
          </div>
          <div class="main-image">
            <img :src="meetingImage" alt="FocusMate" />
          </div>
        </div>
      </div>
    </section>

    <!-- 로그인한 사용자를 위한 개인 섹션 -->
    <PersonalGoals v-if="isLoggedIn" :nickname="user?.nickname || '사용자'" />

    <!-- 서비스 소개 섹션 (로그인하지 않은 사용자만) -->
    <ServiceIntro v-if="!isLoggedIn" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import PersonalGoals from '@/components/common/PersonalGoals.vue'
import ServiceIntro from '@/components/common/ServiceIntro.vue'

const router = useRouter()
const userStore = useUserStore()

// 로그인 상태 및 사용자 정보
const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.user)

// 이미지 경로
const meetingImage = `${import.meta.env.BASE_URL}images/meeting.png`

function goToStudyList() {
  router.push('/study')
}

function goToSearch() {
  router.push('/study/search')
}
</script>

<style scoped>
.home {
  background: var(--color-surface);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* 메인 섹션 */
.main-section {
  padding: var(--spacing-2xl) 0;
  background: var(--color-background);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.main-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-family: var(--font-english);
}

.main-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  font-weight: var(--font-weight-medium);
}

.main-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: var(--spacing-sm) var(--spacing-xl);
  border: none;
  border-radius: 0.5rem;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 2.75rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 2px 4px rgba(215, 156, 148, 0.2);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(215, 156, 148, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(215, 156, 148, 0.3);
}

.main-image img {
  width: 100%;
  max-width: 450px;
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}



/* 소개 섹션 */
.intro-section {
  padding: var(--spacing-2xl) 0;
  background: var(--color-background);
  margin-top: 2rem;
}

.intro-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.intro-content h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}



/* 반응형 */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--spacing-md);
  }

  .main-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    text-align: center;
  }

  .main-title {
    font-size: var(--font-size-3xl);
  }

  .main-subtitle {
    font-size: var(--font-size-lg);
  }

  .main-actions {
    justify-content: center;
  }

  .btn-primary, .btn-secondary {
    font-size: var(--font-size-sm);
    padding: var(--spacing-xs) var(--spacing-lg);
  }

  .features {
    gap: var(--spacing-md);
  }

  .feature {
    min-width: 120px;
    padding: var(--spacing-md);
  }

  .feature-icon {
    font-size: var(--font-size-2xl);
  }

  .intro-content h2 {
    font-size: var(--font-size-2xl);
  }

  .intro-content p {
    font-size: var(--font-size-base);
  }
}
</style>
