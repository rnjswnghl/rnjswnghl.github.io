<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3>북마크 저장</h3>
        <button class="btn-close" @click="$emit('close')"></button>
      </div>
      
      <div class="folder-list">
        <div v-for="folder in folders" :key="folder.id" class="folder-item">
          <div class="folder-info">
            <input
              type="radio"
              :id="'folder-' + folder.id"
              :value="folder.id"
              v-model="selectedFolderId"
            >
            <label :for="'folder-' + folder.id">{{ folder.name }}</label>
          </div>
          <div class="folder-actions">
            <button 
              class="btn btn-sm btn-outline-primary" 
              @click="editFolder(folder)"
            >
              수정
            </button>
            <button 
              class="btn btn-sm btn-outline-danger" 
              @click="confirmDeleteFolder(folder)"
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      <div class="new-folder-section">
        <h4>새 폴더 만들기</h4>
        <div class="new-folder-input">
          <input
            v-model="newFolderName"
            placeholder="폴더 이름"
            class="form-control"
            @keyup.enter="createFolder"
          >
          <button 
            class="btn btn-outline-primary" 
            @click="createFolder"
            :disabled="!newFolderName.trim()"
          >
            만들기
          </button>
        </div>
      </div>

      <div class="modal-actions">
        <button 
          class="btn btn-primary" 
          @click="saveBookmark" 
          :disabled="!selectedFolderId"
        >
          저장
        </button>
        <button class="btn btn-secondary" @click="$emit('close')">
          취소
        </button>
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { safeStorage } from '@/utils/storage'

const props = defineProps({
  show: Boolean,
  bookId: Number
})

const emit = defineEmits(['close', 'saved'])

const folders = ref([])
const selectedFolderId = ref(null)
const newFolderName = ref('')
const editFolderName = ref('')
const currentFolder = ref(null)
const showEditFolderModal = ref(false)

const fetchFolders = async () => {
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
      emit('close')
    }
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
      book_id: props.bookId,
      folder_id: selectedFolderId.value
    }, {
      headers: {
        Authorization: `Bearer ${safeStorage.getItem('accessToken')}`
      }
    })
    emit('saved')
    emit('close')
  } catch (error) {
    console.error('북마크 저장에 실패했습니다:', error)
    alert('북마크 저장에 실패했습니다.')
  }
}

watch(() => props.show, (newValue) => {
  if (newValue) {
    fetchFolders()
  }
})

onMounted(() => {
  if (props.show) {
    fetchFolders()
  }
})
</script>

<style scoped>
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
</style> 