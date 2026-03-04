<template>
  <div id="app">
    <div class="layout-wrapper">
      <!-- hideLayout 메타가 true가 아니면 Navbar 보여주기 -->
      <Navbar v-if="!route.meta.hideLayout" />

      <!-- 페이지 본문 -->
      <main class="page-body">
        <router-view />
      </main>

      <!-- hideLayout 메타가 true가 아니면 Footer 보여주기 -->
      <Footer v-if="!route.meta.hideLayout" />
    </div>

    <!-- 플로팅 캘린더 (화상회의 페이지에서는 숨김) -->
    <FloatingCalendar v-if="!route.meta.hideLayout" />

    <!-- 스터디 알림 Toast -->
    <StudyNotificationToast
      v-if="currentNotification"
      :study-name="currentNotification.studyName"
      :start-time="currentNotification.startTime"
      :visible="currentNotification.visible"
      @close="hideNotification"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useStudyNotification } from '@/composables/useStudyNotification'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import FloatingCalendar from '@/components/common/FloatingCalendar.vue'
import StudyNotificationToast from '@/components/common/StudyNotificationToast.vue'

const route = useRoute()
const userStore = useUserStore()
const { currentNotification, hideNotification } = useStudyNotification()

// 앱 시작 시 로그인 상태 복원
onMounted(async () => {
  userStore.initializeFromStorage()

  // 로그인된 상태라면 사용자 정보 로드
  if (userStore.isLoggedIn) {
    await userStore.fetchUser()
  }
})
</script>

<style>
:root {
  --color-background: #f5f7fa;
  --color-primary: #6db3f2;
  --color-accent: #8fcf94;
  --color-text-main: #333;

  /* ✅ 글로벌 폰트 통일 */
  --font-main: 'NanumSquareRound', 'Open Sans', sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-main);
  font-weight: 800;
  background-color: var(--color-background);
  color: var(--color-text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

.page-body {
  flex: 1;
  padding-bottom: 0;
  background-color: var(--color-background);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
@media (min-width: 576px) {
  .page-body { padding-left: 1rem; padding-right: 1rem; }
}
@media (min-width: 768px) {
  .page-body { padding-left: 1.5rem; padding-right: 1.5rem; }
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  font-family: var(--font-main);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
</style>
