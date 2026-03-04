<!-- src/views/TestOpenViduView.vue -->
<template>
  <div class="ov-test">
    <h2>OpenVidu 빠른 테스트</h2>

    <!-- 리더 흐름 -->
    <div class="controls">
      <button @click="handleLeaderCreate">① 방장 로그인 + 세션 생성</button>
      <button @click="handleConnectAsCurrentUser">② 현재 로그인으로 연결(리더/회원 그대로)</button>
      <button @click="handleQuickAllLeader">원스텝(리더 생성→현재 로그인으로 연결)</button>
      <button v-if="connected" class="danger" @click="leave">연결 종료</button>
    </div>

    <!-- 회원 테스트 -->
    <div class="controls hint">
      <span>회원 테스트:</span>
      <button @click="handleMemberLoginAndConnect">회원 로그인 후 연결(테스트용)</button>
      <span class="tip">※ 가능하면 <b>시크릿 창</b>에서 실행 권장</span>
    </div>

    <!-- 파일 업로드 테스트 버튼 (개발용) -->
    <div class="controls file-test">
      <span>파일 업로드 테스트:</span>
      <button @click="startStudySimulation" class="test-btn">스터디 시작 (60분)</button>
      <button @click="simulateNearEnd" class="test-btn">10분 전 시뮬레이션</button>
    </div>

    <!-- 연결 옵션 -->
    <div class="controls sync">
      <label class="enforce">
        <input type="checkbox" v-model="enforceSameSession" />
        같은 세션(sessionId) 강제
      </label>
      <label class="enforce">
        <input type="checkbox" v-model="connectAudioOnly" />
        비디오 없이 연결(오디오만)
      </label>
      <div class="sid">
        <div><b>예상 세션:</b> <code>{{ expectedSessionId || '-' }}</code></div>
        <div><b>토큰 세션:</b> <code>{{ lastTokenSessionId || '-' }}</code></div>
      </div>
    </div>

    <div class="status">
      <p><b>groupId:</b> {{ groupId }}</p>
      <p v-if="currentRoomId"><b>roomId:</b> {{ currentRoomId }}</p>
      <p><b>연결 상태:</b> {{ connected ? '연결됨' : '미연결' }}</p>
      <p v-if="roleKnown">
        <b>현재 입장 권한:</b>
        <span :class="isLeader ? 'badge leader' : 'badge member'">
          {{ isLeader ? '리더' : '회원' }}
        </span>
      </p>
      <p v-if="studyActive" class="study-time">
        <b>스터디 진행 중:</b> 남은 시간 {{ remainingTimeText }}
      </p>
      <p v-if="deviceInfo" class="muted">사용 카메라: {{ deviceInfo }}</p>
      <p v-if="lastError" class="error"><b>에러:</b> {{ lastError }}</p>
      <p v-if="syncWarning" class="warn"><b>세션 불일치:</b> {{ syncWarning }}</p>
      <p v-if="deviceInUseHint" class="warn"><b>힌트:</b> {{ deviceInUseHint }}</p>
    </div>

    <!-- 비디오 -->
    <div class="video-wrap" v-show="connected">
      <div class="video-col">
        <h3>내 영상 (Publisher)</h3>
        <video ref="localVideoRef" autoplay playsinline muted></video>
      </div>
      <div class="video-col">
        <h3>구독 영상 (Subscribers)</h3>
        <div class="subs">
          <video
            v-for="i in remoteIndexList"
            :key="i"
            :ref="(el) => setRemoteRef(i, el as HTMLVideoElement | null)"
            autoplay
            playsinline
          ></video>
        </div>
      </div>
    </div>

    <div class="resp" v-if="sessionResp">
      <h3>세션 생성 응답</h3>
      <pre>{{ sessionResp }}</pre>
    </div>
    <div class="resp" v-if="joinRaw">
      <h3>입장 토큰 발급 응답</h3>
      <pre>{{ joinRaw }}</pre>
    </div>

    <!-- ✅ 파일 업로드 토스트(오른쪽 하단, 방장 전용, 업로드 완료 전까지 유지) -->
    <FileUploadToast
      :visible="shouldShowToast && isLeader"
      @open-modal="openModalFromToast"
    />

    <!-- ✅ 파일 업로드 모달 (버튼 누를 때만 렌더) -->
    <FileUploadModal
      :open="modalOpen"
      :groupId="String(groupId)"
      @close="closeModal"
      @uploaded="handleUploaded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from 'vue'
import dayjs from 'dayjs'
import { OpenVidu, type Session, type StreamManager, type StreamEvent, type Publisher, type Device } from 'openvidu-browser'
import { axiosInstance } from '@/utils/axios'
import FileUploadToast from '@/components/studyroom/feature/popup/FileUploadToast.vue'
import FileUploadModal from '@/components/studyroom/feature/popup/FileUploadModal.vue'
import bus from '@/services/eventBus'
import {
  leaderLoginAndCreateSession,
  memberLoginAndGetJoinToken,
} from '@/api/openviduTestHelper'

/** -------- 기본 세팅 -------- */
const groupId = 1
const LS_KEY = (gid: number) => `ov:lastSessionId:g:${gid}`

const sessionResp = ref<any>(null)
const joinRaw = ref<any>(null)
const lastError = ref<string | null>(null)
const deviceInfo = ref<string>('')

// roomId 저장 (GPT 문제 생성용)
const currentRoomId = ref<string | null>(null)

let OV: OpenVidu | null = null
const session = ref<Session | null>(null)
const publisher = ref<Publisher | null>(null)
const subscribers = ref<StreamManager[]>([])
const connected = ref(false)

const isLeader = ref(false)
const roleKnown = ref(false)

const localVideoRef = ref<HTMLVideoElement | null>(null)

const remoteIndexList = ref<number[]>([])
const remoteRefs = new Map<number, HTMLVideoElement | null>()

/** -------- 세션 동기화/옵션 -------- */
const enforceSameSession = ref(true)
const connectAudioOnly = ref(false)
const expectedSessionId = ref<string | null>(localStorage.getItem(LS_KEY(groupId)))
const lastTokenSessionId = ref<string | null>(null)
const syncWarning = ref<string | null>(null)
const deviceInUseHint = ref<string | null>(null)

/** -------- 파일 업로드 알림(테스트용 타이머) -------- */
const studyActive = ref(false)
const studyEndTime = ref<Date | null>(null)
const remainingTimeText = ref('--:--')

// ✅ 토스트/모달 상태
const shouldShowToast = ref(false)
const modalOpen = ref(false)
// 업로드 완료 여부(업로드 전까지 토스트 유지)
const fileUploaded = ref(false)
// 10분 전 알림을 이미 띄웠는가
const notificationShown = ref(false)

let studyTimer: number | null = null

/** -------- 유틸: 토큰에서 sessionId 파싱 -------- */
function parseSessionIdFromToken(token: string): string | null {
  try {
    const url = new URL(token)
    return url.searchParams.get('sessionId')
  } catch {
    const m = token.match(/sessionId=([^&]+)/)
    return m?.[1] ?? null
  }
}

/** -------- refs/구독 비디오 바인딩 -------- */
function setRemoteRef(i: number, el: HTMLVideoElement | null) {
  remoteRefs.set(i, el)
  const sm = subscribers.value[i]
  if (el && sm) sm.addVideoElement(el)
}
function resetVideos() {
  remoteIndexList.value = []
  remoteRefs.clear()
}

/** -------- 세션 이벤트 -------- */
function onStreamCreated(e: StreamEvent) {
  const sub = session.value!.subscribe(e.stream, undefined)
  subscribers.value.push(sub)
  remoteIndexList.value = [...Array(subscribers.value.length).keys()]
  const idx = subscribers.value.length - 1
  const el = remoteRefs.get(idx)
  if (el) sub.addVideoElement(el)
}
function onStreamDestroyed(e: StreamEvent) {
  const sm = e.stream.streamManager
  const idx = subscribers.value.indexOf(sm)
  if (idx >= 0) {
    subscribers.value.splice(idx, 1)
    remoteIndexList.value = [...Array(subscribers.value.length).keys()]
  }
}

/** -------- 디바이스 -------- */
async function pickFirstCameraId(ov: OpenVidu): Promise<string | undefined> {
  const devices: Device[] = await ov.getDevices()
  const cams = devices.filter(d => d.kind === 'videoinput')
  console.log('[OV] cameras:', cams.map(c => ({ label: c.label, id: c.deviceId })))
  deviceInfo.value = cams[0]?.label || '(카메라 라벨 없음)'
  return cams[0]?.deviceId
}

/** -------- 퍼블리셔 생성 (장치 점유 에러 처리) -------- */
async function createPublisher(ov: OpenVidu): Promise<Publisher> {
  deviceInUseHint.value = null
  const wantVideo = !connectAudioOnly.value

  const camId = wantVideo ? await pickFirstCameraId(ov) : undefined

  try {
    const pub = (await ov.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: wantVideo ? (camId || undefined) : undefined,
      publishAudio: true,
      publishVideo: wantVideo,
      mirror: true,
    })) as Publisher
    return pub
  } catch (e: any) {
    const msg = String(e?.message || e)
    const name = e?.name || ''
    const deviceBusy = name === 'DEVICE_ALREADY_IN_USE' || /NotReadableError/i.test(msg) || /device in use/i.test(msg)
    if (deviceBusy) {
      deviceInUseHint.value = '카메라가 다른 앱/브라우저에서 사용 중이라 비디오 없이 재시도합니다. (Zoom/Meet/다른 브라우저 탭/카메라 앱을 닫아주세요)'
      const fallback = (await ov.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: false,
        mirror: true,
      })) as Publisher
      return fallback
    }
    throw e
  }
}

/** -------- 연결 공통 -------- */
async function connectWithToken(token: string, meta?: { isLeader?: boolean }) {
  try {
    OV = new OpenVidu()
    session.value = OV.initSession()

    session.value.on('streamCreated', onStreamCreated)
    session.value.on('streamDestroyed', onStreamDestroyed)
    session.value.on('exception', (e) => console.warn('OV exception', e))

    await session.value.connect(token)

    connected.value = true
    await nextTick()

    const pub = await createPublisher(OV)

    if (localVideoRef.value) pub.addVideoElement(localVideoRef.value)

    pub.on('accessAllowed', () => console.log('[OV] accessAllowed'))
    pub.on('streamPlaying', () => console.log('[OV] streamPlaying'))

    await session.value.publish(pub)
    publisher.value = pub

    if (typeof meta?.isLeader === 'boolean') {
      isLeader.value = meta.isLeader
      roleKnown.value = true
    }
  } catch (err: any) {
    console.error('connectWithToken error', err)
    lastError.value = err?.message ?? String(err)
    await leave()
  }
}

/** -------- 리더: 세션 생성 (sessionId, roomId 저장) -------- */
async function handleLeaderCreate() {
  try {
    lastError.value = null
    syncWarning.value = null
    sessionResp.value = await leaderLoginAndCreateSession(groupId)
    console.log('세션 생성 응답:', sessionResp.value)

    const sid =
      sessionResp.value?.data?.sessionId ??
      sessionResp.value?.sessionId ??
      null

    const roomId =
      sessionResp.value?.data?.roomId ??
      sessionResp.value?.roomId ??
      null

    if (sid) {
      expectedSessionId.value = sid
      localStorage.setItem(LS_KEY(groupId), sid)
    }

    if (roomId) {
      currentRoomId.value = roomId
      console.log('roomId 저장됨:', roomId)
    } else {
      console.warn('roomId를 응답에서 찾을 수 없습니다.')
    }
  } catch (err: any) {
    console.error('세션 생성 실패', err)
    lastError.value = err?.response?.data ?? err?.message ?? String(err)
  }
}

/** -------- 현재 로그인으로 토큰 발급 + 세션 동기화 확인 -------- */
async function handleConnectAsCurrentUser() {
  try {
    lastError.value = null
    syncWarning.value = null

    const tokenStr = localStorage.getItem('accessToken') || ''
    const resp = await axiosInstance.post(`/openvidu/connections/${groupId}`, {}, {
      headers: { Authorization: `Bearer ${tokenStr}` }
    })
    joinRaw.value = resp.data
    const token = resp.data?.token
    if (!token) throw new Error('응답에서 OpenVidu 토큰을 찾지 못했습니다.')

    if (typeof resp.data?.isLeader === 'boolean') {
      isLeader.value = resp.data.isLeader
      roleKnown.value = true
    } else {
      roleKnown.value = false
    }

    lastTokenSessionId.value = parseSessionIdFromToken(token)

    if (enforceSameSession.value && expectedSessionId.value && lastTokenSessionId.value && expectedSessionId.value !== lastTokenSessionId.value) {
      syncWarning.value = `예상(${expectedSessionId.value}) ≠ 토큰(${lastTokenSessionId.value}). 같은 세션이 아닙니다. (강제 동기화 ON 상태)`
      return
    }

    await connectWithToken(token, { isLeader: resp.data?.isLeader })
  } catch (err: any) {
    console.error('현재 로그인 연결 실패', err)
    lastError.value = err?.response?.data ?? err?.message ?? String(err)
  }
}

/** -------- 원스텝: 리더 생성 → 현재 로그인으로 연결 -------- */
async function handleQuickAllLeader() {
  try {
    lastError.value = null
    await handleLeaderCreate()
    await handleConnectAsCurrentUser()
  } catch (err: any) {
    console.error('원스텝 실패', err)
    lastError.value = err?.response?.data ?? err?.message ?? String(err)
  }
}

/** -------- 회원 테스트: 회원으로 로그인 후 연결 -------- */
async function handleMemberLoginAndConnect() {
  try {
    lastError.value = null
    syncWarning.value = null

    const { raw, token } = await memberLoginAndGetJoinToken(groupId)
    joinRaw.value = raw

    if (typeof raw?.isLeader === 'boolean') {
      isLeader.value = raw.isLeader
      roleKnown.value = true
    } else {
      roleKnown.value = false
    }

    if (!token) throw new Error('응답에서 OpenVidu 토큰을 찾지 못했습니다.')

    lastTokenSessionId.value = parseSessionIdFromToken(token)

    if (enforceSameSession.value && expectedSessionId.value && lastTokenSessionId.value && expectedSessionId.value !== lastTokenSessionId.value) {
      syncWarning.value = `예상(${expectedSessionId.value}) ≠ 토큰(${lastTokenSessionId.value}). 같은 세션이 아닙니다. (강제 동기화 ON 상태)`
      return
    }

    await connectWithToken(token, { isLeader: raw?.isLeader })
  } catch (err: any) {
    console.error('회원 테스트 연결 실패', err)
    lastError.value = err?.response?.data ?? err?.message ?? String(err)
  }
}

/** -------- 스터디 시뮬레이션(토스트 트리거) -------- */
function startStudySimulation() {
  studyActive.value = true
  const studyDuration = 60 * 60 * 1000 // 60분
  studyEndTime.value = new Date(Date.now() + studyDuration)

  updateStudyTimer()
  studyTimer = window.setInterval(updateStudyTimer, 1000)
}

function updateStudyTimer() {
  if (!studyEndTime.value) return

  const now = new Date()
  const timeLeft = studyEndTime.value.getTime() - now.getTime()

  if (timeLeft <= 0) {
    remainingTimeText.value = '00:00'
    stopStudyTimer()
    return
  }

  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  remainingTimeText.value =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  // ✅ 10분 전 알림 (방장에게만, 업로드 완료 전까진 유지) — 모달은 자동으로 열지 않음
  if (isLeader.value && minutes <= 10 && minutes > 0 && !notificationShown.value && !fileUploaded.value) {
    notificationShown.value = true
    shouldShowToast.value = true
  }
}

// 개발 편의: 즉시 10분 전 상황 시뮬레이션 — 토스트만 띄움
function simulateNearEnd() {
  if (!isLeader.value) {
    lastError.value = '방장만 파일 업로드 알림을 받을 수 있습니다.'
    return
  }
  shouldShowToast.value = true
}

/** -------- 토스트 → 모달 열기/닫기 -------- */
function openModalFromToast() {
  shouldShowToast.value = false   // 모달과 겹치지 않게 토스트 숨김(원하면 유지 가능)
  modalOpen.value = true          // 버튼 눌렀을 때만 모달 렌더
}
function closeModal() {
  modalOpen.value = false
  // 필요 시 업로드 완료 전에는 토스트를 다시 보여줄 수도 있음:
  // if (!fileUploaded.value) shouldShowToast.value = true
}

function stopStudyTimer() {
  if (studyTimer !== null) {
    window.clearInterval(studyTimer)
    studyTimer = null
  }
  studyActive.value = false
}

/** -------- 업로드 완료 처리 -------- */
function handleUploaded() {
  fileUploaded.value = true
  shouldShowToast.value = false
  modalOpen.value = false
}

// 전역 버스(다른 탭/컴포넌트)에서 업로드 완료 알림을 받아도 닫히도록
bus.on('upload:done', (p: any) => {
  if (String(p.groupId) === String(groupId)) {
    handleUploaded()
  }
})

/** -------- 종료: 트랙 완전 정리 -------- */
async function leave() {
  try {
    if (publisher.value) {
      try { await session.value?.unpublish(publisher.value as Publisher) } catch {}
      try {
        const ms = publisher.value.stream?.getMediaStream?.()
        ms?.getTracks()?.forEach(t => t.stop())
      } catch {}
    }
    session.value?.disconnect()
  } finally {
    connected.value = false
    OV = null
    session.value = null
    publisher.value = null
    subscribers.value = []
    resetVideos()
    deviceInfo.value = ''
    roleKnown.value = false

    // 스터디 관련 정리
    stopStudyTimer()
    shouldShowToast.value = false
    modalOpen.value = false
    fileUploaded.value = false
    notificationShown.value = false
    currentRoomId.value = null // roomId 초기화
  }
}

onBeforeUnmount(() => {
  void leave()
  stopStudyTimer()
})
</script>

<style scoped>
.ov-test { padding: 16px; }
.controls { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; align-items: center; }
.controls .danger { background: #ff6666; color: #fff; }
.controls.hint { margin-top: 6px; }
.controls.file-test { margin-top: 6px; }
.controls.sync { margin-top: 6px; align-items: flex-start; }
.enforce { display: flex; gap: 8px; align-items: center; }
.sid { display: flex; gap: 16px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.tip { font-size: 12px; color: #6b7280; margin-left: 8px; }
.test-btn { background: #f59e0b; color: #fff; }
.status { margin: 10px 0 14px; }
.error { color: #c62828; }
.warn { color: #b45309; }
.muted { color: #6b7280; font-size: 0.9rem; }
.study-time { color: #059669; font-weight: 600; }

.badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; }
.badge.leader { background: #e0f2fe; color: #0369a1; }
.badge.member { background: #fee2e2; color: #991b1b; }

.video-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.video-wrap video {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 8px;
}
.subs {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
</style>
