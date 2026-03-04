<template>
  <div class="file-upload-quiz">
    <div class="upload-section">
      <h3>학습 자료 업로드</h3>
      <p>PDF 또는 텍스트 파일을 업로드하면 AI가 자동으로 퀴즈를 생성합니다.</p>
      
      <div class="file-upload-area" @click="triggerFileInput" @drop="handleDrop" @dragover.prevent>
        <input
          ref="fileInput"
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          @change="handleFileSelect"
          style="display: none"
        />
        <div class="upload-icon">📁</div>
        <p>파일을 클릭하거나 드래그하여 업로드하세요</p>
        <p class="file-types">지원 형식: PDF, TXT, DOC, DOCX</p>
      </div>
      
      <div v-if="selectedFile" class="selected-file">
        <p>선택된 파일: <strong>{{ selectedFile.name }}</strong></p>
        <p class="file-size">파일 크기: {{ formatFileSize(selectedFile.size) }}</p>
        <button @click="analyzeFile" :disabled="isGenerating" class="analyze-btn">
          {{ isGenerating ? 'AI가 퀴즈를 생성하고 있습니다...' : '퀴즈 생성하기' }}
        </button>
      </div>

      <!-- 에러 메시지 -->
      <div v-if="error" class="error-message">
        <p>❌ {{ error }}</p>
        <button @click="clearError" class="clear-error-btn">에러 지우기</button>
      </div>
    </div>

    <!-- 퀴즈 생성 결과 -->
    <div v-if="generatedQuestions.length > 0" class="quiz-section">
      <h3>🎯 생성된 퀴즈</h3>
      <div class="quiz-info">
        <p>파일 유형: <strong>{{ detectedCategory }}</strong></p>
        <p>총 문제 수: <strong>{{ generatedQuestions.length }}문제</strong></p>
        <ul class="quiz-breakdown">
          <li>✅ O/X 문제: {{ oxCount }}문제</li>
          <li>✏️ 주관식 문제: {{ subjectiveCount }}문제</li>
        </ul>
        
        <!-- 문제 미리보기 -->
        <div class="questions-preview">
          <h4>문제 미리보기:</h4>
          <div v-for="(question, index) in generatedQuestions.slice(0, 2)" :key="index" class="question-preview">
            <p><strong>{{ index + 1 }}번:</strong> {{ question.quiz }}</p>
            <p class="question-type">유형: {{ question.quizType === 'ox' ? 'O/X' : '주관식' }}</p>
          </div>
          <p class="preview-note">... 외 {{ generatedQuestions.length - 2 }}문제</p>
        </div>
      </div>
      
      <button @click="startQuiz" class="start-quiz-btn">🚀 퀴즈 시작하기</button>
    </div>

    <!-- 퀴즈 모달 -->
    <AIQuizModal
      v-if="showQuizModal"
      :visible="showQuizModal"
      :questions="generatedQuestions"
      @close="closeQuiz"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AIQuizModal from './AIQuizModal.vue'
import { useQuizStore } from '@/stores/quiz'
import { uploadSummarizeFilesSequential } from '@/api/files'
import type { QuizResponse } from '@/types/quiz'

// 퀴즈 스토어 사용
const quizStore = useQuizStore()

// 상태 변수
const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const generatedQuestions = ref<QuizResponse[]>([])
const showQuizModal = ref(false)
const detectedCategory = ref<string>('')
const isGenerating = ref(false)
const error = ref('')

// 파일 선택 처리
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    generatedQuestions.value = []
    detectedCategory.value = ''
  }
}

// 드래그 앤 드롭 처리
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    selectedFile.value = event.dataTransfer.files[0]
    generatedQuestions.value = []
    detectedCategory.value = ''
  }
}

// 에러 지우기
const clearError = () => {
  error.value = ''
}

// 파일 분석 및 퀴즈 생성
const analyzeFile = async () => {
  if (!selectedFile.value) return
  
  try {
    isGenerating.value = true
    error.value = ''
    
    console.log('📁 파일 업로드 시작:', selectedFile.value.name)
    
    // GPT API를 사용하여 퀴즈 생성
    const results = await uploadSummarizeFilesSequential(
      'temp-group-id', // 임시 그룹 ID (실제 사용 시 props로 받아야 함)
      [selectedFile.value],
      (idx, p) => {
        console.log(`📊 진행률: ${p}%`)
      }
    )
    
    console.log('🎯 AI 퀴즈 생성 완료:', results)
    
    // AI 응답에서 퀴즈 데이터 추출 및 변환
    let rawQuestions: any[] = []
    
    // 다양한 응답 구조에서 퀴즈 데이터 추출
    if (Array.isArray(results)) {
      // 배열 응답인 경우 퀴즈 데이터가 포함된 요소 찾기
      for (const item of results) {
        if (item && typeof item === 'object') {
          if (item.questions) {
            rawQuestions = item.questions
            break
          } else if (item.quiz) {
            rawQuestions = Array.isArray(item.quiz) ? item.quiz : [item.quiz]
            break
          }
        }
      }
    } else if (results && typeof results === 'object') {
      // 단일 객체 응답인 경우
      const resultObj = results as any
      if (resultObj.questions) {
        rawQuestions = resultObj.questions
      } else if (resultObj.quiz) {
        rawQuestions = Array.isArray(resultObj.quiz) ? resultObj.quiz : [resultObj.quiz]
      } else if (resultObj.data?.questions) {
        rawQuestions = resultObj.data.questions
      } else if (resultObj.data?.quiz) {
        rawQuestions = Array.isArray(resultObj.data.quiz) ? resultObj.data.quiz : [resultObj.data.quiz]
      }
    }
    
    console.log('📝 추출된 문제 목록:', rawQuestions)
    
    if (rawQuestions.length > 0) {
      const processedQuestions = rawQuestions.slice(0, 4).map((q: any, index) => {
        // 문제 타입 결정 (AI가 제공한 타입 우선, 없으면 내용 기반으로 추정)
        let questionType = q.type
        if (!questionType) {
          if (q.question && (q.question.includes('?') || q.question.includes('인가') || q.question.includes('인지'))) {
            questionType = 'ox'
          } else {
            questionType = 'subject'
          }
        }
        
        const question = q.question || `문제 ${index + 1}`
        const answer = q.answer || q.correctAnswer || '정답 없음'
        
        return {
          quiz: question,
          quizType: questionType,
          answer: answer
        }
      })
      
      generatedQuestions.value = processedQuestions
      console.log('💾 generatedQuestions.value에 저장 완료:', generatedQuestions.value)
      
      // 카테고리 감지 (파일명 기반으로 간단하게)
      detectedCategory.value = detectSimpleCategory(selectedFile.value.name, '')
      console.log('🏷️ 감지된 카테고리:', detectedCategory.value)
      
    } else {
      error.value = 'AI가 퀴즈를 생성하지 못했습니다. 파일 내용을 확인해주세요.'
    }
    
  } catch (err: any) {
    console.error('파일 분석 오류:', err)
    error.value = err?.response?.data?.message || err?.message || '파일 분석 중 오류가 발생했습니다.'
  } finally {
    isGenerating.value = false
  }
}

// 파일 내용 읽기 (더 이상 사용하지 않음)
// const readFileContent = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     
//     reader.onload = (e) => {
//       const content = e.target?.result as string
//       resolve(content)
//     }
//     
//     reader.onerror = () => reject(new Error('파일 읽기 실패'))
//     
//     if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
//       reader.readAsText(file)
//     } else {
//       // PDF나 다른 형식의 경우 텍스트로 읽기 시도
//       reader.readAsText(file)
//     }
//   })
// }

// 간단한 카테고리 감지 (UI 표시용)
const detectSimpleCategory = (fileName: string, content: string = ''): string => {
  const lowerFileName = fileName.toLowerCase()
  const lowerContent = content.toLowerCase()
  
  if (lowerFileName.includes('구구단') || lowerContent.includes('구구단') || 
      lowerContent.includes('곱셈') || /\d\s*×\s*\d/.test(content)) {
    return '구구단'
  }
  
  if (lowerFileName.includes('정보처리기사') || lowerContent.includes('정보처리기사') ||
      lowerContent.includes('컴퓨터') || lowerContent.includes('프로그래밍')) {
    return '정보처리기사'
  }
  
  if (lowerFileName.includes('변호사') || lowerContent.includes('변호사') ||
      lowerContent.includes('법률') || lowerContent.includes('민법')) {
    return '변호사시험'
  }
  
  return '일반'
}

// 파일 크기 포맷
const formatFileSize = (bytes: number, decimalPoint = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimalPoint < 0 ? 0 : decimalPoint
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// 퀴즈 시작
const startQuiz = () => {
  console.log('🚀 퀴즈 시작 버튼 클릭됨')
  console.log('🚀 showQuizModal.value:', showQuizModal.value)
  console.log('🚀 generatedQuestions.value:', generatedQuestions.value)
  console.log('🚀 generatedQuestions.value.length:', generatedQuestions.value.length)
  console.log('🚀 generatedQuestions.value 타입:', typeof generatedQuestions.value)
  console.log('🚀 generatedQuestions.value 배열 여부:', Array.isArray(generatedQuestions.value))
  
  showQuizModal.value = true
  console.log('🚀 showQuizModal.value 변경됨:', showQuizModal.value)
}

// 퀴즈 모달 닫기
const closeQuiz = () => {
  showQuizModal.value = false
}

// 계산된 속성
const oxCount = computed(() => 
  generatedQuestions.value.filter((q: any) => q.quizType === 'ox').length
)

const subjectiveCount = computed(() => 
  generatedQuestions.value.filter((q: any) => q.quizType === 'subject').length
)
</script>

<style scoped>
.file-upload-quiz {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.upload-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  text-align: center;
}

.upload-section h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 24px;
}

.upload-section p {
  color: #6c757d;
  margin-bottom: 20px;
  line-height: 1.6;
}

.file-upload-area {
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  padding: 40px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.file-upload-area:hover {
  border-color: #007bff;
  background: #f8f9ff;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.file-types {
  font-size: 14px;
  color: #6c757d;
  margin-top: 10px;
}

.selected-file {
  margin-top: 20px;
  padding: 15px;
  background: #e9ecef;
  border-radius: 8px;
}

.file-size {
  font-size: 14px;
  color: #6c757d;
  margin: 5px 0 15px 0;
}

.analyze-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.analyze-btn:hover:not(:disabled) {
  background: #0056b3;
}

.analyze-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid #f5c6cb;
  display: flex;
  align-items: center;
  gap: 10px;
}

.clear-error-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.clear-error-btn:hover {
  background-color: #c82333;
}

.quiz-section {
  background: #e8f5e8;
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;
}

.quiz-section h3 {
  color: #155724;
  margin-bottom: 15px;
}

.quiz-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.quiz-info p {
  margin: 8px 0;
  color: #2c3e50;
}

.quiz-breakdown {
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
}

.quiz-breakdown li {
  background: #f8f9fa;
  padding: 8px 15px;
  margin: 5px 0;
  border-radius: 6px;
  color: #495057;
}

.questions-preview {
  background: #f0f7fd;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  border: 1px solid #cce5ff;
}

.questions-preview h4 {
  color: #004085;
  margin-bottom: 10px;
  font-size: 18px;
}

.question-preview {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #b8daff;
}

.question-preview:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.preview-note {
  font-size: 14px;
  color: #6c757d;
  margin-top: 10px;
}

.start-quiz-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}

.start-quiz-btn:hover {
  background: #218838;
}
</style>
