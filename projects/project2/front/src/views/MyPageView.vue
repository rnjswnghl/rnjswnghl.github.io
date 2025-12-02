<template>
  <div class="mypage-container">
    <div class="mypage-header">
      <h2>마이페이지</h2>
    </div>

    <div class="mypage-content">
      <div class="sidebar">
        <div class="user-info">
          <div class="user-avatar">
            <img 
              v-if="userInfo.photo_url" 
              :src="userInfo.photo_url" 
              :alt="userInfo.username"
              class="profile-image"
              @error="handleImageError"
            >
            <i v-else class="fas fa-user"></i>
          </div>
          <div class="user-details">
            <h3>{{ userInfo.username }}</h3>
            <p>{{ userInfo.email }}</p>
            <p class="user-bio">{{ userInfo.bio || '자기소개가 없습니다.' }}</p>
            <UserFollowStats 
              :followers="userInfo.followers"
              :following="userInfo.followings"
            />
            <button 
              v-if="currentUser.username !== userInfo.username"
              @click="toggleFollow" 
              class="follow-btn"
              :class="{ 'following': isFollowing }"
            >
              {{ isFollowing ? '언팔로우' : '팔로우' }}
            </button>
          </div>
        </div>
        <nav class="mypage-nav">
          <button 
            :class="{ active: activeTab === 'threads' }"
            @click="activeTab = 'threads'"
          >
            쓰레드 목록
          </button>
          <button 
            :class="{ active: activeTab === 'guestbook' }"
            @click="activeTab = 'guestbook'"
          >
            방문록
          </button>
          <button 
            v-if="currentUser.username === userInfo.username"
            :class="{ active: activeTab === 'liked' }"
            @click="activeTab = 'liked'"
          >
            좋아요한 쓰레드
          </button>
          <button 
            v-if="currentUser.username === userInfo.username"
            :class="{ active: activeTab === 'bookmarks' }"
            @click="activeTab = 'bookmarks'"
          >
            도서 찜
          </button>
          <button 
            v-if="currentUser.username === userInfo.username"
            :class="{ active: activeTab === 'profileEdit' }"
            @click="activeTab = 'profileEdit'"
          >
            프로필 수정
          </button>
        </nav>
      </div>

      <div class="main-content">
        <!-- 내가 쓴 쓰레드 탭 -->
        <div v-if="activeTab === 'threads' && userInfo.id" class="threads-tab">
          <ThreadList :userId="userInfo.id" />
        </div>

        <!-- 방문록 탭 -->
        <div v-if="activeTab === 'guestbook'" class="guestbook-tab">
          <GuestBook :userId="userInfo.id" />
        </div>

        <!-- 좋아요한 쓰레드 탭 -->
        <div v-if="activeTab === 'liked'" class="liked-tab">
          <LikedThreads />
        </div>

        <!-- 북마크 탭 -->
        <div v-if="activeTab === 'bookmarks'" class="bookmarks-tab">
          <div class="folder-list">
            <div v-for="folder in folders" :key="folder.id" class="folder-item">
              <div class="folder-header" @click="toggleFolder(folder.id)">
                <div class="folder-info">
                  <i :class="['fas', expandedFolders[folder.id] ? 'fa-folder-open' : 'fa-folder']"></i>
                  <span>{{ folder.name }}</span>
                  <span class="bookmark-count">({{ folder.bookmarks.length }})</span>
                </div>
                <div class="folder-actions">
                  <button @click.stop="editFolder(folder)" class="edit-btn">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click.stop="confirmDeleteFolder(folder)" class="delete-btn">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <div v-if="expandedFolders[folder.id]" class="folder-content">
                <div v-if="folder.bookmarks.length === 0" class="empty-message">
                  이 폴더에 저장된 북마크가 없습니다.
                </div>
                <div v-else class="bookmark-grid">
                  <div v-for="bookmark in folder.bookmarks" :key="bookmark.id" class="bookmark-item">
                    <img 
                      :src="bookmark.book.cover" 
                      :alt="bookmark.book.title"
                      class="bookmark-cover"
                      @click="goToBookDetail(bookmark.book.id)"
                    >
                    <h4 class="bookmark-title">{{ bookmark.book.title }}</h4>
                    <p class="bookmark-author">{{ bookmark.book.author }}</p>
                    <div class="bookmark-actions">
                      <button class="move-btn" @click="openMoveModal(bookmark)">
                        <i class="fas fa-exchange-alt"></i> 이동
                      </button>
                      <button class="delete-btn" @click="confirmDeleteBookmark(bookmark)">
                        <i class="fas fa-trash"></i> 삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button @click="showCreateFolderModal = true" class="create-folder-btn">
            <i class="fas fa-plus"></i> 새 폴더 만들기
          </button>
        </div>

        <!-- 프로필 수정 탭 -->
        <div v-if="activeTab === 'profileEdit'" class="profile-edit-tab">
          <ProfileEdit 
            :profile="userInfo" 
            @updateProfile="handleProfileUpdate"
            @accountDeleted="handleAccountDeleted" 
          />
        </div>
      </div>
    </div>

    <!-- 폴더 생성 모달 -->
    <div v-if="showCreateFolderModal" class="modal-overlay">
      <div class="modal-content">
        <h3>새 폴더 만들기</h3>
        <input 
          v-model="newFolderName"
          type="text"
          placeholder="폴더 이름을 입력하세요"
          @keyup.enter="createFolder"
        >
        <div class="modal-actions">
          <button @click="createFolder" class="confirm-btn">만들기</button>
          <button @click="showCreateFolderModal = false" class="cancel-btn">취소</button>
        </div>
      </div>
    </div>

    <!-- 폴더 수정 모달 -->
    <div v-if="showEditFolderModal" class="modal-overlay">
      <div class="modal-content">
        <h3>폴더 이름 수정</h3>
        <input 
          v-model="editFolderName"
          type="text"
          placeholder="새 폴더 이름을 입력하세요"
          @keyup.enter="updateFolder"
        >
        <div class="modal-actions">
          <button @click="updateFolder" class="confirm-btn">수정</button>
          <button @click="showEditFolderModal = false" class="cancel-btn">취소</button>
        </div>
      </div>
    </div>

    <!-- 북마크 이동 모달 -->
    <div v-if="isMoveModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>북마크 이동</h3>
        <div class="folder-list">
          <div v-for="folder in folders" :key="folder.id" class="folder-item">
            <label class="folder-radio">
              <input 
                type="radio" 
                :value="folder.id" 
                v-model="selectedFolderId"
                :disabled="folder.id === currentBookmark?.folder.id"
              >
              <span>{{ folder.name }}</span>
            </label>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="moveBookmark" class="confirm-btn">이동</button>
          <button @click="closeMoveModal" class="cancel-btn">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/utils/api'
import UserProfile from '@/components/UserProfile.vue'
import ThreadList from '@/components/ThreadList.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'
import GuestBook from '@/components/GuestBook.vue'
import BookmarkManager from '@/components/BookmarkManager.vue'
import UserFollowStats from '@/components/UserFollowStats.vue'
import LikedThreads from '@/components/LikedThreads.vue'

const router = useRouter()
const route = useRoute()
const username = ref(route.params.username)

const userInfo = ref({
  id: null,
  username: '',
  email: '',
  photo: '',
  bio: '',
  followers: [],
  followings: [],
  followers_count: 0,
  following_count: 0
})

const currentUser = ref({})
const isFollowing = ref(false)
const folders = ref([])
const expandedFolders = ref({})
const showCreateFolderModal = ref(false)
const showEditFolderModal = ref(false)
const isMoveModalVisible = ref(false)
const newFolderName = ref('')
const editFolderName = ref('')
const selectedFolderId = ref(null)
const currentBookmark = ref(null)
const activeTab = ref('threads')

const getImageUrl = (url) => {
  if (!url) return ''
  // URL에 타임스탬프 추가하여 캐시 방지
  const timestamp = new Date().getTime()
  return `${url}?t=${timestamp}`
}

const handleImageError = (e) => {
  console.error('이미지 로드 실패:', e.target.src)
  e.target.src = ''  // 이미지 로드 실패시 기본 아이콘 표시
}

// 목데이터 - 사용자 프로필
const mockUserProfiles = {
  'testuser': {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    bio: '테스트 사용자입니다. 독서를 좋아합니다.',
    photo_url: '',
    followers: [],
    followings: [],
    followers_count: 5,
    following_count: 3
  }
}

const fetchUserInfo = async () => {
  // 백엔드 없이 목데이터만 사용
  const { useUserStore } = await import('@/stores/user')
  const userStore = useUserStore()
  
  // 현재 로그인한 사용자 정보
  if (userStore.userProfile) {
    currentUser.value = userStore.userProfile
  } else {
    // 로그인하지 않은 경우 기본값
    currentUser.value = { username: '' }
  }

  // 프로필 정보 가져오기
  const targetUsername = username.value || currentUser.value.username || 'testuser'
  const profileData = mockUserProfiles[targetUsername] || mockUserProfiles['testuser']
  userInfo.value = { ...profileData }

  // 팔로우 상태는 기본값 false
  isFollowing.value = false

  // 자신의 프로필인 경우에만 북마크 폴더 가져오기
  if (!username.value || username.value === currentUser.value.username) {
    await fetchFolders()
  }
}

const toggleFollow = async () => {
  // 백엔드 없이 목데이터만 사용 (실제로는 저장되지 않음)
  isFollowing.value = !isFollowing.value
  if (isFollowing.value) {
    userInfo.value.followers_count += 1
  } else {
    userInfo.value.followers_count = Math.max(0, userInfo.value.followers_count - 1)
  }
  alert(`팔로우 상태가 변경되었습니다. (데모 모드: 실제로 저장되지 않습니다)`)
}

const handleProfileUpdate = async () => {
  await fetchUserInfo()
  activeTab.value = 'threads'
}

const handleAccountDeleted = () => {
  alert('회원 탈퇴 후 로그인 페이지로 이동합니다.')
  router.push('/login')
}

// 이미지 import
import cover1 from '@/assets/cover/불편한편의점.jpg'
import cover2 from '@/assets/cover/달러구트꿈백화점.jpg'
import cover3 from '@/assets/cover/미드나잇라이브러리.jpg'

// 목데이터 - 북마크 폴더
const mockFolders = [
  {
    id: 1,
    name: '읽고 싶은 책',
    bookmarks: [
      {
        id: 1,
        book: {
          id: 1,
          title: '불편한 편의점',
          author: '김호연',
          cover: cover1
        },
        folder: { id: 1 }
      },
      {
        id: 2,
        book: {
          id: 2,
          title: '달러구트 꿈 백화점',
          author: '이미예',
          cover: cover2
        },
        folder: { id: 1 }
      }
    ]
  },
  {
    id: 2,
    name: '읽은 책',
    bookmarks: [
      {
        id: 3,
        book: {
          id: 3,
          title: '미드나잇 라이브러리',
          author: '매트 헤이그',
          cover: cover3
        },
        folder: { id: 2 }
      }
    ]
  }
]

const fetchFolders = async () => {
  // 백엔드 없이 목데이터만 사용
  folders.value = mockFolders.map(f => ({ ...f }))
  folders.value.forEach(folder => {
    expandedFolders.value[folder.id] = false
  })
}

const toggleFolder = (folderId) => {
  expandedFolders.value[folderId] = !expandedFolders.value[folderId]
}

const createFolder = async () => {
  if (!newFolderName.value.trim()) return

  // 백엔드 없이 목데이터만 사용 (실제로는 저장되지 않음)
  const newFolder = {
    id: Date.now(),
    name: newFolderName.value,
    bookmarks: []
  }
  folders.value.push(newFolder)
  expandedFolders.value[newFolder.id] = false
  newFolderName.value = ''
  showCreateFolderModal.value = false
  alert('폴더가 생성되었습니다. (데모 모드: 실제로 저장되지 않습니다)')
}

const editFolder = (folder) => {
  currentBookmark.value = folder
  editFolderName.value = folder.name
  showEditFolderModal.value = true
}

const updateFolder = async () => {
  if (!editFolderName.value.trim()) return

  // 백엔드 없이 목데이터만 사용 (실제로는 저장되지 않음)
  const index = folders.value.findIndex(f => f.id === currentBookmark.value.id)
  if (index !== -1) {
    folders.value[index].name = editFolderName.value
  }
  showEditFolderModal.value = false
  alert('폴더가 수정되었습니다. (데모 모드: 실제로 저장되지 않습니다)')
}

const confirmDeleteFolder = (folder) => {
  if (confirm('정말로 이 폴더를 삭제하시겠습니까?')) {
    deleteFolder(folder)
  }
}

const deleteFolder = async (folder) => {
  // 백엔드 없이 목데이터만 사용 (실제로는 저장되지 않음)
  folders.value = folders.value.filter(f => f.id !== folder.id)
  delete expandedFolders.value[folder.id]
  alert('폴더가 삭제되었습니다. (데모 모드: 실제로 삭제되지 않습니다)')
}

const openMoveModal = (bookmark) => {
  currentBookmark.value = bookmark
  selectedFolderId.value = null
  isMoveModalVisible.value = true
}

const closeMoveModal = () => {
  isMoveModalVisible.value = false
  currentBookmark.value = null
  selectedFolderId.value = null
}

const moveBookmark = async () => {
  if (!selectedFolderId.value || !currentBookmark.value) return

  // 백엔드 없이 목데이터만 사용 (실제로는 저장되지 않음)
  const targetFolder = folders.value.find(f => f.id === selectedFolderId.value)
  const sourceFolder = folders.value.find(f => f.bookmarks.some(b => b.id === currentBookmark.value.id))
  
  if (targetFolder && sourceFolder) {
    const bookmarkIndex = sourceFolder.bookmarks.findIndex(b => b.id === currentBookmark.value.id)
    if (bookmarkIndex !== -1) {
      const bookmark = sourceFolder.bookmarks.splice(bookmarkIndex, 1)[0]
      bookmark.folder.id = selectedFolderId.value
      targetFolder.bookmarks.push(bookmark)
    }
  }
  
  isMoveModalVisible.value = false
  alert('북마크가 이동되었습니다. (데모 모드: 실제로 저장되지 않습니다)')
}

const confirmDeleteBookmark = (bookmark) => {
  if (confirm('정말로 이 북마크를 삭제하시겠습니까?')) {
    deleteBookmark(bookmark)
  }
}

const deleteBookmark = async (bookmark) => {
  // 백엔드 없이 목데이터만 사용 (실제로는 저장되지 않음)
  const folder = folders.value.find(f => f.bookmarks.some(b => b.id === bookmark.id))
  if (folder) {
    folder.bookmarks = folder.bookmarks.filter(b => b.id !== bookmark.id)
  }
  alert('북마크가 삭제되었습니다. (데모 모드: 실제로 삭제되지 않습니다)')
}

const goToBookDetail = (bookId) => {
  router.push(`/books/${bookId}`)
}

onMounted(() => {
  fetchUserInfo()
})

watch(
  () => route.params.username,
  (newUsername) => {
    username.value = newUsername
    fetchUserInfo()
  }
)
</script>

<style scoped>
.mypage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.mypage-header {
  margin-bottom: 2rem;
}

.mypage-header h2 {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.mypage-content {
  display: flex;
  gap: 2rem;
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
}

.user-info {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.user-avatar {
  width: 120px;
  height: 120px;
  background: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  overflow: hidden;
}

.user-avatar i {
  font-size: 3rem;
  color: #6c757d;
}

.user-details {
  text-align: center;
  width: 100%;
  overflow: hidden;
}

.user-details h3 {
  margin: 0 0 0.5rem;
  color: #333;
  white-space: normal;
  word-break: break-all;
  font-size: 1.2rem;
  line-height: 1.4;
}

.user-details p {
  margin: 0;
  color: #6c757d;
  white-space: normal;
  word-break: break-all;
}

.mypage-nav {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.mypage-nav button {
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: none;
  border: none;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.mypage-nav button:hover {
  background: #f0f0f0;
  color: #333;
}

.mypage-nav button.active {
  background: #4da3ff;
  color: white;
}

.main-content {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.folder-list {
  margin-bottom: 1.5rem;
}

.folder-item {
  margin-bottom: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.folder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.2s;
}

.folder-header:hover {
  background: #e9ecef;
}

.folder-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.folder-info i {
  color: #6c757d;
}

.bookmark-count {
  color: #6c757d;
  font-size: 0.9rem;
}

.folder-actions {
  display: flex;
  gap: 0.5rem;
}

.folder-actions button {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: #6c757d;
  transition: color 0.2s;
}

.folder-actions button:hover {
  color: #212529;
}

.edit-btn:hover {
  color: #0d6efd;
}

.delete-btn:hover {
  color: #dc3545;
}

.create-folder-btn {
  width: 100%;
  padding: 0.75rem;
  background: #e9ecef;
  border: none;
  border-radius: 8px;
  color: #495057;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.create-folder-btn:hover {
  background: #dee2e6;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
}

.modal-content h3 {
  margin: 0 0 1rem;
  color: #333;
}

.modal-content input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-btn {
  background: #0d6efd;
  color: white;
}

.confirm-btn:hover {
  background: #0b5ed7;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background: #5c636a;
}

.folder-radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}

.folder-radio input[type="radio"] {
  margin: 0;
}

.empty-message {
  text-align: center;
  color: #6c757d;
  padding: 2rem;
}

.folder-content {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0 0 8px 8px;
  margin-top: 0.5rem;
}

.bookmark-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-height: 400px; /* 4권 이상일 때 스크롤이 생기도록 높이 제한 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  padding-right: 0.5rem; /* 스크롤바 공간 확보 */
}

/* 스크롤바 스타일링 */
.bookmark-grid::-webkit-scrollbar {
  width: 8px;
}

.bookmark-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.bookmark-grid::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.bookmark-grid::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.bookmark-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.bookmark-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.bookmark-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.bookmark-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bookmark-author {
  color: #666;
  font-size: 0.8rem;
}

.bookmark-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
}

.bookmark-actions button {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.move-btn {
  background-color: #e9ecef;
  color: #495057;
}

.move-btn:hover {
  background-color: #dee2e6;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #fa5252;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.profile-edit-tab {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center;     /* 수직 중앙 정렬 (옵션) */
  padding: 2rem;
}


.user-bio {
  margin: 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.follow-info {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.follow-btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #0d6efd;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.follow-btn:hover {
  background-color: #0b5ed7;
}

.follow-btn.following {
  background-color: #6c757d;
}

.follow-btn.following:hover {
  background-color: #5c636a;
}

.guestbook-tab,
.profile-edit-tab {
  padding: 1rem;
}
</style>

