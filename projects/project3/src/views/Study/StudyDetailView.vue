<template>
  <div class="study-detail-view">
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
          <Button variant="primary" @click="goToList">스터디 목록으로 돌아가기</Button>
        </div>
      </div>

      <!-- 스터디 상세 정보 -->
      <div v-else-if="study" class="study-detail-section">
        <div class="study-card">
          <!-- 스터디 이미지 -->
          <div class="study-image-section">
            <img :src="defaultMeetingImg" :alt="study.name" class="study-image" />
          </div>

          <!-- 스터디 정보 -->
          <div class="study-info">
            <div class="study-header">
              <div class="tags">
                <span class="main-tag">{{ parsedCategories?.mainCategory || (study as any).interestName ||
                  study.category }}</span>
                <span v-if="parsedCategories?.subCategory || study['sub-category']" class="sub-tag">
                  {{ parsedCategories?.subCategory || study['sub-category'] }}
                </span>
              </div>
              <h1 class="study-title">{{ (study as any).studyName || study.name }}</h1>
            </div>

            <div class="study-meta">
              <div class="meta-item">
                <span class="meta-icon">👤</span>
                <span class="meta-text">{{ study.currentMembers }}/{{ study.maxMembers }}명</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">🕒</span>
                <span class="meta-text">{{ calculatedTime }}시간</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ study.day_of_week || '미정' }}</span>
              </div>
            </div>

            <div class="study-schedule" v-if="study.day_of_week || study.created_at">
              <h3>스터디 일정</h3>
              <p v-if="study.day_of_week">{{ study.day_of_week }} {{ calculatedTime }}시간</p>
              <p v-if="study.created_at && study.ended_at" class="study-period">{{ study.created_at }} ~ {{
                study.ended_at }}</p>
            </div>

            <!-- 스터디 소개 -->
            <div class="study-summary" v-if="study.summary">
              <h3>스터디 소개</h3>
              <p>{{ study.summary }}</p>
            </div>

            <!-- 멤버 목록 -->
            <div class="study-members">
              <h3>스터디 멤버</h3>
              <div class="members-list">
                <!-- 모든 멤버를 리더 우선으로 정렬하여 표시 -->
                <div v-for="member in sortedMembers" :key="member.id" class="member-item"
                  :class="{ leader: member.leader }">
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

            <!-- 액션 버튼 -->
            <div class="study-actions">
              <Button variant="primary" size="lg" @click="handleJoinStudy">
                {{ isAlreadyMember ? '스터디 상세보기' : '스터디 참여하기' }}
              </Button>
              <Button variant="secondary" size="lg" @click="goToList">
                다른 스터디 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 참여 성공 모달 -->
    <Modal :visible="showJoinSuccessModal" @close="handleJoinSuccess">
      <template #title>참여 완료</template>
      <p>스터디 참여가 완료되었습니다!</p>
      <p>이제 스터디 일정을 확인하고 준비해보세요.</p>
      <template #footer>
        <Button variant="primary" @click="handleJoinSuccess">확인</Button>
      </template>
    </Modal>

    <!-- 참여 실패 모달 -->
    <Modal :visible="showJoinErrorModal" @close="showJoinErrorModal = false">
      <template #title>참여 실패</template>
      <p>{{ joinError }}</p>
      <template #footer>
        <Button variant="secondary" @click="showJoinErrorModal = false">확인</Button>
      </template>
    </Modal>

    <!-- 스터디 참여 확인 모달 -->
    <Modal :visible="showJoinConfirmModal" @close="showJoinConfirmModal = false">
      <template #title>스터디 참여</template>
      <p><strong>{{ study?.name }}</strong> 스터디에 참여하시겠습니까?</p>
      <p>참여하면 스터디원용 상세 페이지로 바로 이동합니다.</p>
      <template #footer>
        <Button variant="secondary" @click="showJoinConfirmModal = false">취소</Button>
        <Button variant="primary" @click="confirmJoinStudy">참여하기</Button>
      </template>
    </Modal>

    <!-- 이미 가입된 사용자 모달 -->
    <Modal :visible="showAlreadyMemberModal" @close="showAlreadyMemberModal = false">
      <template #title>이미 가입된 스터디</template>
      <p>해당 스터디에 이미 가입되어 있습니다.</p>
      <p>상세페이지로 넘어갑니다!</p>
      <template #footer>
        <Button variant="secondary" @click="showAlreadyMemberModal = false">취소</Button>
        <Button variant="primary" @click="goToStudyDetail">상세페이지로 이동</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudyService } from '@/services/useStudyService'
import { useUserStore } from '@/stores/user'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import type { StudyDetail } from '@/types/study'
import { parseInterestName } from '@/constants/categoryMap'

const route = useRoute()
const router = useRouter()
const defaultMeetingImg = `${import.meta.env.BASE_URL || '/'}images/meeting.png`
const { getStudyDetail, joinStudy } = useStudyService()
const userStore = useUserStore()

const loading = ref(true)
const error = ref<string | null>(null)
const study = ref<StudyDetail | null>(null)
const showJoinSuccessModal = ref(false)
const showJoinErrorModal = ref(false)
const joinError = ref('')
const showJoinConfirmModal = ref(false)
const showAlreadyMemberModal = ref(false)

const isAlreadyMember = computed(() => {
  if (!study.value || !userStore.user?.studies) return false
  return userStore.user.studies.some(s => s.id === study.value?.id)
})

interface Member {
  id: number
  userId?: number | null
  nickname: string
  profile_img?: string | null
  leader?: boolean
}

/** 모든 멤버를 리더 우선으로 정렬 */
const sortedMembers = computed<Member[]>(() => {
  if (!study.value?.members) return []

  const seen = new Set<number>()
  const uniqueMembers: Member[] = []

  for (const member of study.value.members as any[]) {
    if (!member || typeof member.id !== 'number') continue
    if (seen.has(member.id)) continue
    seen.add(member.id)
    uniqueMembers.push(member as Member)
  }

  return uniqueMembers.sort((a, b) => {
    if (a.leader && !b.leader) return -1
    if (!a.leader && b.leader) return 1
    return 0
  })
})

// 카테고리 분리
const parsedCategories = computed(() => {
  if (!study.value) return null
  const interestName = (study.value as any).interestName
  return interestName ? parseInterestName(interestName) : null
})

// 시간 계산
const calculatedTime = computed(() => {
  if (!study.value) return 0
  if ((study.value as any).time == null) return 2
  return study.value.time || 0
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
    const apiData = (response.data as any).data || response.data as any

    // 표준화: members에 id + userId를 모두 보관
    const mappedMembers = (apiData.members || []).map((m: any) => ({
      id: m.userId ?? m.id,                    // 내부 비교용 id
      userId: m.userId ?? m.id ?? null,        // 원본 userId도 유지
      nickname: m.nickname,
      profile_img: m.profileImg || m.profile_img || defaultMeetingImg,
      leader: m.leader === true
    }))

    const leaderFromMembers = mappedMembers.find((m: any) => m.leader)

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
      notice_able: apiData.notice_able || false,
      leader: leaderFromMembers
        ? {
          id: leaderFromMembers.id,
          nickname: leaderFromMembers.nickname,
          profile_img: leaderFromMembers.profile_img
        }
        : { id: 0, nickname: '', profile_img: defaultMeetingImg },
      members: mappedMembers
    } as StudyDetail
  } catch (err: unknown) {
    console.error('[스터디 상세 정보 로드 실패]', err)
    const errorMessage = err instanceof Error ? err.message : '스터디 정보를 불러올 수 없습니다.'
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}

async function handleJoinStudy() {
  if (!study.value) return

  if (!userStore.token || !userStore.profile) {
    alert('스터디 참여를 위해 로그인이 필요합니다.')
    router.push('/login')
    return
  }

  if (!userStore.user) {
    await userStore.fetchUser()
  }

  const userStudy = userStore.user?.studies?.find((s: any) => s.id === study.value?.id)

  if (userStudy) {
    showAlreadyMemberModal.value = true
    return
  }

  showJoinConfirmModal.value = true
}

async function confirmJoinStudy() {
  try {
    if (!study.value) return
    await joinStudy(study.value.id)
    showJoinConfirmModal.value = false
    showJoinSuccessModal.value = true
  } catch (err: unknown) {
    console.error('[스터디 참여 실패]', err)
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as any
      if (axiosError.response?.data?.error === '이미 가입한 스터디입니다.') {
        showJoinConfirmModal.value = false
        showAlreadyMemberModal.value = true
        return
      }
    }
    const errorMessage = err instanceof Error ? err.message : '스터디 참여에 실패했습니다.'
    joinError.value = errorMessage
    showJoinConfirmModal.value = false
    showJoinErrorModal.value = true
  }
}

function handleJoinSuccess() {
  showJoinSuccessModal.value = false
  router.push(`/study/${study.value?.id}/teammate`)
}

function goToList() {
  router.push('/study')
}

function goToStudyDetail() {
  if (!study.value) return

  // 현재 사용자 ID 확보(스토어 구조에 따라 profile.id가 실제 UID인 경우가 많습니다)
  const currentUserId =
    (userStore.user as any)?.id ??
    (userStore.profile as any)?.id ??
    null

  // 사용자 ID가 없으면 안전하게 팀원 페이지로 이동
  if (currentUserId == null) {
    router.push(`/study/${study.value.id}/teammate`)
    showAlreadyMemberModal.value = false
    return
  }

  // 1순위: leader 객체의 id로 비교
  const isLeaderByLeaderObj = study.value.leader?.id === currentUserId

  // 2순위: members에서 (id 또는 userId) 매칭 + leader:true
  const isLeaderByMembers = (study.value.members as any[])?.some((m: any) => {
    const mid = m.id ?? m.userId
    return mid === currentUserId && m.leader === true
  })

  const isCurrentUserLeader = !!(isLeaderByLeaderObj || isLeaderByMembers)

  if (isCurrentUserLeader) {
    router.push(`/study/${study.value.id}/leader`)
  } else {
    router.push(`/study/${study.value.id}/teammate`)
  }

  showAlreadyMemberModal.value = false
}
</script>

<style scoped>
.study-detail-view {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
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
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
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

.error-card h3 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.error-card p {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

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
  max-width: 900px;
  width: 100%;
}

/* 스터디 이미지 */
.study-image-section {
  height: 300px;
  overflow: hidden;
}

.study-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 스터디 정보 */
.study-info {
  padding: 2rem;
}

.study-header {
  margin-bottom: 2rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.main-tag {
  background-color: #d79c94;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(215, 156, 148, 0.3);
}

.sub-tag {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);
}

.study-title {
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

/* 메타 정보 */
.study-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  font-size: 1.2rem;
}

.meta-text {
  font-weight: 600;
  color: #495057;
}

/* 스터디 설명 */
.study-description,
.study-schedule {
  margin-bottom: 2rem;
}

.study-description h3,
.study-schedule h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
}

.study-description p,
.study-schedule p {
  color: #495057;
  line-height: 1.6;
}

.study-period {
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* 멤버 목록 */
.study-members {
  margin-bottom: 2rem;
}

.study-members h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
}

.members-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
}

.member-item.leader {
  background: #fff5d6;
  border-color: #f3e6bf;
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
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
}

/* 액션 버튼 */
.study-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
  margin-top: 2rem;
}

/* 모달 내용 */
.modal-content {
  text-align: center;
}

.modal-content p {
  margin-bottom: 1rem;
  color: #495057;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }

  .study-info {
    padding: 1.5rem;
  }

  .study-title {
    font-size: 1.5rem;
  }

  .study-meta {
    flex-direction: column;
    gap: 1rem;
  }

  .members-list {
    grid-template-columns: 1fr;
  }

  .study-actions {
    flex-direction: column;
  }
}

/* 스터디 소개 */
.study-summary {
  margin-bottom: 2rem;
}

.study-summary h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.study-summary p {
  color: #666;
  line-height: 1.6;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #d79c94;
}
</style>
