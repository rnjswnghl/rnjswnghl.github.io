<template>
  <AuthLayout title="로그인">
    <p class="demo-hint">데모용 입력 예시 — 아이디: <strong>test</strong>, 비밀번호: <strong>testpw</strong></p>
    <form class="login-form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">아이디</label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="form-control"
          required
          placeholder="아이디를 입력하세요"
        />
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <PasswordInput
          id="password"
          v-model="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>

      <Button type="submit" variant="primary" size="md" class="login-btn">
        로그인
      </Button>
    </form>

    <template #links>
      <div class="auth-links">
        <RouterLink to="/find-id" class="link-item">아이디 찾기</RouterLink>
        <span class="divider">·</span>
        <RouterLink to="/reset-password" class="link-item">비밀번호 재설정</RouterLink>
        <span class="divider">·</span>
        <RouterLink to="/register/terms" class="link-item">회원가입하기</RouterLink>
      </div>
    </template>
  </AuthLayout>

  <!-- 로그인 모달 -->
  <Modal :visible="showModal" @close="showModal = false">
    <template #title>{{ modalTitle }}</template>
    <hr class="my-2" />
    <p class="modal-text">{{ modalMessage }}</p>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '@/stores/user'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import Button from '@/components/common/Button.vue'
import PasswordInput from '@/components/common/PasswordInput.vue'
import Modal from '@/components/common/Modal.vue'

const username = ref('')
const password = ref('')
const router = useRouter()
const { login } = useAuthService()
const userStore = useUserStore()

const showModal = ref(false)
const modalTitle = ref('알림')
const modalMessage = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    modalTitle.value = '입력 누락'
    modalMessage.value = '아이디와 비밀번호를 입력해주세요.'
    showModal.value = true
    return
  }

  try {
    const response = await login({
      loginId: username.value,
      password: password.value,
    })

    const { accessToken, user } = response.data

    if (!accessToken || !user) {
      throw new Error('로그인 응답에 필요한 데이터가 없습니다.')
    }

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('loginId', user?.login_id || username.value)

    userStore.setToken(accessToken)
    userStore.setUser(user)

    // 로그인 상태 변경 이벤트 발생 (한 번만)
    window.dispatchEvent(new Event('login-status-changed'))

    modalTitle.value = '로그인 성공'
    modalMessage.value = `환영합니다, ${user?.nickname || '사용자'}님!`
    showModal.value = true

    // ✅ 리다이렉트 경로 우선 처리
    const redirect = (router.currentRoute.value.query.redirect as string) || '/mypage'
    setTimeout(() => {
      showModal.value = false
      router.push(redirect)
    }, 1200)
  } catch {
    modalTitle.value = '로그인 실패'
    modalMessage.value = '아이디 또는 비밀번호가 잘못되었습니다.'
    showModal.value = true
  }
}


</script>

<style scoped>
.demo-hint {
  font-size: 0.8rem;
  color: #6c757d;
  background: #f8f9fa;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin: 0 0 1rem 0;
  text-align: center;
}
.demo-hint strong {
  color: #495057;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.875rem;
  width: 100%;
}

.form-group:last-of-type {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
  color: #495057;
}

.form-group :deep(.password-input-wrapper) {
  width: 100%;
}

.form-group :deep(.password-input-wrapper input) {
  width: 100%;
  box-sizing: border-box;
}

input.form-control {
  width: 100%;
  height: 42px;
  font-size: 0.95rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input.form-control:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 2px rgba(215, 156, 148, 0.15);
}

.login-btn {
  width: 100%;
  margin-top: 0.25rem;
}

/* 링크 간격·구분자 (AuthLayout 슬롯과 무관하게 항상 정상 렌더링) */
.auth-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.auth-links .link-item {
  font-size: 0.875rem;
  text-decoration: none;
  color: #6c757d;
}

.auth-links .link-item:hover {
  color: #d79c94;
  text-decoration: underline;
}

.auth-links .divider {
  color: #ced4da;
  font-size: 0.875rem;
  user-select: none;
}

.modal-text {
  margin: 0;
  line-height: 1.6;
}
</style>
