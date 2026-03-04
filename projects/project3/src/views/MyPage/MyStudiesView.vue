<template>
  <div class="mypage-container">
    <!-- 탭 네비 -->
    <nav class="tabs">
      <RouterLink to="/mypage" :class="{ 'active-tab': $route.path === '/mypage' }">내 프로필</RouterLink>
      <RouterLink to="/mystudy" :class="{ 'active-tab': $route.path === '/mystudy' }">스터디 현황</RouterLink>
      <RouterLink to="/mypage/log" :class="{ 'active-tab': $route.path === '/mypage/log' }">활동 로그</RouterLink>
    </nav>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading-section">
      <div class="loading-spinner"></div>
      <p>스터디 현황을 불러오는 중...</p>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="error-section">
      <div class="error-card">
        <h3>스터디 현황을 불러올 수 없습니다</h3>
        <p>{{ error }}</p>
        <button @click="fetchStudyStatus" class="retry-btn">다시 시도</button>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <div v-else class="study-status-content">
      <!-- 타이틀 -->
      <h2>{{ user?.nickname || '사용자' }}님의 스터디 현황</h2>

      <!-- 공통 섹션: 나의 다짐 + D-day -->
      <div class="common-section">
        <div class="common-grid">
          <!-- 나의 다짐 -->
          <section class="status-section">
            <label class="section-label">나의 다짐</label>
            <div class="commitment-container">
              <div class="commitment-actions">
                <button class="goal-btn" @click="saveCommitmentToServer">
                  💪 다짐 저장
                </button>
              </div>

              <div class="commitment-description">
                <textarea
                  v-model="commitmentInput"
                  placeholder="나의 다짐을 입력해주세요 (예: 매일 2시간 공부하기, 시험 합격하기, 프로젝트 완성하기 등)"
                  class="commitment-textarea"
                  rows="2"
                  @input="saveCommitmentToStorage"
                ></textarea>
              </div>

              <div v-if="commitment" class="commitment-display">
                <div class="commitment-icon">📌</div>
                <div class="commitment-content">
                  <div class="commitment-title">나의 다짐</div>
                  <div class="commitment-text">{{ commitment }}</div>
                </div>
              </div>
              <div v-else class="commitment-placeholder">
                목표를 설정해주세요
              </div>
            </div>
          </section>

          <!-- D-day 설정 -->
          <section class="status-section">
            <label class="section-label">D - day</label>
            <div class="dday-container">
              <div class="dday-actions">
                <VueDatePicker
                  v-model="selectedDate"
                  ref="datePickerRef"
                  :enable-time-picker="false"
                  :format="'yyyy.MM.dd'"
                  placeholder="날짜 선택"
                  :hide-input-icon="true"
                  @update:model-value="onDateChange"
                >
                  <template #trigger>
                    <button class="calendar-btn" @click="openCalendar">
                      📅 날짜 설정
                    </button>
                  </template>
                </VueDatePicker>
              </div>

              <div class="dday-description">
                <textarea
                  v-model="ddayDescription"
                  placeholder="이 날짜가 무엇을 위한 D-day인지 간단히 설명해주세요 (예: 시험, 프로젝트 마감, 자격증 시험 등)"
                  class="dday-textarea"
                  rows="2"
                  @input="saveDdayToStorage"
                ></textarea>
              </div>

              <div v-if="selectedDate" class="dday-display">
                <div class="dday-number">{{ dDay }}</div>
                <div class="dday-text">일 남았습니다</div>
              </div>
              <div v-else class="dday-placeholder">
                목표 날짜를 설정해주세요
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- 스터디별 통계 섹션 -->
      <div class="study-stats-section">
        <h3 class="stats-title">스터디별 학습 현황</h3>

        <!-- 스터디 선택 드롭다운 -->
        <div class="study-selector">
          <label for="study-select" class="study-select-label">스터디 선택:</label>
          <select
            id="study-select"
            v-model="selectedStudyId"
            @change="onStudyChange"
            class="study-select"
          >
            <option value="all">전체 스터디</option>
            <option
              v-for="study in userStudies"
              :key="study.id"
              :value="study.id"
            >
              {{ study.name }} ({{ study.role === 'leader' ? '스터디장' : '멤버' }})
            </option>
          </select>
        </div>

        <!-- 선택된 스터디 정보 -->
        <div v-if="selectedStudy" class="selected-study-info">
          <h4>📈 {{ selectedStudy.name }}</h4>
          <p class="study-role">{{ selectedStudy.role === 'leader' ? '스터디장' : '멤버' }}</p>
        </div>

        <!-- 스터디 통계 그리드 -->
        <div class="study-stats-grid">
          <!-- 학습 달성률 -->
          <section class="stats-section">
            <label class="stats-label">학습 달성률</label>
            <div class="study-progress-box">
              <div class="progress-content">
                <div class="circle-graph">
                  <DoughnutChart :value="studyProgress" />
                </div>
                <div class="progress-text">
                  <p class="progress-title">스터디 학습 달성률</p>
                  <p class="progress-percent">{{ studyProgress }}%</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 주간 활동 -->
          <section class="stats-section">
            <label class="stats-label">주간 활동</label>
            <div class="weekly-study-box">
              <div class="weekly-study-header">
                <span class="date-range">&lt;{{ currentWeekRange }}&gt;</span>
              </div>
              <BarChart :labels="weekLabels" :data="weeklyStudyTime" />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import 'chart.js/auto'
import DoughnutChart from '@/components/mypage/DoughnutChart.vue'
import BarChart from '@/components/mypage/BarChart.vue'


const userStore = useUserStore()

// 로딩 상태
const loading = ref(false)
const error = ref<string | null>(null)

// 나의 다짐
const commitment = ref('')
const commitmentInput = ref('')
const editingCommitment = ref(false)

// D-day
const selectedDate = ref<Date | null>(null)
const dDay = ref('')
const datePickerRef = ref<any>(null)

// D-day 설명
const ddayDescription = ref('')

// 로컬스토리지 키
const DDAY_STORAGE_KEY = 'user_dday'
const DDAY_DESC_STORAGE_KEY = 'user_dday_description'
const COMMITMENT_STORAGE_KEY = 'user_commitment'

// 주간 스터디 차트
const weekLabels = ['월', '화', '수', '목', '금', '토', '일']
const weeklyStudyTime = ref([0, 0, 0, 0, 0, 0, 0])

// 스터디 진행률 관련
const targetStudyTime = ref(60) // 목표 스터디 시간 (분)
const actualStudyTime = ref(0) // 실제 참여한 시간 (분)

// 사용자 정보
const user = computed(() => userStore.user)

// 스터디 관련 상태
const selectedStudyId = ref('all')
const userStudies = computed(() => user.value?.studies || [])

// 선택된 스터디 정보
const selectedStudy = computed(() => {
  if (selectedStudyId.value === 'all') return null
  return userStudies.value.find(study => study.id === Number(selectedStudyId.value))
})

// 현재 주 범위 계산
const currentWeekRange = computed(() => {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  return `${startOfWeek.getFullYear()}.${String(startOfWeek.getMonth() + 1).padStart(2, '0')}.${String(startOfWeek.getDate()).padStart(2, '0')} ~ ${endOfWeek.getFullYear()}.${String(endOfWeek.getMonth() + 1).padStart(2, '0')}.${String(endOfWeek.getDate()).padStart(2, '0')}`
})

// 스터디 진행률 계산 (선택된 스터디에 따라)
const studyProgress = computed(() => {
  if (targetStudyTime.value === 0) return 0
  const percent = (actualStudyTime.value / targetStudyTime.value) * 100
  return Math.min(100, Math.round(percent))
})

// 스터디 변경 핸들러
function onStudyChange() {
  console.log('📈 선택된 스터디 변경:', selectedStudyId.value)
  // 선택된 스터디에 따라 데이터 다시 로드
  fetchStudyStatus()
}

// API 호출 함수들
import { getStudyStatus, updateGoal, updateDday } from '@/api/user'

async function fetchStudyStatus() {
  try {
    loading.value = true
    error.value = null

    const studyId = selectedStudyId.value === 'all' ? null : Number(selectedStudyId.value)

    // 백엔드 API 호출 (axios)
    const { data } = await getStudyStatus(studyId ?? undefined)
    console.log('🔍 스터디 현황 데이터:', data)

    // 데이터 설정
    commitment.value = data.commitment || ''
    commitmentInput.value = data.commitment || ''

    // 디데이 데이터 설정
    if (data.d_day) {
      selectedDate.value = new Date(data.d_day)
      console.log('✅ 디데이 날짜 로드:', selectedDate.value)
    } else {
      selectedDate.value = null
    }

    ddayDescription.value = data.ddayDescription || ''
    targetStudyTime.value = data.targetStudyTime || 60
    actualStudyTime.value = data.actualStudyTime || 0
    weeklyStudyTime.value = data.weeklyStudyTime || [0, 0, 0, 0, 0, 0, 0]

    // D-day 계산
    if (selectedDate.value) {
      calculateDDay()
    }

    // 로컬스토리지에서 데이터 로드 (서버 데이터가 없을 경우 대비)
    loadDdayFromStorage()
    loadCommitmentFromStorage()

  } catch (err) {
    console.error('❌ 스터디 현황 조회 실패:', err)
    error.value = '스터디 현황을 불러오는데 실패했습니다.'
  } finally {
    loading.value = false
  }
}

async function saveCommitmentToServer() {
  try {
    if (!commitmentInput.value.trim()) {
      console.warn('⚠️ 다짐 내용이 없습니다.')
      return
    }

    const studyId = selectedStudyId.value === 'all' ? null : Number(selectedStudyId.value)

    // 백엔드 API 호출
    const payload: any = { goal: commitmentInput.value }
    if (studyId) {
      payload.studyId = studyId
    }

    const response = await updateGoal(payload)
    if (response.status === 200) {
      commitment.value = commitmentInput.value
      editingCommitment.value = false

      // 로컬스토리지에도 저장
      saveCommitmentToStorage()
      console.log('✅ 다짐이 저장되었습니다.')
    } else {
      throw new Error('다짐 저장에 실패했습니다.')
    }

  } catch (err) {
    console.error('❌ 다짐 저장 실패:', err)
    error.value = '다짐 저장에 실패했습니다.'
  }
}

// 로컬스토리지에서 다짐 데이터 로드
function loadCommitmentFromStorage() {
  try {
    const storedCommitment = localStorage.getItem(COMMITMENT_STORAGE_KEY)
    if (storedCommitment) {
      commitment.value = storedCommitment
      commitmentInput.value = storedCommitment
      console.log('📱 로컬스토리지에서 다짐 로드:', storedCommitment)
    }
  } catch (err) {
    console.error('❌ 로컬스토리지에서 다짐 로드 실패:', err)
  }
}

// 로컬스토리지에 다짐 데이터 저장
function saveCommitmentToStorage() {
  try {
    if (commitmentInput.value.trim()) {
      localStorage.setItem(COMMITMENT_STORAGE_KEY, commitmentInput.value)
      console.log('💾 로컬스토리지에 다짐 저장:', commitmentInput.value)
    }
  } catch (err) {
    console.error('❌ 로컬스토리지에 다짐 저장 실패:', err)
  }
}

async function saveTargetDateToServer() {
  try {
    if (!selectedDate.value) {
      console.warn('⚠️ 선택된 날짜가 없습니다.')
      return
    }

    // 날짜를 YYYY-MM-DD 형식으로 변환
    const dateString = selectedDate.value.toISOString().split('T')[0]
    console.log('🔍 디데이 설정 데이터:', { selectedDate: selectedDate.value, dateString })

    // 백엔드 API 호출
    const response = await updateDday({ d_day: dateString })
    console.log('✅ 디데이 설정 API 응답:', response)

    if (response.status === 200) {
      calculateDDay()
      // 로컬스토리지에도 저장
      saveDdayToStorage()
      console.log('✅ 목표 날짜가 저장되었습니다.')
    } else {
      throw new Error('목표 날짜 저장에 실패했습니다.')
    }

  } catch (err) {
    console.error('❌ 목표 날짜 저장 실패:', err)
    error.value = '목표 날짜 저장에 실패했습니다.'
  }
}

function openCalendar() {
  datePickerRef.value?.open?.()
}

function calculateDDay() {
  if (!selectedDate.value) return
  const today = new Date()
  const target = new Date(selectedDate.value)
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  dDay.value = diff > 0 ? diff.toString() : '0'
}

// 날짜 선택 시 자동 저장
function onDateChange() {
  if (selectedDate.value) {
    saveTargetDateToServer()
  }
}

// 로컬스토리지에서 디데이 데이터 로드
function loadDdayFromStorage() {
  try {
    const storedDate = localStorage.getItem(DDAY_STORAGE_KEY)
    const storedDescription = localStorage.getItem(DDAY_DESC_STORAGE_KEY)

    if (storedDate) {
      selectedDate.value = new Date(storedDate)
      console.log('📱 로컬스토리지에서 디데이 날짜 로드:', selectedDate.value)
      calculateDDay()
    }

    if (storedDescription) {
      ddayDescription.value = storedDescription
      console.log('📱 로컬스토리지에서 디데이 설명 로드:', ddayDescription.value)
    }
  } catch (err) {
    console.error('❌ 로컬스토리지에서 디데이 로드 실패:', err)
  }
}

// 로컬스토리지에 디데이 데이터 저장
function saveDdayToStorage() {
  try {
    if (selectedDate.value) {
      localStorage.setItem(DDAY_STORAGE_KEY, selectedDate.value.toISOString())
      console.log('💾 로컬스토리지에 디데이 날짜 저장:', selectedDate.value)
    }

    if (ddayDescription.value.trim()) {
      localStorage.setItem(DDAY_DESC_STORAGE_KEY, ddayDescription.value)
      console.log('💾 로컬스토리지에 디데이 설명 저장:', ddayDescription.value)
    }
  } catch (err) {
    console.error('❌ 로컬스토리지에 디데이 저장 실패:', err)
  }
}

// 디데이 설명 저장
async function saveDdayDescription() {
  try {
    if (!ddayDescription.value.trim()) {
      console.warn('⚠️ 디데이 설명이 없습니다.')
      return
    }

    console.log('🔍 디데이 설명 저장:', ddayDescription.value)
    // TODO: 디데이 설명 저장 API가 있다면 여기에 추가
    console.log('✅ 디데이 설명이 저장되었습니다.')

    // 로컬스토리지에도 저장
    saveDdayToStorage()
  } catch (err) {
    console.error('❌ 디데이 설명 저장 실패:', err)
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  // 사용자 정보 로드 (스터디 정보 포함)
  await userStore.fetchUser()
  // 스터디 현황 로드
  fetchStudyStatus()
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

/* 로딩 및 에러 상태 */
.loading-section,
.error-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #d79c94;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
}

.retry-btn {
  background: #d79c94;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #c88a82;
  transform: translateY(-1px);
}

/* 메인 콘텐츠 */
.study-status-content {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e9ecef;
}

.study-status-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

/* 공통 섹션 */
.common-section {
  margin-bottom: 2rem;
}

.common-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* 스터디 통계 섹션 */
.study-stats-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.stats-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.study-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
}

.stats-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.stats-label {
  display: block;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* 그리드 레이아웃 */
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 섹션 공통 스타일 */
.status-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  display: block;
  position: relative;
}

.section-label::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 30px;
  height: 2px;
  background: #d79c94;
  border-radius: 1px;
}

/* 나의 다짐 */
.commitment-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.commitment-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5rem;
}

.goal-btn {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: #d79c94;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.goal-btn:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.commitment-description {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.commitment-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #495057;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 60px;
}

.commitment-textarea:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
}

.commitment-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid #ffeaa7;
}

.commitment-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.commitment-content {
  flex: 1;
}

.commitment-title {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.commitment-text {
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  line-height: 1.4;
}

.commitment-placeholder {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px dashed #e9ecef;
  color: #6c757d;
  font-size: 0.95rem;
  text-align: center;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* D-day */
.dday-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.dday-description {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.dday-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #495057;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 60px;
}

.dday-textarea:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
}

.dday-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid #bbdefb;
}

.dday-number {
  font-size: 1.5rem;
  font-weight: 700;
}

.dday-text {
  font-size: 0.9rem;
  color: #6c757d;
}

.dday-placeholder {
  background: #f8f9fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px dashed #e9ecef;
  color: #6c757d;
  font-size: 0.95rem;
  text-align: center;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dday-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.calendar-btn {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: #d79c94;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.calendar-btn:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

/* 학습 진행률 */
.study-progress-box {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  height: 200px;
  display: flex;
  flex-direction: column;
}

.progress-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.progress-text {
  flex: 1;
}

.progress-title {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.progress-percent {
  font-size: 2rem;
  font-weight: 700;
  color: #d79c94;
  margin: 0;
}

/* 오늘의 스터디 */
.today-study-box {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  height: 200px;
  display: flex;
  flex-direction: column;
}

.today-study-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.circle-graph {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
}

.study-status-text {
  flex: 1;
}

.study-title {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.study-percent {
  font-size: 2rem;
  font-weight: 700;
  color: #d79c94;
  margin: 0;
}

/* 주간 스터디 */
.weekly-study-box {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  height: 200px;
  display: flex;
  flex-direction: column;
}

.weekly-study-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.date-range {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

/* 차트 컨테이너 */
.weekly-study-box > div:last-child {
  flex: 1;
  min-height: 0;
}

/* 스터디 선택기 스타일 */
.study-selector {
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.study-select-label {
  display: block;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.study-select {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #495057;
  transition: border-color 0.2s ease;
}

.study-select:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 3px rgba(215, 156, 148, 0.1);
}

.selected-study-info {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #d79c94;
  border-radius: 12px;
  color: white;
  text-align: center;
}

.selected-study-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.study-role {
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
}

/* 반응형 */
@media (max-width: 768px) {
  .mypage-container {
    margin: 1rem;
    padding: 1.5rem;
    border-radius: 20px;
  }

  .study-status-content {
    padding: 1rem;
  }

  .status-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .tabs {
    gap: 1rem;
  }

  .tabs a {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .today-study-content {
    flex-direction: column;
    text-align: center;
  }

  .weekly-study-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>
