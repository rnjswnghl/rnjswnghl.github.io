<!-- src/views/StudyRoom/LeaderDashboardView.vue -->
<template>
  <div class="leader-dashboard">
    <!-- 에러 상태 -->
    <div v-if="!studyId" class="error-state">
      <h2>스터디 ID가 없습니다</h2>
      <p>올바른 경로로 접속해주세요.</p>
      <button @click="$router.push('/mypage/study')" class="back-btn">돌아가기</button>
    </div>

    <!-- 로딩 상태 -->
    <div v-else-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>스터디룸에 연결 중...</p>
    </div>

    <!-- 연결 에러 -->
    <div v-else-if="connectionError" class="error-state">
      <h2>연결 실패</h2>
      <p>{{ connectionError }}</p>
      <button @click="retryConnection" class="retry-btn">다시 시도</button>
      <button @click="$router.push('/mypage/study')" class="back-btn">돌아가기</button>
    </div>

    <!-- 메인 UI -->
    <template v-else>
      <section class="left-col">
        <div class="video-shell">
          <div class="video-grid">
            <!-- 화면 공유 -->
            <template v-if="screenStream">
              <video ref="screenVideoRef" autoplay playsinline muted class="shared-screen"></video>
            </template>

            <!-- 일반 그리드 -->
            <template v-else>
              <!-- 내 영상 -->
              <VideoStream
                v-if="publisher"
                :nickname="nickname"
                :stream="publisher"
                :micOn="isMicOn"
                :cameraOn="isCameraOn"
                :isSpeaking="false"
                :overlayEmoji="emojiMap[myUserId] || ''"
              />
              <!-- 참가자들 -->
              <VideoStream
                v-for="(sub, idx) in subscribers"
                :key="getSubscriberUserId(sub) ?? idx"
                :nickname="getSubscriberNickname(sub, idx)"
                :stream="sub"
                :micOn="sub.stream?.audioActive"
                :cameraOn="sub.stream?.videoActive"
                :isSpeaking="false"
                :overlayEmoji="emojiMap[getSubscriberUserId(sub) || ''] || ''"
              />
            </template>
          </div>

          <EmojiReaction
            v-if="showEmojiPicker"
            @select="handleEmojiSelect"
            @close="handleEmojiClose"
          />

          <PomodoroTimer
            v-if="isPomodoroActive"
            :focus="pomodoroConfig.focus"
            :break="pomodoroConfig.break"
            :cycles="pomodoroConfig.cycles"
            @done="onPomodoroDone"
          />
        </div>

        <!-- 하단 컨트롤바 -->
        <div class="bottom-bar">
          <BottomControlBar
            :isLeader="true"
            :micOn="isMicOn"
            :cameraOn="isCameraOn"
            @emojiClick="toggleEmojiPicker"
            @emoji="sendEmoji"
            @open-stopwatch-setting="openStopwatchSetting"
            @open-pomodoro-setting="() => (isPomodoroSettingOpen = true)"
            @stop-pomodoro="onStopPomodoro"
            @select-tool="handleMenuClick"
            @open-whiteboard="() => (isWhiteboardVisible = true)"
            @open-screen-share="() => (isScreenShareOpen = true)"
            @toggle-mic="toggleMic"
            @toggle-camera="toggleCamera"
            @change-background="handleChangeBackground"
            @exit="onExit"
          />
        </div>
      </section>

      <!-- 오른쪽 사이드바 -->
      <aside class="right-sidebar">
        <div class="sidebar-header">
          <div class="tabs-and-button">
            <div class="tab-buttons">
              <button @click="activePanel = 'chat'" :class="{ active: activePanel === 'chat' }">채팅</button>
              <button @click="activePanel = 'members'" :class="{ active: activePanel === 'members' }">멤버</button>
            </div>
            <button
              class="study-start-button"
              :class="{ end: study.isLive }"
              @click="onClickStudy"
              :disabled="!session"
            >
              {{ study.isLive ? '스터디 종료' : '스터디 시작' }}
            </button>
          </div>
        </div>

        <div class="panel-content panel-scroll">
          <ChatPanel
            v-if="activePanel === 'chat'"
            :messages="chatMessagesForPanel"
            @send="handleSendMessage"
          />
          <MemberPanel
            v-else
            :isLeader="true"
            :members="membersForPanel"
            @request-camera="handleCameraRequest"
          />
        </div>

        <div class="sidebar-footer">
          <RecordingButton />
        </div>
      </aside>

      <!-- 오버레이/모달 -->
      <StopwatchSettingModal
        v-if="isStopwatchSettingOpen"
        @close="isStopwatchSettingOpen = false"
        @confirm="onConfirmStopwatch"
      />
      <ActiveStopwatch
        v-if="activeStopwatchSetting"
        :setting="activeStopwatchSetting"
        @close="activeStopwatchSetting = null"
        @end="onStopwatchEnd"
      />
      <div v-if="showStopwatchEndToast" class="stopwatch-end-message">
        ⏱ 스탑워치가 종료되었습니다.
      </div>
      <Whiteboard v-if="isWhiteboardVisible" @close="isWhiteboardVisible = false" />

      <!-- 뽀모도로 설정 모달 -->
      <PomodoroSettingModal
        v-if="isPomodoroSettingOpen"
        @close="isPomodoroSettingOpen = false"
        @confirm="onConfirmPomodoro"
      />

      <!-- 나가기 확인 모달 -->
      <div v-if="showExitConfirmModal" class="exit-modal-overlay" @click="showExitConfirmModal = false">
        <div class="exit-modal" @click.stop>
          <h3>스터디룸 나가기</h3>
          <p>정말로 스터디룸을 나가시겠습니까?</p>
          <div class="modal-actions">
            <button class="confirm-btn" @click="confirmExit">나가기</button>
            <button class="cancel-btn" @click="showExitConfirmModal = false">취소</button>
          </div>
        </div>
      </div>
    </template>

    <!-- ✅ 파일 업로드 토스트 (오른쪽 하단, 방장 전용) -->
    <FileUploadToast
      :visible="shouldShowUploadToast"
      @open-modal="openUploadModal"
    />

    <!-- ✅ 파일 업로드 모달 -->
    <FileUploadModal
      :open="isUploadModalOpen"
      :groupId="groupId || ''"
      @close="closeUploadModal"
      @uploaded="handleFileUploaded"
    />

    <!-- ✅ 퀴즈 생성 알림 토스트 -->
    <QuizGeneratedToast
      :visible="shouldShowQuizGeneratedToast"
      :groupId="groupId"
      @view-quiz="handleViewQuiz"
    />

    <!-- ✅ AI 퀴즈 모달 -->
    <AIQuizModal
      :visible="showQuizModal"
      :groupId="groupId"
      @close="closeQuizModal"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, onMounted, onBeforeUnmount, watchEffect, computed, withDefaults, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  connectByStudyId,
  leaveSession,
  publisher,
  subscribers,
  session,
  roomId,
  attachStudySignalListener,
  detachStudySignalListener,
  sendStudySignal,
  installLeaderLateJoinSync,
  initEmojiSignal,
  sendEmojiSignal,
  emojiMap,
} from '@/composables/useOpenVidu'
import { useUserStore } from '@/stores/user'
import { useStudyStore } from '@/stores/study'
import { useOvChat } from '@/composables/useOvChat'
import type { Session } from 'openvidu-browser'
import bus from '@/services/eventBus'

import VideoStream from '@/components/studyroom/feature/media/VideoStream.vue'
import BottomControlBar from '@/components/studyroom/layout/BottomControlBar.vue'
import ChatPanel from '@/components/studyroom/layout/ChatPanel.vue'
import MemberPanel from '@/components/studyroom/layout/MemberPanel.vue'
import RecordingButton from '@/components/studyroom/feature/control/RecordingButton.vue'
import StopwatchSettingModal from '@/components/studyroom/feature/timer/StopwatchSettingModal.vue'
import ActiveStopwatch from '@/components/studyroom/feature/control/ActiveStopwatch.vue'
import Whiteboard from '@/components/studyroom/feature/whiteboard/Whiteboard.vue'
import PomodoroSettingModal from '@/components/studyroom/feature/timer/PomodoroSettingModal.vue'
import PomodoroTimer from '@/components/studyroom/feature/timer/PomodoroTimer.vue'
import EmojiReaction from '@/components/studyroom/feature/interaction/EmojiReaction.vue'
import FileUploadToast from '@/components/studyroom/feature/popup/FileUploadToast.vue'
import FileUploadModal from '@/components/studyroom/feature/popup/FileUploadModal.vue'
import QuizGeneratedToast from '@/components/studyroom/feature/popup/QuizGeneratedToast.vue'
import AIQuizModal from '@/components/quiz/AIQuizModal.vue'

// MediaPipe 타입 선언
declare global {
  interface Window {
    SelfieSegmentation: any
  }
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const study = useStudyStore()

const studyId = (route.params.groupId as string) || ''
const groupId = computed(() => studyId)

const isLoading = ref(false)
const connectionError = ref('')

const nickname = ref('')
const myUserId = ref('')

// ✅ JoinForm에서 전달받은 카메라/마이크 상태로 초기화
const isMicOn = ref(route.query.mic === 'true')
const isCameraOn = ref(route.query.cam === 'true')

// ✅ LocalStorage에서 가상배경 정보 읽어오기
const bgMode = ref<'original' | 'blur' | 'image'>('original')
const bgImage = ref<HTMLImageElement | null>(null)
const bgReady = ref(false)
const showBackgroundModal = ref(false)

function loadBackgroundSettings() {
  const storedBgMode = localStorage.getItem(`bgMode_${groupId.value}`)
  const storedBgImage = localStorage.getItem(`bgImage_${groupId.value}`)
  if (storedBgMode) bgMode.value = storedBgMode as any
  if (storedBgImage && bgMode.value === 'image') {
    const img = new Image()
    img.onload = () => { bgImage.value = img; bgReady.value = true }
    img.src = storedBgImage
  }

  console.log('🔍 가상배경 설정 로드:', { bgMode: bgMode.value, bgReady: bgReady.value })
}

// 가상 배경 적용
async function applyVirtualBackground() {
  console.log('🔍 가상배경 적용 시작:', {
    bgMode: bgMode.value,
    bgReady: bgReady.value,
    hasPublisher: !!publisher.value,
    hasStream: !!(publisher.value?.stream)
  })

  if (!publisher.value) {
    console.error('❌ Publisher가 준비되지 않음')
    return
  }

  if (bgMode.value === 'original') {
    console.log('✅ 원본 모드 - 가상배경 적용 안함')
    return
  }

  try {
    console.log('🔍 가상배경 적용 시작:', bgMode.value)

    // 간단한 테스트: CSS 필터를 사용한 가상 배경 적용
    if (bgMode.value === 'blur' || bgMode.value === 'image') {
      console.log('🎨 CSS 필터로 가상배경 적용 시도...')

      try {
        // VideoStream 컴포넌트에 CSS 클래스 추가
        const videoElements = document.querySelectorAll('.video-stream video')
        console.log('🔍 비디오 요소 발견:', videoElements.length)

        videoElements.forEach((video, index) => {
          if (video instanceof HTMLVideoElement) {
            console.log(`🎥 비디오 ${index + 1} 처리:`, video)

            if (bgMode.value === 'blur') {
              // 블러 효과 적용
              video.style.filter = 'blur(10px)'
              video.style.backdropFilter = 'blur(20px)'
              console.log(`✅ 비디오 ${index + 1}에 블러 효과 적용`)
            } else if (bgMode.value === 'image') {
              // 이미지 배경 효과 (밝기/대비 조정)
              video.style.filter = 'brightness(1.2) contrast(1.1) saturate(1.1)'
              console.log(`✅ 비디오 ${index + 1}에 이미지 효과 적용`)
            }
          }
        })

        console.log('✅ CSS 필터로 가상배경 적용 완료!')

      } catch (cssError) {
        console.error('❌ CSS 필터 적용 실패:', cssError)
      }
    }

  } catch (error) {
    console.error('❌ 가상배경 적용 실패:', error)
  }
}

// 블러 배경 적용
async function applyBlurBackground() {
  console.log('🔍 블러 배경 적용 시작')

  try {
    // MediaPipe SelfieSegmentation 초기화
    if (!window.SelfieSegmentation) {
      console.error('❌ MediaPipe SelfieSegmentation이 로드되지 않음')
      return
    }

    console.log('✅ MediaPipe SelfieSegmentation 로드됨')

    // 카메라 스트림 가져오기
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    console.log('✅ 카메라 스트림 획득:', stream)

    // 비디오 요소 생성 및 스트림 연결
    const video = document.createElement('video')
    video.srcObject = stream
    video.width = 640
    video.height = 480

    // 비디오 로드 대기
   await new Promise<void>((resolve) => {
  video.onloadedmetadata = () => resolve()
  })


    console.log('✅ 비디오 메타데이터 로드 완료')

    // Canvas 생성
    const canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 480
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      console.error('❌ Canvas context 생성 실패')
      return
    }

    console.log('✅ Canvas 생성 완료')

    // ✅ 타입: onResults에 전달되는 값 최소 정의(세그멘테이션 마스크는 any로)
    type SelfieSegmentationResults = {
      image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
      segmentationMask: any
      [key: string]: unknown
    }

    // SelfieSegmentation 실행
    const selfieSegmentation = new window.SelfieSegmentation({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    })

    // 일부 버전에는 initialize가 없을 수 있으나, 기존 로직 유지
    // @ts-ignore
    await selfieSegmentation.initialize?.()
    console.log('✅ SelfieSegmentation 초기화 완료')

    // 세그멘테이션 실행
    await selfieSegmentation.setOptions({
      modelSelection: 1,
    })

    console.log('✅ SelfieSegmentation 옵션 설정 완료')

    // 결과 처리
    selfieSegmentation.onResults((results: SelfieSegmentationResults) => {
      if (ctx && results.segmentationMask) {
        // 원본 비디오 그리기
        ctx.drawImage(results.image as CanvasImageSource, 0, 0, canvas.width, canvas.height)

        // 세그멘테이션 마스크로 블러 효과 적용
        // (주의) 아래 로직은 예시이며 실제 MediaPipe 마스크 구조와 다를 수 있음
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // segmentationMask.data 사용 부분은 라이브러리 버전에 따라 불가할 수 있어 any 처리
        // 실제 프로젝트에서는 WebGL / 두 개의 캔버스 합성 방식을 권장
        const maskData = (results.segmentationMask as any).data

        if (maskData) {
          for (let i = 0; i < data.length; i += 4) {
            const alpha = maskData[i / 4]
            if (alpha < 0.5) {
              data[i] = data[i] * 0.5     // R
              data[i + 1] = data[i + 1] * 0.5 // G
              data[i + 2] = data[i + 2] * 0.5 // B
            }
          }
        }

        ctx.putImageData(imageData, 0, 0)

        // Canvas를 스트림으로 변환
        const processedStream = canvas.captureStream(30)
        console.log('✅ 처리된 스트림 생성:', processedStream)

        // OpenVidu Publisher에 적용
        if (publisher.value && processedStream.getVideoTracks().length > 0) {
          const videoTrack = processedStream.getVideoTracks()[0]
          console.log('✅ 비디오 트랙 적용:', videoTrack)
          publisher.value.replaceTrack(videoTrack)
        }
      }
    })

    // 비디오 재생 시작
    video.play()
    console.log('✅ 비디오 재생 시작')

  } catch (error) {
    console.error('❌ 블러 배경 적용 실패:', error)
  }
}

// 배경 이미지 적용
async function applyImageBackground() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = 1280
    canvas.height = 720

    // MediaPipe SelfieSegmentation 설정
    const { SelfieSegmentation } = await import('@mediapipe/selfie_segmentation')
    const { Camera } = await import('@mediapipe/camera_utils')

    const selfie = new SelfieSegmentation({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    })

    selfie.setOptions({
      modelSelection: 1,
      selfieMode: true,
    })

    const video = document.createElement('video')
    video.srcObject = stream
    video.play()

    // 배경 이미지와 카메라 합성
    const processedStream = canvas.captureStream(30)

    // SelfieSegmentation 결과 처리
    selfie.onResults((results: any) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 배경 이미지 그리기
      if (bgImage.value) {
        // 배경 이미지를 캔버스에 맞게 조정
        const imgAspect = bgImage.value.width / bgImage.value.height
        const canvasAspect = canvas.width / canvas.height

        let drawWidth, drawHeight, offsetX, offsetY

        if (imgAspect > canvasAspect) {
          // 이미지가 더 넓음
          drawHeight = canvas.height
          drawWidth = canvas.height * imgAspect
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 0
        } else {
          // 이미지가 더 높음
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        }

        ctx.drawImage(bgImage.value, offsetX, offsetY, drawWidth, drawHeight)
      }

      // 사람만 원본으로 그리기
      ctx.globalCompositeOperation = 'destination-in'
      ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'

      // 원본 사람 그리기
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)
    })

    // 카메라 프레임 처리
    const camera = new Camera(video, {
      onFrame: async () => {
        if (selfie) await selfie.send({ image: video })
      },
      width: canvas.width,
      height: canvas.height,
    })

    camera.start()

    // OpenVidu Publisher에 적용
    if (publisher.value) {
      publisher.value.replaceTrack(processedStream.getVideoTracks()[0])
      console.log('✅ 배경 이미지 적용 완료')
    }

  } catch (error) {
    console.error('❌ 배경 이미지 적용 실패:', error)
  }
}

// 배경화면 조정 버튼 클릭 처리
function handleChangeBackground() {
  showBackgroundModal.value = true
}

// ✅ 파일 업로드 관련 함수들
function openUploadModal() {
  shouldShowUploadToast.value = false
  isUploadModalOpen.value = true
}

function closeUploadModal() {
  isUploadModalOpen.value = false
}

function handleFileUploaded() {
  fileUploaded.value = true
  shouldShowUploadToast.value = false
  isUploadModalOpen.value = false
  console.log('✅ Leader 페이지 파일 업로드 완료')
}

// ✅ 퀴즈 보기 처리
function handleViewQuiz() {
  shouldShowQuizGeneratedToast.value = false
  showQuizModal.value = true
  console.log('🔍 Leader 페이지: 퀴즈 모달 열기')
}

// ✅ 퀴즈 모달 닫기
function closeQuizModal() {
  showQuizModal.value = false
  console.log('🔍 Leader 페이지: 퀴즈 모달 닫기')
}

// ✅ 퀴즈 생성 알림 수신 처리
function handleQuizGenerated(data: { groupId: string; quizData: any }) {
  console.log('🎯 Leader 페이지: 퀴즈 생성 알림 수신:', data)
  console.log('🔍 현재 shouldShowQuizGeneratedToast 상태:', shouldShowQuizGeneratedToast.value)

  shouldShowQuizGeneratedToast.value = true

  console.log('✅ shouldShowQuizGeneratedToast를 true로 설정 완료')
  console.log('🔍 QuizGeneratedToast 컴포넌트 표시 여부:', shouldShowQuizGeneratedToast.value)
}

// ✅ 스터디 종료 10분 전 파일 업로드 알림
function checkStudyEndTime() {
  if (!props.studyEndTime) return

  const now = new Date()
  const endTime = new Date(props.studyEndTime)
  const timeLeft = endTime.getTime() - now.getTime()
  const minutes = Math.floor(timeLeft / 60000)

  // 10분 전이고 아직 업로드하지 않았다면 토스트 표시
  if (minutes <= 10 && minutes > 0 && !fileUploaded.value) {
    shouldShowUploadToast.value = true
    console.log('🔍 Leader 페이지: 스터디 종료 10분 전, 파일 업로드 토스트 표시')
  }
}

// 방에 들어간 후 1분 뒤에 파일 업로드 토스트 표시
function showUploadToastAfterDelay() {
  console.log('⏰ 방에 들어간 후 1분 뒤, 파일 업로드 토스트 표시')
  shouldShowUploadToast.value = true
}

console.log('🔍 Leader 페이지 카메라/마이크 상태 초기화:', {
  query: route.query,
  isMicOn: isMicOn.value,
  isCameraOn: isCameraOn.value
})

const { messages: ovMessages, attach: attachChat, detach: detachChat, send: sendChat } = useOvChat()
const chatMessagesForPanel = computed(() =>
  ovMessages.value.map(m => ({ userId: m.fromId, nickname: m.fromName, text: m.text }))
)

// UI 상태
const showEmojiPicker = ref(false)
const activePanel = ref<'chat' | 'members'>('chat')
const isStopwatchSettingOpen = ref(false)
const activeStopwatchSetting = ref<null | { duration: number; autoRepeat: boolean }>(null)
const showStopwatchEndToast = ref(false)
const isWhiteboardVisible = ref(false)
const isPomodoroSettingOpen = ref(false)
const isPomodoroActive = ref(false)
const showExitConfirmModal = ref(false)
const pomodoroConfig = ref({ focus: 25, break: 5, cycles: 1 })
const screenStream = ref<MediaStream | null>(null)
const screenVideoRef = ref<HTMLVideoElement | null>(null)
const isScreenShareOpen = ref(false)

// 파일 업로드/퀴즈 토스트
const shouldShowUploadToast = ref(false) // 방에 들어간 후 1분 뒤에 표시되도록 false로 초기화
const isUploadModalOpen = ref(false)
const fileUploaded = ref(false)
const shouldShowQuizGeneratedToast = ref(false)

// ✅ 퀴즈 관련 상태
const showQuizModal = ref(false)

const props = withDefaults(defineProps<{ studyEndTime?: string }>(), { studyEndTime: '' })

let uploadToastTimerId: number | null = null
function scheduleUploadToastReminder() {
  if (!props.studyEndTime) return
  const diffMs = dayjs(props.studyEndTime).subtract(10, 'minute').diff(dayjs())
  if (diffMs > 0) uploadToastTimerId = window.setTimeout(() => (shouldShowUploadToast.value = true), diffMs)
  else shouldShowUploadToast.value = true
}

/** 안전 파서 */
function parseConnDataSafe(raw: unknown): any | null {
  if (!raw) return null
  try {
    const data = JSON.parse(String(raw).split('%/%')[0].trim())
    return data
  } catch {
    try {
      const s = String(raw)
      const start = s.indexOf('{'); const end = s.lastIndexOf('}')
      if (start >= 0 && end > start) return JSON.parse(s.slice(start, end + 1))
    } catch {}
    return null
  }
}
const getSubscriberUserId = (sub: any): string | null => {
  try {
    const conn = sub?.stream?.connection
    const data = parseConnDataSafe(conn?.data)
    return data?.userId || conn?.connectionId || null
  } catch {
    return sub?.stream?.connection?.connectionId || null
  }
}
const getSubscriberNickname = (sub: any, index: number) => {
  try { return parseConnDataSafe(sub?.stream?.connection?.data)?.clientData || `참가자 ${index + 1}` }
  catch { return `참가자 ${index + 1}` }
}

const getMemberList = () => {
  const host = { userId: myUserId.value, nickname: nickname.value || '익명', cameraOn: isCameraOn.value, micOn: isMicOn.value, stream: publisher.value }
  const others = subscribers.value.map((sub, idx) => {
    const userId = getSubscriberUserId(sub) || `participant-${idx + 1}`
    const subNickname = getSubscriberNickname(sub, idx)
    return { userId, nickname: subNickname, cameraOn: sub.stream?.videoActive ?? false, micOn: sub.stream?.audioActive ?? false, stream: sub }
  })
  return [host, ...others]
}
const membersForPanel = computed(() => getMemberList().map(m => ({ ...m, isSelf: m.userId === myUserId.value })))

function toggleEmojiPicker() { showEmojiPicker.value = !showEmojiPicker.value }
function handleEmojiSelect(emoji: string) { sendEmoji(emoji); showEmojiPicker.value = false }
function handleEmojiClose() { showEmojiPicker.value = false }

const onPomodoroDone = () => { isPomodoroActive.value = false }
const openStopwatchSetting = () => { isStopwatchSettingOpen.value = true }
const onStopPomodoro = () => { isPomodoroActive.value = false }
const onConfirmStopwatch = (setting: { duration: number; autoRepeat: boolean }) => {
  activeStopwatchSetting.value = setting; isStopwatchSettingOpen.value = false
}
const onStopwatchEnd = () => { showStopwatchEndToast.value = true; setTimeout(() => (showStopwatchEndToast.value = false), 3000) }

// 뽀모도로 설정 확인 및 동기화
const onConfirmPomodoro = async (config: { focus: number; break: number; cycles: number }) => {
  console.log('🍅 뽀모도로 설정 확인:', config)

  // 로컬 설정 업데이트
  pomodoroConfig.value = config
  isPomodoroSettingOpen.value = false
  isPomodoroActive.value = true

  // 모든 멤버에게 뽀모도로 설정 동기화
  if (session.value) {
    try {
      console.log('📡 뽀모도로 신호 전송 시작...')
      console.log('📡 세션 상태:', !!session.value)
      console.log('📡 전송할 데이터:', config)

      await session.value.signal({
        type: 'pomodoro-start',
        data: JSON.stringify({
          focus: config.focus,
          break: config.break,
          cycles: config.cycles,
          fromUserId: myUserId.value
        })
      })
      console.log('✅ 뽀모도로 설정 동기화 신호 전송 성공')
    } catch (e) {
      console.error('❌ 뽀모도로 설정 동기화 신호 전송 실패:', e)
    }
  } else {
    console.error('❌ 세션이 연결되지 않음 - 뽀모도로 신호 전송 불가')
  }
}

function findConnectionByUserId(targetId: string) {
  const pubConn = publisher.value?.stream?.connection
  if (pubConn) {
    const data = parseConnDataSafe(pubConn.data)
    const id = data?.userId || pubConn.connectionId
    if (id === targetId) return pubConn
  }
  for (const sub of subscribers.value) {
    const conn = sub?.stream?.connection; if (!conn) continue
    const data = parseConnDataSafe(conn.data)
    const id = data?.userId || conn.connectionId
    if (id === targetId) return conn
  }
  return null
}

const onClickStudy = async () => {
  if (!session.value) return
  try { if (study.isLive) await sendStudySignal('end'); else await sendStudySignal('start') }
  catch (e) { console.error('study start/stop failed', e) }
}
const retryConnection = async () => { connectionError.value = ''; await initializeStudyRoom() }

const initializeStudyRoom = async () => {
  if (!studyId) { console.error('❌ studyId가 없습니다.'); return }
  isLoading.value = true; connectionError.value = ''
  try {
    await userStore.fetchUser()
    nickname.value = userStore.user?.nickname || '익명'
    // scheduleUploadToastReminder() 제거 - onMounted에서 1분 뒤에 호출

    // ✅ 여기서 userId 를 먼저 만들고 connectByStudyId 에 넘김
    const preUserId = `${nickname.value}-${Date.now()}-${Math.random().toString(36).slice(2,9)}`
    const connectionResult = await connectByStudyId({
      studyId, nickname: nickname.value, userId: preUserId, camOn: isCameraOn.value, micOn: isMicOn.value, isLeader: true,
    })
    console.log('✅ 리더 연결 성공:', connectionResult)
    if (!session.value) throw new Error('세션이 초기화되지 않았습니다.')
    const currentSession = session.value as Session

    myUserId.value = connectionResult.userId
    attachChat(currentSession, { id: myUserId.value, name: nickname.value || '익명' })

    // ✅ 공용 이모지 수신기 설치
    initEmojiSignal(session as any)

    attachStudySignalListener()
    installLeaderLateJoinSync()

    // 가상 배경 적용 (publisher가 완전히 준비된 후)
    if (bgMode.value !== 'original') {
      // publisher가 준비될 때까지 대기
      const waitForPublisher = () => {
        if (publisher.value && publisher.value.stream) {
          console.log('✅ Publisher 준비 완료, 가상배경 적용 시작')
          applyVirtualBackground()
        } else {
          console.log('⏳ Publisher 대기 중...')
          setTimeout(waitForPublisher, 500)
        }
      }
      waitForPublisher()
    }

    isLoading.value = false
  } catch (err: any) {
    console.error('세션 연결 실패:', err)
    isLoading.value = false
    connectionError.value = err?.message || '스터디룸 연결에 실패했습니다.'
  }
}
// 타이머 변수를 setup 함수 상단에서 선언
let studyEndTimer: NodeJS.Timeout | null = null

onMounted(async () => {
  loadBackgroundSettings()
  await initializeStudyRoom()

  setTimeout(() => {
    showUploadToastAfterDelay() // 1분 뒤에 파일 업로드 토스트 표시
    checkStudyEndTime() // 스터디 종료 시간 체크
    scheduleUploadToastReminder() // 스터디 종료 10분 전 토스트 스케줄링
  }, 60000) // 1분(60000ms) 뒤에 체크

  studyEndTimer = setInterval(checkStudyEndTime, 60000)
})

// 라이프사이클 훅들을 setup 함수 상단으로 이동
onBeforeUnmount(() => {
  if (studyEndTimer) clearInterval(studyEndTimer)
  detachChat()
  session.value?.off('signal:emoji')
  if (uploadToastTimerId !== null) clearTimeout(uploadToastTimerId)
  detachStudySignalListener()
  leaveSession()
  bus.off('quiz:generated', handleQuizGenerated)
})

// 이벤트 버스 연결을 onMounted 밖으로 이동
console.log('🔌 Leader 페이지: 퀴즈 생성 이벤트 리스너 등록 시작')
bus.on('quiz:generated', handleQuizGenerated)
console.log('✅ Leader 페이지: 퀴즈 생성 이벤트 리스너 등록 완료')

const handleSendMessage = async (text: string) => {
  if (!session.value) return console.warn('OpenVidu 세션이 연결되어 있지 않습니다.')
  try { await sendChat(text) } catch (error) { console.error('Signal 전송 실패:', error) }
}

// 중복된 함수 제거 - 위쪽에 이미 정의됨

const handleCameraRequest = async (targetUserId: string) => {
  if (!session.value || !targetUserId || targetUserId === myUserId.value) return

  console.log('📷 카메라 켜기 요청 전송:', { targetUserId, myUserId: myUserId.value })

  const conn = findConnectionByUserId(targetUserId)
  if (!conn) {
    console.warn('대상 connection을 찾을 수 없습니다:', targetUserId)
    return
  }

  try {
    await session.value.signal({
      type: 'request-camera',
      to: [conn as any],
      data: JSON.stringify({
        fromUserId: myUserId.value,
        toUserId: targetUserId,
        message: '리더가 카메라 켜기를 요청했습니다.'
      }),
    })
    console.log('✅ 카메라 켜기 요청 신호 전송 성공')
  } catch (e) {
    console.error('request-camera signal failed:', e)
  }
}

function sendEmoji(emoji: string) {
  if (!myUserId.value) return
  sendEmojiSignal(myUserId.value, emoji).catch(console.error)
}

// 중복된 handleViewQuiz 함수 제거

// 중복된 handleQuizGenerated 함수 제거

// 중복된 함수들 제거

const handleMenuClick = (name: string) => {
  if (name === 'whiteboard') isWhiteboardVisible.value = true
  if (name === 'screen-share') isScreenShareOpen.value = true
}
const toggleScreenShare = async () => {
  if (screenStream.value) {
    screenStream.value.getTracks().forEach((t) => t.stop()); screenStream.value = null
  } else {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      screenStream.value = stream; if (screenVideoRef.value) screenVideoRef.value.srcObject = stream
    } catch (err) { console.error('화면 공유 실패:', err) }
  }
}
const toggleMic = () => { isMicOn.value = !isMicOn.value; if (publisher.value) publisher.value.publishAudio(isMicOn.value) }
const toggleCamera = () => { isCameraOn.value = !isCameraOn.value; if (publisher.value) publisher.value.publishVideo(isCameraOn.value) }
const onExit = () => { showExitConfirmModal.value = true }
const confirmExit = () => {
  leaveSession(); showExitConfirmModal.value = false
  if (window.opener) window.close()
  else if (studyId) router.push(`/study/${studyId}/leader`)
  else router.push('/mypage/study')
}
watchEffect(() => {
  if (screenVideoRef.value && screenStream.value) (screenVideoRef.value as HTMLVideoElement).srcObject = screenStream.value
})
</script>

<style scoped>
:global(html), :global(body), :global(#app) { height: 100%; }

.leader-dashboard{
  box-sizing: border-box;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 360px;
  grid-template-rows: 1fr auto;
  gap: 16px;
  padding: 16px 16px 24px;
  background-color: #f5f7fa;
  overflow: hidden;
}
.left-col{ grid-column: 1 / 2; grid-row: 1 / 3; display: grid; grid-template-rows: 1fr auto; min-width: 0; min-height: 0; }
.video-shell{ display: grid; justify-items: center; align-content: start; min-height: 0; overflow: hidden; }
.video-grid{
  width: min(1200px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  overflow: auto;
  align-content: start;
}
.shared-screen{ width: 100%; height: auto; max-height: 70vh; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,.2); display: block; }
.bottom-bar{
  width: min(1200px, 100%); margin: 8px auto 0; background-color: #6db3f2;
  border-radius: 12px; box-shadow: 0 4px 6px rgba(0,102,204,.2);
  padding: 0 12px; height: 60px; display: flex; align-items: center; justify-content: space-around;
}
.right-sidebar{
  grid-column: 2 / 3; grid-row: 1 / 3; display: flex; flex-direction: column;
  min-width: 320px; max-width: 420px; background: #f0f4f8; border-left: 1px solid #d6dee5;
  border-radius: 12px; min-height: 0; overflow: hidden;
}
.sidebar-header { padding: .75rem 1rem; background: #e1ecf4; border-bottom: 1px solid #d6dee5; }
.tabs-and-button { display: flex; justify-content: space-between; align-items: center; }
.tab-buttons { display: flex; gap: .5rem; }
.tab-buttons button{
  padding: .5rem .75rem; font-size: .9rem; font-weight: 700;
  background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent;
  transition: all .2s; color: #4d4d4d;
}
.tab-buttons button.active{ border-bottom: 2px solid #6db3f2; color: #6db3f2; background: #fff; border-radius: 4px 4px 0 0; }
.study-start-button{
  margin-left: auto; background: #6db3f2; color:#fff; font-weight: 700;
  border: none; padding: .5rem 1rem; border-radius: 12px; cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,102,204,.3);
}
.study-start-button.end{ background:#e74c3c; box-shadow: 0 2px 4px rgba(231,76,60,.3); }
.panel-content{ flex:1; padding: 1rem; color:#5a4e3c; }
.panel-scroll{ overflow: auto; }
.sidebar-footer{ padding: 1rem; border-top: 1px solid #d6dee5; background:#f0f4f8; display:flex; justify-content:center; }

.fade-enter-active, .fade-leave-active{ transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to{ opacity: 0; }

.stopwatch-end-message{
  position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
  background: rgba(255,255,255,.95); padding: 1.5rem 2rem; border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,.2); font-size: 1.5rem; font-weight: 700; color:#333; z-index:1100;
  animation: fadeOut 3s forwards;
}
@keyframes fadeOut { 0%{opacity:1} 80%{opacity:1} 100%{opacity:0} }

.exit-modal-overlay{
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  display:flex; align-items:center; justify-content:center; z-index:1000;
}
.exit-modal{
  background:#fff; border-radius: 12px; padding: 2rem; width: 90%; max-width: 400px; text-align:center;
  box-shadow: 0 10px 30px rgba(0,0,0,.3);
}
.exit-modal h3{ margin:0 0 1rem 0; color:#333; font-size:1.3rem; }
.exit-modal p{ margin:0 0 2rem 0; color:#666; font-size:1rem; }
.modal-actions{ display:flex; gap:1rem; justify-content:center; }
.confirm-btn, .cancel-btn{ padding:.75rem 1.5rem; border:none; border-radius:6px; font-size:1rem; font-weight:600; cursor:pointer; transition: all .3s; }
.confirm-btn{ background:#dc3545; color:#fff; } .confirm-btn:hover{ background:#c82333; }
.cancel-btn{ background:#6c757d; color:#fff; } .cancel-btn:hover{ background:#5a6268; }
</style>
