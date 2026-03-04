<template>
  <div class="download-tab">
    <div class="download-header">
      <h3>스터디 자료</h3>
      <Button
        v-if="isLeader"
        variant="primary"
        size="sm"
        @click="showFileUploadModal = true"
      >
        📁 파일 업로드
      </Button>
    </div>

    <!-- 스터디 녹화본 섹션 -->
    <div class="file-section">
      <h4 class="section-title">📹 스터디 녹화본</h4>
      <div class="file-list">
        <div v-for="file in recordingFiles" :key="file.id" class="file-item">
          <div class="file-info">
            <span class="file-icon">🎥</span>
            <div class="file-details">
              <span class="file-name">{{ file.filename }}</span>
              <span class="file-meta">{{ file.uploaded_at }} • {{ file.fileSize }}</span>
            </div>
          </div>
          <div class="file-actions">
            <Button variant="outline" size="sm" @click="downloadFile(file)">
              다운로드
            </Button>
            <Button
              v-if="isLeader"
              variant="danger"
              size="sm"
              @click="deleteFile(file.id)"
            >
              삭제
            </Button>
          </div>
        </div>
        <div v-if="recordingFiles.length === 0" class="no-files">
          <p>업로드된 녹화본이 없습니다.</p>
        </div>
      </div>
    </div>

    <!-- 스터디 요약본 섹션 -->
    <div class="file-section">
      <h4 class="section-title">📋 스터디 요약본</h4>
      <div class="file-list">
        <div v-for="file in summaryFiles" :key="file.id" class="file-item">
          <div class="file-info">
            <span class="file-icon">📄</span>
            <div class="file-details">
              <span class="file-name">{{ file.filename }}</span>
              <span class="file-meta">{{ file.uploaded_at }} • {{ file.fileSize }}</span>
            </div>
          </div>
          <div class="file-actions">
            <Button variant="outline" size="sm" @click="downloadFile(file)">
              다운로드
            </Button>
            <Button
              v-if="isLeader"
              variant="danger"
              size="sm"
              @click="deleteFile(file.id)"
            >
              삭제
            </Button>
          </div>
        </div>
        <div v-if="summaryFiles.length === 0" class="no-files">
          <p>업로드된 요약본이 없습니다.</p>
        </div>
      </div>
    </div>

    <!-- 기타 자료 섹션 -->
    <div class="file-section">
      <h4 class="section-title">💾 기타 자료</h4>
      <div class="file-list">
        <div v-for="file in otherFiles" :key="file.id" class="file-item">
          <div class="file-info">
            <span class="file-icon">{{ getFileIcon(file.fileType) }}</span>
            <div class="file-details">
              <span class="file-name">{{ file.filename }}</span>
              <span class="file-meta">{{ file.uploaded_at }} • {{ file.fileSize }}</span>
            </div>
          </div>
          <div class="file-actions">
            <Button variant="outline" size="sm" @click="downloadFile(file)">
              다운로드
            </Button>
            <Button
              v-if="isLeader"
              variant="danger"
              size="sm"
              @click="deleteFile(file.id)"
            >
              삭제
            </Button>
          </div>
        </div>
        <div v-if="otherFiles.length === 0" class="no-files">
          <p>업로드된 자료가 없습니다.</p>
        </div>
      </div>
    </div>

    <!-- 파일 업로드 모달 -->
    <Modal :visible="showFileUploadModal" @close="showFileUploadModal = false">
      <template #title>파일 업로드</template>
      <div class="modal-content">
        <p>스터디에 전체로 게시하고싶은 파일을 업로드 해주세요.</p>

        <div class="form-group">
          <label>파일 분류</label>
          <select v-model="uploadForm.category" class="form-control">
            <option value="recording">스터디 녹화본</option>
            <option value="summary">스터디 요약본</option>
            <option value="other">기타 자료</option>
          </select>
        </div>

        <div class="file-upload-area">
          <input
            ref="fileInput"
            type="file"
            @change="handleFileSelect"
            style="display: none"
            accept="video/*,application/pdf,image/*,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
          />
          <Button variant="primary" @click="fileInput?.click()">
            📁 파일 선택
          </Button>
          <div v-if="uploadForm.selectedFile" class="selected-file">
            <span>선택된 파일: {{ uploadForm.selectedFile.name }}</span>
          </div>
        </div>

        <div class="modal-actions">
          <Button variant="primary" @click="uploadFile" :disabled="!uploadForm.selectedFile">
            업로드
          </Button>
          <Button variant="outline" @click="showFileUploadModal = false">
            취소
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'

interface StudyFile {
  id: number
  filename: string
  url: string
  uploaded_at: string
  uploaded_by: string
  fileType: string
  fileSize: string
  category: 'recording' | 'summary' | 'other'
}

interface Props {
  isLeader?: boolean
  studyId: number
}

const props = withDefaults(defineProps<Props>(), {
  isLeader: false
})

const showFileUploadModal = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const studyFiles = ref<StudyFile[]>([])

const uploadForm = ref({
  category: 'other' as 'recording' | 'summary' | 'other',
  selectedFile: null as File | null
})

onMounted(() => {
  loadFiles()
})

async function loadFiles() {
  // TODO: 실제 API 호출로 변경
  studyFiles.value = [
    {
      id: 1,
      filename: '1주차_스터디_녹화본.mp4',
      url: '#',
      uploaded_at: '2025-07-25',
      uploaded_by: '앨리스',
      fileType: 'video',
      fileSize: '256MB',
      category: 'recording'
    },
    {
      id: 2,
      filename: '1주차_스터디_요약본.pdf',
      url: '#',
      uploaded_at: '2025-07-25',
      uploaded_by: '앨리스',
      fileType: 'pdf',
      fileSize: '2.1MB',
      category: 'summary'
    },
    {
      id: 3,
      filename: '스터디_가이드라인.pdf',
      url: '#',
      uploaded_at: '2025-07-20',
      uploaded_by: '앨리스',
      fileType: 'pdf',
      fileSize: '1.5MB',
      category: 'other'
    },
    {
      id: 4,
      filename: '준비자료.pptx',
      url: '#',
      uploaded_at: '2025-07-18',
      uploaded_by: '앨리스',
      fileType: 'ppt',
      fileSize: '5.2MB',
      category: 'other'
    },
    {
      id: 5,
      filename: '2주차_스터디_녹화본.mp4',
      url: '#',
      uploaded_at: '2025-07-18',
      uploaded_by: '앨리스',
      fileType: 'video',
      fileSize: '312MB',
      category: 'recording'
    }
  ]
}

const recordingFiles = computed(() =>
  studyFiles.value.filter(file => file.category === 'recording')
)

const summaryFiles = computed(() =>
  studyFiles.value.filter(file => file.category === 'summary')
)

const otherFiles = computed(() =>
  studyFiles.value.filter(file => file.category === 'other')
)

function getFileIcon(fileType: string): string {
  const iconMap: Record<string, string> = {
    'video': '🎥',
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'ppt': '📊',
    'pptx': '📊',
    'xls': '📈',
    'xlsx': '📈',
    'image': '🖼️',
    'audio': '🎵'
  }
  return iconMap[fileType] || '📁'
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadForm.value.selectedFile = target.files[0]
  }
}

function uploadFile() {
  if (!uploadForm.value.selectedFile) return

  // TODO: 실제 파일 업로드 API 호출
  const file = uploadForm.value.selectedFile
  const fileType = file.name.split('.').pop()?.toLowerCase() || 'other'

  const newFile: StudyFile = {
    id: Date.now(),
    filename: file.name,
    url: '#',
    uploaded_at: new Date().toISOString().split('T')[0],
    uploaded_by: '현재 사용자',
    fileType,
    fileSize: formatFileSize(file.size),
    category: uploadForm.value.category
  }

  studyFiles.value.unshift(newFile)
  uploadForm.value.selectedFile = null
  showFileUploadModal.value = false
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function downloadFile(file: StudyFile) {
  console.log('파일 다운로드:', file.filename)
  // TODO: 실제 파일 다운로드 로직
}

function deleteFile(fileId: number) {
  if (confirm('정말로 이 파일을 삭제하시겠습니까?')) {
    console.log('파일 삭제:', fileId)
    studyFiles.value = studyFiles.value.filter(f => f.id !== fileId)
  }
}
</script>

<style scoped>
.download-tab {
  height: 100%;
}

.download-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.download-header h3 {
  margin: 0;
  color: #212529;
}

.file-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.file-list {
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.file-item:hover {
  background-color: #f8f9fa;
}

.file-item:last-child {
  border-bottom: none;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.file-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-weight: 600;
  color: #212529;
}

.file-meta {
  color: #6c757d;
  font-size: 0.85rem;
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

.no-files {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
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

.file-upload-area {
  text-align: center;
  padding: 2rem;
  border: 2px dashed #e9ecef;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.selected-file {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  color: #495057;
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .download-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .file-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .file-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
