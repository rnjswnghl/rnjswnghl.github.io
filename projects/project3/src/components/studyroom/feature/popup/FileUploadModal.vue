<!-- src/components/studyroom/feature/popup/FileUploadModal.vue -->
<template>
  <!-- ✅ 레이아웃 간섭 없이 항상 최상단에 렌더 -->
  <teleport to="body">
    <div v-if="open" class="modal-overlay" @click.self="onOverlayClick">
      <!-- 토스트 자리(오른쪽 하단)에 도킹되는 모달 -->
      <div
        class="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="uploadTitle"
        tabindex="-1"
        ref="dialogRef"
        @keydown.esc.prevent="onClose"
        @click.stop
      >
        <header class="modal-header">
          <p id="uploadTitle" class="upload-message">📁 파일을 업로드해주세요!</p>
          <button
            class="icon-btn"
            aria-label="모달 닫기"
            :disabled="loading"
            @click="onClose"
            title="닫기"
          >✕</button>
        </header>

        <!-- 파일 선택 -->
        <input
          type="file"
          multiple
          accept=".pdf,.txt,application/pdf,text/plain"
          @change="handleFileChange"
          :disabled="loading"
        />

        <!-- 에러 메시지 -->
        <p v-if="error" class="error-msg">{{ error }}</p>

        <!-- 파일 리스트 + 삭제 -->
        <ul class="file-list" v-if="selectedFiles.length">
          <li v-for="(file, index) in selectedFiles" :key="index">
            <span>
              📄 {{ file.name }}
              <span class="muted">({{ (file.size/1024).toFixed(1) }} KB)</span>
            </span>
            <button
              class="delete-btn"
              @click="removeFile(index)"
              :disabled="loading"
              aria-label="파일 제거"
              title="제거"
            >❌</button>
          </li>
        </ul>

        <!-- 진행률 -->
        <div v-if="loading" class="progress-wrap">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">{{ progress }}%</div>
        </div>

        <div class="buttons">
          <button class="primary" @click="onUpload" :disabled="!selectedFiles.length || loading">
            {{ loading ? '업로드 중...' : '업로드' }}
          </button>
          <button class="ghost" @click="onClose" :disabled="loading">닫기</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import bus from '@/services/eventBus'
import { uploadSummarizeFilesSequential } from '@/api/files'
import { useQuizStore } from '@/stores/quiz'

const props = defineProps<{
  open: boolean
  groupId: string                   // ✅ 스터디 그룹 ID
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'uploaded', results: any): void
}>()

const selectedFiles = ref<File[]>([])
const loading = ref(false)
const error = ref('')
const progress = ref(0)                 // 전체 진행률(0~100)
const eachProgress = ref<number[]>([])  // summarize 모드에서 파일별 진행률 집계용
const dialogRef = ref<HTMLDivElement | null>(null)
const quizStore = useQuizStore()

/** 모달 열릴 때 포커스 및 스크롤 처리 */
watch(
  () => props.open,
  async (v) => {
    if (v) {
      // 도킹 모달이지만 키보드 접근성 위해 포커스
      await nextTick()
      dialogRef.value?.focus()
    } else {
      resetState()
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  // 혹시나 잔여 상태 정리
  loading.value = false
})

function resetState() {
  selectedFiles.value = []
  error.value = ''
  progress.value = 0
  eachProgress.value = []
}

/** 파일 선택 핸들러 */
function handleFileChange(e: Event) {
  if (loading.value) return
  error.value = ''
  const target = e.target as HTMLInputElement
  const picked = Array.from(target.files || [])

  // 1차 필터: pdf/txt만
  const filtered = picked.filter((f) => {
    const ext = f.name.split('.').pop()?.toLowerCase()
    return ext === 'pdf' || ext === 'txt'
  })
  if (filtered.length !== picked.length) {
    error.value = 'pdf/txt 외 파일은 제외되었습니다.'
  }

  // 중복 제거(파일명+사이즈 기준)
  const unique = filtered.filter(
    (nf) => !selectedFiles.value.some((f) => f.name === nf.name && f.size === nf.size)
  )

  selectedFiles.value.push(...unique)
}

/** 개별 파일 제거 */
function removeFile(index: number) {
  if (loading.value) return
  selectedFiles.value.splice(index, 1)
}

/** 오버레이 클릭으로 닫기(업로드 중엔 막기) */
function onOverlayClick() {
  if (loading.value) return
  onClose()
}

/** 닫기 버튼 */
function onClose() {
  if (loading.value) return
  resetState()
  emit('close')
}

/** 업로드 실행 */
async function onUpload() {
  if (!selectedFiles.value.length || loading.value) return

  // 2차 방어: pdf/txt만 허용(일부 브라우저 MIME 빈값 고려)
  const bad = selectedFiles.value.find((f) => {
    const ext = f.name.split('.').pop()?.toLowerCase()
    return ext !== 'pdf' && ext !== 'txt'
  })
  if (bad) {
    error.value = 'pdf 또는 txt 파일만 업로드할 수 있습니다.'
    return
  }

  loading.value = true
  error.value = ''
  progress.value = 0
  eachProgress.value = Array(selectedFiles.value.length).fill(0)

  try {
    let results: any

    // ✅ GPT API 사용 (groupId 기반)
    results = await uploadSummarizeFilesSequential(
      props.groupId,
      selectedFiles.value,
      (idx, p) => {
        eachProgress.value[idx] = p
        const sum = eachProgress.value.reduce((a, b) => a + b, 0)
        progress.value = Math.round(sum / eachProgress.value.length)
      }
    )

    // 부모/상위 로직에 성공 전달
    emit('uploaded', results)

    // ✅ 퀴즈 생성 완료 확인 및 알림
    if (results && typeof results === 'object') {
      console.log('🔍 파일 업로드 응답 분석:', results)
      console.log('🔍 응답 타입:', typeof results)
      console.log('🔍 응답 키들:', Object.keys(results))

      // 응답에서 퀴즈 생성 완료 여부 확인 (더 유연하게)
      let quizGenerated = false

      // 1. 명시적인 퀴즈 생성 완료 플래그
      if (results.quizGenerated || results.quiz_generated || results.quizGenerated === true) {
        quizGenerated = true
        console.log('✅ 명시적 퀴즈 생성 완료 플래그 발견')
      }

      // 2. 상태 기반 확인
      else if (results.status === 'SUCCESS' || results.status === 'success' || results.status === 200) {
        quizGenerated = true
        console.log('✅ 성공 상태로 퀴즈 생성 완료로 간주')
      }

      // 3. 응답 구조 기반 확인 (퀴즈 데이터가 포함된 경우)
      else if (results.quiz || results.quizzes || results.questions || results.data?.quiz) {
        quizGenerated = true
        console.log('✅ 퀴즈 데이터 포함으로 퀴즈 생성 완료로 간주')
      }

      // 4. 에러가 없는 경우 (기본적으로 성공으로 간주)
      else if (!results.error && !results.errors && results.message !== 'error') {
        quizGenerated = true
        console.log('✅ 에러가 없어서 퀴즈 생성 완료로 간주')
      }

      // 5. 응답이 있고 기본 구조가 있는 경우
      else if (results.data || results.result || results.response) {
        quizGenerated = true
        console.log('✅ 유효한 응답 구조로 퀴즈 생성 완료로 간주')
      }

      if (quizGenerated) {
        console.log('🎯 퀴즈 생성 완료 확인됨:', results)
        
        // AI 퀴즈 데이터를 스토어에 저장
        try {
          console.log('📝 AI 응답 데이터 분석 시작:', results)
          
          // 새로운 API 스펙에 맞게 퀴즈 데이터 처리
          // API 응답: [{ quiz: [...], quizType: [...], answer: [...] }] 형태
          let rawQuestions: any[] = []
          
          if (Array.isArray(results) && results.length > 0) {
            const firstResult = results[0]
            console.log('📝 API 응답 첫 번째 요소 (전체 객체):', firstResult)
            
            // firstResult가 배열인 경우 (중첩 배열 구조)
            if (Array.isArray(firstResult) && firstResult.length > 0) {
              console.log('📝 firstResult가 배열임을 확인, 퀴즈 데이터 직접 추출')
              // firstResult 배열의 각 요소가 퀴즈 객체인지 확인
              if (firstResult[0] && firstResult[0].quiz && firstResult[0].quizType && firstResult[0].answer) {
                console.log('📝 QuizResponse[] 형태로 직접 추출')
                rawQuestions = firstResult
              } else {
                console.log('📝 다른 형태의 배열, 전체를 rawQuestions로 설정')
                rawQuestions = firstResult
              }
            }
            // firstResult가 객체인 경우 (기존 구조)
            else if (firstResult && typeof firstResult === 'object') {
              console.log('📝 firstResult가 객체임, 기존 로직으로 처리')
              if (firstResult.quiz && Array.isArray(firstResult.quiz) && 
                  firstResult.quizType && Array.isArray(firstResult.quizType) && 
                  firstResult.answer && Array.isArray(firstResult.answer)) {
                
                // 4개의 퀴즈를 생성
                const quizCount = Math.min(firstResult.quiz.length, 4)
                console.log('📝 추출할 퀴즈 개수 (quizCount):', quizCount)
                for (let i = 0; i < quizCount; i++) {
                  rawQuestions.push({
                    quiz: firstResult.quiz[i],
                    quizType: firstResult.quizType[i],
                    answer: firstResult.answer[i]
                  })
                }
                console.log('📝 배열에서 추출된 퀴즈:', rawQuestions)
              } else {
                // 기존 방식 (하위 호환성)
                rawQuestions = results
              }
            }
          } else if (results && typeof results === 'object') {
            // 다른 응답 구조인 경우 (하위 호환성)
            if (results.questions) {
              rawQuestions = results.questions
            } else if (results.quiz) {
              rawQuestions = Array.isArray(results.quiz) ? results.quiz : [results.quiz]
            }
          }
          
          console.log('📝 최종 추출된 문제 목록:', rawQuestions)
          console.log('📝 문제 수:', rawQuestions.length)
          
          if (rawQuestions.length > 0) {
            // AI 퀴즈 데이터를 스토어에 저장
            const aiQuizData = {
              groupId: props.groupId,
              questions: rawQuestions,
              generatedAt: new Date().toISOString()
            }
            
            console.log('📝 스토어에 저장할 AI 퀴즈 데이터:', aiQuizData)
            quizStore.setAIQuizData(aiQuizData)
            console.log('✅ AI 퀴즈 데이터가 스토어에 저장되었습니다')
            
            // 스토어에서 데이터 확인
            const storedData = quizStore.getAIQuizData(props.groupId)
            console.log('🔍 스토어에서 확인된 데이터:', storedData)
            
          } else {
            console.log('⚠️ API에서 퀴즈를 반환하지 않았습니다.')
          }
        } catch (e) {
          console.error('❌ AI 퀴즈 데이터 저장 실패:', e)
        }
        
        // 퀴즈 생성 완료 알림 전역 이벤트 발생
        bus.emit('quiz:generated', {
          groupId: props.groupId,
          quizData: results
        })
        console.log('✅ quiz:generated 이벤트 발생 완료')
      } else {
        console.log('⚠️ 퀴즈 생성 완료 확인되지 않음:', results)
        console.log('🔍 퀴즈 생성 실패 또는 응답 구조 문제')
      }
    } else {
      console.log('❌ 응답이 없거나 객체가 아님:', results)
    }

    // 같은 roomId를 보고 있는 다른 곳에서도 닫히도록 전역 신호
    bus.emit('upload:done', { groupId: props.groupId })

    // 🧪 테스트용 강제 알림 제거 (중복 알림 방지)
    // 실제 서버 응답이 있을 때는 강제 알림을 발생시키지 않음

    // 내부 상태 초기화 + 닫기
    onClose()
  } catch (e: any) {
    error.value = e?.response?.data?.message || e?.message || '업로드 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 오버레이: 투명(뒤 컨텍스트 유지), 최상단 레이어 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: transparent; /* 도킹 모달이므로 dim 제거 */
  z-index: 2000;
}

/* 도킹 모달: 토스트 자리에 붙는 카드 */
.modal-content {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 380px;
  max-width: calc(100% - 40px);
  background: #ffffff;
  border: 1px solid #d6dee5;
  border-radius: 12px;
  padding: 14px 14px 12px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
  z-index: 2001;
  outline: none;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.icon-btn {
  border: none;
  background: transparent;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  color: #5b6878;
}
.icon-btn:disabled { cursor: not-allowed; opacity: .5; }

.upload-message {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1d2b42;
  margin: 0.25rem 0 0.6rem;
}

input[type='file'] { margin-bottom: 0.75rem; width: 100%; }

.error-msg {
  color: #c0392b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.file-list {
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 0.8rem;
  list-style: none;
  padding-left: 0;
  max-height: 180px;
  overflow: auto;
}
.file-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 8px;
}
.delete-btn {
  background: none;
  border: none;
  color: #f03e3e;
  font-size: 1rem;
  cursor: pointer;
}

.progress-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.progress-bar {
  flex: 1;
  height: 8px;
  background: #eef2f7;
  border-radius: 999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #6db3f2;
  width: 0%;
  transition: width .2s ease;
}
.progress-text {
  width: 42px;
  text-align: right;
  font-size: 12px;
  color: #4a4a4a;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
button {
  padding: 0.5rem 0.9rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
}
button:disabled { opacity: .6; cursor: not-allowed; }
.primary { background-color: #6db3f2; color: #fff; }
.ghost { background-color: #f3f4f6; color: #223; }
.muted { color: #6b7280; }
</style>
