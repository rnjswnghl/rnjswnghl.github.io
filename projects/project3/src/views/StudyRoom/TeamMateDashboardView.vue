<!-- src/views/StudyRoom/TeammateDashboardView.vue -->
<template>
  <div class="teammate-dashboard">
    <!-- 에러/로딩/실패 -->
    <div v-if="!studyId" class="error-state">
      <h2>스터디 ID가 없습니다</h2>
      <p>올바른 경로로 접속해주세요.</p>
      <button @click="$router.push('/mypage/study')" class="back-btn">돌아가기</button>
    </div>
    <div v-else-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>스터디룸에 연결 중...</p>
    </div>
    <div v-else-if="connectionError" class="error-state">
      <h2>연결 실패</h2>
      <p>{{ connectionError }}</p>
      <button @click="retryConnection" class="retry-btn">다시 시도</button>
      <button @click="$router.push('/mypage/study')" class="back-btn">돌아가기</button>
    </div>

    <!-- 메인 UI -->
    <div v-else class="main-layout">
      <!-- 화면 공유 레이아웃 -->
      <div v-if="screenStream" class="screen-share-layout">
        <video ref="screenVideoRef" autoplay playsinline class="shared-screen" />
        <div class="video-carousel">
          <VideoStream
            v-for="(sub, idx) in subscribers"
            :key="getSubscriberUserId(sub) ?? idx"
            :nickname="safeNickname(sub, idx)"
            :stream="sub"
            :micOn="sub.stream?.audioActive"
            :cameraOn="sub.stream?.videoActive"
            :isSpeaking="false"
            :overlayEmoji="emojiMap[getSubscriberUserId(sub) || ''] || ''"
          />
        </div>
      </div>

      <!-- 일반 비디오 -->
      <div v-else class="video-content">
        <section class="video-grid">
          <VideoStream
            v-if="publisher"
            :stream="publisher"
            :nickname="nickname"
            :micOn="isMicOn"
            :cameraOn="isCameraOn"
            :isLocal="true"
            :overlayEmoji="emojiMap[myUserId] || ''"
          />
          <VideoStream
            v-for="(sub, idx) in subscribers"
            :key="getSubscriberUserId(sub) ?? idx"
            :nickname="safeNickname(sub, idx)"
            :stream="sub"
            :micOn="sub.stream?.audioActive"
            :cameraOn="sub.stream?.videoActive"
            :isLocal="false"
            :overlayEmoji="emojiMap[getSubscriberUserId(sub) || ''] || ''"
          />
        </section>

        <EmojiReaction v-if="showEmojiPicker" @select="handleEmojiSelect" @close="handleEmojiClose" />

        <div class="bottom-control-bar">
          <BottomControlBar
            :isLeader="false"
            :micOn="isMicOn"
            :cameraOn="isCameraOn"
            @toggle-mic="toggleMic"
            @toggle-camera="toggleCamera"
            @emojiClick="toggleEmojiPicker"
            @emoji="sendEmoji"
            @open-stopwatch-setting="openStopwatchSetting"
            @open-whiteboard="() => (isWhiteboardVisible = true)"
            @open-screen-share="() => (isScreenShareOpen = true)"
            @exit="onExit"
          />
        </div>
      </div>

      <!-- 사이드바 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="tabs-and-button">
            <div class="tab-buttons">
              <button @click="activePanel = 'chat'" :class="{ active: activePanel === 'chat' }">채팅</button>
              <button @click="activePanel = 'members'" :class="{ active: activePanel === 'members' }">멤버</button>
            </div>
          </div>
        </div>

        <div class="panel-content">
          <ChatPanel
            v-if="activePanel === 'chat'"
            :messages="chatMessagesForPanel"
            @send="handleSendMessage"
          />
          <MemberPanel
            v-if="activePanel === 'members'"
            :isLeader="false"
            :members="membersForPanel"
          />
        </div>
      </aside>

      <!-- 모듈들 -->
      <PomodoroTimer v-if="isPomodoroActive" :focus="pomodoroConfig.focus" :break="pomodoroConfig.break" :cycles="pomodoroConfig.cycles" @done="onPomodoroDone" />

      <QuizToast v-if="showQuizToast" />
      <RequestCameraToast
        v-if="showCameraRequestToast"
        message="📷 방장이 카메라 켜기를 요청했어요!"
        @turn-on-camera="handleTurnOnCamera"
      />

      <!-- ✅ 파일 업로드 모달: 필수 props 채움 -->
      <FileUploadModal
        v-if="showUploadModal"
        :open="showUploadModal"
        :groupId="groupId"
        @close="showUploadModal = false"
        @uploaded="onFilesUploaded"
      />

      <FileUploadModal v-if="showUploadModal" :open="showUploadModal" :groupId="groupId" mode="study" @close="showUploadModal = false" @uploaded="onFilesUploaded" />
      <EmojiReaction v-if="showEmojiPicker" @select="handleEmojiSelect" @close="handleEmojiClose" />

      <StopwatchSettingModal v-if="isStopwatchSettingOpen" @confirm="startStopwatch" @close="isStopwatchSettingOpen = false" />
      <ActiveStopwatch v-if="activeStopwatchSetting" :setting="activeStopwatchSetting" @close="activeStopwatchSetting = null" @end="onStopwatchEnd" />
      <div v-if="showStopwatchEndToast" class="stopwatch-end-message">⏱ 스탑워치가 종료되었습니다.</div>

      <Whiteboard v-if="isWhiteboardVisible" @close="isWhiteboardVisible = false" />

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
    </div>

    <!-- 퀴즈 생성 알림 -->
    <QuizGeneratedToast :visible="shouldShowQuizGeneratedToast" @view-quiz="handleViewQuiz" />

    <!-- ✅ AI 퀴즈 모달 -->
    <AIQuizModal
      :visible="showQuizModal"
      :groupId="groupId"
      @close="closeQuizModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  connectByStudyId,
  leaveSession,
  session,
  publisher,
  subscribers,
  OV,
  emojiMap,
  attachStudySignalListener,
  detachStudySignalListener,
  initEmojiSignal,
  sendEmojiSignal,
} from '@/composables/useOpenVidu'
import { useOvChat } from '@/composables/useOvChat'
import type { Session } from 'openvidu-browser'
import bus from '@/services/eventBus'

import VideoStream from '@/components/studyroom/feature/media/VideoStream.vue'
import ChatPanel from '@/components/studyroom/layout/ChatPanel.vue'
import MemberPanel from '@/components/studyroom/layout/MemberPanel.vue'
import FileUploadModal from '@/components/studyroom/feature/popup/FileUploadModal.vue'
import BottomControlBar from '@/components/studyroom/layout/BottomControlBar.vue'
import EmojiReaction from '@/components/studyroom/feature/interaction/EmojiReaction.vue'
import QuizToast from '@/components/studyroom/feature/popup/QuizToast.vue'
import RequestCameraToast from '@/components/studyroom/feature/popup/RequestCameraToast.vue'
import QuizGeneratedToast from '@/components/studyroom/feature/popup/QuizGeneratedToast.vue'
import AIQuizModal from '@/components/quiz/AIQuizModal.vue'
import StopwatchSettingModal from '@/components/studyroom/feature/timer/StopwatchSettingModal.vue'
import ActiveStopwatch from '@/components/studyroom/feature/control/ActiveStopwatch.vue'
import Whiteboard from '@/components/studyroom/feature/whiteboard/Whiteboard.vue'
import PomodoroTimer from '@/components/studyroom/feature/timer/PomodoroTimer.vue'

// MediaPipe 타입 선언
declare global {
  interface Window {
    SelfieSegmentation: any
  }
}

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const props = defineProps<{ nickname?: string; cam?: string; mic?: string }>()
const nickname = ref(props.nickname || '익명')
const myUserId = ref('')

// ✅ JoinForm에서 전달된 초기 상태
const isCameraOn = ref(route.query.cam === 'true')
const isMicOn = ref(route.query.mic === 'true')

// 가상 배경 관련 상태
const bgMode = ref<'original' | 'blur' | 'image'>('original')
const bgImage = ref<HTMLImageElement | null>(null)
const bgReady = ref(false)

// Pomodoro 관련 상태
const isPomodoroActive = ref(false)
const pomodoroConfig = ref({ focus: 25, break: 5, cycles: 1 })

// Pomodoro 완료 핸들러
function onPomodoroDone() {
  isPomodoroActive.value = false
  console.log('🍅 Pomodoro 완료')
}

// 가상 배경 설정 로드
function loadBackgroundSettings() {
  const storedBgMode = localStorage.getItem(`bgMode_${groupId.value}`)
  const storedBgImage = localStorage.getItem(`bgImage_${groupId.value}`)
  if (storedBgMode) bgMode.value = storedBgMode as any
  if (storedBgImage && bgMode.value === 'image') {
    const img = new Image()
    img.onload = () => { bgImage.value = img; bgReady.value = true }
    img.src = storedBgImage
  }

  console.log('🔍 TeamMate 가상배경 설정 로드:', { bgMode: bgMode.value, bgReady: bgReady.value })
}

// 가상 배경 적용
async function applyVirtualBackground() {
  console.log('🔍 TeamMate 가상배경 적용 시작:', {
    bgMode: bgMode.value,
    bgReady: bgReady.value,
    hasPublisher: !!publisher.value,
    hasStream: !!(publisher.value?.stream)
  })

  if (!publisher.value) {
    console.error('❌ TeamMate Publisher가 준비되지 않음')
    return
  }

  if (bgMode.value === 'original') {
    console.log('✅ TeamMate 원본 모드 - 가상배경 적용 안함')
    return
  }

  try {
    console.log('🔍 TeamMate 가상배경 적용 시작:', bgMode.value)

    // 간단한 테스트: CSS 필터를 사용한 가상 배경 적용
    if (bgMode.value === 'blur' || bgMode.value === 'image') {
      console.log('🎨 TeamMate CSS 필터로 가상배경 적용 시도...')

      try {
        // VideoStream 컴포넌트에 CSS 클래스 추가
        const videoElements = document.querySelectorAll('.video-stream video')
        console.log('🔍 TeamMate 비디오 요소 발견:', videoElements.length)

        videoElements.forEach((video, index) => {
          if (video instanceof HTMLVideoElement) {
            console.log(`🎥 TeamMate 비디오 ${index + 1} 처리:`, video)

            if (bgMode.value === 'blur') {
              // 블러 효과 적용
              video.style.filter = 'blur(10px)'
              video.style.backdropFilter = 'blur(20px)'
              console.log(`✅ TeamMate 비디오 ${index + 1}에 블러 효과 적용`)
            } else if (bgMode.value === 'image') {
              // 이미지 배경 효과 (밝기/대비 조정)
              video.style.filter = 'brightness(1.2) contrast(1.1) saturate(1.1)'
              console.log(`✅ TeamMate 비디오 ${index + 1}에 이미지 효과 적용`)
            }
          }
        })

        console.log('✅ TeamMate CSS 필터로 가상배경 적용 완료!')

      } catch (cssError) {
        console.error('❌ TeamMate CSS 필터 적용 실패:', cssError)
      }
    }

  } catch (error) {
    console.error('❌ TeamMate 가상배경 적용 실패:', error)
  }
}

// 블러 배경 적용
async function applyBlurBackground() {
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

    // 블러 처리된 스트림 생성
    const processedStream = canvas.captureStream(30)

    // SelfieSegmentation 결과 처리
    selfie.onResults((results: any) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 블러된 배경 그리기
      ctx.filter = 'blur(20px)'
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)
      ctx.filter = 'none'

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
      console.log('✅ TeamMate 블러 효과 적용 완료')
    }

  } catch (error) {
    console.error('❌ TeamMate 블러 배경 적용 실패:', error)
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
      console.log('✅ TeamMate 배경 이미지 적용 완료')
    }

  } catch (error) {
    console.error('❌ TeamMate 배경 이미지 적용 실패:', error)
  }
}

console.log('🔍 TeamMate 페이지 카메라/마이크 상태 초기화:', {
  query: route.query,
  isMicOn: isMicOn.value,
  isCameraOn: isCameraOn.value
})

// ✅ groupId 파라미터를 studyId로 사용 (라우터: /studyroom/mate/:groupId)
const studyId = (route.params.groupId as string) || ''
const groupId = ref(studyId)

// 상태
const isLoading = ref(false)
const connectionError = ref('')

const screenStream = ref<MediaStream | null>(null)
const screenVideoRef = ref<HTMLVideoElement | null>(null)

const activePanel = ref<'chat' | 'members'>('chat')
const showQuizToast = ref(false)
const showCameraRequestToast = ref(false)
const showUploadModal = ref(false)
const showEmojiPicker = ref(false)

const isScreenShareOpen = ref(false)
const isStopwatchSettingOpen = ref(false)
const activeStopwatchSetting = ref<{ duration: number; autoRepeat: boolean } | null>(null)
const showStopwatchEndToast = ref(false)
const isWhiteboardVisible = ref(false)
const showExitConfirmModal = ref(false)
const shouldShowQuizGeneratedToast = ref(false)
const showQuizModal = ref(false)

// 뽀모도로 관련 상태 (중복 제거)

// 채팅
const { messages: ovMessages, attach: attachChat, detach: detachChat, send: sendChat } = useOvChat()
const chatMessagesForPanel = computed(() =>
  ovMessages.value.map(m => ({ userId: m.fromId, nickname: m.fromName, text: m.text }))
)

function onFilesUploaded(files: File[]) {
  console.log('업로드된 파일들(팀원):', files)
  showUploadModal.value = false
}

// ✅ 퀴즈 생성 알림 수신 처리
function handleQuizGenerated(data: { groupId: string; quizData: any }) {
  console.log('🎯 TeamMate 페이지: 퀴즈 생성 알림 수신:', data)
  console.log('🔍 현재 shouldShowQuizGeneratedToast 상태:', shouldShowQuizGeneratedToast.value)
  console.log('🔍 수신된 groupId:', data.groupId)
  console.log('🔍 현재 페이지 groupId:', groupId.value)
  console.log('🔍 groupId 일치 여부:', data.groupId === groupId.value)

  if (data.groupId === groupId.value) {
    shouldShowQuizGeneratedToast.value = true
    console.log('✅ TeamMate 페이지: 퀴즈 생성 알림 표시')
    console.log('🔍 shouldShowQuizGeneratedToast 상태 변경 후:', shouldShowQuizGeneratedToast.value)
  } else {
    console.log('❌ TeamMate 페이지: groupId 불일치로 퀴즈 알림 표시 안함')
  }
}

// 카메라 켜기 요청 처리
function handleTurnOnCamera() {
  console.log('📷 카메라 켜기 요청에 응답하여 카메라를 켭니다')

  // 카메라가 꺼져 있다면 켜기
  if (!isCameraOn.value) {
    isCameraOn.value = true
    publisher.value?.publishVideo(true)
    console.log('✅ 카메라가 켜졌습니다')
  }

  // 알림 숨기기
  showCameraRequestToast.value = false
}

// ===== 참가자/닉네임 유틸 =====
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
function getSubscriberUserId(sub: any): string | null {
  try {
    const conn = sub?.stream?.connection
    const data = parseConnDataSafe(conn?.data)
    return data?.userId || conn?.connectionId || null
  } catch {
    return sub?.stream?.connection?.connectionId || null
  }
}
function getSubscriberNickname(sub: any, idx: number) {
  try { return parseConnDataSafe(sub?.stream?.connection?.data)?.clientData || `참가자 ${idx+1}` }
  catch { return `참가자 ${idx+1}` }
}
function safeNickname(sub: any, idx: number): string { return getSubscriberNickname(sub, idx) }

const membersForPanel = computed(() => {
  const host = {
    userId: myUserId.value,
    nickname: nickname.value,
    cameraOn: isCameraOn.value,
    micOn: isMicOn.value,
    stream: publisher.value
  }
  const others = subscribers.value.map((sub, i) => {
    const userId = getSubscriberUserId(sub) || `participant-${i+1}`
    const subNickname = getSubscriberNickname(sub, i)
    return { userId, nickname: subNickname, cameraOn: sub.stream?.videoActive ?? false, micOn: sub.stream?.audioActive ?? false, stream: sub }
  })
  return [host, ...others].map(m => ({ ...m, isSelf: m.userId === myUserId.value }))
})

// ===== 이모지 송수신 =====
function sendEmoji(emoji: string) {
  if (!myUserId.value) return
  sendEmojiSignal(myUserId.value, emoji).catch(console.error)
}
function handleEmojiSelect(emoji: string) { sendEmoji(emoji); showEmojiPicker.value = false }
function handleEmojiClose() { showEmojiPicker.value = false }

// ===== 컨트롤 =====
function toggleMic() { isMicOn.value = !isMicOn.value; publisher.value?.publishAudio(isMicOn.value) }
function toggleCamera() { isCameraOn.value = !isCameraOn.value; publisher.value?.publishVideo(isCameraOn.value) }

async function handleSendMessage(text: string) {
  if (!session.value) { console.warn('OpenVidu 세션이 연결되어 있지 않습니다.'); return }
  const trimmed = text.trim(); if (!trimmed) return
  try { await sendChat(trimmed) } catch (error) { console.error('Signal 전송 실패:', error) }
}

// 스톱워치
function startStopwatch(setting: { duration: number; autoRepeat: boolean }) {
  activeStopwatchSetting.value = setting
  isStopwatchSettingOpen.value = false
}
function onStopwatchEnd() {
  showStopwatchEndToast.value = true
  setTimeout(() => { showStopwatchEndToast.value = false }, 3000)
}
const toggleEmojiPicker = () => { showEmojiPicker.value = !showEmojiPicker.value }
const openStopwatchSetting = () => { isStopwatchSettingOpen.value = true }

// 나가기
function onExit() { showExitConfirmModal.value = true }
function confirmExit() {
  leaveSession()
  screenStream.value?.getTracks().forEach(t => t.stop())
  showExitConfirmModal.value = false

  if (window.opener) window.close()
  else if (studyId) router.push(`/study/${studyId}/teammate`)
  else router.push('/mypage/study')
}

// 화면공유(로컬 미리보기)
async function toggleScreenShare() {
  if (screenStream.value) {
    screenStream.value.getTracks().forEach(t => t.stop())
    screenStream.value = null
    session.value?.signal({ type: 'screen-share-stop' }).catch(() => {})
    return
  }
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
    screenStream.value = stream
    if (screenVideoRef.value) screenVideoRef.value.srcObject = stream
    session.value?.signal({ type: 'screen-share-start' }).catch(() => {})
  } catch (err) {
    console.error('화면 공유 실패:', err)
  }
}

/** 연결 재시도 */
const retryConnection = async () => {
  connectionError.value = ''
  await initializeStudyRoom()
}

/** 초기화 */
const initializeStudyRoom = async () => {
  if (!studyId) { console.error('❌ studyId가 없습니다.'); return }
  isLoading.value = true; connectionError.value = ''
  try {
    await userStore.fetchUser()
    nickname.value = userStore.user?.nickname || nickname.value

    // ✅ 여기서 userId 를 먼저 만들고 connectByStudyId 에 넘김
    const preUserId = `${nickname.value}-${Date.now()}-${Math.random().toString(36).slice(2,9)}`
    const connectionResult = await connectByStudyId({
      studyId, nickname: nickname.value, userId: preUserId, camOn: isCameraOn.value, micOn: isMicOn.value, isLeader: false
    })
    console.log('✅ 팀원 연결 성공:', connectionResult)

    if (!session.value) throw new Error('세션이 초기화되지 않았습니다.')
    const currentSession = session.value as Session

    myUserId.value = connectionResult.userId
    attachChat(currentSession, { id: myUserId.value, name: nickname.value })

    // ✅ 공용 이모지 수신기 설치
    initEmojiSignal(session as any)

    // study start/end 수신 등록
    attachStudySignalListener()

    // 가상 배경 설정 로드
    loadBackgroundSettings()

    // 가상 배경 적용 (publisher가 완전히 준비된 후)
    if (bgMode.value !== 'original') {
      // publisher가 준비될 때까지 대기
      const waitForPublisher = () => {
        if (publisher.value && publisher.value.stream) {
          console.log('✅ TeamMate Publisher 준비 완료, 가상배경 적용 시작')
          applyVirtualBackground()
        } else {
          console.log('⏳ TeamMate Publisher 대기 중...')
          setTimeout(waitForPublisher, 500)
        }
      }
      waitForPublisher()
    }

    // 리더의 카메라 요청 신호 수신
    currentSession.on('signal:request-camera', (event) => {
      console.log('📷 카메라 켜기 요청 수신:', event)
      showCameraRequestToast.value = true

      // 10초 후 자동으로 숨기기 (사용자가 충분히 응답할 수 있도록)
      setTimeout(() => {
        showCameraRequestToast.value = false
      }, 10000) // 10초로 연장
    })

    // 리더의 뽀모도로 시작 신호 수신
    currentSession.on('signal:pomodoro-start', (event) => {
      console.log('🍅 뽀모도로 시작 신호 수신됨!')
      console.log('📡 수신된 이벤트:', event)
      console.log('📡 이벤트 타입:', event.type)
      console.log('📡 이벤트 데이터:', event.data)

      try {
        const data = JSON.parse(event.data || '{}')
        console.log('🍅 파싱된 뽀모도로 데이터:', data)

        // 뽀모도로 설정 적용
        pomodoroConfig.value = {
          focus: data.focus || 25,
          break: data.break || 5,
          cycles: data.cycles || 1
        }

        // 뽀모도로 시작
        isPomodoroActive.value = true

        console.log('✅ 뽀모도로 설정 적용 및 시작:', pomodoroConfig.value)
        console.log('✅ isPomodoroActive 상태:', isPomodoroActive.value)
      } catch (e) {
        console.error('❌ 뽀모도로 신호 파싱 실패:', e)
      }
    })

    // 퍼블리셔 초기 상태 반영
    publisher.value?.publishVideo(isCameraOn.value)
    publisher.value?.publishAudio(isMicOn.value)

    isLoading.value = false
  } catch (err: any) {
    console.error('세션 연결 실패:', err)
    isLoading.value = false
    connectionError.value = err?.message || '스터디룸 연결에 실패했습니다.'
  }
}

onMounted(async () => {
  await initializeStudyRoom()
  
  // ✅ 퀴즈 이벤트 리스너 등록 (세션 연결 후)
  console.log('🔌 TeamMate 페이지: 퀴즈 생성 이벤트 리스너 등록 시작')
  bus.on('quiz:generated', handleQuizGenerated)
  console.log('✅ TeamMate 페이지: 퀴즈 생성 이벤트 리스너 등록 완료')
  console.log('🔍 TeamMate 페이지 groupId:', groupId.value)
})

function handleViewQuiz() {
  shouldShowQuizGeneratedToast.value = false
  showQuizModal.value = true
  console.log('🔍 TeamMate 페이지: 퀴즈 모달 열기')
}

function closeQuizModal() {
  showQuizModal.value = false
  console.log('🔍 TeamMate 페이지: 퀴즈 모달 닫기')
}

onBeforeUnmount(() => {
  screenStream.value?.getTracks().forEach(t => t.stop())
  detachChat()
  session.value?.off('signal:request-camera')
  session.value?.off('signal:pomodoro-start')
  detachStudySignalListener()
  leaveSession()
  bus.off('quiz:generated', handleQuizGenerated)
})

// 중복된 onPomodoroDone 함수 제거

// 비디오 요소에 스트림 바인딩
watchEffect(() => {
  if (screenVideoRef.value && screenStream.value) {
    (screenVideoRef.value as HTMLVideoElement).srcObject = screenStream.value
  }
})
</script>

<style scoped>
.teammate-dashboard {
  display: flex; flex-direction: column; height: 100vh; width: 100%;
  background-color: #f5f7fa;
}
.main-layout { display: flex; flex: 1; overflow: hidden; }
.video-content { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 1rem 0.5rem; overflow: hidden; }
.video-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; overflow-y: auto; margin-bottom: 1rem; }
.bottom-control-bar { height: 60px; background-color: #6db3f2; display: flex; align-items: center; justify-content: space-around; border-radius: 8px; padding: 0 1rem; box-shadow: 0 4px 6px rgba(0, 102, 204, 0.2); }
.sidebar { width: 280px; flex-shrink: 0; height: 100%; display: flex; flex-direction: column; background-color: #f0f4f8; border-left: 1px solid #d6dee5; }
.sidebar-header { padding: 0.75rem 1rem; background-color: #e1ecf4; border-bottom: 1px solid #d6dee5; }
.tabs-and-button { display: flex; justify-content: space-between; align-items: center; }
.tab-buttons { display: flex; gap: 0.5rem; }
.tab-buttons button { padding: 0.5rem 0.75rem; font-size: 0.9rem; font-weight: bold; background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; color: #4d4d4d; }
.tab-buttons button.active { border-bottom: 2px solid #6db3f2; color: #6db3f2; background-color: white; border-radius: 4px 4px 0 0; }
.panel-content { flex: 1; overflow-y: auto; padding: 1rem; color: #5a4e3c; }
.screen-share-layout { display: flex; flex-direction: column; gap: 0.5rem; height: 100vh; background: #000; padding: 0.5rem; }
.shared-screen { flex: 1; max-width: 100%; border-radius: 12px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6); }
.video-carousel { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(160px, 1fr); gap: 0.5rem; }
.stopwatch-end-message { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.95); padding: 1.5rem 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); font-size: 1.5rem; font-weight: bold; color: #333; z-index: 1100; animation: fadeOut 3s forwards; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.exit-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.exit-modal { background: white; border-radius: 12px; padding: 2rem; width: 90%; max-width: 400px; text-align: center; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); }
.exit-modal h3 { margin: 0 0 1rem 0; color: #333; font-size: 1.3rem; }
.exit-modal p { margin: 0 0 2rem 0; color: #666; font-size: 1rem; }
.modal-actions { display: flex; gap: 1rem; justify-content: center; }
.confirm-btn, .cancel-btn { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.confirm-btn { background: #dc3545; color: white; }
.confirm-btn:hover { background: #c82333; }
.cancel-btn { background: #6c757d; color: white; }
.cancel-btn:hover { background: #5a6268; }
@keyframes fadeOut { 0% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }
</style>
