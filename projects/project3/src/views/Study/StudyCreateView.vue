<template>
  <div class="study-create-view">
    <div class="container">
      <!-- 헤더 -->
      <div class="header">
        <h1 class="title">스터디룸 생성</h1>
        <p class="subtitle">새로운 스터디룸을 만들어보세요</p>
      </div>

      <!-- 스터디룸 생성 폼 -->
      <div class="create-form-container">
        <form @submit.prevent="handleSubmit" class="create-form">
          <!-- 스터디명 -->
          <div class="form-group">
            <label for="studyName" class="form-label">스터디명</label>
            <input
              id="studyName"
              v-model="formData.studyName"
              type="text"
              class="form-control"
              placeholder="스터디명을 입력해주세요"
              required
            />
          </div>

          <!-- 스터디 프로필 이미지 -->
          <div class="form-group">
            <label class="form-label">스터디 프로필</label>
            <div class="profile-upload">
              <div class="profile-preview">
                <img
                  :src="profileImage || meetingImage"
                  alt="스터디 프로필"
                  class="profile-image"
                />
              </div>
              <div class="upload-controls">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="file-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  @click="fileInput?.click()"
                  class="upload-btn"
                >
                  파일 찾기
                </Button>
              </div>
            </div>
          </div>

          <!-- 스터디 기간 -->
          <div class="form-group">
            <label class="form-label">스터디 기간</label>
            <div class="date-range">
              <input
                v-model="formData.createdAt"
                type="date"
                class="form-control date-input"
                required
              />
              <span class="date-separator">~</span>
              <input
                v-model="formData.endedAt"
                type="date"
                class="form-control date-input"
                required
              />
            </div>
          </div>

          <!-- 카테고리 설정 -->
          <div class="form-group">
            <label class="form-label">카테고리 설정</label>
            <div class="category-settings">
              <!-- 대분류 -->
              <div class="category-item">
                <label class="sub-label">대분류</label>
                <select v-model="selectedMain" class="form-select" required>
                  <option value="">대분류를 선택하세요</option>
                  <option v-for="main in Object.keys(categoryMap)" :key="main" :value="main">
                    {{ main }}
                  </option>
                </select>
              </div>

              <!-- 중분류 -->
              <div class="category-item" v-if="selectedMain">
                <label class="sub-label">중분류</label>
                <select v-model="selectedSub" class="form-select">
                  <option value="">중분류를 선택하세요</option>
                  <option v-for="sub in (categoryMap as any)[selectedMain]" :key="sub" :value="sub">
                    {{ sub }}
                  </option>
                </select>
              </div>

              <!-- 소분류 -->
              <div class="category-item">
                <label class="sub-label">소분류 <span class="text-muted">(최대 3개)</span></label>
                <div class="tag-input-container">
                  <div class="tag-list">
                    <span
                      v-for="(tag, index) in detailTags"
                      :key="index"
                      class="tag-item"
                    >
                      <span class="tag-text">#{{ tag }}</span>
                      <button
                        type="button"
                        class="tag-remove-btn"
                        @click="removeTag(index)"
                        aria-label="태그 삭제"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                  <input
                    v-model="tagInput"
                    type="text"
                    class="tag-input"
                    placeholder="키워드를 입력하고 Enter 또는 Space를 누르세요"
                    @keydown="handleTagInput"
                    @blur="addTagFromInput"
                    :disabled="detailTags.length >= 3"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 스터디 요일과 시간 -->
          <div class="form-group">
            <label class="form-label">스터디 요일과 시간</label>
            <div class="schedule-settings">
              <div class="schedule-item">
                <label class="sub-label">요일</label>
                <div class="day-buttons">
                  <Button
                    v-for="day in weekDays"
                    :key="day.value"
                    type="button"
                    :variant="selectedDays.includes(day.value) ? 'primary' : 'outline'"
                    size="sm"
                    @click="toggleDay(day.value)"
                    class="day-btn"
                  >
                    {{ day.label }}
                  </Button>
                </div>
              </div>

              <!-- 스터디 시간 설정 (모든 요일 동일한 시간) -->
              <div v-if="selectedDays.length > 0" class="schedule-item">
                <label class="sub-label">스터디 시간</label>
                <div class="time-settings">
                  <div class="time-input-group">
                    <label class="time-label">시작 시간</label>
                    <div class="time-input-wrapper">
                      <input
                        :value="startTimeDisplay"
                        type="text"
                        class="form-control time-input"
                        placeholder="시작 시간"
                        readonly
                        @click="openTimePicker('start')"
                      />
                      <button
                        type="button"
                        class="time-picker-btn"
                        @click="openTimePicker('start')"
                      >
                        🕛
                      </button>
                    </div>
                  </div>
                  <div class="time-separator">~</div>
                  <div class="time-input-group">
                    <label class="time-label">종료 시간</label>
                    <div class="time-input-wrapper">
                      <input
                        :value="endTimeDisplay"
                        type="text"
                        class="form-control time-input"
                        placeholder="종료 시간"
                        readonly
                        @click="openTimePicker('end')"
                      />
                      <button
                        type="button"
                        class="time-picker-btn"
                        @click="openTimePicker('end')"
                      >
                        🕐
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="totalTime > 0" class="total-time-display">
                  총 진행시간: {{ totalTime }}시간
                </div>
              </div>
            </div>
          </div>

          <!-- 인원수 -->
          <div class="form-group">
            <label for="maxMembers" class="form-label">인원수</label>
            <input
              id="maxMembers"
              v-model.number="formData.maxMembers"
              type="number"
              class="form-control"
              min="2"
              max="20"
              placeholder="최대 인원수를 입력하세요"
              required
            />
          </div>

          <!-- 비밀번호 -->
          <div class="form-group">
            <label for="password" class="form-label">비밀번호 <span class="text-muted">(6자리 숫자)</span></label>
            <PasswordInput
              id="password"
              v-model="formData.password"
              placeholder="6자리 숫자 비밀번호"
              pattern="[0-9]{6}"
              :maxlength="6"
              required
            />
            <div class="password-notice">
              <span class="notice-icon">💡</span>
              <span class="notice-text">
                비밀번호 설정 후, 스터디 규칙에 비밀번호를 명시해주세요.
                다른 멤버들이 확인 후 참여할 수 있도록 안내해주시면 됩니다.
              </span>
            </div>
          </div>

          <!-- 스터디 규칙 -->
          <div class="form-group">
            <label for="rules" class="form-label">스터디 규칙</label>
            <textarea
              id="rules"
              v-model="formData.rule"
              class="form-control"
              rows="4"
              placeholder="스터디 규칙을 입력하세요"
            ></textarea>
          </div>

          <!-- 스터디 요약 -->
          <div class="form-group">
            <label for="summary" class="form-label">스터디 요약</label>
            <textarea
              id="summary"
              v-model="formData.summary"
              class="form-control"
              rows="4"
              placeholder="스터디에 대한 간단한 요약을 입력하세요"
            ></textarea>
          </div>

          <!-- 제출 버튼 -->
          <div class="form-actions">
            <Button type="button" variant="outline" @click="goBack" class="cancel-btn">
              취소
            </Button>
            <Button type="submit" variant="primary" :disabled="loading" class="submit-btn">
              {{ loading ? '생성 중...' : '스터디룸 생성' }}
            </Button>
          </div>
        </form>
      </div>
    </div>

    <!-- 시간 선택 모달 -->
    <TimePickerModal
      :model-value="getCurrentTimeValue()"
      :visible="showTimePicker"
      @close="showTimePicker = false"
      @update:model-value="handleTimeSelectComplete"
    />

    <!-- 스터디 생성 완료 모달 -->
    <Modal :visible="showSuccessModal" @close="showSuccessModal = false">
      <template #title>🎉 스터디 생성 완료!</template>
      <div class="success-content">
        <div class="success-icon">✅</div>
        <p class="success-message">스터디가 성공적으로 생성되었습니다!</p>
        <div class="success-details">
          <p><strong>스터디명:</strong> {{ formData.studyName }}</p>
          <p><strong>기간:</strong> {{ formData.createdAt }} ~ {{ formData.endedAt }}</p>
          <p><strong>최대 인원:</strong> {{ formData.maxMembers }}명</p>
        </div>
      </div>
      <template #footer>
        <Button variant="secondary" @click="showSuccessModal = false">확인</Button>
        <Button variant="primary" @click="goToStudyList">스터디 목록으로</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStudyService } from '@/services/useStudyService'
// import { useUserStore } from '@/stores/user' // TODO: 사용자 ID를 가져오는 방법 필요
import Button from '@/components/common/Button.vue'
import PasswordInput from '@/components/common/PasswordInput.vue'
import TimePickerModal from '@/components/common/TimePickerModal.vue'
import Modal from '@/components/common/Modal.vue'
import { categoryMap, CATEGORY_IDS } from '@/constants/categoryMap'
import type { CreateStudyRequest } from '@/types/study'

const router = useRouter()
const { createStudy } = useStudyService()
// const userStore = useUserStore() // TODO: 사용자 ID를 가져오는 방법 필요

const loading = ref(false)
const profileImage = ref<string>('')
const meetingImage = `${import.meta.env.BASE_URL || '/'}images/meeting.png`
const fileInput = ref<HTMLInputElement | null>(null)
const showTimePicker = ref(false)
const currentTimePicker = ref<'start' | 'end' | null>(null)
const showSuccessModal = ref(false)

// 시간 관련 변수들
const startTime = ref<string>('')
const endTime = ref<string>('')

// 폼 데이터
const formData = reactive<CreateStudyRequest>({
  studyName: '',
  createdAt: '',
  endedAt: '',
  interestId: 0,
  hashtags: [],
  dayIds: [],
  maxMembers: 4,
  password: '',
  rule: '',
  summary: '',
  leader: 0,
  groupScore: 0,
  noticeable: true
})

// 카테고리 선택
const selectedMain = ref('')
const selectedSub = ref('')
const detailCategories = ref('')
const detailTags = ref<string[]>([])
const tagInput = ref('')

// 요일 선택
const weekDays = [
  { value: '월', label: '월' },
  { value: '화', label: '화' },
  { value: '수', label: '수' },
  { value: '목', label: '목' },
  { value: '금', label: '금' },
  { value: '토', label: '토' },
  { value: '일', label: '일' }
]
const selectedDays = ref<string[]>([])

// 카테고리 변경 감지
const updateCategory = () => {
  // 새로운 API 스펙에서는 카테고리 정보가 interestId로 변환되어 전송됨
  // 이 함수는 더 이상 필요하지 않지만 호환성을 위해 유지
}

// 시간 선택 처리
const openTimePicker = (type: 'start' | 'end') => {
  currentTimePicker.value = type
  showTimePicker.value = true
}

// 현재 시간 값 가져오기
const getCurrentTimeValue = () => {
  if (!currentTimePicker.value) return ''
  return currentTimePicker.value === 'start' ? startTime.value : endTime.value
}

// 시간 선택 완료 처리
const handleTimeSelectComplete = (time: string) => {
  if (!currentTimePicker.value) return

  if (currentTimePicker.value === 'start') {
    startTime.value = time
  } else {
    endTime.value = time
  }

  showTimePicker.value = false
  currentTimePicker.value = null
}

// 시간 표시용 computed 속성들
const startTimeDisplay = computed(() => {
  if (!startTime.value) return ''
  const hour = parseInt(startTime.value.split(':')[0])
  const ampm = hour >= 12 ? '오후' : '오전'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${ampm} ${displayHour}:00`
})

const endTimeDisplay = computed(() => {
  if (!endTime.value) return ''
  const hour = parseInt(endTime.value.split(':')[0])
  const ampm = hour >= 12 ? '오후' : '오전'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${ampm} ${displayHour}:00`
})

const totalTime = computed(() => {
  if (!startTime.value || !endTime.value) return 0

  const startHour = parseInt(startTime.value.split(':')[0])
  const endHour = parseInt(endTime.value.split(':')[0])

  let diff = endHour - startHour
  if (diff <= 0) diff += 24 // 다음날로 넘어가는 경우

  return diff
})

// 요일 토글
const toggleDay = (day: string) => {
  const index = selectedDays.value.indexOf(day)
  if (index > -1) {
    selectedDays.value.splice(index, 1)
  } else {
    selectedDays.value.push(day)
  }
  // 새로운 API 스펙에서는 dayIds 배열로 전송됨
}

// 태그 관련 함수들
const addTag = (tag: string) => {
  const trimmedTag = tag.trim()
  if (trimmedTag && !detailTags.value.includes(trimmedTag) && detailTags.value.length < 3) {
    detailTags.value.push(trimmedTag)
    updateDetailCategories()
  }
}

const removeTag = (index: number) => {
  detailTags.value.splice(index, 1)
  updateDetailCategories()
}

const handleTagInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    addTagFromInput()
  }
}

const addTagFromInput = () => {
  if (tagInput.value.trim()) {
    addTag(tagInput.value)
    tagInput.value = ''
  }
}

const updateDetailCategories = () => {
  detailCategories.value = detailTags.value.map(tag => `#${tag}`).join(' ')
  // 새로운 API 스펙에서는 hashtags 배열로 전송됨
}

// 이미지 업로드
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImage.value = e.target?.result as string
      // 새로운 API 스펙에서는 이미지 필드가 없음
    }
    reader.readAsDataURL(file)
  }
}

// 폼 제출
const handleSubmit = async () => {
  try {
    loading.value = true

    // 카테고리 업데이트
    updateCategory()

    // 유효성 검사
    if (!formData.studyName.trim()) {
      alert('스터디명을 입력해주세요.')
      return
    }

    if (!formData.password || formData.password.length !== 6) {
      alert('6자리 숫자 비밀번호를 입력해주세요.')
      return
    }

    if (selectedDays.value.length === 0) {
      alert('요일을 선택해주세요.')
      return
    }

        // 시간 설정 검증
    if (!startTime.value || !endTime.value) {
      alert('시작 시간과 종료 시간을 모두 설정해주세요.')
      return
    }

    // 시작 시간이 종료 시간보다 늦은지 확인
    const startHour = parseInt(startTime.value.split(':')[0])
    const endHour = parseInt(endTime.value.split(':')[0])
    if (startHour >= endHour) {
      alert('종료 시간은 시작 시간보다 늦어야 합니다.')
      return
    }

    // API 스펙에 맞게 데이터 변환
    const apiData = {
      studyName: formData.studyName,
      createdAt: new Date(formData.createdAt).toISOString().split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
      endedAt: new Date(formData.endedAt).toISOString().split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
      interestId: getInterestId(selectedMain.value, selectedSub.value), // 카테고리를 interestId로 변환
      hashtags: detailTags.value,
      dayIds: selectedDays.value.map(day => getDayId(day)), // 요일을 dayId로 변환
      startTime: parseInt(startTime.value.split(':')[0]), // 24시간 형식 (예: 13)
      time: totalTime.value, // 총 진행시간 (예: 7)
      maxMembers: formData.maxMembers,
      password: formData.password,
      rule: formData.rule,
      summary: formData.summary,
      leader: 0, // TODO: 백엔드에서 사용자 ID를 제공하는 방법 필요
      groupScore: 0,
      noticeable: formData.noticeable
    }

    console.log('API 요청 데이터:', apiData)

    // API 호출
    const response = await createStudy(apiData)
    console.log('스터디룸 생성 성공:', response)

    // 성공 후 생성된 스터디의 상세페이지로 이동
    const studyId = response.data.data.id
    console.log('✅ 생성된 스터디 ID:', studyId)

    // 성공 모달 표시
    showSuccessModal.value = true

  } catch (error) {
    console.error('스터디룸 생성 실패:', error)
    alert('스터디룸 생성에 실패했습니다. 다시 시도해주세요.')
  } finally {
    loading.value = false
  }
}

// 카테고리를 interestId로 변환하는 함수
const getInterestId = (main: string, sub: string): number => {
  // constants의 CATEGORY_IDS를 사용하여 interestId 반환
  const category = CATEGORY_IDS[main as keyof typeof CATEGORY_IDS]
  if (!category) return 1

  if (sub) {
    const subCat = category.subCategories[sub as keyof typeof category.subCategories] as { id: number } | undefined
    return subCat ? subCat.id : category.id
  }

  return category.id
}

// 요일을 dayId로 변환하는 함수
const getDayId = (day: string): number => {
  const dayMap: Record<string, number> = {
    '월': 1,
    '화': 2,
    '수': 3,
    '목': 4,
    '금': 5,
    '토': 6,
    '일': 7
  }
  return dayMap[day] || 1
}

// 뒤로가기
const goBack = () => {
  router.back()
}

// 스터디 목록으로 이동
const goToStudyList = () => {
  showSuccessModal.value = false
  router.replace('/study/list')
  // 페이지 새로고침으로 최신 데이터 로드
  setTimeout(() => {
    window.location.reload()
  }, 100)
}
</script>

<style scoped>
.study-create-view {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0;
}

.create-form-container {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-label {
  font-weight: 600;
  color: #343a40;
  font-size: 1rem;
}

.form-control,
.form-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 0.2rem rgba(215, 156, 148, 0.25);
}

/* 프로필 이미지 업로드 */
.profile-upload {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.profile-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e9ecef;
  flex-shrink: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-input {
  display: none;
}

.upload-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
}

/* 날짜 범위 */
.date-range {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date-input {
  flex: 1;
}

.date-separator {
  font-size: 1.2rem;
  color: #6c757d;
  font-weight: 600;
}

/* 카테고리 설정 */
.category-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.category-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sub-label {
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

/* 스케줄 설정 */
.schedule-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.schedule-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.day-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.day-btn {
  min-width: 50px;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
}

/* 시간 입력 스타일 */
.time-settings {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time-label {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.time-separator {
  font-size: 1.2rem;
  color: #6c757d;
  font-weight: 600;
  margin-top: 1.5rem;
}

.time-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.time-input {
  padding-right: 3rem;
  cursor: pointer;
}

.time-picker-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.time-picker-btn:hover {
  background-color: #f8f9fa;
}

.total-time-display {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #e8f5e8;
  border-radius: 0.5rem;
  color: #2d5a2d;
  font-weight: 600;
  text-align: center;
}



/* 텍스트 영역 */
textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

/* 비밀번호 안내문 */
.password-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border-left: 3px solid #d79c94;
  margin-top: 0.5rem;
}

.notice-icon {
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.notice-text {
  font-size: 0.78rem;
  color: #6c757d;
  line-height: 1.4;
  font-weight: 400;
  margin-top: 0.45rem;
}

/* 태그 입력 스타일 */
.tag-input-container {
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  padding: 0.75rem;
  min-height: 3rem;
  background: white;
  transition: all 0.3s ease;
}

.tag-input-container:focus-within {
  border-color: #d79c94;
  box-shadow: 0 0 0 0.2rem rgba(215, 156, 148, 0.25);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #d79c94 0%, #c88a82 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  animation: tagSlideIn 0.3s ease;
}

.tag-text {
  white-space: nowrap;
}

.tag-remove-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.tag-remove-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tag-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  width: 100%;
  padding: 0;
}

.tag-input:disabled {
  color: #6c757d;
  cursor: not-allowed;
}

@keyframes tagSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 폼 액션 */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.cancel-btn,
.submit-btn {
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
}

.submit-btn {
  background-color: #d79c94;
  border-color: #d79c94;
}

.submit-btn:hover {
  background-color: #c88a82;
  border-color: #c88a82;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }

  .create-form-container {
    padding: 2rem 1.5rem;
  }

  .title {
    font-size: 2rem;
  }

  .profile-upload {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .date-range {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-actions {
    flex-direction: column;
  }
}

/* 성공 모달 스타일 */
.success-content {
  text-align: center;
  padding: 1rem 0;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 1s ease-in-out;
}

.success-message {
  font-size: 1.2rem;
  font-weight: 600;
  color: #28a745;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.success-details {
  text-align: left;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 0;
  border-left: 4px solid #28a745;
}

.success-details p {
  margin-bottom: 0.5rem;
  color: #495057;
  font-size: 0.95rem;
  line-height: 1.4;
}

.success-details p:last-child {
  margin-bottom: 0;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
