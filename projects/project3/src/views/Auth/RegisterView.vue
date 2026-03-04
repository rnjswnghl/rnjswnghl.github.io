<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="text-center mb-4">회원 정보 입력</h2>

      <form @submit.prevent="handleRegister">
        <!-- 이름 -->
        <div class="form-group mb-3">
          <input v-model="form.name" type="text" class="form-control" placeholder="이름 입력" required />
        </div>

        <!-- 아이디 (닉네임) -->
        <div class="form-group mb-3 d-flex gap-2">
          <input v-model="form.loginId" type="text" class="form-control" placeholder="아이디 입력" required />
          <Button variant="outline" size="sm" class="no-wrap-btn" @click="checkLoginId" type="button">중복확인</Button>
        </div>

        <!-- 비밀번호 -->
        <div class="form-group mb-3">
          <PasswordInput
            v-model="form.password"
            placeholder="비밀번호 입력"
            :minlength="MIN_PW"
            :maxlength="MAX_PW"
            @update:modelValue="onPasswordInput"
            required
          />
          <div class="text-muted small mt-1">※ 8~20자, 공백 없이 영문+숫자+특수문자 포함</div>
        </div>

        <!-- 비밀번호 확인 -->
        <div class="form-group mb-3">
          <PasswordInput
            v-model="confirmPassword"
            placeholder="비밀번호 확인"
            :maxlength="MAX_PW"
            @update:modelValue="onConfirmInput"
            required
          />
          <div class="small mt-1" :class="confirmPasswordCheckClass">{{ confirmPasswordMessage }}</div>
        </div>

        <!-- 이메일 -->
        <div class="form-group mb-3 d-flex gap-2">
          <input v-model="form.email" type="email" class="form-control" placeholder="이메일 입력" required />
          <Button variant="outline" size="sm" class="no-wrap-btn" @click="checkEmail" type="button">중복확인</Button>
        </div>

        <!-- 성별 -->
        <div class="form-group mb-3">
          <label class="me-3"><input type="radio" value="M" v-model="form.gender" /> 남성</label>
          <label><input type="radio" value="F" v-model="form.gender" /> 여성</label>
        </div>

        <!-- 선호 시간대 -->
        <PreferTime v-model="form.preferredTime" class="mb-3" />

        <!-- 학습량 -->
        <PreferStudy v-model="form.studyTime" class="mb-3" />

        <!-- 관심 분야 -->
        <Categories v-model:selectedCategories="form.interest" />

        <!-- 알림 설정 -->
        <AlarmSetting v-model="form.alarmSetting" />

        <!-- 제출 -->
        <Button type="submit" variant="primary" size="md" class="w-100 mt-4">회원가입 완료</Button>
      </form>
    </div>

    <!-- 모달 -->
    <Modal :visible="showModal" @close="handleCloseModal">
      <template #title>{{ modalTitle }}</template>
      <hr />
      {{ modalMessage }}
      <template #footer>
        <Button variant="primary" size="sm" @click="handleCloseModal" type="button">확인</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '@/stores/user'

import Categories from '@/components/auth/Categories.vue'
import AlarmSetting from '@/components/auth/AlarmSetting.vue'
import PreferTime from '@/components/auth/PreferTime.vue'
import PreferStudy from '@/components/auth/PreferStudy.vue'

import Button from '@/components/common/Button.vue'
import PasswordInput from '@/components/common/PasswordInput.vue'
import Modal from '@/components/common/Modal.vue'

const router = useRouter()
const route = useRoute()
const { signup, checkLoginId: checkLoginIdAPI, checkEmail: checkEmailAPI, login } = useAuthService()
const userStore = useUserStore()

const MIN_PW = 8
const MAX_PW = 20

const form = ref({
  name: '',
  loginId: '',
  email: '',
  password: '',
  preferredTime: '', // ex: "0"
  studyTime: '',
  interest: [] as string[], // ["IT", "어학", ...]
  gender: '',
  alarmSetting: {
    email: false,
    push: false,
  },
})

const confirmPassword = ref('')

// 약관 페이지에서 전달받은 마케팅 동의 값 반영
onMounted(() => {
  const marketingAgreed = route.query.marketing === 'true'
  form.value.alarmSetting.email = marketingAgreed
  form.value.alarmSetting.push = marketingAgreed
})

const confirmPasswordMessage = computed(() => {
  if (!confirmPassword.value) return ''
  return confirmPassword.value === form.value.password
    ? '비밀번호가 일치합니다.'
    : '비밀번호가 일치하지 않습니다.'
})

const confirmPasswordCheckClass = computed(() => {
  return confirmPassword.value === form.value.password ? 'text-success' : 'text-danger'
})

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

// 비밀번호 강도 검사 (8~20자 + 영문 + 숫자 + 특수문자, 공백 금지)
function isValidPassword(pwd: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,20}$/.test(pwd)
}

// 공백 제거 + 20자 초과 컷(PasswordInput가 maxlength를 전달 못할 경우 대비)
function sanitizePassword(raw: string): string {
  return raw.replace(/\s+/g, '').slice(0, MAX_PW)
}
function onPasswordInput(v: string) {
  const cleaned = sanitizePassword(v)
  if (cleaned !== v) form.value.password = cleaned
}
function onConfirmInput(v: string) {
  const cleaned = sanitizePassword(v)
  if (cleaned !== v) confirmPassword.value = cleaned
}

function showAlert(title: string, message: string) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

function handleCloseModal() {
  showModal.value = false
  if (modalTitle.value === '회원가입 완료') {
    // 자동 로그인 성공 시 메인 페이지로, 실패 시 로그인 페이지로
    const token = localStorage.getItem('accessToken')
    if (token) {
      router.push('/')
    } else {
      router.push('/login')
    }
  }
}

async function checkLoginId() {
  if (!form.value.loginId.trim()) {
    showAlert('입력 오류', '아이디를 입력해주세요.')
    return
  }

  try {
    const response = await checkLoginIdAPI(form.value.loginId)
    console.log('아이디 중복확인 응답:', response.data)

    // 백엔드 응답 구조에 따라 중복 여부 확인
    const isDuplicate = response.data.exists || response.data.available === false || response.data.data === true

    if (isDuplicate) {
      showAlert('아이디 확인', `아이디 "${form.value.loginId}"는 이미 사용 중입니다.`)
    } else {
      showAlert('아이디 확인', `아이디 "${form.value.loginId}" 사용 가능`)
    }
  } catch (error) {
    showAlert('아이디 확인', error instanceof Error ? error.message : '아이디 중복확인에 실패했습니다.')
  }
}

async function checkEmail() {
  if (!form.value.email.trim()) {
    showAlert('입력 오류', '이메일을 입력해주세요.')
    return
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    showAlert('입력 오류', '올바른 이메일 형식을 입력해주세요.')
    return
  }

  try {
    const response = await checkEmailAPI(form.value.email)
    console.log('이메일 중복확인 응답:', response.data)

    // 백엔드 응답 구조에 따라 중복 여부 확인
    const isDuplicate = response.data.exists || response.data.available === false || response.data.data === true

    if (isDuplicate) {
      showAlert('이메일 확인', `이메일 "${form.value.email}"는 이미 사용 중입니다.`)
    } else {
      showAlert('이메일 확인', `이메일 "${form.value.email}" 사용 가능`)
    }
  } catch (error) {
    showAlert('이메일 확인', error instanceof Error ? error.message : '이메일 중복확인에 실패했습니다.')
  }
}

async function handleRegister() {
  // 프론트 유효성 검사
  if (!form.value.name.trim()) {
    showAlert('입력 오류', '이름을 입력해주세요.')
    return
  }
  if (!form.value.loginId.trim()) {
    showAlert('입력 오류', '아이디를 입력해주세요.')
    return
  }
  if (!form.value.email.trim()) {
    showAlert('입력 오류', '이메일을 입력해주세요.')
    return
  }
  if (!form.value.password) {
    showAlert('입력 오류', '비밀번호를 입력해주세요.')
    return
  }
  if (!isValidPassword(form.value.password)) {
    showAlert('입력 오류', '비밀번호는 8~20자, 공백 없이 영문+숫자+특수문자를 포함해야 합니다.')
    return
  }
  if (form.value.password !== confirmPassword.value) {
    showAlert('입력 오류', '비밀번호가 일치하지 않습니다.')
    return
  }
  if (!form.value.gender) {
    showAlert('입력 오류', '성별을 선택해주세요.')
    return
  }
  if (form.value.preferredTime === '') {
    showAlert('입력 오류', '선호 시간대를 선택해주세요.')
    return
  }
  if (form.value.studyTime === '' || form.value.studyTime === null) {
    showAlert('입력 오류', '학습량을 선택해주세요.')
    return
  }
  if (!form.value.interest.length) {
    showAlert('입력 오류', '관심 분야를 최소 1개 선택해주세요.')
    return
  }

  try {
    // 백엔드 API 명세에 맞는 회원가입 데이터
    const payload = {
      name: form.value.name,
      loginId: form.value.loginId,
      email: form.value.email,
      password: form.value.password,
      gender: form.value.gender,
      role: 'STUDENT', // 기본값 설정
      birth: new Date().toISOString(), // 현재 날짜를 기본값으로 설정
      profileImg: `${import.meta.env.BASE_URL || '/'}images/logo.jpg`,
      goal: '학습 목표 달성', // 기본 목표
      studyTime: parseInt(form.value.studyTime) || 2, // 선택된 학습량 또는 기본값
      webNotify: form.value.alarmSetting.push, // 웹 알림 설정
      emailNotify: form.value.alarmSetting.email, // 이메일 알림 설정
      interests: form.value.interest.map(field => ({ field })), // 관심분야를 객체 배열로 변환
      timeId: parseInt(form.value.preferredTime) || 1, // 선호시간대를 백엔드 형식으로 전송
      dday: new Date().toISOString(), // 현재 날짜를 기본값으로 설정
    }

    await signup(payload)

    // 회원가입 성공 후 자동 로그인 시도
    try {
      const loginResponse = await login({
        loginId: form.value.loginId,
        password: form.value.password
      })

      // 로그인 성공 시 사용자 정보 저장
      const { accessToken, user } = loginResponse.data

      // 응답 데이터 검증
      if (!accessToken || !user) {
        throw new Error('로그인 응답에 필요한 데이터가 없습니다.')
      }

      // 로컬 스토리지에 저장 (SignInView와 동일한 키 사용)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('user', JSON.stringify(user))

      // 사용자 스토어에 정보 저장
      userStore.setToken(accessToken)
      userStore.setUser(user)

      // 로그인 상태 변경 이벤트 발생 (한 번만)
      window.dispatchEvent(new Event('login-status-changed'))

      showAlert('회원가입 완료', '회원가입이 완료되었습니다! 자동으로 로그인되어 메인 페이지로 이동합니다.')

      // 모달 닫기 후 메인 페이지로 이동
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (loginError) {
      console.error('자동 로그인 실패:', loginError)
      showAlert('회원가입 완료', '회원가입이 완료되었습니다! 로그인 페이지로 이동하여 직접 로그인해주세요.')

      // 모달 닫기 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
  } catch (error: unknown) {
    console.error('회원가입 실패:', error)
    showAlert('회원가입 실패', '입력값을 다시 확인해주세요.')
  }
}
</script>

<style scoped>
.register-container {
  min-height: calc(100vh - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.register-card {
  background: #fff;
  padding: 3rem 3.5rem;
  border-radius: 16px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.no-wrap-btn {
  white-space: nowrap;
  min-width: 100px;
}
</style>
