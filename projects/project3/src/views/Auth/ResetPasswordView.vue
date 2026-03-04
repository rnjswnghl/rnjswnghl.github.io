<template>
  <AuthLayout title="비밀번호 재설정">
    <ResetPasswordSteps
      :step="step"
      @email-submit="handleEmailSubmit"
      @temp-password-submit="handleTempPasswordSubmit"
      @new-password-submit="handleNewPasswordSubmit"
    />

    <template #links>
      <RouterLink to="/login" class="text-muted">로그인으로 돌아가기</RouterLink>
    </template>
  </AuthLayout>

  <!-- 모달 -->
  <Modal :visible="showModal" @close="onModalClose">
    <template #title>{{ modalTitle }}</template>
    <hr class="my-2" />
    <p class="modal-text">{{ modalMessage }}</p>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import ResetPasswordSteps from '@/components/auth/ResetPasswordSteps.vue'
import Modal from '@/components/common/Modal.vue'
import { useAuthService } from '@/services/useAuthService'

const router = useRouter()
const userStore = useUserStore()
const { requestResetEmail, resetPassword } = useAuthService()
// 단계 관리
const step = ref(1)

// 입력 상태
const emailRef = ref<string>('')
const tempPassword = ref('')

// 모달 상태
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

// 임시 비밀번호 (목데이터)
// const TEMP_PASSWORD = 'temp1234'

// 1단계: 이메일 제출 -> 임시비민번호 메일 발송
async function handleEmailSubmit(addr: string) {
  emailRef.value = addr
  try {
    await requestResetEmail({ email: addr }) // POST /auth/reset-password/email
    openModal('임시 비밀번호 전송 완료', `${addr}로 임시 비밀번호를 전송했습니다.\n메일함을 확인하세요.`)
  } catch (e: any) {
    openModal('전송 실패', e?.response?.data?.message || '임시 비밀번호 전송에 실패했습니다.')
  }
}

// 2단계: 임시 비밀번호 입력 → 3단계로 진행
// (검증은 3단계에서 resetPassword 호출 시 서버가 수행)
function handleTempPasswordSubmit(v: string) {
  tempPassword.value = v
  step.value = 3
}

// 3단계: 새 비밀번호 제출 → 서버로 최종 변경
async function handleNewPasswordSubmit(payload: { newPassword: string; confirmPassword: string }) {
  const { newPassword, confirmPassword } = payload

  if (newPassword !== confirmPassword) {
    openModal('비밀번호 불일치', '새 비밀번호가 서로 일치하지 않습니다.')
    return
  }
  // 최소 8자, 영문+숫자+특수문자
  const strong = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
  if (!strong.test(newPassword)) {
    openModal('형식 오류', '최소 8자, 영문+숫자+특수문자를 포함해야 합니다.')
    return
  }

  try {
    // PUT /auth/reset-password  (email, tempPassword, newPassword)
    await resetPassword({
      tempPassword: tempPassword.value,
      newPassword
    })
    openModal('변경 완료', '비밀번호가 성공적으로 변경되었습니다. 로그인해 주세요.')
  } catch (e: any) {
    openModal('변경 실패', e?.response?.data?.message || '비밀번호 변경에 실패했습니다.')
  }
}
// 모달 메시지 표시
function openModal(title: string, message: string) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}
// 모달 닫기 처리
function onModalClose() {
  showModal.value = false
  if (modalTitle.value === '임시 비밀번호 전송 완료') step.value = 2
  if (modalTitle.value === '변경 완료') router.push('/login')
}
</script>

<style scoped>
.modal-text {
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
}
</style>
