<template>
  <div class="mypage-container">
    <!-- 탭 네비 -->
    <nav class="tabs">
      <RouterLink to="/mypage" :class="{ 'active-tab': $route.path === '/mypage' }">내 프로필</RouterLink>
      <RouterLink to="/mystudy" :class="{ 'active-tab': $route.path === '/mystudy' }">스터디 현황</RouterLink>
      <RouterLink to="/mypage/log" :class="{ 'active-tab': $route.path === '/mypage/log' }">활동 로그</RouterLink>
    </nav>

    <!-- 실제 내용은 이 router-view 가 표시 -->
    <section class="tab-content">
      <router-view :key="$route.fullPath" />
    </section>
  </div>

</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onBeforeMount(async () => {
  if (!user.value) {
    await userStore.fetchUser()
  }
})


</script>

<style scoped>
.mypage-container {
  max-width: 1200px;
  margin: 2rem auto;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 2.5rem;
  min-height: calc(100vh - 200px);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.tabs {
  display: flex;
  gap: 2rem;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
}

.tabs a {
  color: #6c757d;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
}

.tabs a:hover {
  background: #f8f9fa;
  color: #495057;
}

.tabs a.active-tab {
  color: #d79c94;
  background: rgba(215, 156, 148, 0.1);
  font-weight: 600;
}

.tabs a.active-tab::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: #d79c94;
  border-radius: 2px;
}

/* 탭 아래 콘텐츠 간 여백 */
.tab-content {
  margin-top: 2rem;
}

/* 반응형 */
@media (max-width: 768px) {
  .mypage-container {
    margin: 2rem 1rem 1rem;
    padding: 1.5rem;
    border-radius: 20px;
  }

  .tabs {
    gap: 1rem;
    flex-wrap: wrap;
  }

  .tabs a {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}
</style>
