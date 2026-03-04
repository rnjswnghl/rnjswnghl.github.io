<template>
  <div class="notice-tab">
    <div class="notice-header">
      <div class="view-toggle">
        <button
          :class="['view-btn', { active: viewMode === 'list' }]"
          @click="viewMode = 'list'"
        >
          📋 목록 보기
        </button>
        <button
          :class="['view-btn', { active: viewMode === 'monthly' }]"
          @click="viewMode = 'monthly'"
        >
          📅 월별 보기
        </button>
        <button
          :class="['view-btn', { active: viewMode === 'weekly' }]"
          @click="viewMode = 'weekly'"
        >
        📑 주차별 보기
        </button>
      </div>
      <Button
        v-if="isLeader"
        variant="primary"
        size="sm"
        @click="showNoticeModal = true"
      >
        📝 공지사항 작성
      </Button>
    </div>

    <!-- 목록 보기 -->
    <div v-if="viewMode === 'list'" class="notice-list">
      <div
        v-for="notice in notices"
        :key="notice.id"
        class="notice-item"
      >
        <div class="notice-header-info" @click="toggleNotice(notice.id)">
          <div class="notice-main">
            <h3 class="notice-title">{{ notice.title }}</h3>
            <div class="meta-info">
              <span class="notice-writer">
                <span class="writer-icon">👤</span>
                {{ notice.authorName }}
              </span>
              <span class="notice-date">
                <span class="date-icon">📅</span>
                {{ formatDate(notice.createdAt) }}
              </span>
            </div>
          </div>
          <div class="notice-toggle">
            <span class="toggle-icon">{{ expandedNotices.includes(notice.id) ? '▼' : '▶' }}</span>
          </div>
        </div>
        <div
          class="notice-content"
          :class="{ 'expanded': expandedNotices.includes(notice.id) }"
        >
          <div class="notice-text">{{ notice.notice }}</div>
          <div class="notice-actions" v-if="isLeader && expandedNotices.includes(notice.id)">
            <Button
              variant="outline"
              size="sm"
              @click="editNotice(notice)"
            >
              수정
            </Button>
            <Button
              variant="danger"
              size="sm"
              @click="deleteNotice(notice.id)"
            >
              삭제
            </Button>
          </div>
        </div>
      </div>

      <div v-if="notices.length === 0" class="no-notices">
        <p>등록된 공지사항이 없습니다.</p>
      </div>
    </div>

    <!-- 월별 보기 -->
    <div v-if="viewMode === 'monthly'" class="monthly-view">
      <div v-for="monthGroup in monthlyGroups" :key="monthGroup.month" class="month-group">
        <div class="month-header">
          <h3 class="month-title">{{ monthGroup.monthLabel }}</h3>
          <span class="notice-count">{{ monthGroup.notices.length }}개의 공지사항</span>
        </div>
        <div class="month-notices">
          <div
            v-for="notice in monthGroup.notices"
            :key="notice.id"
            class="notice-item"
          >
            <div class="notice-header-info" @click="toggleNotice(notice.id)">
              <div class="notice-main">
                <h3 class="notice-title">{{ notice.title }}</h3>
                <div class="meta-info">
                  <span class="notice-writer">
                    <span class="writer-icon">👤</span>
                    {{ notice.authorName }}
                  </span>
                  <span class="notice-date">
                    <span class="date-icon">📅</span>
                    {{ formatDate(notice.createdAt) }}
                  </span>
                </div>
              </div>
              <div class="notice-toggle">
                <span class="toggle-icon">{{ expandedNotices.includes(notice.id) ? '▼' : '▶' }}</span>
              </div>
            </div>
            <div
              class="notice-content"
              :class="{ 'expanded': expandedNotices.includes(notice.id) }"
            >
              <div class="notice-text">{{ notice.notice }}</div>
              <div class="notice-actions" v-if="isLeader && expandedNotices.includes(notice.id)">
                <Button
                  variant="outline"
                  size="sm"
                  @click="editNotice(notice)"
                >
                  수정
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  @click="deleteNotice(notice.id)"
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 주차별 보기 -->
    <div v-if="viewMode === 'weekly'" class="weekly-view">
      <div v-for="weekGroup in weeklyGroups" :key="weekGroup.week" class="week-group">
        <div class="week-header">
          <h3 class="week-title">{{ weekGroup.weekLabel }}</h3>
          <span class="notice-count">{{ weekGroup.notices.length }}개의 공지사항</span>
        </div>
        <div class="week-notices">
          <div
            v-for="notice in weekGroup.notices"
            :key="notice.id"
            class="notice-item"
          >
            <div class="notice-header-info" @click="toggleNotice(notice.id)">
              <div class="notice-main">
                <h3 class="notice-title">{{ notice.title }}</h3>
                <div class="meta-info">
                  <span class="notice-writer">
                    <span class="writer-icon">👤</span>
                    {{ notice.authorName }}
                  </span>
                  <span class="notice-date">
                    <span class="date-icon">📅</span>
                    {{ formatDate(notice.createdAt) }}
                  </span>
                </div>
              </div>
              <div class="notice-toggle">
                <span class="toggle-icon">{{ expandedNotices.includes(notice.id) ? '▼' : '▶' }}</span>
              </div>
            </div>
            <div
              class="notice-content"
              :class="{ 'expanded': expandedNotices.includes(notice.id) }"
            >
              <div class="notice-text">{{ notice.notice }}</div>
              <div class="notice-actions" v-if="isLeader && expandedNotices.includes(notice.id)">
                <Button
                  variant="outline"
                  size="sm"
                  @click="editNotice(notice)"
                >
                  수정
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  @click="deleteNotice(notice.id)"
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 공지사항 작성/수정 모달 -->
    <Modal :visible="showNoticeModal" @close="showNoticeModal = false">
      <template #title>{{ isEditing ? '공지사항 수정' : '공지사항 작성' }}</template>
      <div class="form-group">
        <label>제목</label>
        <input
          v-model="newNotice.title"
          type="text"
          class="form-control"
          placeholder="공지사항 제목"
        />
      </div>
      <div class="form-group">
        <label>내용</label>
        <textarea
          v-model="newNotice.content"
          class="form-control"
          rows="12"
          placeholder="공지사항 내용을 입력하세요

예시:
1. 일시: 8월 3일 (토) 오후 7시~9시 (Zoom)
2. 주제: 해외 기업 문화 및 자기 PR 스피치
3. 과제: 각자 목표 기업 선정 후 2분 스피치 준비
4. 준비사항: 카메라 ON, 배경 소음 최소화"
        ></textarea>
      </div>
      <template #footer>
        <Button variant="primary" @click="submitNotice">
          {{ isEditing ? '수정하기' : '공지하기' }}
        </Button>
        <Button variant="outline" @click="cancelEdit">취소</Button>
      </template>
    </Modal>

    <!-- 알림 모달 -->
    <Modal :visible="showAlertModal" @close="showAlertModal = false">
      <template #title>{{ alertTitle }}</template>
      <p>{{ alertMessage }}</p>
    </Modal>

    <!-- 삭제 확인 모달 -->
    <Modal :visible="showDeleteModal" @close="showDeleteModal = false">
      <template #title>공지사항 삭제</template>
      <div class="modal-content">
        <p>정말로 이 공지사항을 삭제하시겠습니까?</p>
        <p class="delete-warning">삭제된 공지사항은 복구할 수 없습니다.</p>
        <div class="modal-actions">
          <Button variant="danger" @click="confirmDelete">삭제하기</Button>
          <Button variant="outline" @click="showDeleteModal = false">취소</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { getNotices, createNotice, updateNotice, deleteNotice as deleteNoticeApi } from '@/api/study'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'

interface Notice {
  id: number
  title: string
  notice: string  // content 대신 notice 필드 사용
  authorName: string  // writer 대신 authorName 사용
  createdAt: string  // created_at 대신 createdAt 사용
  userId: number
  groupId: number
}

interface Props {
  isLeader?: boolean
  studyId: number
}

const props = withDefaults(defineProps<Props>(), {
  isLeader: false
})

// studyId를 groupId로 사용 (API 스펙에 맞춤)
const groupId = computed(() => props.studyId)

const showNoticeModal = ref(false)
const notices = ref<Notice[]>([])
const allNotices = ref<Notice[]>([]) // 전체 공지사항
const isEditing = ref(false)
const editingNoticeId = ref<number | null>(null)

// 보기 모드
const viewMode = ref<'list' | 'monthly' | 'weekly'>('list')

// 알림 모달 상태
const showAlertModal = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

// 삭제 확인 모달 상태
const showDeleteModal = ref(false)
const noticeToDelete = ref<number | null>(null)

const newNotice = ref({
  title: '',
  content: ''
})

// 접었다 펼 수 있는 기능을 위한 상태
const expandedNotices = ref<number[]>([])

// 주차 키 생성 함수
function getWeekKey(date: Date): string {
  const year = date.getFullYear()
  const startOfYear = new Date(year, 0, 1)
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  const weekNum = Math.ceil((days + startOfYear.getDay() + 1) / 7)
  return `${year}-W${weekNum}`
}

// 월별 그룹화
const monthlyGroups = computed(() => {
  const groups: { [key: string]: Notice[] } = {}

  allNotices.value.forEach(notice => {
    const date = new Date(notice.createdAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!groups[monthKey]) {
      groups[monthKey] = []
    }
    groups[monthKey].push(notice)
  })

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a)) // 최신순 정렬
    .map(([month, notices]) => {
      const [year, monthNum] = month.split('-')
      return {
        month,
        monthLabel: `${year}년 ${parseInt(monthNum)}월`,
        notices: notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }
    })
})

// 주차별 그룹화
const weeklyGroups = computed(() => {
  const groups: { [key: string]: Notice[] } = {}

  allNotices.value.forEach(notice => {
    const date = new Date(notice.createdAt)
    const weekKey = getWeekKey(date)

    if (!groups[weekKey]) {
      groups[weekKey] = []
    }
    groups[weekKey].push(notice)
  })

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a)) // 최신순 정렬
    .map(([week, notices]) => {
      const [year, weekNum] = week.split('-W')
      return {
        week,
        weekLabel: `${year}년 ${weekNum}주차`,
        notices: notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }
    })
})

onMounted(() => {
  loadNotices()
})

function showAlert(title: string, message: string) {
  alertTitle.value = title
  alertMessage.value = message
  showAlertModal.value = true
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

function toggleNotice(noticeId: number) {
  const index = expandedNotices.value.indexOf(noticeId)
  if (index > -1) {
    expandedNotices.value.splice(index, 1)
  } else {
    expandedNotices.value.push(noticeId)
  }
}

async function loadNotices() {
  try {
    const response = await getNotices(groupId.value)
    console.log('공지사항 API 응답:', response)

    // 백엔드 응답 구조에 따라 데이터 추출
    // response.data.data 또는 response.data 형태로 올 수 있음
    const responseData = response as any
    const noticesData = responseData.data?.data || responseData.data || []

    // 최신순으로 정렬 (created_at 기준)
    const sortedNotices = noticesData.sort((a: Notice, b: Notice) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

        // 전체 공지사항 저장
    allNotices.value = sortedNotices
    notices.value = sortedNotices

    console.log('정렬된 공지사항:', notices.value)
  } catch (error) {
    console.error('공지사항 로드 실패:', error)
    showAlert('오류', '공지사항을 불러올 수 없습니다.')
    // 에러 시 빈 배열로 초기화
    allNotices.value = []
    notices.value = []
  }
}

function editNotice(notice: Notice) {
  isEditing.value = true
  editingNoticeId.value = notice.id
  newNotice.value = {
    title: notice.title,
    content: notice.notice
  }
  showNoticeModal.value = true
}

function cancelEdit() {
  isEditing.value = false
  editingNoticeId.value = null
  newNotice.value = { title: '', content: '' }
  showNoticeModal.value = false
}

async function submitNotice() {
  if (!newNotice.value.title || !newNotice.value.content) {
    showAlert('입력 오류', '제목과 내용을 모두 입력해주세요.')
    return
  }

  try {
    if (isEditing.value && editingNoticeId.value) {
      // 수정
      await updateNotice(groupId.value, editingNoticeId.value, {
        title: newNotice.value.title,
        notice: newNotice.value.content
      })

      showAlert('성공', '공지사항이 성공적으로 수정되었습니다.')
    } else {
      // 새로 작성
      await createNotice(groupId.value, {
        title: newNotice.value.title,
        notice: newNotice.value.content
      })

      showAlert('성공', '공지사항이 성공적으로 작성되었습니다.')
    }

    // 성공 후 폼 초기화 및 모달 닫기
    newNotice.value = { title: '', content: '' }
    isEditing.value = false
    editingNoticeId.value = null
    showNoticeModal.value = false

    // 목록 다시 로드
    await loadNotices()
  } catch (error) {
    console.error('공지사항 처리 실패:', error)
    showAlert('오류', isEditing.value ? '공지사항 수정에 실패했습니다.' : '공지사항 작성에 실패했습니다.')
  }
}

function deleteNotice(noticeId: number) {
  noticeToDelete.value = noticeId
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (!noticeToDelete.value) return

  try {
    await deleteNoticeApi(groupId.value, noticeToDelete.value)
    console.log('공지사항 삭제 성공:', noticeToDelete.value)
    showAlert('성공', '공지사항이 성공적으로 삭제되었습니다.')

    // 모달 닫기
    showDeleteModal.value = false
    noticeToDelete.value = null

    // 목록 다시 로드
    await loadNotices()
  } catch (error) {
    console.error('공지사항 삭제 실패:', error)
    showAlert('오류', '공지사항 삭제에 실패했습니다.')
  }
}
</script>

<style scoped>
.notice-tab {
  height: 100%;
}

.notice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.notice-date-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1rem;
  margin-right: 1rem;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.notice-item {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notice-header-info {
  margin-bottom: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: background-color 0.2s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.notice-header-info:hover {
  background-color: #f8f9fa;
}

.notice-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notice-title {
  color: #d79c94;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.notice-date,
.notice-writer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  background-color: #f8f9fa;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
}

.notice-writer {
  color: #d79c94;
  background-color: #fef7f7;
  border-color: #f0e6e4;
}

.notice-writer:hover {
  background-color: #f5e8e6;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(215, 156, 148, 0.1);
}

.notice-date:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.writer-icon,
.date-icon {
  font-size: 0.8rem;
  opacity: 0.8;
}

.notice-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.notice-content {
  color: #495057;
  line-height: 1.6;
  white-space: pre-wrap;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 1rem;
  position: relative;
}

.notice-content.expanded {
  max-height: 1000px;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  margin-top: 1rem;
}

.notice-text {
  margin-bottom: 1rem;
}

.notice-toggle {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.toggle-icon {
  font-size: 1.2rem;
  color: #6c757d;
  transition: transform 0.2s ease;
}

.no-notices {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
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
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #d79c94;
  box-shadow: 0 0 0 0.2rem rgba(215, 156, 148, 0.25);
}

/* 삭제 확인 모달 스타일 */
.delete-warning {
  color: #dc3545;
  font-weight: 600;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 0.5rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.view-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  color: #6c757d;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-btn:hover {
  border-color: #d79c94;
  color: #d79c94;
  transform: translateY(-1px);
}

.view-btn.active {
  background: #d79c94;
  border-color: #d79c94;
  color: white;
  box-shadow: 0 4px 8px rgba(215, 156, 148, 0.3);
}

/* 월별/주차별 보기 스타일 */
.monthly-view,
.weekly-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.month-group,
.week-group {
  background: white;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.month-header,
.week-header {
  background: linear-gradient(135deg, #d79c94 0%, #c88a82 100%);
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.month-title,
.week-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.notice-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.month-notices,
.week-notices {
  padding: 1rem;
}

.month-notices .notice-item,
.week-notices .notice-item {
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  transition: all 0.2s ease;
}

.month-notices .notice-item:hover,
.week-notices .notice-item:hover {
  border-color: #d79c94;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.15);
}

.month-notices .notice-item:last-child,
.week-notices .notice-item:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .notice-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .view-toggle {
    flex-direction: column;
    width: 100%;
  }

  .view-btn {
    width: 100%;
    justify-content: center;
  }

  .notice-main {
    gap: 0.5rem;
  }

  .meta-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .notice-date,
  .notice-writer {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }

  .notice-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
