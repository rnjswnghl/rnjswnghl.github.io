<!-- src/components/study/MemberTab.vue -->
<template>
  <div class="member-tab">
    <div class="member-header">
      <h3>멤버 관리</h3>
      <div class="member-stats">
        <span class="stat-item">총 {{ totalMembers }}명</span>
        <span class="stat-item">스터디장 {{ totalMembers - memberCount }}명</span>
        <span class="stat-item">멤버 {{ memberCount }}명</span>
      </div>
    </div>

    <!-- 멤버 목록 -->
    <div class="member-list" :class="{ 'scrollable': totalMembers > 3 }">
      <!-- 스터디장 -->
      <div class="member-item leader" v-if="leader">
        <div class="member-avatar">
          <img
            :src="leader.profile_img || defaultMeetingImg"
            :alt="leader.nickname"
          />
          <div class="leader-badge">👑</div>
        </div>
        <div class="member-info">
          <div class="member-name">{{ leader.nickname }}</div>
          <div class="member-role">
            {{ leader.isTemporaryLeader ? '임시 스터디장' : '스터디장' }}
            <span v-if="leader.isTemporaryLeader" class="temp-leader-info">
              ({{ leader.tempLeaderUntil }}까지)
            </span>
          </div>
          <div class="member-stats">
            <span class="stat">참석률: {{ leader.attendanceRate }}%</span>
            <span class="stat">가입일: {{ leader.joinedAt }}</span>
          </div>
        </div>
        <div class="member-actions">
          <Button variant="outline" size="sm" @click="viewMemberDetail(leader)">
            상세보기
          </Button>
          <Button
            v-if="leader.isTemporaryLeader"
            variant="primary"
            size="sm"
            @click="reclaimLeadership"
          >
            권한 회수
          </Button>
        </div>
      </div>

      <!-- 일반 멤버들 (스터디장 제외) -->
      <div
        v-for="member in members.filter(m => !m.isLeader)"
        :key="member.id"
        class="member-item"
      >
        <div class="member-avatar">
          <img
            :src="member.profile_img || defaultMeetingImg"
            :alt="member.nickname"
          />
        </div>
        <div class="member-info">
          <div class="member-name">{{ member.nickname }}</div>
          <div class="member-role">멤버</div>
          <div class="member-stats">
            <span class="stat">참석률: {{ member.attendanceRate }}%</span>
            <span class="stat">가입일: {{ member.joinedAt }}</span>
          </div>
        </div>
        <div class="member-actions">
          <Button variant="outline" size="sm" @click="viewMemberDetail(member)">
            상세보기
          </Button>
          <Button
            v-if="props.isLeader"
            variant="primary"
            size="sm"
            @click="transferLeadership(member)"
            :disabled="hasTemporaryLeader"
          >
            권한 양도
          </Button>
        </div>
      </div>
    </div>

        <!-- 멤버 상세 모달 -->
    <Modal :visible="showMemberDetailModal" @close="showMemberDetailModal = false">
      <template #title>멤버 상세 정보</template>
      <template #footer>
        <Button
          v-if="props.isLeader && selectedMember && !selectedMember?.isLeader"
          variant="primary"
          @click="transferLeadership(selectedMember!)"
          :disabled="hasTemporaryLeader"
        >
          권한 양도
        </Button>
      </template>
      <div class="modal-content">
        <div class="member-detail" v-if="selectedMember">
          <!-- 프로필 섹션 -->
          <div class="profile-section">
            <img
              :src="selectedMember.profile_img || defaultMeetingImg"
              :alt="selectedMember.nickname"
              class="detail-avatar"
            />
            <div class="profile-info">
              <h4 class="member-name">{{ selectedMember.nickname }}</h4>
              <div class="role-status-row">
                <span class="role-badge" :class="{ 'leader': selectedMember.isLeader }">
                  {{ selectedMember.isLeader ? '스터디장' : '멤버' }}
                </span>
                <span class="status-badge" :class="getStatusClass(selectedMember.attendanceRate)">
                  {{ getStatusText(selectedMember.attendanceRate) }}
                </span>
                <span v-if="selectedMember.isTemporaryLeader" class="temp-badge">
                  임시 ({{ selectedMember.tempLeaderUntil }}까지)
                </span>
              </div>
            </div>
          </div>

          <!-- 핵심 통계 -->
          <div class="stats-section">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">{{ selectedMember.attendanceRate }}%</div>
                <div class="stat-label">참석률</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ selectedMember.studyCount }}회</div>
                <div class="stat-label">스터디 참여</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ selectedMember.postCount }}개</div>
                <div class="stat-label">게시글</div>
              </div>
            </div>
          </div>

          <!-- 기본 정보 -->
          <div class="info-section">
            <div class="info-grid">
              <div class="info-row">
                <span class="info-label">가입일</span>
                <span class="info-value">{{ selectedMember.joinedAt }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">마지막 활동</span>
                <span class="info-value">{{ selectedMember.lastActivity || '오늘' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">연속 참석</span>
                <span class="info-value">{{ selectedMember.consecutiveAttendance || 0 }}주</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <!-- 권한 양도 확인 모달 -->
    <Modal :visible="showTransferModal" @close="showTransferModal = false">
      <template #title>스터디장 권한 양도</template>
      <div class="modal-content">
        <div class="transfer-info">
          <p><strong>{{ memberToTransfer?.nickname }}</strong>님에게 스터디장 권한을 양도하시겠습니까?</p>
          <div class="transfer-details">
            <p>• 양도 기간: <strong>1일</strong></p>
            <p>• 양도 후에도 권한을 언제든지 회수할 수 있습니다.</p>
            <p>• 임시 스터디장은 일반 멤버와 동일한 권한을 가집니다.</p>
          </div>
        </div>
        <div class="modal-actions">
          <Button variant="primary" @click="transferLeadershipConfirm">권한 양도</Button>
          <Button variant="outline" @click="showTransferModal = false">취소</Button>
        </div>
      </div>
    </Modal>

    <!-- 권한 회수 확인 모달 -->
    <Modal :visible="showReclaimModal" @close="showReclaimModal = false">
      <template #title>스터디장 권한 회수</template>
      <div class="modal-content">
        <p>임시 스터디장으로부터 권한을 회수하시겠습니까?</p>
        <p>회수 후에는 다시 원래 스터디장이 됩니다.</p>
        <div class="modal-actions">
          <Button variant="primary" @click="reclaimLeadershipConfirm">권한 회수</Button>
          <Button variant="outline" @click="showReclaimModal = false">취소</Button>
        </div>
      </div>
    </Modal>

    <!-- 알림 모달 -->
    <Modal :visible="showAlertModal" @close="showAlertModal = false">
      <template #title>{{ alertTitle }}</template>
      <p>{{ alertMessage }}</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { transferOwnership, getStudyMembers, getStudyMemberDetail } from '@/api/study'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'

const defaultMeetingImg = `${import.meta.env.BASE_URL || '/'}images/meeting.png`


// 백엔드 API 응답 구조에 맞춘 멤버 인터페이스
interface Member {
  id: number // userId를 id로 매핑
  nickname: string
  profile_img?: string
  isLeader: boolean // leader를 isLeader로 매핑
  isTemporaryLeader?: boolean
  tempLeaderUntil?: string
  attendanceRate: number
  joinedAt: string // joinedDate를 joinedAt으로 매핑
  studyCount?: number
  postCount?: number
  commentCount?: number
  lastActivity?: string
  consecutiveAttendance?: number
  preferredTime?: string
  lastMonthAttendance?: number
}

interface Props {
  studyId: number
  isLeader?: boolean
}

const props = defineProps<Props>()

const members = ref<Member[]>([])
const showMemberDetailModal = ref(false)
const showTransferModal = ref(false)
const showReclaimModal = ref(false)
const selectedMember = ref<Member | null>(null)
const memberToTransfer = ref<Member | null>(null)

// 알림 모달 상태
const showAlertModal = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

onMounted(() => {
  loadMembers()
})

function showAlert(title: string, message: string) {
  alertTitle.value = title
  alertMessage.value = message
  showAlertModal.value = true
}

async function loadMembers() {
  try {
    console.log('🔍 멤버 목록 로드 시작:', props.studyId)
    const response = await getStudyMembers(props.studyId)

    if (response.data && response.data.data) {
      // 백엔드 API 응답을 UI에서 사용하는 형태로 변환
      members.value = response.data.data.map((member: { userId: number; nickname: string; leader: boolean; attendanceRate: number; joinedDate: string }) => ({
        id: member.userId,
        nickname: member.nickname,
        profile_img: defaultMeetingImg, // 기본 이미지
        isLeader: member.leader,
        isTemporaryLeader: false, // 백엔드에서 제공하지 않음
        tempLeaderUntil: '',
        attendanceRate: member.attendanceRate,
        joinedAt: member.joinedDate,
        studyCount: 0, // 백엔드에서 제공하지 않음
        postCount: 0, // 백엔드에서 제공하지 않음
        commentCount: 0,
        lastActivity: '오늘',
        consecutiveAttendance: 0,
        preferredTime: '미설정',
        lastMonthAttendance: member.attendanceRate
      }))
      console.log('✅ 멤버 목록 로드 완료:', members.value)
    } else {
      console.warn('⚠️ 멤버 목록 응답 데이터 없음:', response)
      members.value = []
    }
  } catch (error) {
    console.error('❌ 멤버 목록 로드 실패:', error)
    members.value = []
  }
}

const leader = computed(() => {
  // 멤버 목록에서 leader가 true인 멤버를 찾아서 반환
  const leaderMember = members.value.find(member => member.isLeader)
  if (leaderMember) {
    return leaderMember
  }

  // leader가 없으면 기본값 반환
  return {
    id: 0,
    nickname: '스터디장',
    profile_img: defaultMeetingImg,
    isLeader: true,
    isTemporaryLeader: false,
    tempLeaderUntil: '',
    attendanceRate: 0,
    joinedAt: '2025-01-01',
    studyCount: 0,
    postCount: 0,
    commentCount: 0,
    lastActivity: '오늘',
    consecutiveAttendance: 0,
    preferredTime: '미설정',
    lastMonthAttendance: 0
  }
})

const memberCount = computed(() => members.value.filter(m => !m.isLeader).length)
const totalMembers = computed(() => members.value.length)
const hasTemporaryLeader = computed(() => leader.value.isTemporaryLeader)

async function viewMemberDetail(member: Member) {
  try {
    console.log('🔍 멤버 상세 정보 로드 시작:', member.id)
    const response = await getStudyMemberDetail(props.studyId, member.id)

    if (response.data && response.data.data) {
      const detailData = response.data.data

      // 백엔드 API 응답을 UI에서 사용하는 형태로 변환
      selectedMember.value = {
        id: detailData.userId,
        nickname: detailData.nickname,
        profile_img: defaultMeetingImg,
        isLeader: detailData.leader,
        isTemporaryLeader: false,
        tempLeaderUntil: '',
        attendanceRate: detailData.attendanceRate,
        joinedAt: detailData.joinedDate,
        studyCount: detailData.participationCount || 0,
        postCount: detailData.postCount || 0,
        commentCount: 0,
        lastActivity: detailData.lastActivity || '오늘',
        consecutiveAttendance: 0,
        preferredTime: '미설정',
        lastMonthAttendance: detailData.attendanceRate
      }

      console.log('✅ 멤버 상세 정보 로드 완료:', selectedMember.value)
      showMemberDetailModal.value = true
    } else {
      console.warn('⚠️ 멤버 상세 정보 응답 데이터 없음:', response)
      showAlert('오류', '멤버 상세 정보를 불러올 수 없습니다.')
    }
  } catch (error) {
    console.error('❌ 멤버 상세 정보 로드 실패:', error)
    showAlert('오류', '멤버 상세 정보를 불러올 수 없습니다.')
  }
}

function transferLeadership(member: Member) {
  memberToTransfer.value = member
  showTransferModal.value = true
  showMemberDetailModal.value = false
}

async function transferLeadershipConfirm() {
  if (memberToTransfer.value) {
    try {
      console.log('🔍 권한 양도 API 호출:', { studyId: props.studyId, memberId: memberToTransfer.value.id })
      await transferOwnership(props.studyId, memberToTransfer.value.id)
      console.log('✅ 권한 양도 성공:', memberToTransfer.value.id)

      // 멤버 목록 다시 로드
      await loadMembers()

      showTransferModal.value = false
      memberToTransfer.value = null
      showAlert('성공', '권한이 성공적으로 양도되었습니다.')
    } catch (error) {
      console.error('❌ 권한 양도 실패:', error)
      showAlert('오류', '권한 양도에 실패했습니다.')
    }
  }
}

function reclaimLeadership() {
  showReclaimModal.value = true
}

async function reclaimLeadershipConfirm() {
  try {
    // TODO: 권한 회수 API 호출
    console.log('권한 회수')
    showReclaimModal.value = false
    showAlert('성공', '권한이 성공적으로 회수되었습니다.')
  } catch (error) {
    console.error('권한 회수 실패:', error)
    showAlert('오류', '권한 회수에 실패했습니다.')
  }
}

function getStatusClass(rate: number) {
  if (rate >= 90) return 'excellent';
  if (rate >= 80) return 'good';
  if (rate >= 70) return 'fair';
  if (rate >= 60) return 'poor';
  return 'bad';
}

function getStatusText(rate: number) {
  if (rate >= 90) return '최고';
  if (rate >= 80) return '우수';
  if (rate >= 70) return '보통';
  if (rate >= 60) return '미흡';
  return '불량';
}
</script>
<style scoped>
.member-tab {
  height: 100%;
}

.member-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.member-header h3 {
  margin: 0;
  color: #212529;
}

.member-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  background-color: #f8f9fa;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.member-list {
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.member-list.scrollable {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #d79c94 #f8f9fa;
}

.member-list.scrollable::-webkit-scrollbar {
  width: 6px;
}

.member-list.scrollable::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 3px;
}

.member-list.scrollable::-webkit-scrollbar-thumb {
  background: #d79c94;
  border-radius: 3px;
}

.member-list.scrollable::-webkit-scrollbar-thumb:hover {
  background: #c88a82;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.member-item:last-child {
  border-bottom: none;
}

.member-item:hover {
  background-color: #f8f9fa;
}

.member-item.leader {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.member-avatar {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.leader-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ffd700;
  color: #333;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.member-info {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #212529;
  margin-bottom: 0.25rem;
}

.member-role {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.temp-leader-info {
  background-color: #ff9800;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.member-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat {
  font-size: 0.85rem;
  color: #6c757d;
  background-color: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.member-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

 .modal-content {
   padding: 1.5rem;
 }

 .member-detail {
   display: flex;
   flex-direction: column;
   gap: 1.5rem;
 }

 /* 프로필 섹션 */
 .profile-section {
   display: flex;
   align-items: center;
   gap: 1rem;
   padding-bottom: 1.5rem;
   border-bottom: 1px solid #e9ecef;
 }

 .detail-avatar {
   width: 70px;
   height: 70px;
   border-radius: 50%;
   overflow: hidden;
   flex-shrink: 0;
 }

 .detail-avatar img {
   width: 100%;
   height: 100%;
   object-fit: cover;
 }

 .profile-info {
   flex: 1;
 }

 .member-name {
   margin: 0 0 0.5rem 0;
   font-size: 1.25rem;
   font-weight: 600;
   color: #212529;
 }

 .role-status-row {
   display: flex;
   align-items: center;
   gap: 0.5rem;
   margin-bottom: 0.5rem;
   flex-wrap: wrap;
 }

 .role-badge {
   background-color: #e9ecef;
   color: #495057;
   padding: 0.25rem 0.75rem;
   border-radius: 12px;
   font-size: 0.85rem;
   font-weight: 500;
 }

 .role-badge.leader {
   background-color: #fff3cd;
   color: #856404;
   border: 1px solid #ffeaa7;
 }

 .temp-badge {
   background-color: #ff9800;
   color: white;
   padding: 0.2rem 0.5rem;
   border-radius: 8px;
   font-size: 0.75rem;
   font-weight: 500;
 }

 .status-badge {
   display: inline-block;
   padding: 0.3rem 0.6rem;
   border-radius: 12px;
   font-weight: 500;
   font-size: 0.8rem;
 }

 .status-badge.excellent {
   background-color: #d4edda;
   color: #155724;
 }

 .status-badge.good {
   background-color: #d1ecf1;
   color: #0c5460;
 }

 .status-badge.fair {
   background-color: #fff3cd;
   color: #856404;
 }

 .status-badge.poor {
   background-color: #f8d7da;
   color: #721c24;
 }

 .status-badge.bad {
   background-color: #f5c6cb;
   color: #721c24;
 }

 /* 통계 섹션 */
 .stats-section {
   padding-bottom: 1.5rem;
   border-bottom: 1px solid #e9ecef;
 }

 .stats-grid {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 1rem;
 }

 .stat-item {
   text-align: center;
   padding: 1rem;
   background-color: #f8f9fa;
   border-radius: 8px;
   border: 1px solid #e9ecef;
 }

 .stat-number {
   font-size: 1.5rem;
   font-weight: 700;
   color: #7134ff;
   margin-bottom: 0.25rem;
 }

 .stat-label {
   font-size: 0.85rem;
   color: #6c757d;
   font-weight: 500;
 }

 /* 정보 섹션 */
 .info-section {
   padding-bottom: 1rem;
 }

 .info-grid {
   display: flex;
   flex-direction: column;
   gap: 0.75rem;
 }

 .info-row {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0.75rem;
   background-color: #f8f9fa;
   border-radius: 6px;
   border: 1px solid #e9ecef;
 }

 .info-label {
   font-weight: 500;
   color: #6c757d;
   font-size: 0.9rem;
 }

 .info-value {
   font-weight: 600;
   color: #212529;
   font-size: 0.9rem;
 }



.transfer-info {
  margin-bottom: 1.5rem;
}

.transfer-details {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.transfer-details p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #495057;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}

 /* 반응형 디자인 */
 @media (max-width: 768px) {
   .member-header {
     flex-direction: column;
     gap: 1rem;
     align-items: flex-start;
   }

   .member-stats {
     flex-wrap: wrap;
   }

   .member-item {
     flex-direction: column;
     text-align: center;
     gap: 1rem;
   }

   .member-actions {
     flex-direction: column;
     width: 100%;
   }

   .member-stats {
     justify-content: center;
   }

   /* 모달 반응형 */
   .profile-section {
     flex-direction: column;
     text-align: center;
   }

   .stats-grid {
     grid-template-columns: repeat(2, 1fr);
   }

   .info-row {
     flex-direction: column;
     align-items: flex-start;
     gap: 0.25rem;
   }


 }
</style>
