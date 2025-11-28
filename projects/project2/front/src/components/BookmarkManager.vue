<template>
  <div class="bookmark-manager">
    <div v-if="isLoading" class="loading">
      폴더 목록을 불러오는 중...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <template v-else>
      <div class="folder-controls mb-4">
        <button class="btn btn-primary" @click="showNewFolderModal = true">
          새 폴더 만들기
        </button>
      </div>

      <div v-if="folders.length === 0" class="no-folders">
        아직 생성된 폴더가 없습니다. 새 폴더를 만들어보세요!
      </div>
      <div v-else class="folders-container">
        <div v-for="folder in folders" :key="folder.id" class="folder-card">
          <div class="folder-header" @click="toggleFolder(folder)">
            <h3>{{ folder.name }}</h3>
            <span class="book-count">({{ folder.bookmarks?.length || 0 }})</span>
            <div class="folder-actions">
              <button @click.stop="editFolder(folder)" class="btn btn-sm btn-outline-primary">수정</button>
              <button @click.stop="confirmDeleteFolder(folder)" class="btn btn-sm btn-outline-danger">삭제</button>
            </div>
          </div>
          <div v-if="expandedFolders.includes(folder.id)" class="bookmarks-grid">
            <div v-if="folder.bookmarks?.length === 0" class="no-bookmarks">
              이 폴더에 저장된 도서가 없습니다.
            </div>
            <div v-else v-for="bookmark in folder.bookmarks" :key="bookmark.id" class="bookmark-card">
              <router-link :to="'/books/' + bookmark.book.id" class="book-link">
                <img :src="bookmark.book.cover" :alt="bookmark.book.title" class="book-cover">
                <div class="book-info">
                  <h4>{{ bookmark.book.title }}</h4>
                  <p>{{ bookmark.book.author }}</p>
                </div>
              </router-link>
              <div class="book-actions">
                <button @click.stop="moveBookmark(bookmark)" class="btn btn-sm btn-outline-primary">이동</button>
                <button @click.stop="confirmDeleteBookmark(bookmark)" class="btn btn-sm btn-outline-danger">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 새 폴더 모달 -->
    <div v-if="showNewFolderModal" class="modal-overlay">
      <div class="modal-content">
        <h3>새 폴더 만들기</h3>
        <input v-model="newFolderName" placeholder="폴더 이름" class="form-control mb-3">
        <div class="modal-actions">
          <button class="btn btn-primary" @click="createFolder">만들기</button>
          <button class="btn btn-secondary" @click="showNewFolderModal = false">취소</button>
        </div>
      </div>
    </div>

    <!-- 폴더 수정 모달 -->
    <div v-if="showEditFolderModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>폴더 수정</h3>
          <button class="btn-close" @click="showEditFolderModal = false"></button>
        </div>
        <input 
          v-model="editFolderName" 
          placeholder="폴더 이름" 
          class="form-control mb-3"
          @keyup.enter="updateFolder"
        >
        <div class="modal-actions">
          <button 
            class="btn btn-primary" 
            @click="updateFolder"
            :disabled="!editFolderName.trim()"
          >
            수정
          </button>
          <button class="btn btn-secondary" @click="showEditFolderModal = false">
            취소
          </button>
        </div>
      </div>
    </div>

    <!-- 북마크 이동 모달 -->
    <div v-if="showMoveModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>북마크 이동</h3>
          <button class="btn-close" @click="showMoveModal = false"></button>
        </div>
        <div class="folder-list">
          <div v-for="folder in folders" :key="folder.id" class="folder-item">
            <input
              type="radio"
              :id="'move-folder-' + folder.id"
              :value="folder.id"
              v-model="selectedFolderId"
              :disabled="folder.id === currentBookmark?.folder?.id"
            >
            <label :for="'move-folder-' + folder.id">{{ folder.name }}</label>
          </div>
        </div>
        <div class="modal-actions">
          <button 
            class="btn btn-primary" 
            @click="moveBookmarkToFolder"
            :disabled="!selectedFolderId"
          >
            이동
          </button>
          <button class="btn btn-secondary" @click="showMoveModal = false">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'

const folders = ref([])
const expandedFolders = ref([])
const showNewFolderModal = ref(false)
const showEditFolderModal = ref(false)
const showMoveModal = ref(false)
const newFolderName = ref('')
const editFolderName = ref('')
const selectedFolderId = ref(null)
const currentFolder = ref(null)
const currentBookmark = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fetchFolders = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const { data } = await api.get('books/folders/')
    folders.value = data || []
  } catch (error) {
    console.error('폴더 목록을 불러오는데 실패했습니다:', error)
    error.value = '폴더 목록을 불러오는데 실패했습니다.'
    folders.value = []
  } finally {
    isLoading.value = false
  }
}

const createFolder = async () => {
  if (!newFolderName.value.trim()) return

  try {
    await api.post('books/folders/', { name: newFolderName.value })
    showNewFolderModal.value = false
    newFolderName.value = ''
    await fetchFolders()
  } catch (error) {
    console.error('폴더 생성에 실패했습니다:', error)
    alert('폴더 생성에 실패했습니다.')
  }
}

const toggleFolder = (folder) => {
  const index = expandedFolders.value.indexOf(folder.id)
  if (index === -1) {
    expandedFolders.value.push(folder.id)
  } else {
    expandedFolders.value.splice(index, 1)
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
    await api.put(`books/folders/${currentFolder.value.id}/`, {
      name: editFolderName.value
    })
    const index = folders.value.findIndex(f => f.id === currentFolder.value.id)
    if (index !== -1) {
      folders.value[index].name = editFolderName.value
    }
    showEditFolderModal.value = false
    editFolderName.value = ''
    await fetchFolders()
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
    await api.delete(`books/folders/${folder.id}/`)
    folders.value = folders.value.filter(f => f.id !== folder.id)
    await fetchFolders()
  } catch (error) {
    console.error('폴더 삭제에 실패했습니다:', error)
    alert('폴더 삭제에 실패했습니다.')
  }
}

const moveBookmark = (bookmark) => {
  currentBookmark.value = bookmark
  selectedFolderId.value = null
  showMoveModal.value = true
}

const moveBookmarkToFolder = async () => {
  if (!selectedFolderId.value || !currentBookmark.value) return

  try {
    await api.put(`books/bookmarks/${currentBookmark.value.id}/`, {
      folder_id: selectedFolderId.value
    })
    showMoveModal.value = false
    await fetchFolders()
  } catch (error) {
    console.error('북마크 이동에 실패했습니다:', error)
    let errorMessage = '북마크 이동에 실패했습니다.'
    
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error
    }
    
    alert(errorMessage)
  }
}

const confirmDeleteBookmark = (bookmark) => {
  if (confirm('정말로 이 북마크를 삭제하시겠습니까?')) {
    deleteBookmark(bookmark)
  }
}

const deleteBookmark = async (bookmark) => {
  try {
    await api.delete(`books/bookmarks/${bookmark.id}/`)
    await fetchFolders()
  } catch (error) {
    console.error('북마크 삭제에 실패했습니다:', error)
    alert('북마크 삭제에 실패했습니다.')
  }
}

onMounted(() => {
  fetchFolders()
})
</script>

<style scoped>
.bookmark-manager {
  padding: 20px;
}

.folder-controls {
  display: flex;
  justify-content: flex-end;
}

.folders-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.folder-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.folder-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.folder-header:hover {
  background-color: #e9ecef;
}

.folder-header h3 {
  margin: 0;
  flex: 1;
}

.book-count {
  color: #666;
  margin-right: 1rem;
}

.folder-actions {
  display: flex;
  gap: 0.5rem;
}

.bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 1rem;
}

.no-bookmarks {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #666;
}

.book-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.book-link:hover {
  opacity: 0.9;
}

.bookmark-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s;
}

.bookmark-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.book-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.book-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.book-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
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

.loading, .error, .no-folders {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
}

.folder-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.folder-item:last-child {
  border-bottom: none;
}

.folder-item input[type="radio"] {
  margin: 0;
}

.folder-item label {
  flex: 1;
  cursor: pointer;
}

.folder-item input[type="radio"]:disabled + label {
  color: #999;
  cursor: not-allowed;
}
</style> 