<template>
  <header class="navbar">
    <div class="navbar__logo">
      <RouterLink to="/" class="logo-link">
        <img :src="logoImage" alt="FocusMate Logo" class="logo-image" />
        <span class="logo-text">FocusMate</span>
      </RouterLink>
    </div>

    <nav class="navbar__nav">
      <RouterLink
        to="/"
        class="nav-link"
        :class="{ 'router-link-active': route.path === '/' }"
      >Home</RouterLink>

      <RouterLink
        to="/study/search"
        class="nav-link"
        :class="{ 'router-link-active': route.path === '/study/search' }"
      >Search</RouterLink>

      <template v-if="isLoggedIn">
        <RouterLink
          to="/mypage"
          class="nav-link"
          :class="{ 'router-link-active': route.path === '/mypage' }"
        >MyPage</RouterLink>

        <RouterLink
          to="/mystudy"
          class="nav-link"
          :class="{ 'router-link-active': route.path === '/mystudy' || route.path === '/mypage/study' }"
        >MyStudy</RouterLink>

        <!-- 토큰 만료 시간 표시 -->
        <div
          v-if="tokenExpirationInfo"
          class="token-expiration"
          :class="`token-expiration--${tokenExpirationInfo.warningLevel}`"
          :title="`토큰 만료: ${tokenExpirationInfo.expirationTime}`"
        >
          <span class="token-expiration__icon">⏳</span>
          <span class="token-expiration__text">{{ tokenExpirationInfo.timeRemaining }}</span>
        </div>

        <button class="btn btn-link logout-btn" @click="logout">Logout</button>


      </template>

      <template v-else>
        <RouterLink
          to="/login"
          class="nav-link"
          :class="{ 'router-link-active': route.path === '/login' }"
        >Sign In</RouterLink>

        <RouterLink
          to="/register/terms"
          class="nav-link"
          :class="{ 'router-link-active': route.path.startsWith('/register') }"
        >Register</RouterLink>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
// 컴포넌트 이름 정의
defineOptions({
  name: 'NavbarComponent'
})

import { computed, onMounted, onUnmounted, nextTick, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  getTimeUntilExpiration,
  formatTimeRemaining,
  getExpirationWarningLevel,
  isTokenExpired
} from '@/utils/tokenUtils'

// 이미지 경로
const logoImage = `${import.meta.env.BASE_URL}images/FMlogo.png`

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 강제 갱신을 위한 트리거
const loginTrigger = ref(0)

// 토큰 만료 시간 업데이트를 위한 타이머
let expirationTimer: NodeJS.Timeout | null = null

// 토큰 만료 정보
const tokenExpirationInfo = ref<{
  timeRemaining: string
  warningLevel: 'normal' | 'warning' | 'danger'
  expirationTime: string
} | null>(null)

const isLoggedIn = computed(() => {
  // 트리거를 의존성으로 추가하여 강제 갱신 (의존성으로만 사용)
  const _ = loginTrigger.value
  // 직접 스토어 값들을 체크하여 반응성 보장
  const result = !!(userStore.token && userStore.profile)
  return result
})

// 토큰 만료 시간 업데이트 함수
const updateTokenExpiration = () => {
  const token = userStore.token

  if (!token) {
    tokenExpirationInfo.value = null
    return
  }

  // 토큰이 만료되었는지 확인
  if (isTokenExpired(token)) {
    tokenExpirationInfo.value = {
      timeRemaining: '만료됨',
      warningLevel: 'danger',
      expirationTime: '토큰이 만료되었습니다'
    }
    return
  }

  const timeLeft = getTimeUntilExpiration(token)

  if (timeLeft === null) {
    tokenExpirationInfo.value = null
    return
  }

  const warningLevel = getExpirationWarningLevel(timeLeft)
  const timeRemaining = formatTimeRemaining(timeLeft)

  // 만료 시간을 사람이 읽기 쉬운 형태로 표시
  const expiration = new Date(Date.now() + timeLeft)
  const expirationTime = expiration.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  tokenExpirationInfo.value = {
    timeRemaining,
    warningLevel,
    expirationTime: `만료: ${expirationTime}`
  }
}

// 토큰 만료 시간을 주기적으로 업데이트
const startExpirationTimer = () => {
  if (expirationTimer) {
    clearInterval(expirationTimer)
  }

  // 1초마다 업데이트 (실시간 카운트다운)
  expirationTimer = setInterval(() => {
    updateTokenExpiration()
  }, 1000)

  // 초기 업데이트
  updateTokenExpiration()
}

// 타이머 정리
const clearExpirationTimer = () => {
  if (expirationTimer) {
    clearInterval(expirationTimer)
    expirationTimer = null
  }
  tokenExpirationInfo.value = null
}

const handleLoginStatusChange = () => {
  // 강제로 computed 값 갱신을 위한 트리거
  // 트리거 업데이트로 computed 강제 갱신
  loginTrigger.value++
  // 강제로 반응성 업데이트
  userStore.$patch({})
  // nextTick을 사용하여 DOM 업데이트 보장
  nextTick(() => {
    // DOM 업데이트 완료
  })
}

// 로그인 상태 변화 감지
watch(() => userStore.token, (newToken) => {
  if (newToken) {
    startExpirationTimer()
  } else {
    clearExpirationTimer()
  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('login-status-changed', handleLoginStatusChange)

  // 초기 토큰이 있으면 타이머 시작
  if (userStore.token) {
    startExpirationTimer()
  }
})

onUnmounted(() => {
  window.removeEventListener('login-status-changed', handleLoginStatusChange)
  clearExpirationTimer()
})

const logout = () => {
  userStore.logout()
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: var(--spacing-sm);
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo-text {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: #1d2b42;
  font-family: var(--font-english);
}

.navbar__nav {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.navbar__nav .nav-link {
  text-decoration: none;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  transition: color 0.2s ease;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 0.375rem;
}

.navbar__nav .nav-link:hover {
  color: var(--color-primary);
  background-color: rgba(215, 156, 148, 0.1);
}

.navbar__nav .router-link-active {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  background-color: rgba(215, 156, 148, 0.1);
}

/* 토큰 만료 시간 표시 스타일 */
.token-expiration {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
  cursor: help;
}

.token-expiration__icon {
  font-size: 1rem;
  font-weight: 700;
}

.token-expiration__text {
  white-space: nowrap;
  font-weight: 700;
  font-size: 1rem;
}

/* 경고 레벨별 스타일 */
.token-expiration--normal {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.2);
}

.token-expiration--warning {
  background-color: rgba(255, 193, 7, 0.1);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.2);
  animation: pulse 2s infinite;
}

.token-expiration--danger {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.2);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.logout-btn {
  background: none;
  border: none;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  color: #dc3545;
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: rgba(220, 53, 69, 0.1);
  text-decoration: none;
}

@media (max-width: 768px) {
  .navbar {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .logo-text {
    font-size: var(--font-size-xl);
  }

  .navbar__nav {
    gap: var(--spacing-md);
  }

  .navbar__nav .nav-link {
    font-size: var(--font-size-sm);
  }

  .token-expiration {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
  }

  .token-expiration__text {
    display: none;
  }
}
</style>
