<template>
  <div class="edit-profile-container">
    <!-- 헤더 -->
    <div class="edit-profile-header">
      <h2>프로필 수정</h2>
    </div>

    <!-- 폼 -->
    <form class="edit-profile-form" @submit.prevent="onSave">
      <div class="edit-profile-grid">
        <!-- 1) 프로필 사진 -->
        <div class="row">
          <label>프로필 사진</label>
          <div class="photo-cell">
            <img
              :src="form.image || defaultImage"
              class="profile-preview"
              alt="미리보기"
            />
            <button type="button" class="btn-upload" @click="onUploadClick">
              이미지 수정
            </button>
            <input
              type="file"
              ref="fileInput"
              class="visually-hidden"
              @change="onFileChange"
              accept="image/*"
            />
          </div>
        </div>

        <div class="section-separator"></div>

        <!-- 2) 닉네임 수정 -->
        <div class="row">
          <label>닉네임</label>
          <div class="input-cell">
            <input
              v-model="form.nickname"
              class="form-input"
              placeholder="닉네임을 입력하세요"
            />
            <button type="button" class="btn-check" @click="checkNickname">
              중복확인
            </button>
          </div>
        </div>

        <!-- 3) 이메일 수정 -->
        <div class="row">
          <label>이메일</label>
          <div class="input-cell">
            <input
              v-model="form.email"
              class="form-input"
              placeholder="이메일을 입력하세요"
            />
            <button type="button" class="btn-check" @click="checkEmail">
              중복확인
            </button>
          </div>
        </div>

        <!-- 4) 비밀번호 재설정 -->
        <div class="row">
          <label>비밀번호</label>
          <button type="button" class="btn-reset-pw" @click="goToResetPassword">
            비밀번호 재설정
          </button>
        </div>

        <div class="section-separator"></div>

        <!-- 5) 관심 분야 -->
        <div class="row">
          <label>관심 분야</label>
          <div class="interest-selection">
            <div class="interest-checkboxes">
              <label
                v-for="category in mainCategories"
                :key="category"
                class="interest-checkbox"
              >
                <input
                  type="checkbox"
                  :value="category"
                  v-model="form.interestId"
                  @change="handleInterestChange"
                  :disabled="isInterestDisabled(category)"
                />
                <span class="checkbox-label">{{ category }}</span>
              </label>
            </div>
            <div class="selected-info">
              <small class="text-muted">
                선택된 관심분야: {{ form.interestId.length }}/3
              </small>
            </div>
          </div>
        </div>

        <div class="section-separator"></div>

        <!-- 6) 선호 시간대 -->
        <div class="row">
          <label>선호 시간대</label>
          <TimeDropdown v-model="form.timeId" />
        </div>

        <!-- 7) 학습량 -->
        <div class="row">
          <label>학습량</label>
          <StudyAmountDropdown v-model="form.studyTime" />
        </div>

        <div class="section-separator"></div>

        <!-- 7) 스터디 일정 알림 -->
        <div class="row">
          <label>알림 설정</label>
          <div class="notification-settings">
            <div class="notification-item">
              <span class="notification-label">웹 알림</span>
              <button
                type="button"
                :class="['btn-toggle', { active: form.webNotify }]"
                @click="toggleWeb"
              >
                {{ form.webNotify ? 'ON' : 'OFF' }}
              </button>
            </div>
            <div class="notification-item">
              <span class="notification-label">이메일 알림</span>
              <button
                type="button"
                :class="['btn-toggle', { active: form.emailNotify }]"
                @click="toggleEmail"
              >
                {{ form.emailNotify ? 'ON' : 'OFF' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 액션 버튼들 -->
      <div class="form-actions">
        <div class="action-buttons">
          <button type="submit" class="btn-save">저장</button>
          <button type="button" class="btn-cancel" @click="onCancel">취소</button>
        </div>
        <button type="button" class="btn-withdraw" @click="showWithdraw = true">
          회원 탈퇴
        </button>
      </div>
    </form>

    <!-- 탈퇴 확인 모달 -->
    <Modal :visible="showWithdraw" @close="showWithdraw = false">
      <template #title>정말 탈퇴하시겠습니까? 😭</template>
      <div class="withdraw-content">
        <div class="withdraw-icon">⚠️</div>
        <p class="withdraw-message">탈퇴하시면 모든 데이터가 삭제되며 복구할 수 없습니다.</p>
        <ul class="withdraw-details">
          <li> 개인정보 및 프로필 데이터</li>
          <li> 참여 중인 스터디 정보</li>
          <li> 학습 기록 및 통계</li>
          <li> 업로드한 파일 및 게시글</li>
        </ul>
      </div>
      <template #footer>
        <button class="btn-cancel-modal" @click="showWithdraw = false">취소</button>
        <button class="btn-withdraw-confirm" @click="onWithdraw">탈퇴하기</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
// 기본 이미지 경로
const defaultImage = `${import.meta.env.BASE_URL}images/logo.jpg`
import Modal from '@/components/common/Modal.vue'
import { categoryMap } from '@/constants/categoryMap'
import { useAuthService } from '@/services/useAuthService'
import TimeDropdown from '@/components/mypage/TimeDropdown.vue'
import StudyAmountDropdown from '@/components/mypage/StudyAmountDropdown.vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { checkEmail: checkEmailAPI } = useAuthService()

// 회원가입 시 입력한 정보를 기반으로 폼 초기화
const form = reactive({
  image: user.value?.image || '',
  nickname: user.value?.nickname || '',
  email: user.value?.email || '',
  interestId: user.value?.interests ? [...user.value.interests] : [],
  timeId: user.value?.timeSlot ? parseInt(user.value.timeSlot) : 1,
  studyTime: user.value?.studyAmount || 1,
  webNotify: user.value?.notify?.web ?? true,
  emailNotify: user.value?.notify?.email ?? true,
})

const showWithdraw = ref(false)
const fileInput = ref<HTMLInputElement>()

// 대분류 카테고리 목록 (카테고리 맵에서 가져옴)
const mainCategories = Object.keys(categoryMap)



onMounted(async () => {
  console.log('EditProfileForm mounted, user.value:', user.value)

  // 로그인 상태 확인
  const isLoggedIn = localStorage.getItem('user') || localStorage.getItem('token')
  console.log('Login status:', isLoggedIn)

  if (!isLoggedIn) {
    console.log('User not logged in, redirecting to login')
    router.push('/login')
    return
  }

  if (!user.value) {
    console.log('Fetching user data...')
    await userStore.fetchUser()
  }

  console.log('After fetchUser, user.value:', user.value)

  // 사용자 데이터가 로드된 후 폼 초기화
  if (user.value) {
    console.log('Initializing form with user data:', user.value)
    form.image = user.value.image || ''
    form.nickname = user.value.nickname || ''
    form.email = user.value.email || ''
    // 관심분야는 "대분류,중분류" 형태에서 대분류만 추출
    form.interestId = user.value.interests ?
      user.value.interests.map((interest: string) => {
        const parts = interest.split(',')
        return parts[0].trim()
      }).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) : []
    // timeId는 studyTime에서 가져오기 (백엔드에서 studyTime으로 제공)
    form.timeId = user.value.studyAmount || 1
    // 학습량 설정 (백엔드에서 studyAmount로 제공, PreferStudy 컴포넌트 값으로 매핑)
    // studyAmount: 0=30분이하, 1=1~2시간, 2=3시간이상
    form.studyTime = user.value.studyAmount || 1
    form.webNotify = user.value.notify?.web ?? true
    form.emailNotify = user.value.notify?.email ?? true

    console.log('Form initialized:', form)
  } else {
    console.log('No user data available')
  }
})

function onUploadClick() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    form.image = URL.createObjectURL(file)
  }
}

async function checkNickname() {
  // 현재 사용자의 닉네임과 같으면 중복체크 불필요
  if (form.nickname === user.value?.nickname) {
    alert('현재 사용 중인 닉네임입니다.')
    return
  }

  if (!form.nickname.trim()) {
    alert('닉네임을 입력해주세요.')
    return
  }

  // TODO: 닉네임 중복확인 API 구현 필요
  alert('닉네임 중복확인 기능은 아직 구현되지 않았습니다.')
}

async function checkEmail() {
  // 현재 사용자의 이메일과 같으면 중복체크 불필요
  if (form.email === user.value?.email) {
    alert('현재 사용 중인 이메일입니다.')
    return
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    alert('올바른 이메일 형식을 입력해주세요.')
    return
  }

  try {
    // 실제 이메일 중복확인 API 호출
    await checkEmailAPI(form.email)
    alert('사용 가능한 이메일입니다.')
  } catch (error) {
    alert(error instanceof Error ? error.message : '이메일 중복확인에 실패했습니다.')
  }
}

function goToResetPassword() {
  router.push({ name: 'ResetPassword' })
}

function handleInterestChange() {
  if (form.interestId.length > 3) {
    form.interestId = form.interestId.slice(0, 3)
  }
}

function isInterestDisabled(category: string) {
  return form.interestId.length >= 3 && !form.interestId.includes(category)
}

function toggleWeb() {
  form.webNotify = !form.webNotify
}

function toggleEmail() {
  form.emailNotify = !form.emailNotify
}

async function onSave() {
  try {
    // 백엔드 API 스펙에 맞게 데이터 변환
    const updateData: {
      profileImg?: string
      nickname?: string
      email?: string
      studyTime?: number
      webNotify?: boolean
      emailNotify?: boolean
      timeId?: number
      interests?: string[]
    } = {
      profileImg: form.image || '',
      nickname: form.nickname,
      email: form.email,
      studyTime: form.studyTime,
      webNotify: form.webNotify,
      emailNotify: form.emailNotify,
      timeId: form.timeId // 백엔드 스펙에 따라 timeId도 포함
    }

    // 관심분야가 선택된 경우에만 추가
    if (form.interestId.length > 0) {
      updateData.interests = form.interestId
    }

    console.log('📤 전송할 데이터:', updateData)
    await userStore.updateUser(updateData)
    console.log('✅ 프로필 수정 완료')
    router.push('/mypage')
  } catch (error) {
    console.error('❌ 프로필 수정 실패:', error)
    alert('프로필 수정에 실패했습니다. 다시 시도해주세요.')
  }
}

function onCancel() {
  router.push('/mypage')
}

async function onWithdraw() {
  try {
    await userStore.withdraw()
    console.log('✅ 회원탈퇴 완료')
    router.push('/')
  } catch (error) {
    console.error('❌ 회원탈퇴 실패:', error)
    alert('회원탈퇴에 실패했습니다.')
  }
}
</script>

<style scoped>
.edit-profile-container {
  max-width: 1000px;
  margin: 2rem auto 1.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  min-height: 60vh;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.edit-profile-header {
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.75rem;
}

.edit-profile-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

.edit-profile-form {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.edit-profile-grid {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-auto-rows: minmax(50px, auto);
  row-gap: 1rem;
  column-gap: 1.5rem;
  align-items: center;
}

.row {
  display: contents;
}

.section-separator {
  grid-column: 1 / span 2;
  height: 1px;
  background: #e9ecef;
  margin: 0.75rem 0;
}

label {
  font-weight: 600;
  color: #495057;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  font-size: 0.9rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 프로필 사진 */
.photo-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.profile-preview {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: white;
  border: 2px solid #e9ecef;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.profile-preview:hover {
  border-color: #d79c94;
  transform: scale(1.05);
}

.btn-upload {
  padding: 0.6rem 1.25rem;
  border: 2px solid #d79c94;
  border-radius: 10px;
  background: white;
  color: #d79c94;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn-upload:hover {
  background: #d79c94;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.3);
}

/* 입력 필드 */
.input-cell {
  display: flex !important;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  min-height: 45px;
}

.form-input {
  flex: 1;
  padding: 0.6rem 0.875rem;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  background: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-input:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
  transform: translateY(-1px);
}

.form-select {
  padding: 0.6rem 0.875rem;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  background: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  max-width: 300px;
}

.form-select:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
  transform: translateY(-1px);
}

/* 버튼들 */
.btn-check {
  padding: 0.75rem 1.5rem !important;
  border: 2px solid #d79c94 !important;
  border-radius: 10px !important;
  background: white !important;
  color: #d79c94 !important;
  cursor: pointer !important;
  font-weight: 600 !important;
  font-size: 0.9rem !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
  white-space: nowrap !important;
  min-width: 120px !important;
  height: 45px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.btn-check:hover {
  background: #d79c94;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.3);
}

.btn-reset-pw {
  padding: 0.6rem 1.25rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
  max-width: 300px;
}

.btn-reset-pw:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

/* 관심분야 체크박스 */
.interest-selection {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.interest-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.875rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.interest-checkbox {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  white-space: nowrap;
  flex-shrink: 0;
}

.interest-checkbox:hover {
  background-color: #f8f9fa;
  border-color: #d79c94;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(215, 156, 148, 0.1);
}

.interest-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #d79c94;
}

.interest-checkbox input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-label {
  font-size: 0.9rem;
  color: #495057;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
}

.interest-checkbox input[type="checkbox"]:disabled + .checkbox-label {
  color: #6c757d;
  cursor: not-allowed;
}

.selected-info {
  margin-top: 0.375rem;
}

.text-muted {
  color: #6c757d;
  font-size: 0.8rem;
}

/* 알림 설정 */
.notification-settings {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.notification-label {
  font-weight: 500;
  color: #495057;
}

.btn-toggle {
  padding: 0.4rem 0.875rem;
  border: 2px solid #e9ecef;
  border-radius: 18px;
  background: white;
  color: #6c757d;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  min-width: 55px;
}

.btn-toggle.active {
  background: #d79c94;
  color: white;
  border-color: #d79c94;
}

.btn-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 액션 버튼들 */
.form-actions {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-save,
.btn-cancel {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-width: 100px;
}

.btn-save {
  background: #d79c94;
  color: white;
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.3);
}

.btn-save:hover {
  background: #c88a82;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(215, 156, 148, 0.4);
}

.btn-cancel {
  background: #6c757d;
  color: white;
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.btn-cancel:hover {
  background: #5a6268;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
}

.btn-withdraw {
  padding: 0.6rem 1.25rem;
  border: 2px solid #dc3545;
  border-radius: 10px;
  background: white;
  color: #dc3545;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.btn-withdraw:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

/* 회원탈퇴 모달 스타일 */
.withdraw-content {
  text-align: center;
  padding: 1rem 0;
}

.withdraw-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

.withdraw-message {
  font-size: 1.1rem;
  font-weight: 600;
  color: #dc3545;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.withdraw-details {
  text-align: left;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 0;
  border-left: 4px solid #dc3545;
}

.withdraw-details li {
  margin-bottom: 0.5rem;
  color: #6c757d;
  font-size: 0.95rem;
  line-height: 1.4;
}

.withdraw-details li:last-child {
  margin-bottom: 0;
}

.btn-cancel-modal {
  padding: 0.75rem 1.5rem;
  border: 1px solid #6c757d;
  border-radius: 8px;
  background: white;
  color: #6c757d;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-width: 80px;
}

.btn-cancel-modal:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.btn-withdraw-confirm {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #dc3545;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-width: 100px;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-withdraw-confirm:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}



/* 유틸리티 */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

/* 반응형 */
@media (max-width: 768px) {
  .edit-profile-container {
    margin: 1rem;
    padding: 1.25rem;
  }

  .edit-profile-form {
    padding: 1rem;
  }

  .edit-profile-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: center;
  }

  .btn-save,
  .btn-cancel {
    flex: 1;
  }

  .btn-withdraw {
    width: 100%;
  }

  .withdraw-content {
    padding: 0.75rem 0;
  }

  .withdraw-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  .withdraw-message {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .withdraw-details {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .btn-cancel-modal,
  .btn-withdraw-confirm {
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    min-width: 70px;
  }
}
</style>

