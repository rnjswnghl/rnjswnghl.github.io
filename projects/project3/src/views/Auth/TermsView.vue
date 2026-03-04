<template>
  <div class="terms-container">
    <div class="terms-card">
      <h2 class="text-center mb-4">회원가입 약관 동의</h2>

      <!-- ✅ 전체 동의 -->
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="checkAll"
          v-model="agree.all"
          @change="toggleAll"
        />
        <label class="form-check-label fw-bold" for="checkAll">
          전체 약관에 동의합니다
        </label>
      </div>

      <!-- ✔ 서비스 이용약관 -->
      <section class="mb-3">
        <h6>서비스 이용약관</h6>
        <div class="terms-box">{{ termsText }}</div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkTerms"
            v-model="agree.terms"
            @change="checkIndividual"
          />
          <label class="form-check-label" for="checkTerms">
            (필수) 서비스 이용약관에 동의합니다.
          </label>
        </div>
      </section>

      <!-- ✔ 개인정보 수집 및 이용 -->
      <section class="mb-3">
        <h6>개인정보 수집 및 이용 동의</h6>
        <div class="terms-box">{{ privacyText }}</div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkPrivacy"
            v-model="agree.privacy"
            @change="checkIndividual"
          />
          <label class="form-check-label" for="checkPrivacy">
            (필수) 개인정보 수집 및 이용에 동의합니다.
          </label>
        </div>
      </section>

      <!-- 🔘 마케팅 정보 수신 -->
      <section class="mb-4">
        <h6>마케팅 정보 수신 동의</h6>
        <div class="terms-box">{{ marketingText }}</div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkMarketing"
            v-model="agree.marketing"
          />
          <label class="form-check-label" for="checkMarketing">
            (선택) 이메일 및 푸시 알림 수신에 동의합니다.
          </label>
        </div>
      </section>

      <!-- 👉 다음 버튼 -->
      <Button variant="primary" size="md" class="w-100" @click="goNext">
        다음
      </Button>
    </div>

    <!-- 모달 -->
    <Modal :visible="showModal" @close="showModal = false">
      <template #title>{{ modalTitle }}</template>
      <hr />
      <p class="modal-text">{{ modalMessage }}</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'

const router = useRouter()

const agree = ref({
  all: false,
  terms: false,
  privacy: false,
  marketing: false,
})

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const termsText = `
==============================
[필수] 서비스 이용약관 동의
==============================

본 약관은 귀하가 FocusMate가 제공하는 화상회의, 화면 공유, 채팅, 일정 관리, 파일 전송 등의 서비스를 이용함에 있어 회사와 이용자 간 권리·의무 및 책임사항을 규정합니다.

1. 서비스 내용
- 다자간 화상회의 및 음성통화
- 화면 공유 및 화면 녹화
- 채팅 기능 및 파일 업로드/다운로드
- 전화번호 및 이메일 본인 확인
- 일정 등록 및 이메일/SMS 알림 발송
- 기타 협업 및 커뮤니케이션 기능

2. 이용자 의무
- 타인의 개인정보 도용 금지
- 불법 영상 및 파일 공유 금지
- 시스템 부정 접속 및 해킹 시도 금지
- 서비스 정상 운영 방해 금지
`

const privacyText = `
==============================
[필수] 개인정보 수집·이용 동의
==============================

1. 수집하는 개인정보 항목 및 목적

- 이메일 주소: 회원 식별, 로그인, 알림 전송
- 전화번호: 본인 인증, 일정 알림 SMS 발송
- 이름/닉네임: 사용자 구분 및 커뮤니케이션
- 화면 녹화 자료: 회의 기록 보관 및 공유
- 파일 (업로드/다운로드): 협업 자료 공유
- 접속 IP 및 장치 정보: 보안 및 서비스 품질 개선

2. 보유 및 이용 기간

- 회원 탈퇴 시까지 보유(이메일, 전화번호, 이름 등)
- 녹화 자료 및 파일: 사용자 요청 시 삭제 또는 6개월 보관 후 자동 삭제
- 접속 정보: 1년 후 파기

3. 동의 거부 권리 안내

귀하는 개인정보 수집·이용 동의를 거부할 권리가 있으나, 거부 시 서비스 이용이 제한될 수 있습니다.
`

const marketingText = `
==============================
[선택] 마케팅 정보 수신 동의
==============================

이벤트, 뉴스, 기능 업데이트 등 마케팅 정보를 이메일 및 SMS로 받아보겠습니다.
(수신 거부 시에도 서비스 이용에는 제한이 없습니다.)
`

function toggleAll() {
  agree.value.terms = agree.value.all
  agree.value.privacy = agree.value.all
}

function checkIndividual() {
  agree.value.all = agree.value.terms && agree.value.privacy
}

function goNext() {
  if (!agree.value.terms || !agree.value.privacy) {
    modalTitle.value = '필수 약관 미동의'
    modalMessage.value = '서비스 이용약관과 개인정보 수집 및 이용에 모두 동의해주세요.'
    showModal.value = true
    return
  }

  // 중첩 라우트 구조에 맞게 경로 수정
  router.push({
    path: '/register/form',
    query: {
      marketing: agree.value.marketing ? 'true' : 'false',
    },
  })
}
</script>

<style scoped>
.terms-container {
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 2rem;
}

.terms-card {
  background: #fff;
  padding: 3rem 3.5rem;
  border-radius: 16px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.terms-box {
  background: #f1f1f1;
  padding: 1.2rem;
  margin-bottom: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
  font-size: 0.92rem;
  white-space: pre-wrap;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.modal-text {
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
</style>
