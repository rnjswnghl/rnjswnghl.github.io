<!-- src/views/Study/StudyDetailTeamMateView.vue -->
<template>
  <div class="study-detail-teammate-view">
    <div class="container">
      <!-- 로딩 상태 -->
      <div v-if="loading" class="loading-section">
        <div class="loading-spinner"></div>
        <p>스터디 정보를 불러오는 중...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="error-section">
        <div class="error-card">
          <h3>스터디 정보를 불러올 수 없습니다</h3>
          <p>{{ error }}</p>
          <Button variant="primary" @click="goToMyStudy">내 스터디로 돌아가기</Button>
        </div>
      </div>

      <!-- 스터디 상세 정보 -->
      <div v-else-if="study" class="study-detail-section">
        <div class="study-card">
          <!-- 탭 네비게이션 -->
          <div class="tab-navigation">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="['tab-button', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="study-content">
            <!-- 왼쪽 패널: 스터디 정보 -->
            <div class="study-info-panel">
              <div class="study-image-section">
                <img
                  :src="study.imageUrl || defaultMeetingImg"
                  :alt="study.name"
                  class="study-image"
                />
              </div>

              <div class="study-info">
                <h1 class="study-title">{{ study.name }}</h1>

                <div class="study-meta">
                  <div class="meta-item">
                    <span class="meta-label">스터디장</span>
                    <span class="meta-value">{{ study.leader?.nickname || '미정' }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">스터디 인원 수</span>
                    <span class="meta-value">{{ study.currentMembers }}/{{ study.maxMembers }}명</span>
                  </div>
                </div>

                <div class="study-rules">
                  <h3>스터디 규칙</h3>
                  <div class="rules-content">
                    <p v-if="(study as any).rule">{{ (study as any).rule }}</p>
                    <p v-else class="no-rules">등록된 규칙이 없습니다.</p>
                  </div>
                </div>

                <div class="study-schedule">
                  <h3>스터디 일정</h3>
                  <p>{{ study.day_of_week }} {{ formatStudyTime(study) }}</p>
                  <p class="study-period">{{ study.created_at }} ~ {{ study.ended_at }}</p>
                </div>

                <div class="study-summary" v-if="(study as any).summary">
                  <h3>스터디 소개</h3>
                  <p>{{ (study as any).summary }}</p>
                </div>

                <!-- 멤버 목록 (리더 우선, 중복 제거) -->
                <div class="study-members">
                  <h3>스터디 멤버</h3>
                  <div class="members-list">
                    <div
                      v-for="member in sortedMembers"
                      :key="member.id"
                      class="member-item"
                      :class="{ leader: member.leader }"
                    >
                      <div class="member-avatar">
                        <img
                          :src="member.profile_img || defaultMeetingImg"
                          :alt="member.nickname"
                        />
                      </div>
                      <div class="member-info">
                        <span class="member-name">{{ member.nickname }}</span>
                        <span v-if="member.leader" class="member-role">스터디장</span>
                      </div>
                    </div>

                    <div v-if="sortedMembers.length === 0" class="no-members">
                      <p>아직 다른 멤버가 없습니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 오른쪽 패널: 탭 콘텐츠 -->
            <div class="tab-content-panel">
              <!-- 공지사항 탭 -->
              <div v-if="activeTab === 'notice'" class="tab-content">
                <NoticeTab :is-leader="false" :study-id="study?.id || 0" />
              </div>

              <!-- 다운로드 탭 -->
              <div v-if="activeTab === 'download'" class="tab-content">
                <DownloadTab :is-leader="false" :study-id="study?.id || 0" />
              </div>

              <!-- 게시판 탭 -->
              <div v-if="activeTab === 'board'" class="tab-content">
                <BoardTab :is-leader="false" :study-id="study?.id || 0" :current-user-id="1" />
              </div>

              <!-- 멤버 탭 -->
              <div v-if="activeTab === 'members'" class="tab-content">
                <MemberTab :study-id="study?.id || 0" :is-leader="false" />
              </div>
            </div>
          </div>

          <!-- 하단 액션 버튼 -->
          <div class="study-actions">
            <Button variant="primary" size="lg" @click="joinStudyRoom">
              지금 바로 스터디 참여
            </Button>
            <Button variant="outline" size="lg" @click="withdrawFromStudy">
              스터디 탈퇴
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 탈퇴 확인 모달 -->
    <Modal :visible="showWithdrawModal" @close="showWithdrawModal = false">
      <template #title>스터디 탈퇴</template>
      <div class="modal-content">
        <p>정말로 이 스터디에서 탈퇴하시겠습니까?</p>
        <p>탈퇴 후에는 다시 가입해야 합니다.</p>
        <div class="modal-actions">
          <Button variant="danger" @click="confirmWithdraw">탈퇴하기</Button>
          <Button variant="outline" @click="showWithdrawModal = false">취소</Button>
        </div>
      </div>
    </Modal>

    <!-- 스터디룸 비밀번호 입력 모달 -->
    <StudyPasswordModal
      v-if="showPasswordModal"
      :study-id="study?.id || 0"
      :study-name="study?.name || ''"
      @close="showPasswordModal = false"
      @success="handlePasswordSuccess"
    />

    <!-- 출석 퀴즈 모달 -->
   <AttendanceQuizModal
  v-if="showQuizModal && study"
  :study-id="study.id"
  :study-name="study.name"
  :category="study.category || 'IT'"
  :is-leader="false"
  :group-id="study.id"
  @close="showQuizModal = false"
  @complete="handleQuizComplete"
/>

    <!-- 알림 모달 -->
    <Modal :visible="showAlertModal" @close="showAlertModal = false">
      <template #title>{{ alertTitle }}</template>
      <p>{{ alertMessage }}</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const defaultMeetingImg = `${import.meta.env.BASE_URL || '/'}images/meeting.png`
import { useStudyService } from '@/services/useStudyService'
import { leaveStudy } from '@/api/study'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import StudyPasswordModal from '@/components/study/StudyPasswordModal.vue'
import AttendanceQuizModal from '@/components/study/AttendanceQuizModal.vue'
import NoticeTab from '@/components/study/NoticeTab.vue'
import DownloadTab from '@/components/study/DownloadTab.vue'
import BoardTab from '@/components/study/BoardTab.vue'
import MemberTab from '@/components/study/MemberTab.vue'
import type { StudyDetail } from '@/types/study'

const route = useRoute()
const router = useRouter()
const { getStudyDetail } = useStudyService()

const loading = ref(true)
const error = ref<string | null>(null)
const study = ref<StudyDetail | null>(null)
const activeTab = ref('notice')
const showWithdrawModal = ref(false)
const showPasswordModal = ref(false)
const showQuizModal = ref(false)
const showAlertModal = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

// 알림 표시 함수
function showAlert(title: string, message: string) {
  alertTitle.value = title
  alertMessage.value = message
  showAlertModal.value = true
}

// 탭 정의
const tabs = [
  { id: 'notice', label: '공지사항' },
  { id: 'download', label: '다운로드' },
  { id: 'board', label: '게시판' },
  { id: 'members', label: '팀원' }
]

interface Member {
  id: number
  nickname: string
  profile_img?: string | null
  leader?: boolean
}

/** 리더 우선 + 중복 제거 */
const sortedMembers = computed<Member[]>(() => {
  if (!study.value?.members) return []
  const seen = new Set<number>()
  const unique: Member[] = []
  for (const m of study.value.members) {
    if (!m || typeof m.id !== 'number') continue
    if (seen.has(m.id)) continue
    seen.add(m.id)
    unique.push(m)
  }
  return unique.sort((a, b) => {
    if (a.leader && !b.leader) return -1
    if (!a.leader && b.leader) return 1
    return 0
  })
})

onMounted(async () => {
  await loadStudyDetail()
})

async function loadStudyDetail() {
  try {
    loading.value = true
    error.value = null

    const studyId = parseInt(route.params.id as string)
    if (isNaN(studyId)) {
      throw new Error('잘못된 스터디 ID입니다.')
    }

    const response = await getStudyDetail(studyId)
    const apiData = (response.data as any).data || (response.data as any)

    study.value = {
      id: apiData.id,
      name: apiData.studyName || apiData.name,
      category: apiData.interestName || apiData.category,
      created_at: apiData.createdAt || apiData.created_at,
      ended_at: apiData.endedAt || apiData.ended_at,
      day_of_week: apiData.scheduleDays ? apiData.scheduleDays.join(', ') : apiData.day_of_week,
      time: apiData.time || 0,
      summary: apiData.summary,
      currentMembers: apiData.currentMembers,
      maxMembers: apiData.maxMembers,
      rule: apiData.rule,
      rules: apiData.rule,
      notice_able: apiData.notice_able || false,
      leader: apiData.members ? {
        id: apiData.members.find((m: any) => m.leader)?.userId || 0,
        nickname: apiData.members.find((m: any) => m.leader)?.nickname || '',
        profile_img: apiData.members.find((m: any) => m.leader)?.profileImg || defaultMeetingImg
      } : {
        id: 0,
        nickname: '',
        profile_img: defaultMeetingImg
      },
      members: apiData.members ? apiData.members.map((m: any) => ({
        id: m.userId || m.id,
        nickname: m.nickname,
        profile_img: m.profileImg || m.profile_img || defaultMeetingImg,
        leader: m.leader
      })) : []
    } as any
  } catch (err: unknown) {
    console.error('[스터디 상세 정보 로드 실패]', err)
    const errorMessage = err instanceof Error ? err.message : '스터디 정보를 불러올 수 없습니다.'
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}

function formatStudyTime(study: any): string {
  // 백엔드에서 startTime과 time을 받아서 시간 범위로 표시
  if (study.startTime !== null && study.startTime !== undefined && study.time !== null && study.time !== undefined) {
    const startHour = study.startTime
    const endHour = (startHour + study.time) % 24

    const startAmpm = startHour >= 12 ? '오후' : '오전'
    const startDisplayHour = startHour > 12 ? startHour - 12 : startHour === 0 ? 12 : startHour

    const endAmpm = endHour >= 12 ? '오후' : '오전'
    const endDisplayHour = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour

    return `${startAmpm} ${startDisplayHour}:00 ~ ${endAmpm} ${endDisplayHour}:00 (${study.time}시간)`
  }

  // startTime만 있고 time이 없는 경우 - 깔끔하게 오전/오후만 표시
  if (study.startTime !== null && study.startTime !== undefined) {
    const startHour = study.startTime
    const startAmpm = startHour >= 12 ? '오후' : '오전'
    return `${startAmpm} (${study.time || 0}시간)`
  }

  // time만 있는 경우
  if (study.time !== null && study.time !== undefined) {
    return `${study.time}시간`
  }

  return '시간 미설정'
}

// ✅ groupId 해석: studyId를 그대로 사용 (FM_ prefix 제거)
function resolveGroupId(): string {
  console.log('🔍 resolveGroupId 호출:', {
    studyValue: study.value,
    studyId: study.value?.id,
    studyIdType: typeof study.value?.id
  })

  if (study.value?.id !== undefined && study.value?.id !== null) {
    const result = String(study.value.id)
    console.log('✅ resolveGroupId 결과:', result)
    return result
  }

  console.log('❌ resolveGroupId 실패: study.value 또는 study.value.id가 없음')
  return ''
}

async function joinStudyRoom() {
  try {
    if (!study.value) return
    // 비밀번호 입력 모달 표시
    showPasswordModal.value = true
  } catch (err: unknown) {
    console.error('[스터디룸 입장 실패]', err)
    alert('스터디룸 입장에 실패했습니다.')
  }
}

function withdrawFromStudy() {
  showWithdrawModal.value = true
}

async function confirmWithdraw() {
  if (!study.value?.id) return

  try {
    console.log('스터디 탈퇴 시작:', study.value.id)

    // API 호출
    await leaveStudy(study.value.id)

    console.log('스터디 탈퇴 성공:', study.value.id)
    showWithdrawModal.value = false

    // 성공 메시지 표시
    showAlert('성공', '스터디에서 성공적으로 탈퇴되었습니다.')

    // 마이페이지로 이동
    router.push('/mypage/study')
  } catch (err) {
    console.error('스터디 탈퇴 실패:', err)
    showAlert('오류', '스터디 탈퇴에 실패했습니다. 다시 시도해주세요.')
  }
}

function handlePasswordSuccess(_password: string) {
  showPasswordModal.value = false
  showQuizModal.value = true
}

// ✅ 퀴즈 완료 → 프리조인으로만 이동 (역할 판단은 프리조인에서 자동)
function handleQuizComplete(isLeader: boolean) {
  showQuizModal.value = false
  console.log('🔍 handleQuizComplete - isLeader:', isLeader, 'groupId:', study.value?.id)
  router.push({
    name: 'StudyPrejoin',
    params: { groupId: study.value?.id },
    query: { isLeader: String(isLeader) }
  })
}

function goToMyStudy() {
  router.push('/mypage/study')
}

</script>

<style scoped>
.study-detail-teammate-view {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 로딩 섹션 */
.loading-section {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #d79c94;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 에러 섹션 */
.error-section {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.error-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.error-card h3 { color: #dc3545; margin-bottom: 1rem; }
.error-card p  { color: #6c757d; margin-bottom: 1.5rem; }

/* 스터디 상세 섹션 */
.study-detail-section {
  display: flex;
  justify-content: center;
}

.study-card {
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 1100px;
  width: 100%;
}

/* 탭 네비게이션 */
.tab-navigation {
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.tab-button {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.5rem 0.5rem 0 0;
  margin: 0.5rem 0.25rem 0 0.25rem;
}
.tab-button.active { background-color: #d79c94; color: white; }
.tab-button:hover:not(.active) { background-color: #e9ecef; color: #495057; }

/* 스터디 콘텐츠 (2열 고정, 작은 화면만 1열) */
.study-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: 600px;
}

/* 왼쪽 패널 */
.study-info-panel {
  background-color: #fef7f7;
  padding: 2rem;
  border-right: 1px solid #e9ecef;
}

.study-image-section {
  margin-bottom: 2rem;
}

.study-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
}

.study-info h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1.5rem;
}

.study-meta {
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.meta-label {
  font-weight: 600;
  color: #495057;
}

.meta-value {
  color: #212529;
}

.study-intro, .study-rules, .study-schedule, .study-summary {
  margin-bottom: 2rem;
}

.study-intro h3, .study-rules h3, .study-schedule h3, .study-summary h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
}

.study-intro p, .study-schedule p, .study-summary p {
  color: #495057;
  line-height: 1.6;
}

.study-period {
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* 멤버 */
.study-members {
  margin-bottom: 2rem;
}

.study-members h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
}

.member-item.leader {
  background-color: #fff3cd;
  border-color: #ffeaa7;
}

.member-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.member-name {
  font-weight: 600;
  color: #212529;
}

.member-role {
  font-size: 0.85rem;
  color: #d79c94;
  font-weight: 600;
}

.no-members {
  padding: 1rem 0;
  color: #6c757d;
  text-align: center;
}

/* 오른쪽 패널 */
.tab-content-panel {
  padding: 2rem;
  background-color: #f8f9fa;
}

/* 하단 액션 버튼 */
.study-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
  border-top: 1px solid #e9ecef;
  background-color: white;
}

/* 모달 스타일 */
.modal-content { padding: 1rem 0; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #212529; }
.form-control { width: 100%; padding: 0.75rem; border: 1px solid #e9ecef; border-radius: 0.5rem; font-size: 1rem; }
.form-control:focus { outline: none; border-color: #d79c94; box-shadow: 0 0 0 0.2rem rgba(215, 156, 148, 0.25); }
.file-upload-area { text-align: center; padding: 2rem; border: 2px dashed #e9ecef; border-radius: 0.5rem; margin-top: 1rem; }
.modal-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; }

/* 반응형: 정말 작을 때만 1열 */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }

  .study-content {
    grid-template-columns: 1fr;
  }

  .study-info-panel {
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }

  .tab-navigation {
    flex-direction: column;
  }

  .tab-button {
    margin: 0.25rem 0;
    border-radius: 0.5rem;
  }

  .study-actions {
    flex-direction: column;
  }
}
</style>
