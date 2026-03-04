<!-- src/views/Study/StudyDetailLeaderView.vue -->
<template>
  <div class="study-detail-leader-view">
    <div class="container">
      <div v-if="loading" class="loading-section">
        <div class="loading-spinner"></div>
        <p>스터디 정보를 불러오는 중...</p>
      </div>

      <div v-else-if="error" class="error-section">
        <div class="error-card">
          <h3>스터디 정보를 불러올 수 없습니다</h3>
          <p>{{ error }}</p>
          <Button variant="primary" @click="goToMyStudy">내 스터디로 돌아가기</Button>
        </div>
      </div>

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
                <img :src="study.imageUrl || defaultMeetingImg" :alt="study.name" class="study-image" />
                <Button variant="outline" size="sm" class="edit-image-btn" @click="showImageEditModal = true">
                  ✏️ 이미지 수정
                </Button>
              </div>

              <div class="study-info">
                <div class="study-header">
                  <h1 class="study-title">{{ study.name }}</h1>
                  <Button variant="outline" size="sm" @click="showEditModal = true">
                    ✏️ 수정
                  </Button>
                </div>

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

                <!-- 멤버 관리 섹션 -->
                <div class="member-management">
                  <h3>멤버</h3>
                  <div class="members-list">
                    <!-- 모든 멤버를 리더 우선으로 정렬하여 표시 -->
                    <div
                      v-for="member in sortedMembers"
                      :key="member.id"
                      class="member-item"
                      :class="{ leader: member.leader }"
                    >
                      <div class="member-avatar">
                        <img :src="member.profile_img || defaultMeetingImg" :alt="member.nickname" />
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
                <NoticeTab :is-leader="true" :study-id="study?.id || 0" />
              </div>

              <!-- 다운로드 탭 -->
              <div v-if="activeTab === 'download'" class="tab-content">
                <DownloadTab :is-leader="true" :study-id="study?.id || 0" />
              </div>

              <!-- 게시판 탭 -->
              <div v-if="activeTab === 'board'" class="tab-content">
                <BoardTab :is-leader="true" :study-id="study?.id || 0" :current-user-id="1" />
              </div>

              <!-- 멤버 관리 탭 -->
              <div v-if="activeTab === 'members'" class="tab-content">
                <MemberTab :study-id="study?.id || 0" :is-leader="true" />
              </div>

              <!-- (옵션) 통계 탭은 주석 유지 -->
            </div>
          </div>

          <!-- 하단 액션 버튼 -->
          <div class="study-actions">
            <Button variant="primary" size="lg" @click="joinStudyRoom">
              지금 바로 스터디 참여
            </Button>
            <Button variant="outline" size="lg" @click="showDeleteModal = true">
              스터디 삭제
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 모달들 -->
    <Modal :visible="showEditModal" @close="showEditModal = false">
      <template #title>스터디 정보 수정</template>
      <div class="modal-content">
        <div class="form-group">
          <label>스터디명</label>
          <input v-model="editForm.name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>소분류 키워드 <span class="text-muted">(최대 3개)</span></label>
          <div class="tag-input-container">
            <div class="tag-list">
              <span v-for="(tag, index) in editTags" :key="index" class="tag-item">
                <span class="tag-text">#{{ tag }}</span>
                <button
                  type="button"
                  class="tag-remove-btn"
                  @click="removeEditTag(index)"
                  aria-label="태그 삭제"
                >
                  ×
                </button>
              </span>
            </div>
            <input
              v-model="editTagInput"
              type="text"
              class="tag-input"
              placeholder="키워드를 입력하고 Enter 또는 Space를 누르세요"
              @keydown="handleEditTagInput"
              @blur="addEditTagFromInput"
              :disabled="editTags.length >= 3"
            />
          </div>
        </div>
        <div class="form-group">
          <label>스터디 규칙</label>
          <textarea
            v-model="editForm.rules"
            class="form-control"
            rows="3"
            placeholder="스터디 규칙을 입력하세요"
          ></textarea>
        </div>
        <div class="form-group">
          <label>스터디 비밀번호</label>
          <input
            v-model="editForm.password"
            type="text"
            class="form-control"
            placeholder="6자리 숫자 비밀번호"
            maxlength="6"
            pattern="[0-9]{6}"
          />
          <div class="password-notice">
            <span class="notice-icon">💡</span>
            <span class="notice-text">
              비밀번호 설정 후, 스터디 규칙에 비밀번호를 명시해주세요.
            </span>
          </div>
        </div>
        <div class="form-group">
          <label>최대 인원 수</label>
          <input v-model.number="editForm.maxMembers" type="number" class="form-control" min="2" max="20" />
        </div>
      </div>
      <template #footer>
        <Button variant="primary" @click="saveStudyEdit">저장</Button>
        <Button variant="outline" @click="showEditModal = false">취소</Button>
      </template>
    </Modal>

    <Modal :visible="showDeleteModal" @close="showDeleteModal = false">
      <template #title>스터디 삭제</template>
      <p>정말로 이 스터디를 삭제하시겠습니까?</p>
      <p>삭제된 스터디는 복구할 수 없습니다.</p>
      <template #footer>
        <Button variant="danger" @click="confirmDelete">삭제하기</Button>
        <Button variant="outline" @click="showDeleteModal = false">취소</Button>
      </template>
    </Modal>

    <!-- 스터디룸 비밀번호 입력 모달 -->
    <StudyPasswordModal
      v-if="showPasswordModal"
      :study-id="study?.id || 0"
      :study-name="study?.name || ''"
      @close="showPasswordModal = false"
      @success="handlePasswordSuccess"
    />

    <!-- 출석 퀴즈 모달 (props는 유지해도 라우팅에는 사용 안 함) -->
    <AttendanceQuizModal
  v-if="showQuizModal && study"
  :study-id="study.id"
  :study-name="study.name"
  :category="study.category || 'IT'"
  :is-leader="true"
  :group-id="study.id"
  @close="showQuizModal = false"
  @complete="handleQuizComplete"
/>

    <!-- 이미지 수정 모달 -->
    <Modal :visible="showImageEditModal" @close="closeImageModal" class="image-edit-modal">
      <template #title>스터디 이미지 수정</template>
      <div class="modal-content">
        <div class="image-upload-section">
          <div class="current-image">
            <h4>현재 이미지</h4>
            <img :src="study?.imageUrl || defaultMeetingImg" :alt="study?.name" class="preview-image" />
          </div>

          <div class="new-image-upload">
            <h4>새 이미지 업로드</h4>

            <!-- 숨김 input + 클릭/드롭 영역 분리 -->
            <input
              ref="imageFileInput"
              type="file"
              accept="image/*"
              class="file-input"
              @change="handleImageUpload"
            />

            <div class="upload-area" @click="triggerFileDialog" @dragover="onDragOver" @drop="onDrop">
              <div class="upload-preview" v-if="newImagePreview">
                <img :src="newImagePreview" alt="새 이미지 미리보기" class="preview-image" />
              </div>
              <div class="upload-placeholder" v-else>
                <div class="upload-icon">📷</div>
                <p>클릭하여 이미지 선택하거나 파일을 끌어다 놓으세요</p>
                <p class="upload-hint">JPG, PNG, GIF (최대 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="primary" @click="saveImageEdit" :disabled="!newImagePreview">저장</Button>
        <Button variant="outline" @click="closeImageModal">취소</Button>
      </template>
    </Modal>

    <!-- 이미지 수정 성공 모달 -->
    <Modal :visible="showSuccessModal" @close="showSuccessModal = false">
      <template #title>이미지 수정 완료</template>
      <div class="modal-content">
        <div class="success-message">
          <p>스터디 이미지가 성공적으로 수정되었습니다.</p>
        </div>
      </div>
      <template #footer>
        <Button variant="primary" @click="showSuccessModal = false">확인</Button>
      </template>
    </Modal>

    <!-- 스터디 일정 캘린더 모달 -->
    <Modal :visible="showCalendarModal" @close="showCalendarModal = false" class="calendar-modal">
      <template #title>내 스터디 일정</template>
      <div class="modal-content">
        <div class="calendar-container">
          <div class="calendar-section">
            <Calendar @date-select="handleDateSelect" />
          </div>
          <div class="event-details-section">
            <div class="event-details">
              <div class="event-header">
                <h4>{{ selectedDateInfo.date }}</h4>
                <span class="event-count">{{ selectedDateInfo.studies.length }}개 스터디</span>
              </div>
              <div v-if="selectedDateInfo.studies.length > 0" class="event-time">
                <span class="time">{{ selectedDateInfo.studies[0].startTime }}</span>
                <div class="countdown">
                  <div class="countdown-label">시작까지</div>
                  <div class="countdown-time">{{ getTimeUntilStudy(selectedDateInfo.studies[0]) }}</div>
                </div>
              </div>
              <div v-else class="no-events">
                <p>이 날에는 스터디가 없습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="primary" @click="showCalendarModal = false">확인</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const defaultMeetingImg = `${import.meta.env.BASE_URL || '/'}images/meeting.png`
import { useStudyService } from '@/services/useStudyService'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import StudyPasswordModal from '@/components/study/StudyPasswordModal.vue'
import AttendanceQuizModal from '@/components/study/AttendanceQuizModal.vue'
import NoticeTab from '@/components/study/NoticeTab.vue'
import DownloadTab from '@/components/study/DownloadTab.vue'
import BoardTab from '@/components/study/BoardTab.vue'
import MemberTab from '@/components/study/MemberTab.vue'
import Calendar from '@/components/study/StudyCalendarComponent.vue'
import type { StudyDetail } from '@/types/study'

const route = useRoute()
const router = useRouter()
const { getStudyDetail, deleteStudy } = useStudyService()

const loading = ref(true)
const error = ref<string | null>(null)
const study = ref<StudyDetail | null>(null)
const activeTab = ref('notice')
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showPasswordModal = ref(false)
const showQuizModal = ref(false)
const showImageEditModal = ref(false)
const showSuccessModal = ref(false)
const showCalendarModal = ref(false)

// 캘린더 관련 타입/상태
interface StudySchedule {
  id: number
  studyId?: number
  name?: string
  studyName?: string
  category: string
  time: string
  schedule: string
  day_of_week: string
  startTime: string
  period: string[]
}

const selectedDateInfo = ref({
  date: '8월 26일 (화)',
  studies: [] as StudySchedule[]
})

// 탭 정의
const tabs = [
  { id: 'notice', label: '공지사항' },
  { id: 'download', label: '다운로드' },
  { id: 'board', label: '게시판' },
  { id: 'members', label: '팀원' }
  // { id: 'stats', label: '통계' }
]

const editForm = ref({
  name: '',
  rules: '',
  maxMembers: 4,
  password: ''
})

// 수정 모달 태그 관련
const editTags = ref<string[]>([])
const editTagInput = ref('')

// 이미지 수정 관련
const imageFileInput = ref<HTMLInputElement | null>(null)
const newImagePreview = ref<string | null>(null)
const selectedImageFile = ref<File | null>(null)

// 스터디 규칙
const studyRules = computed(() => {
  if (!study.value?.rules) return []
  return [
    '매주 지정된 주제에 맞춰 2분 스피치 준비하기',
    '지각 시 벌금 1,000원 (누적 관리)',
    '피드백은 서로 존중하는 태도로 제공하기',
    '무단 결석 2회 시 강제 퇴출',
    '스터디 시간 준수하기'
  ]
})

interface Member {
  id: number
  nickname: string
  profile_img?: string | null
  leader?: boolean
}

/** 모든 멤버를 리더 우선으로 정렬 */
const sortedMembers = computed<Member[]>(() => {
  if (!study.value?.members) return []

  // 중복 제거
  const seen = new Set<number>()
  const uniqueMembers: Member[] = []

  for (const member of study.value.members) {
    if (!member || typeof member.id !== 'number') continue
    if (seen.has(member.id)) continue
    seen.add(member.id)
    uniqueMembers.push(member)
  }

  // 리더를 맨 위로 정렬
  return uniqueMembers.sort((a, b) => {
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
    console.log('API 응답:', response)

    // API 응답 구조: response.data.data 안에 실제 데이터가 있음
    const apiData = (response.data as any).data || response.data as any
    console.log('API 데이터:', apiData)

    // API 응답 구조를 기존 타입에 맞게 변환
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
      rules: apiData.rule, // 규칙 필드 매핑
      notice_able: apiData.notice_able || false,
      // leader 정보 변환 - members 배열에서 leader: true인 멤버를 찾음
      leader: apiData.members ? {
        id: apiData.members.find((member: any) => member.leader)?.userId || 0,
        nickname: apiData.members.find((member: any) => member.leader)?.nickname || '',
        profile_img: apiData.members.find((member: any) => member.leader)?.profileImg || defaultMeetingImg
      } : {
        id: 0,
        nickname: '',
        profile_img: defaultMeetingImg
      },
      // members 정보 변환
      members: apiData.members ? apiData.members.map((member: any) => ({
        id: member.userId || member.id,
        nickname: member.nickname,
        profile_img: member.profileImg || member.profile_img || defaultMeetingImg,
        leader: member.leader // leader 플래그 추가
      })) : []
    } as any

    console.log('변환된 스터디 데이터:', study.value)

    editForm.value = {
      name: study.value?.name || '',
      rules: (study.value as any)?.rule || study.value?.rules || '',
      maxMembers: study.value?.maxMembers || 0,
      password: (study.value as any)?.password || ''
    }

    // 태그 초기화
    if ((study.value as any)['detail-category']) {
      const tags = (study.value as any)['detail-category']
        .split(' ')
        .filter((tag: string) => tag.startsWith('#'))
        .map((tag: string) => tag.slice(1))
      editTags.value = tags
    } else {
      editTags.value = []
    }
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

async function saveStudyEdit() {
  try {
    console.log('스터디 수정:', editForm.value)
    if (study.value) {
      study.value.name = editForm.value.name
      study.value.rules = editForm.value.rules
      study.value.maxMembers = editForm.value.maxMembers
      study.value.password = editForm.value.password
      ;(study.value as any)['detail-category'] = editTags.value.map(tag => `#${tag}`).join(' ')
    }
    showEditModal.value = false
  } catch (err) {
    console.error('스터디 수정 실패:', err)
  }
}

// 수정 모달 태그 관련 함수들
const addEditTag = (tag: string) => {
  const trimmedTag = tag.trim()
  if (trimmedTag && !editTags.value.includes(trimmedTag) && editTags.value.length < 3) {
    editTags.value.push(trimmedTag)
  }
}
const removeEditTag = (index: number) => editTags.value.splice(index, 1)
const handleEditTagInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    addEditTagFromInput()
  }
}
const addEditTagFromInput = () => {
  if (editTagInput.value.trim()) {
    addEditTag(editTagInput.value)
    editTagInput.value = ''
  }
}

async function confirmDelete() {
  try {
    if (!study.value?.id) {
      console.error('스터디 ID가 없습니다.')
      return
    }

    console.log('스터디 삭제 시작:', study.value.id)
    console.log('deleteStudy 함수 호출:', deleteStudy)
    const result = await deleteStudy(study.value.id)
    console.log('스터디 삭제 성공:', result)
    showDeleteModal.value = false

    // 성공 시 메인화면으로 이동
    router.push('/')
  } catch (err) {
    console.error('스터디 삭제 실패:', err)
    alert('스터디 삭제에 실패했습니다. 다시 시도해주세요.')
  }
}

function handlePasswordSuccess(_password: string) {
  showPasswordModal.value = false
  showQuizModal.value = true
}

// ✅ 퀴즈 완료 → 프리조인으로만 이동 (역할 판단은 프리조인에서 자동)
function handleQuizComplete(isLeader: boolean) {
  showQuizModal.value = false
  const gid = resolveGroupId()
  if (!gid) {
    alert('groupId를 찾을 수 없습니다.')
    return
  }
  console.log('🔍 handleQuizComplete - isLeader:', isLeader, 'groupId:', gid)
  // 프리조인 라우트로 이동 (역할 정보를 query로 전달)
  router.push({
    name: 'StudyPrejoin',
    params: { groupId: gid },
    query: { isLeader: String(isLeader) }
  })
}

function goToMyStudy() {
  router.push('/mypage/study')
}

/** ===== 이미지 수정: UX 안정화 함수들 ===== **/
const triggerFileDialog = () => imageFileInput.value?.click()
const onDragOver = (e: DragEvent) => { e.preventDefault() }
const onDrop = (e: DragEvent) => {
  e.preventDefault()
  const file = e.dataTransfer?.files?.[0]
  if (file) useFile(file)
}
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) useFile(file)
}

function useFile(file: File) {
  // 파일 크기 검증 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('파일 크기는 5MB를 초과할 수 없습니다.')
    return
  }
  // 파일 타입 검증
  if (!file.type.startsWith('image/')) {
    alert('이미지 파일만 업로드 가능합니다.')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    newImagePreview.value = e.target?.result as string
    selectedImageFile.value = file
  }
  reader.readAsDataURL(file)
}

function resetImageEditState() {
  newImagePreview.value = null
  selectedImageFile.value = null
  if (imageFileInput.value) imageFileInput.value.value = ''
}

function closeImageModal() {
  showImageEditModal.value = false
  resetImageEditState()
}

const saveImageEdit = async () => {
  try {
    if (!selectedImageFile.value || !study.value) return
    // TODO: 실제 업로드 API 연동
    study.value.imageUrl = newImagePreview.value || undefined
    closeImageModal()
    showSuccessModal.value = true
  } catch (error) {
    console.error('이미지 수정 실패:', error)
    alert('이미지 수정에 실패했습니다. 다시 시도해주세요.')
  }
}

// 캘린더 관련 함수들
const handleDateSelect = (data: { date: string; studies: StudySchedule[] }) => {
  selectedDateInfo.value = data
}
const getTimeUntilStudy = (study: StudySchedule): string => {
  const now = new Date()
  const today = new Date()
  const [studyHour, studyMinute] = study.startTime.split(':').map(Number)
  const studyDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), studyHour, studyMinute)

  if (studyDateTime < now) {
    studyDateTime.setDate(studyDateTime.getDate() + 7) // 다음 주
  }

  const diff = studyDateTime.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `${days}일 ${hours}시간`
  if (hours > 0) return `${hours}시간 ${minutes}분`
  return `${minutes}분`
}
</script>

<style scoped>

.study-detail-leader-view {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

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
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

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

.error-card h3 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.error-card p {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

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

.tab-button.active {
  background-color: #d79c94;
  color: white;
}

.tab-button:hover:not(.active) {
  background-color: #e9ecef;
  color: #495057;
}

.study-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: 600px;
}

.study-info-panel {
  background-color: #fef7f7;
  padding: 2rem;
  border-right: 1px solid #e9ecef;
}

.study-image-section {
  margin-bottom: 2rem;
  position: relative;
}

.study-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
}

.edit-image-btn {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
}

.study-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.study-info h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
  flex: 1;
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

.study-intro,
.study-rules,
.study-schedule,
.member-management {
  margin-bottom: 2rem;
}

.study-intro h3,
.study-rules h3,
.study-schedule h3,
.member-management h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
}

.rules-list {
  padding-left: 1.5rem;
  color: #495057;
}

.rules-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
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

.tab-content-panel {
  padding: 2rem;
  background-color: #f8f9fa;
}

.tab-content {
  height: 100%;
}

/* .stats-header h3 {
  margin: 0;
  color: #212529;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-card {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
  color: #d79c94;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6c757d;
  font-size: 0.9rem;
} */

.study-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
  border-top: 1px solid #e9ecef;
  background-color: white;
}

.modal-content {
  padding: 1rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #212529;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 0.2rem rgba(215, 156, 148, 0.25);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* 수정 모달 태그 입력 스타일 */
.tag-input-container {
  border: 2px solid #e9ecef;
  border-radius: 0.5rem;
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

/* 스터디 기간 스타일 */
.study-period {
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* 비밀번호 안내문 스타일 */
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

/* ===== 이미지 수정 모달: 구조/스타일 안정화 ===== */
:deep(.image-edit-modal .modal-dialog) {
  max-width: 800px !important;
  width: 90vw !important;
  border-radius: 1rem !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
}

/* 성공 메시지 스타일 */
.success-message {
  text-align: center;
  padding: 2rem 0;
}

.success-message p {
  font-size: 1.1rem;
  color: #212529;
  margin: 0;
  font-weight: 500;
}

:deep(.image-edit-modal .modal-title) {
  color: #000000 !important;
  font-weight: 600 !important;
  font-size: 1.25rem !important;
}

:deep(.image-edit-modal .modal-body) {
  padding: 1rem !important;
  max-height: 70vh !important;
  overflow-y: auto !important;
}

.image-upload-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.current-image,
.new-image-upload {
  text-align: center;
}

.current-image h4,
.new-image-upload h4 {
  margin-bottom: 1rem;
  color: #212529;
  font-weight: 600;
}

.preview-image {
  width: 250px;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
  border: 3px solid #e9ecef;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.preview-image:hover {
  border-color: #d79c94;
  box-shadow: 0 6px 16px rgba(215, 156, 148, 0.2);
  transform: scale(1.02);
}

.file-input {
  display: none;
}

/* 숨김: 클릭은 버튼/영역이 담당 */

.upload-area {
  border: 2px dashed #e9ecef;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-area:hover {
  border-color: #d79c94;
  background-color: #fefefe;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.15);
}

.upload-area:active {
  transform: translateY(0);
}

.upload-placeholder {
  text-align: center;
  color: #6c757d;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-hint {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: #adb5bd;
}

.upload-preview {
  margin-bottom: 0;
}

.upload-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
}

.select-file-btn,
.reset-file-btn {
  padding: 0.75rem 1.5rem !important;
  border-radius: 0.75rem !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

.select-file-btn:hover,
.reset-file-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

  .select-file-btn:active,
  .reset-file-btn:active {
    transform: translateY(0) !important;
  }

/* 스터디 일정 캘린더 모달 스타일 */
:deep(.calendar-modal .modal-dialog) {
  max-width: 900px !important;
  width: 95vw !important;
  border-radius: 1rem !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
}

.calendar-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  min-height: 500px;
  align-items: start;
}

.calendar-section {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.event-details-section {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  position: relative;
  height: fit-content;
  min-height: 200px;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.event-header h4 {
  margin: 0;
  color: #212529;
  font-weight: 600;
  font-size: 1.1rem;
}

.event-count {
  background: #d79c94;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.event-time {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
}

.countdown {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.countdown-label {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
}

.countdown-time {
  font-size: 1.1rem;
  font-weight: 700;
  color: #dc3545;
}

.no-events {
  text-align: center;
  color: #6c757d;
  padding: 2rem 0;
}

/* .stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.stats-header h3 {
  margin: 0;
  color: #212529;
  font-weight: 600;
} */

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

  /* .stats-grid {
    grid-template-columns: 1fr;
  } */

  :deep(.image-edit-modal .modal-dialog) {
    width: 95vw !important;
    max-width: none !important;
  }

  .image-upload-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .preview-image {
    width: 200px;
    height: 200px;
  }

  :deep(.calendar-modal .modal-dialog) {
    width: 95vw !important;
    max-width: none !important;
  }

  .calendar-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .event-details-section {
    min-height: 150px;
  }
}
</style>
