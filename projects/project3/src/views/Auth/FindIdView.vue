<template>
  <AuthLayout title="아이디 찾기">
    <form @submit.prevent="handleFindId">
      <div class="form-group mb-3">
        <label for="name">이름</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="form-control"
          required
          placeholder="이름을 입력하세요"
        />
      </div>

      <div class="form-group mb-4">
        <label for="email">이메일</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="form-control"
          required
          placeholder="이메일을 입력하세요"
        />
      </div>

      <Button type="submit" variant="primary" size="md" class="w-100 mb-3">
        아이디 찾기
      </Button>
    </form>

    <div v-if="result" class="alert alert-success text-center">
      회원님의 아이디는 <strong>{{ result }}</strong> 입니다.
    </div>

    <template #links>
      <RouterLink to="/login" class="text-muted">로그인으로 돌아가기</RouterLink>
      <RouterLink to="/reset-password" class="text-muted">비밀번호 재설정</RouterLink>
    </template>
  </AuthLayout>

  <!-- 모달 -->
  <Modal :visible="showModal" @close="showModal = false">
    <template #title>{{ modalTitle }}</template>
    <hr />
    {{ modalMessage }}
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'

const name = ref('')
const email = ref('')
const result = ref('')
const { findEmail } = useAuthService()

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

function openModal(title, message) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

async function handleFindId() {
  if (!name.value || !email.value) {
    openModal('입력 누락', '이름과 이메일을 모두 입력해주세요.')
    return
  }

  try {
    const response = await findEmail({
      name: name.value,
      email: email.value,
    })
    result.value = response.data.loginId
  } catch (err) {
    openModal('검색 실패', '일치하는 사용자를 찾을 수 없습니다.')
  }
}
</script>

<style scoped>
.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #495057;
}

input.form-control {
  height: 46px;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  transition: border-color 0.3s ease;
}

input.form-control:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alert-success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}
</style>
