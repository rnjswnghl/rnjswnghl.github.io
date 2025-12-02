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

import { safeStorage } from '@/utils/storage'

const checkLoginStatus = () => {
  const token = safeStorage.getItem('accessToken')
  isLoggedIn.value = !!token
}

const checkBookmarkStatus = async () => {
  if (!isLoggedIn.value || !book.value) return

  try {
    const { data } = await axios.get(`/api/books/bookmarks/check/${book.value.id}/`, {
      headers: {
        Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
      }
    })
    isBookmarked.value = data.is_bookmarked
  } catch (error) {
    if (error.response?.status === 401) {
      // 토큰이 만료된 경우
      safeStorage.removeItem('accessToken')
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
            Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
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
            Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
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
        Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
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

// 이미지 import
import cover1 from '@/assets/cover/불편한편의점.jpg'
import cover2 from '@/assets/cover/달러구트꿈백화점.jpg'
import cover3 from '@/assets/cover/미드나잇라이브러리.jpg'
import cover4 from '@/assets/cover/코스모스.jpg'
import cover5 from '@/assets/cover/해커와화가.jpg'
import cover6 from '@/assets/cover/클린코드.jpg'

// 목데이터 (더 상세한 정보 포함)
const mockBooks = {
  1: {
    id: 1,
    title: '불편한 편의점',
    author: '김호연',
    cover: cover1,
    customer_review_rank: 1,
    category: { id: 1, name: '소설/시/희곡' },
    publisher: '나무옆의자',
    publishedDate: '2021-04-20',
    pubdate: '2021-04-20',
    isbn: '9791161571188',
    description: '편의점에서 일하며 만나는 다양한 사람들의 이야기. 각자의 사연을 가진 사람들이 편의점을 통해 만나고, 서로의 삶에 영향을 미치는 따뜻한 이야기를 담고 있습니다. 작은 공간에서 펼쳐지는 인간애와 공감의 메시지가 인상적인 작품입니다.'
  },
  2: {
    id: 2,
    title: '달러구트 꿈 백화점',
    author: '이미예',
    cover: cover2,
    customer_review_rank: 2,
    category: { id: 1, name: '소설/시/희곡' },
    publisher: '팩토리나인',
    publishedDate: '2020-07-08',
    pubdate: '2020-07-08',
    isbn: '9791161571189',
    description: '꿈을 판매하는 특별한 백화점의 이야기. 사람들이 잃어버린 꿈을 찾고, 새로운 꿈을 사는 마법 같은 공간에서 펼쳐지는 감동적인 이야기입니다. 상상력이 풍부하고 독특한 설정이 매력적인 작품으로, 꿈과 현실을 넘나드는 작가의 작품 세계를 만날 수 있습니다.'
  },
  3: {
    id: 3,
    title: '미드나잇 라이브러리',
    author: '매트 헤이그',
    cover: cover3,
    customer_review_rank: 3,
    category: { id: 1, name: '소설/시/희곡' },
    publisher: '인플루엔셜',
    publishedDate: '2021-03-15',
    pubdate: '2021-03-15',
    isbn: '9791161571190',
    description: '인생의 무한한 가능성을 탐구하는 소설. 주인공이 다양한 인생을 경험하며 진정한 삶의 의미를 찾아가는 과정을 그린 작품입니다. 후회와 선택에 대해 깊이 생각해볼 수 있는 작품으로, 인생의 다양한 가능성을 보여주는 감동적인 이야기입니다.'
  },
  4: {
    id: 4,
    title: '코스모스',
    author: '칼 세이건',
    cover: cover4,
    customer_review_rank: 4,
    category: { id: 2, name: '인문학' },
    publisher: '사이언스북스',
    publishedDate: '2006-12-20',
    pubdate: '2006-12-20',
    isbn: '9788983711892',
    description: '우주와 인간에 대한 깊이 있는 탐구. 우주의 신비와 인간의 위치를 과학적이고 철학적으로 탐구한 명작입니다. 우주의 광대함과 인간의 작은 존재에 대해 깊이 생각해볼 수 있는 작품으로, 과학과 철학이 만나는 작품입니다.'
  },
  5: {
    id: 5,
    title: '해커와 화가',
    author: '폴 그레이엄',
    cover: cover5,
    customer_review_rank: 5,
    category: { id: 5, name: '컴퓨터/모바일' },
    publisher: '한빛미디어',
    publishedDate: '2011-06-20',
    pubdate: '2011-06-20',
    isbn: '9788966260951',
    description: '프로그래밍과 창의성에 대한 통찰. 프로그래머의 사고방식과 창의적인 문제 해결 방법에 대해 이야기합니다. Y Combinator의 공동 창립자인 작가가 프로그래밍과 창의성, 스타트업에 대한 통찰을 담은 작품입니다.'
  },
  6: {
    id: 6,
    title: '클린 코드',
    author: '로버트 C. 마틴',
    cover: cover6,
    customer_review_rank: 6,
    category: { id: 5, name: '컴퓨터/모바일' },
    publisher: '인사이트',
    publishedDate: '2013-12-24',
    pubdate: '2013-12-24',
    isbn: '9788966260952',
    description: '읽기 좋고 깨끗한 코드를 작성하는 방법. 좋은 코드의 원칙과 실천 방법을 제시하는 프로그래밍 필독서입니다. 소프트웨어 엔지니어링 분야의 권위자인 작가가 코드의 품질이 얼마나 중요한지, 그리고 어떻게 좋은 코드를 작성할 수 있는지에 대해 설명합니다.'
  }
}

const fetchBookDetail = async (id) => {
  // 백엔드 없이 목데이터만 사용
  const bookId = parseInt(id)
  if (mockBooks[bookId]) {
    book.value = mockBooks[bookId]
  } else {
    // 기본값으로 첫 번째 책 사용
    book.value = mockBooks[1]
  }
}

const createFolder = async () => {
  if (!newFolderName.value.trim()) return

  try {
    const { data } = await axios.post('/api/books/folders/', {
      name: newFolderName.value
    }, {
      headers: {
        Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
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
        Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
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
        Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
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
        Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
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
