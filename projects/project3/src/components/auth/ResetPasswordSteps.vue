<template>
  <!-- 1단계: 이메일 입력 -->
  <div v-if="step === 1" class="step-content">
    <form @submit.prevent="$emit('emailSubmit', email)">
      <div class="form-group mb-4">
        <label for="email">이메일 주소</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="form-control"
          required
          placeholder="가입한 이메일을 입력하세요"
        />
      </div>
      <Button type="submit" variant="primary" size="md" class="w-100 mb-3">
        임시 비밀번호 전송
      </Button>
    </form>
  </div>

  <!-- 2단계: 임시 비밀번호 입력 -->
  <div v-if="step === 2" class="step-content">
    <form @submit.prevent="$emit('tempPasswordSubmit', tempPassword)">
      <div class="form-group mb-4">
        <label for="tempPassword">임시 비밀번호</label>
        <input
          id="tempPassword"
          v-model="tempPassword"
          type="text"
          class="form-control"
          required
          placeholder="이메일로 받은 임시 비밀번호를 입력하세요"
        />
      </div>
      <Button type="submit" variant="primary" size="md" class="w-100 mb-3">
        임시 비밀번호 확인
      </Button>
    </form>
  </div>

  <!-- 3단계: 새 비밀번호 입력 -->
  <div v-if="step === 3" class="step-content">
    <form @submit.prevent="$emit('newPasswordSubmit', { newPassword, confirmPassword })">
      <div class="form-group mb-3">
        <label for="newPassword">새 비밀번호</label>
        <PasswordInput
          id="newPassword"
          v-model="newPassword"
          placeholder="새 비밀번호를 입력하세요"
          required
        />
        <div class="text-muted small mt-1">※ 최소 8자, 영문+숫자+특수문자 포함</div>
      </div>

      <div class="form-group mb-4">
        <label for="confirmPassword">새 비밀번호 확인</label>
        <PasswordInput
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="새 비밀번호를 다시 입력하세요"
          required
        />
        <div class="small mt-1" :class="confirmPasswordCheckClass">{{ confirmPasswordMessage }}</div>
      </div>

      <Button type="submit" variant="primary" size="md" class="w-100 mb-3">
        비밀번호 변경
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/common/Button.vue'
import PasswordInput from '@/components/common/PasswordInput.vue'

defineProps<{
  step: number
}>()

defineEmits<{
  emailSubmit: [email: string]
  tempPasswordSubmit: [tempPassword: string]
  newPasswordSubmit: [data: { newPassword: string; confirmPassword: string }]
}>()

// 폼 데이터
const email = ref('')
const tempPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 비밀번호 확인 로직
const confirmPasswordMessage = computed(() => {
  if (!confirmPassword.value) return ''
  if (newPassword.value !== confirmPassword.value) {
    return '비밀번호가 일치하지 않습니다.'
  }
  return '비밀번호가 일치합니다.'
})

const confirmPasswordCheckClass = computed(() => {
  if (!confirmPassword.value) return 'text-muted'
  return newPassword.value === confirmPassword.value ? 'text-success' : 'text-danger'
})
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

.step-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.text-muted {
  color: #6c757d !important;
}
</style>
