<template>
  <div class="board-tab">
    <div class="board-header">
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
      <Button variant="primary" size="sm" @click="showPostModal = true">
        ✏️ 게시하기
      </Button>
    </div>

    <!-- 목록 보기 -->
    <div v-if="viewMode === 'list'" class="board-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-header-info" @click="togglePost(post.id)">
          <div class="post-main">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="meta-info">
              <span class="post-writer">
                <span class="writer-icon">👤</span>
                {{ post.writer }}
              </span>
              <span class="post-date">
                <span class="date-icon">📅</span>
                {{ post.created_at }}
              </span>
            </div>
          </div>
          <div class="post-toggle">
            <span class="toggle-icon">{{ expandedPosts.includes(post.id) ? '▼' : '▶' }}</span>
          </div>
        </div>
        <div
          class="post-content"
          :class="{ 'expanded': expandedPosts.includes(post.id) }"
        >
          <div class="post-text">{{ post.content }}</div>

          <!-- 첨부 파일 섹션 -->
          <div v-if="post.attachments && post.attachments.length > 0" class="post-attachments">
            <h5 class="attachments-title">📎 첨부 파일</h5>
            <div class="attachments-list">
              <div
                v-for="file in post.attachments"
                :key="file.id"
                class="attachment-item"
              >
                <span class="attachment-icon">{{ getFileIcon(file.type) }}</span>
                <span class="attachment-name">{{ file.name }}</span>
                <span class="attachment-size">{{ file.size }}</span>
                <Button variant="outline" size="sm" @click="downloadAttachment(file)">
                  다운로드
                </Button>
              </div>
            </div>
          </div>

          <div class="post-actions" v-if="expandedPosts.includes(post.id)">
            <div class="post-actions-right">
              <Button
                v-if="canEditPost(post)"
                variant="outline"
                size="sm"
                @click="editPost(post)"
              >
                수정
              </Button>
              <Button
                v-if="canDeletePost(post)"
                variant="danger"
                size="sm"
                @click="deletePost(post.id)"
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="posts.length === 0" class="no-posts">
        <p>게시글이 없습니다.</p>
      </div>
    </div>

    <!-- 월별 보기 -->
    <div v-if="viewMode === 'monthly'" class="monthly-view">
      <div v-for="monthGroup in monthlyGroups" :key="monthGroup.month" class="month-group">
        <div class="month-header">
          <h3 class="month-title">{{ monthGroup.monthLabel }}</h3>
          <span class="post-count">{{ monthGroup.posts.length }}개의 게시글</span>
        </div>
        <div class="month-posts">
          <div v-for="post in monthGroup.posts" :key="post.id" class="post-item">
            <div class="post-header" @click="togglePost(post.id)">
              <h4 class="post-title">{{ post.title }}</h4>
              <div class="post-header-right">
                <span class="post-date">{{ post.created_at }}</span>
                <div class="post-toggle">
                  <span class="toggle-icon">{{ expandedPosts.includes(post.id) ? '▼' : '▶' }}</span>
                </div>
              </div>
            </div>
            <div
              class="post-content"
              :class="{ 'expanded': expandedPosts.includes(post.id) }"
            >
              {{ post.content }}

              <!-- 첨부 파일 섹션 -->
              <div v-if="post.attachments && post.attachments.length > 0" class="post-attachments">
                <h5 class="attachments-title">📎 첨부 파일</h5>
                <div class="attachments-list">
                  <div
                    v-for="file in post.attachments"
                    :key="file.id"
                    class="attachment-item"
                  >
                    <span class="attachment-icon">{{ getFileIcon(file.type) }}</span>
                    <span class="attachment-name">{{ file.name }}</span>
                    <span class="attachment-size">{{ file.size }}</span>
                    <Button variant="outline" size="sm" @click="downloadAttachment(file)">
                      다운로드
                    </Button>
                  </div>
                </div>
              </div>

              <div class="post-footer">
                <span class="post-writer">{{ post.writer }}</span>
                <div class="post-actions">
                  <Button
                    v-if="canEditPost(post)"
                    variant="outline"
                    size="sm"
                    @click="editPost(post)"
                  >
                    수정
                  </Button>
                  <Button
                    v-if="canDeletePost(post)"
                    variant="danger"
                    size="sm"
                    @click="deletePost(post.id)"
                  >
                    삭제
                  </Button>
                </div>
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
          <span class="post-count">{{ weekGroup.posts.length }}개의 게시글</span>
        </div>
        <div class="week-posts">
          <div v-for="post in weekGroup.posts" :key="post.id" class="post-item">
            <div class="post-header" @click="togglePost(post.id)">
              <h4 class="post-title">{{ post.title }}</h4>
              <div class="post-header-right">
                <span class="post-date">{{ post.created_at }}</span>
                <div class="post-toggle">
                  <span class="toggle-icon">{{ expandedPosts.includes(post.id) ? '▼' : '▶' }}</span>
                </div>
              </div>
            </div>
            <div
              class="post-content"
              :class="{ 'expanded': expandedPosts.includes(post.id) }"
            >
              {{ post.content }}

              <!-- 첨부 파일 섹션 -->
              <div v-if="post.attachments && post.attachments.length > 0" class="post-attachments">
                <h5 class="attachments-title">📎 첨부 파일</h5>
                <div class="attachments-list">
                  <div
                    v-for="file in post.attachments"
                    :key="file.id"
                    class="attachment-item"
                  >
                    <span class="attachment-icon">{{ getFileIcon(file.type) }}</span>
                    <span class="attachment-name">{{ file.name }}</span>
                    <span class="attachment-size">{{ file.size }}</span>
                    <Button variant="outline" size="sm" @click="downloadAttachment(file)">
                      다운로드
                    </Button>
                  </div>
                </div>
              </div>

              <div class="post-footer">
                <span class="post-writer">{{ post.writer }}</span>
                <div class="post-actions">
                  <Button
                    v-if="canEditPost(post)"
                    variant="outline"
                    size="sm"
                    @click="editPost(post)"
                  >
                    수정
                  </Button>
                  <Button
                    v-if="canDeletePost(post)"
                    variant="danger"
                    size="sm"
                    @click="deletePost(post.id)"
                  >
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시글 작성/수정 모달 -->
    <Modal :visible="showPostModal" @close="showPostModal = false">
      <template #title>{{ isEditing ? '게시글 수정' : '게시글 작성' }}</template>
      <div class="form-group">
        <label>제목</label>
        <input
          v-model="newPost.title"
          type="text"
          class="form-control"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div class="form-group">
        <label>내용</label>
        <textarea
          v-model="newPost.content"
          class="form-control"
          rows="8"
          placeholder="내용을 입력하세요

예시:
오늘 스터디에서 많은 것을 배웠습니다.
영어 면접 준비에 대한 구체적인 팁들을 얻을 수 있어서 정말 유익했어요.

주요 학습 내용:
- 자기소개 스피치 작성법
- 면접 질문 대응 전략
- 영어 발음 개선 방법

다음 주도 기대됩니다!"
        ></textarea>
      </div>

      <!-- 파일 첨부 섹션 -->
      <div class="form-group">
        <label>파일 첨부</label>
        <div class="file-attachment-area">
          <input
            ref="attachmentInput"
            type="file"
            @change="handleFileAttachment"
            style="display: none"
            multiple
          />
          <Button variant="outline" @click="attachmentInput?.click()">
            📎 파일 선택
          </Button>
          <div v-if="newPost.attachments.length > 0" class="selected-attachments">
            <div
              v-for="(file, index) in newPost.attachments"
              :key="index"
              class="selected-file"
            >
              <span>{{ file.name }}</span>
              <Button
                variant="danger"
                size="sm"
                @click="removeAttachment(index)"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="primary" @click="submitPost">
          {{ isEditing ? '수정하기' : '게시하기' }}
        </Button>
        <Button variant="outline" @click="cancelEdit">취소</Button>
      </template>
    </Modal>

    <!-- 알림 모달 -->
    <Modal :visible="showAlertModal" @close="showAlertModal = false">
      <template #title>{{ alertTitle }}</template>
      <p>{{ alertMessage }}</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getPosts, createPost, updatePost, deletePost as deletePostApi } from '@/api/study'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import { useUserStore } from '@/stores/user'

interface Attachment {
  id: number
  name: string
  type: string
  size: string
  url: string
}

interface Post {
  id: number
  title: string
  content: string
  writer: string
  created_at: string
  attachments?: Attachment[]
}

interface Props {
  isLeader?: boolean
  studyId: number
  currentUserId?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLeader: false,
  currentUserId: 1
})

const userStore = useUserStore()

const showPostModal = ref(false)
const isEditing = ref(false)
const editingPostId = ref<number | null>(null)
const attachmentInput = ref<HTMLInputElement | null>(null)
const posts = ref<Post[]>([])
const allPosts = ref<Post[]>([]) // 전체 게시글

// 보기 모드
const viewMode = ref<'list' | 'monthly' | 'weekly'>('list')

// 알림 모달 상태
const showAlertModal = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

const newPost = ref({
  title: '',
  content: '',
  attachments: [] as File[]
})

// 접었다 펼 수 있는 기능을 위한 상태
const expandedPosts = ref<number[]>([])

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
  const groups: { [key: string]: Post[] } = {}

  allPosts.value.forEach(post => {
    const date = new Date(post.created_at)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!groups[monthKey]) {
      groups[monthKey] = []
    }
    groups[monthKey].push(post)
  })

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a)) // 최신순 정렬
    .map(([month, posts]) => {
      const [year, monthNum] = month.split('-')
      return {
        month,
        monthLabel: `${year}년 ${parseInt(monthNum)}월`,
        posts: posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      }
    })
})

// 주차별 그룹화
const weeklyGroups = computed(() => {
  const groups: { [key: string]: Post[] } = {}

  allPosts.value.forEach(post => {
    const date = new Date(post.created_at)
    const weekKey = getWeekKey(date)

    if (!groups[weekKey]) {
      groups[weekKey] = []
    }
    groups[weekKey].push(post)
  })

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a)) // 최신순 정렬
    .map(([week, posts]) => {
      const [year, weekNum] = week.split('-W')
      return {
        week,
        weekLabel: `${year}년 ${weekNum}주차`,
        posts: posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      }
    })
})

onMounted(() => {
  loadPosts()
})

function showAlert(title: string, message: string) {
  alertTitle.value = title
  alertMessage.value = message
  showAlertModal.value = true
}

function togglePost(postId: number) {
  const index = expandedPosts.value.indexOf(postId)
  if (index > -1) {
    expandedPosts.value.splice(index, 1)
  } else {
    expandedPosts.value.push(postId)
  }
}

async function loadPosts() {
  try {
    console.log('🔍 게시글 목록 로드 시작:', props.studyId)
    const response = await getPosts(props.studyId)
    console.log('📄 게시글 API 응답:', response)
    console.log('📄 게시글 데이터:', response.data)

    // 백엔드 API 응답 구조: {data: [...], status: 'SUCCESS'}
    const rawPostsData = response.data?.data || []
    console.log('📄 원본 게시글 데이터:', rawPostsData)

    // 서버 응답을 프론트엔드 Post 인터페이스에 맞게 변환
    const postsData = rawPostsData.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.notice, // 서버의 "notice"를 "content"로 매핑
      writer: post.authorName, // 서버의 "authorName"을 "writer"로 매핑
      created_at: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : '' // 날짜만 표시
    })) as Post[]
    console.log('📄 변환된 게시글 데이터:', postsData)

    allPosts.value = postsData
    posts.value = postsData
  } catch (error) {
    console.error('❌ 게시글 로드 실패:', error)
    // API 호출 실패 시 빈 배열로 설정
    allPosts.value = []
    posts.value = []
  }
}

function canEditPost(post: Post): boolean {
  // 여러 방법으로 현재 사용자 정보 가져오기
  const currentUser = userStore.user
  const profile = userStore.profile
  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

  console.log('🔍 canEditPost 확인:', {
    postWriter: post.writer,
    currentUserNickname: currentUser?.nickname,
    profileNickname: profile?.nickname,
    storedUserNickname: storedUser?.nickname,
    isLeader: props.isLeader
  })

  // 여러 소스에서 닉네임 확인
  const currentNickname = currentUser?.nickname || profile?.nickname || storedUser?.nickname
  return props.isLeader || (currentNickname && post.writer === currentNickname) || false
}

function canDeletePost(post: Post): boolean {
  // 여러 방법으로 현재 사용자 정보 가져오기
  const currentUser = userStore.user
  const profile = userStore.profile
  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

  console.log('🔍 canDeletePost 확인:', {
    postWriter: post.writer,
    currentUserNickname: currentUser?.nickname,
    profileNickname: profile?.nickname,
    storedUserNickname: storedUser?.nickname,
    isLeader: props.isLeader
  })

  // 여러 소스에서 닉네임 확인
  const currentNickname = currentUser?.nickname || profile?.nickname || storedUser?.nickname
  return props.isLeader || (currentNickname && post.writer === currentNickname) || false
}

function editPost(post: Post) {
  isEditing.value = true
  editingPostId.value = post.id
  newPost.value = {
    title: post.title,
    content: post.content,
    attachments: []
  }
  showPostModal.value = true
}

function cancelEdit() {
  isEditing.value = false
  editingPostId.value = null
  newPost.value = { title: '', content: '', attachments: [] }
  showPostModal.value = false
}

function getFileIcon(fileType: string): string {
  const iconMap: Record<string, string> = {
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'ppt': '📊',
    'pptx': '📊',
    'xls': '📈',
    'xlsx': '📈',
    'image': '🖼️',
    'audio': '🎵',
    'video': '🎥'
  }
  return iconMap[fileType] || '📁'
}

function handleFileAttachment(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      newPost.value.attachments.push(target.files[i])
    }
  }
}

function removeAttachment(index: number) {
  newPost.value.attachments.splice(index, 1)
}

async function submitPost() {
  if (!newPost.value.title || !newPost.value.content) {
    showAlert('입력 오류', '제목과 내용을 모두 입력해주세요.')
    return
  }

  try {
    if (isEditing.value && editingPostId.value) {
      // 수정
      const updateData = {
        title: newPost.value.title,
        notice: newPost.value.content // 서버에서 "notice" 필드로 받으므로 "content"를 "notice"로 매핑
      }
      console.log('📝 게시글 수정 데이터:', updateData)
      console.log('📝 게시글 수정 API 호출:', { studyId: props.studyId, postId: editingPostId.value, data: updateData })

      const response = await updatePost(props.studyId, editingPostId.value, updateData as any)
      console.log('📝 게시글 수정 응답:', response.data)

      // 서버 응답을 사용하여 목록에서 해당 게시글 업데이트
      const updatedPost = response.data.data
      const index = posts.value.findIndex(p => p.id === editingPostId.value)
      if (index !== -1) {
        posts.value[index] = {
          ...posts.value[index],
          title: updatedPost.title,
          content: updatedPost.notice, // 서버의 "notice"를 "content"로 매핑
          created_at: updatedPost.createdAt ? new Date(updatedPost.createdAt).toISOString().split('T')[0] : '' // 날짜만 표시
        }
      }

      showAlert('성공', '게시글이 성공적으로 수정되었습니다.')
    } else {
      // 새로 작성
      const postData = {
        title: newPost.value.title,
        notice: newPost.value.content // 서버에서 "notice" 필드로 받으므로 "content"를 "notice"로 매핑
      }
      console.log('📝 게시글 작성 데이터:', postData)
      console.log('📝 게시글 작성 API 호출:', { studyId: props.studyId, data: postData })

      const response = await createPost(props.studyId, postData as any)
      console.log('📝 게시글 작성 응답:', response.data)

      // 서버 응답을 사용하여 새 게시글을 목록에 추가
      const createdPost = response.data.data
      const post: Post = {
        id: createdPost.id,
        title: createdPost.title,
        content: createdPost.notice, // 서버의 "notice"를 "content"로 매핑
        writer: createdPost.authorName, // 서버의 "authorName"을 "writer"로 매핑
        created_at: createdPost.createdAt ? new Date(createdPost.createdAt).toISOString().split('T')[0] : '', // 날짜만 표시
        attachments: newPost.value.attachments.map((file, index) => ({
          id: Date.now() + index,
          name: file.name,
          type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
          size: formatFileSize(file.size),
          url: '#'
        }))
      }

      posts.value.unshift(post)
      showAlert('성공', '게시글이 성공적으로 작성되었습니다.')
    }

    newPost.value = { title: '', content: '', attachments: [] }
    isEditing.value = false
    editingPostId.value = null
    showPostModal.value = false
  } catch (error) {
    console.error('게시글 처리 실패:', error)
    showAlert('오류', isEditing.value ? '게시글 수정에 실패했습니다.' : '게시글 작성에 실패했습니다.')
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function downloadAttachment(file: Attachment) {
  console.log('첨부파일 다운로드:', file.name)
  // TODO: 실제 파일 다운로드 로직
}

async function deletePost(postId: number) {
  console.log('🔍 deletePost 호출됨:', { postId, studyId: props.studyId })

  if (!postId || postId === undefined) {
    console.error('❌ postId가 undefined입니다:', postId)
    showAlert('오류', '게시글 ID가 올바르지 않습니다.')
    return
  }

  if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    try {
      console.log('🗑️ 게시글 삭제 API 호출:', { studyId: props.studyId, postId })
      const response = await deletePostApi(props.studyId, postId)
      console.log('✅ 게시글 삭제 응답:', response)

      // 삭제 성공 시 목록에서 제거
      posts.value = posts.value.filter(p => p.id !== postId)
      allPosts.value = allPosts.value.filter(p => p.id !== postId) // 전체 목록에서도 제거

      showAlert('성공', '게시글이 성공적으로 삭제되었습니다.')
    } catch (error) {
      console.error('❌ 게시글 삭제 실패:', error)
      console.error('❌ 에러 상세:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        response: (error as any)?.response?.data,
        status: (error as any)?.response?.status
      })
      showAlert('오류', '게시글 삭제에 실패했습니다.')
    }
  }
}
</script>

<style scoped>
.board-tab {
  height: 100%;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
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

.post-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.month-posts,
.week-posts {
  padding: 1rem;
}

.month-posts .post-item,
.week-posts .post-item {
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.month-posts .post-item:hover,
.week-posts .post-item:hover {
  border-color: #d79c94;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.15);
}

.month-posts .post-item:last-child,
.week-posts .post-item:last-child {
  margin-bottom: 0;
}

.board-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-item {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header-info {
  margin-bottom: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: background-color 0.2s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.post-header-info:hover {
  background-color: #f8f9fa;
}

.post-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-title {
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

.post-date,
.post-writer {
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

.post-writer {
  color: #d79c94;
  background-color: #fef7f7;
  border-color: #f0e6e4;
}

.post-writer:hover {
  background-color: #f5e8e6;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(215, 156, 148, 0.1);
}

.post-date:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.writer-icon,
.date-icon {
  font-size: 0.8rem;
  opacity: 0.8;
}

.post-content {
  color: #495057;
  line-height: 1.6;
  white-space: pre-wrap;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 1rem;
  position: relative;
}

.post-content.expanded {
  max-height: 1000px;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  margin-top: 1rem;
}

.post-text {
  margin-bottom: 1rem;
}

.post-toggle {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.toggle-icon {
  font-size: 1.2rem;
  color: #6c757d;
  transition: transform 0.2s ease;
}

.post-attachments {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.attachments-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  margin: 0 0 0.5rem 0;
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #e9ecef;
}

.attachment-icon {
  font-size: 1.2rem;
}

.attachment-name {
  flex: 1;
  font-weight: 500;
  color: #212529;
}

.attachment-size {
  color: #6c757d;
  font-size: 0.85rem;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-writer {
  color: #d79c94;
  font-weight: 600;
  font-size: 0.9rem;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.post-actions-right {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  width: 100%;
}

.no-posts {
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

.file-attachment-area {
  border: 2px dashed #e9ecef;
  border-radius: 0.5rem;
  padding: 1rem;
}

.selected-attachments {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.selected-file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .board-header {
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

  .post-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .post-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .attachment-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
