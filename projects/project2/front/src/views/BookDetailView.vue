<template>
  <div v-if="book" class="page-container">
    <div class="top-controls">
      <button @click="showThreadFormModal = true" class="create-thread-btn">📝 쓰레드 작성</button>
      <button 
        @click="handleBookmarkClick" 
        class="create-bookmark-btn"
        :class="{ 'bookmarked': isBookmarked }"
      >
        {{ isBookmarked ? '📌 찜 완료' : '📌 도서 찜하기' }}
      </button>
    </div>

    <div class="book-detail-wrapper">
      <div class="book-left">
        <BookInfo :book="book" />
      </div>
      <div class="book-right">
        <div class="book-description">
          <h3>책 소개</h3>
          <p v-if="book.description">{{ book.description }}</p>
          <p v-else>설명 정보가 없습니다.</p>
        </div>
        <div class="book-gtts">
          <h3>음성 읽기</h3>
          <BookGtts :introduction="book.description" />
        </div>
      </div>
    </div>

    <BookAuthor :author="book.author" :currentBookId="book.id" />

    <h2 class="thread-list-title">해당 도서와 연관된 쓰레드 목록</h2>
    <ThreadList :bookId="book.id" :autoFetch="true" />

    <div class="recommend-wrapper">
      <div class="recommend-title">
        📖 이 책과 함께 읽으면 좋은 도서
      </div>
      <Recommendations :bookId="book.id" :bookAuthor="book.author" :bookCategory="book.category.name" />
    </div>

    <div class="map-wrapper">
      <div class="map-title">
        📍 근처 도서관
      </div>
      <KakaoMaps />
    </div>

    <!-- Thread 작성 모달 -->
    <div v-if="showThreadFormModal" class="modal-overlay">
      <div class="modal-content">
        <button @click="showThreadFormModal = false" class="close-btn">닫기</button>
        <ThreadForm :bookId="book.id" @submitted="handleThreadSubmitted" />
      </div>
    </div>

    <!-- 북마크 모달 -->
    <BookmarkModal
      :show="showBookmarkFormModal"
      :bookId="book.id"
      @close="showBookmarkFormModal = false"
      @saved="handleBookmarkSaved"
    />
  </div>
  <div v-else class="loading">
    책 정보를 불러오는 중입니다...
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BookInfo from '@/components/BookInfo.vue'
import BookGtts from '@/components/BookGtts.vue'
import BookAuthor from '@/components/BookAuthor.vue'
import ThreadList from '@/components/ThreadList.vue'
import ThreadForm from '@/components/ThreadForm.vue'
import Recommendations from '@/components/Recommendations.vue'
import KakaoMaps from '@/components/KakaoMaps.vue'
import BookmarkModal from '@/components/BookmarkModal.vue'

const route = useRoute()
const book = ref(null)
const showThreadFormModal = ref(false)
const showBookmarkFormModal = ref(false)
const showEditFolderModal = ref(false)
const folders = ref([])
const selectedFolderId = ref(null)
const newFolderName = ref('')
const editFolderName = ref('')
const currentFolder = ref(null)
const isLoggedIn = ref(false)
const isBookmarked = ref(false)

const checkLoginStatus = () => {
  const token = localStorage.getItem('accessToken')
  isLoggedIn.value = !!token
}

const checkBookmarkStatus = async () => {
  if (!isLoggedIn.value || !book.value) return

  try {
    const { data } = await axios.get(`/api/books/bookmarks/check/${book.value.id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    isBookmarked.value = data.is_bookmarked
  } catch (error) {
    if (error.response?.status === 401) {
      // 토큰이 만료된 경우
      localStorage.removeItem('accessToken')
      isLoggedIn.value = false
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
    } else {
      console.error('북마크 상태 확인 실패:', error)
    }
    isBookmarked.value = false
  }
}

const handleBookmarkClick = async () => {
  checkLoginStatus()
  if (!isLoggedIn.value) {
    alert('북마크 기능을 사용하려면 로그인이 필요합니다.')
    return
  }
  
  if (isBookmarked.value) {
    if (confirm('이미 찜한 도서입니다. 찜을 취소하시겠습니까?')) {
      try {
        // 북마크 ID를 찾기 위한 API 호출
        const { data: bookmarks } = await axios.get('/api/books/bookmarks/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        
        // 현재 도서의 북마크 찾기
        const bookmark = bookmarks.find(b => b.book.id === book.value.id)
        if (!bookmark) {
          throw new Error('북마크를 찾을 수 없습니다.')
        }

        // 북마크 삭제
        await axios.delete(`/api/books/bookmarks/${bookmark.id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        isBookmarked.value = false
      } catch (error) {
        console.error('북마크 취소에 실패했습니다:', error)
        alert('북마크 취소에 실패했습니다.')
      }
    }
  } else {
    showBookmarkFormModal.value = true
  }
}

const fetchFolders = async () => {
  if (!isLoggedIn.value) return

  try {
    const { data } = await axios.get('/api/books/folders/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    folders.value = data
  } catch (error) {
    console.error('폴더 목록을 불러오는데 실패했습니다:', error)
    if (error.response?.status === 401) {
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
      showBookmarkFormModal.value = false
    }
  }
}

const fetchBookDetail = async (id) => {
  try {
    const token = localStorage.getItem('accessToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const response = await axios.get(`/api/books/book-list/${id}/`, { headers })
    book.value = response.data
    if (token) {
      await checkBookmarkStatus()
    }
  } catch (error) {
    console.error('책 정보를 불러오는데 실패했습니다.', error)
  }
}

const createFolder = async () => {
  if (!newFolderName.value.trim()) return

  try {
    const { data } = await axios.post('/api/books/folders/', {
      name: newFolderName.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    folders.value.push(data)
    selectedFolderId.value = data.id
    newFolderName.value = ''
  } catch (error) {
    console.error('폴더 생성에 실패했습니다:', error)
    alert('폴더 생성에 실패했습니다.')
  }
}

const editFolder = (folder) => {
  currentFolder.value = folder
  editFolderName.value = folder.name
  showEditFolderModal.value = true
}

const updateFolder = async () => {
  if (!editFolderName.value.trim()) return

  try {
    await axios.put(`/api/books/folders/${currentFolder.value.id}/`, {
      name: editFolderName.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    const index = folders.value.findIndex(f => f.id === currentFolder.value.id)
    if (index !== -1) {
      folders.value[index].name = editFolderName.value
    }
    showEditFolderModal.value = false
    editFolderName.value = ''
  } catch (error) {
    console.error('폴더 수정에 실패했습니다:', error)
    alert('폴더 수정에 실패했습니다.')
  }
}

const confirmDeleteFolder = (folder) => {
  if (confirm('정말로 이 폴더를 삭제하시겠습니까?')) {
    deleteFolder(folder)
  }
}

const deleteFolder = async (folder) => {
  try {
    await axios.delete(`/api/books/folders/${folder.id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    folders.value = folders.value.filter(f => f.id !== folder.id)
    if (selectedFolderId.value === folder.id) {
      selectedFolderId.value = null
    }
  } catch (error) {
    console.error('폴더 삭제에 실패했습니다:', error)
    alert('폴더 삭제에 실패했습니다.')
  }
}

const saveBookmark = async () => {
  if (!selectedFolderId.value) return

  try {
    await axios.post('/api/books/bookmarks/', {
      book_id: book.value.id,
      folder_id: selectedFolderId.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    showBookmarkFormModal.value = false
    alert('북마크가 저장되었습니다.')
  } catch (error) {
    console.error('북마크 저장에 실패했습니다:', error)
    alert('북마크 저장에 실패했습니다.')
  }
}

onMounted(() => {
  checkLoginStatus()
  fetchBookDetail(route.params.bookId)
})

watch(() => route.params.bookId, (newBookId) => {
  fetchBookDetail(newBookId).then(() => {
    window.scrollTo(0, 0)
  })
})

const handleThreadSubmitted = () => {
  showThreadFormModal.value = false
}

const handleBookmarkSaved = () => {
  isBookmarked.value = true
  showBookmarkFormModal.value = false
}

</script>


<style scoped>
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.top-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
}

.create-thread-btn,
.create-bookmark-btn {
  background-color: #a6cee3;
  color: #1e1e1e;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
  margin-left: 1rem;
}

.create-thread-btn:hover,
.create-bookmark-btn:hover {
  background-color: #7fb9d9;
}

.book-detail-wrapper {
  display: flex;
  gap: 3rem;
  align-items: flex-start; /* stretch → flex-start 로 변경 */
}

.book-left {
  width: 350px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.book-cover {
  width: 250px;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #111;
}

.book-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  margin-top: 40px;
}

.book-description,
.book-gtts {
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  overflow-wrap: break-word;
  margin: 0;
  box-sizing: border-box;
}

.book-description {
  background-color: #282828;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #ccc;
}

.book-gtts {
  background-color: #1e1e1e;
  color: #eee;
}

.thread-list-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #222;
  border-bottom: 3px solid #a6cee3;
  padding-bottom: 0.4rem;
  margin: 0;
}

.recommend-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding-top: 3rem;
}

.recommend-title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.4rem 1rem;
  border-radius: 16px;
  font-weight: 700;
  color: #1e1e1e;
  font-size: 1.2rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  user-select: none;
  pointer-events: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.05em;
  z-index: 10;
}

.map-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.map-title {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.4rem 1rem;
  border-radius: 16px;
  font-weight: 700;
  color: #1e1e1e;
  font-size: 1.2rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  user-select: none;
  pointer-events: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.05em;
  z-index: 10;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2b2b2b;
  padding: 2rem;
  border-radius: 12px;
  width: 600px;
  max-width: 90%;
  color: #ddd;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #ddd;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
}

.folder-list {
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
}

.folder-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.folder-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.folder-actions {
  display: flex;
  gap: 8px;
}

.new-folder-section {
  margin: 20px 0;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.new-folder-section h4 {
  margin-bottom: 10px;
}

.new-folder-input {
  display: flex;
  gap: 10px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  color: #666;
}

.btn-close:hover {
  color: #333;
}

.create-bookmark-btn.bookmarked {
  background-color: #4CAF50;
  color: white;
}

.create-bookmark-btn.bookmarked:hover {
  background-color: #45a049;
}
</style>
