<template>
  <nav class="d-flex justify-content-between align-items-center p-3 bg-dark">
    <!-- 왼쪽 앱 이름 -->
    <div class="app-name text-white fw-bold px-3 py-1 rounded">
      한페이지
    </div>

    <!-- 오른쪽 메뉴 -->
    <div class="d-flex gap-3 align-items-center">
      <router-link to="/" class="nav-link text-white px-3 py-1 rounded">
        Home
      </router-link>
      <router-link to="/books" class="nav-link text-white px-3 py-1 rounded">
        Books
      </router-link>
      <router-link to="/threads" class="nav-link text-white px-3 py-1 rounded">
        Threads
      </router-link>
      <router-link to="/mypage" class="nav-link text-white px-3 py-1 rounded">
        My Page
      </router-link>

      <button
        v-if="isLoggedIn"
        @click="handleLogout"
        class="btn btn-link text-white px-3 py-1 rounded logout-btn"
      >
        Logout
      </button>
      <router-link
        v-else
        to="/login"
        class="nav-link text-white px-3 py-1 rounded"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const isLoggedIn = computed(() => userStore.isLoggedIn)

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.nav-link,
.logout-btn {
  text-decoration: none;
}

.nav-link:hover,
.logout-btn:hover {
  background-color: #d4a373;
  color: #000 !important;
}

.app-name {
  font-size: 1.4rem;
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  font-family: 'Nanum Myeongjo', serif;
}
</style>
