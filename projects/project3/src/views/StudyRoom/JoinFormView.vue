<!-- src/views/StudyRoom/JoinFormView.vue -->
<template>
  <div class="prejoin">
    <div class="stage">
      <div v-if="!camOn" class="placeholder">카메라가 꺼져 있습니다</div>

      <!-- 원본(비디오) -->
      <video
        ref="videoRef"
        autoplay
        playsinline
        :muted="true"
        v-show="camOn && mode === 'original'"
        class="preview"
      ></video>

      <!-- 합성(블러/이미지) -->
      <canvas
        ref="canvasRef"
        :style="{ display: camOn && mode !== 'original' ? 'block' : 'none' }"
        class="preview"
      ></canvas>

      <div v-if="camOn && mode === 'image' && !bgReady" class="image-hint">
        배경 이미지를 선택해 주세요
      </div>
    </div>

    <div class="controls">
      <div class="bg-group">
        <button class="ctrl-btn" @click="toggleBgPanel">배경화면 설정</button>
        <div v-if="bgPanelOpen" class="bg-panel">
          <label class="radio"><input type="radio" value="original" v-model="mode" /> 원본</label>
          <label class="radio"><input type="radio" value="blur" v-model="mode" /> 블러</label>
          <label class="radio"><input type="radio" value="image" v-model="mode" /> 배경 이미지</label>
          <input ref="fileRef" type="file" accept="image/*" class="file-hidden" @change="onPickBackground" />
        </div>
      </div>

      <button class="ctrl-btn" :class="micOn ? 'on' : 'off'" @click="toggleMic">
        <span v-if="micOn">🔊 On</span><span v-else>🔇 Off</span>
      </button>

      <button class="ctrl-btn" :class="camOn ? 'on' : 'off'" @click="toggleCam">
        <span v-if="camOn">🎥 On</span><span v-else>📷 Off</span>
      </button>
    </div>

    <div class="bottom-enter">
      <button class="enter-btn" @click="proceed">스터디 입장하기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'
import { Camera } from '@mediapipe/camera_utils'
import { getMyRole } from '@/utils/role' // ✅ 역할 자동 판별 유틸

type Mode = 'original' | 'blur' | 'image'

const router = useRouter()
const route = useRoute()

// ✅ URL에서 groupId만 사용 (/study/join/:groupId)
//    역할은 여기서 getMyRole(groupId)로 자동 판별
const groupId = String(route.params.groupId ?? '')

const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const fileRef = ref<HTMLInputElement | null>(null)

const camOn = ref(true)
const micOn = ref(false)
const mode = ref<Mode>('original')
const bgPanelOpen = ref(false)

let mediaStream: MediaStream | null = null
let camera: Camera | null = null
let segmenter: SelfieSegmentation | null = null

// 합성용 캔버스(사람 레이어)
const personCanvas = document.createElement('canvas')
const personCtx = personCanvas.getContext('2d')!

// 배경 이미지
const bgImage = new Image()
const bgReady = ref(false)

// 송출용 트랙(필요시)
let processedTrack: MediaStreamTrack | null = null

onMounted(async () => {
  await startCamera()
  await applyMode(mode.value)
})

onBeforeUnmount(() => stopAll())

function toggleBgPanel() { bgPanelOpen.value = !bgPanelOpen.value }

async function startCamera() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: true,
    })
  } catch (e) {
    console.error('카메라/마이크 권한 오류', e)
    alert('카메라/마이크 권한을 허용해주세요.')
    return
  }

  mediaStream.getVideoTracks().forEach(t => (t.enabled = camOn.value))
  mediaStream.getAudioTracks().forEach(t => (t.enabled = micOn.value))

  if (!videoRef.value) return
  videoRef.value.srcObject = mediaStream
  videoRef.value.muted = true
  videoRef.value.setAttribute('playsinline', '')

  await waitLoadedMetadata(videoRef.value)
  await ensureVideoPlaying(videoRef.value)
}

function waitLoadedMetadata(video: HTMLVideoElement) {
  return new Promise<void>((resolve) => {
    if (video.readyState >= 1) return resolve()
    const onLoaded = () => { video.removeEventListener('loadedmetadata', onLoaded); resolve() }
    video.addEventListener('loadedmetadata', onLoaded)
  })
}

// 재생 보장(최대 5회 재시도)
async function ensureVideoPlaying(video: HTMLVideoElement) {
  const tryPlay = async () => {
    try { await video.play() } catch {}
  }
  for (let i = 0; i < 5; i++) {
    await tryPlay()
    await delay(200)
    if (!video.paused && video.videoWidth > 0) return
  }
  console.warn('영상 재생 실패 상태:', { paused: video.paused, w: video.videoWidth, h: video.videoHeight })
}
const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

function stopAll() {
  if (camera) { camera.stop(); camera = null }
  if (segmenter) { try { (segmenter as any).close?.() } catch {} segmenter = null }
  mediaStream?.getTracks().forEach(t => t.stop())
  mediaStream = null
  processedTrack?.stop(); processedTrack = null
  const c = canvasRef.value
  c?.getContext('2d')?.clearRect(0, 0, c.width, c.height)
}

async function setupSegmenter() {
  if (segmenter) return
  segmenter = new SelfieSegmentation({
    locateFile: (file: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
  })
  segmenter.setOptions({ modelSelection: 1 })
  segmenter.onResults(onResults)
}

async function handleCamToggle(on: boolean) {
  mediaStream?.getVideoTracks().forEach(t => (t.enabled = on))
  if (!on) {
    if (camera) { camera.stop(); camera = null }
    const c = canvasRef.value
    c?.getContext('2d')?.clearRect(0, 0, c.width, c.height)
    return
  }

  if (!mediaStream) await startCamera()
  if (videoRef.value && mediaStream) {
    videoRef.value.srcObject = mediaStream
    videoRef.value.muted = true
    videoRef.value.setAttribute('playsinline', '')
    await waitLoadedMetadata(videoRef.value)
    await ensureVideoPlaying(videoRef.value)
  }

  if (mode.value !== 'original') {
    await setupSegmenter()
    startCameraLoop()
  }
}

function toggleCam() { camOn.value = !camOn.value; handleCamToggle(camOn.value) }
function toggleMic() { micOn.value = !micOn.value; mediaStream?.getAudioTracks().forEach(t => (t.enabled = micOn.value)) }

watch(camOn, (v) => { handleCamToggle(v) })
watch(mode, async (m) => {
  if (m === 'image') {
    bgReady.value = false
    await nextTick()
    fileRef.value?.click()
  }
  await applyMode(m)
})

async function applyMode(next: Mode) {
  if (!videoRef.value) return
  if (!camOn.value) { mode.value = next; return }

  if (next === 'original') {
    if (camera) { camera.stop(); camera = null }
    const c = canvasRef.value
    c?.getContext('2d')?.clearRect(0, 0, c.width, c.height)

    mediaStream?.getVideoTracks().forEach(t => (t.enabled = true))
    if (videoRef.value && mediaStream) {
      videoRef.value.srcObject = mediaStream
      videoRef.value.muted = true
      videoRef.value.setAttribute('playsinline', '')
      await waitLoadedMetadata(videoRef.value)
      await ensureVideoPlaying(videoRef.value)
    }

    processedTrack?.stop(); processedTrack = null
    return
  }

  await setupSegmenter()
  startCameraLoop()
}

function startCameraLoop() {
  if (!videoRef.value || !segmenter) return
  const vw = videoRef.value.videoWidth || 1280
  const vh = videoRef.value.videoHeight || 720
  const out = canvasRef.value!
  out.width = vw; out.height = vh
  personCanvas.width = vw; personCanvas.height = vh

  camera = new Camera(videoRef.value, {
    onFrame: async () => { if (segmenter) await segmenter.send({ image: videoRef.value! }) },
    width: vw, height: vh,
  })
  camera.start()

  const stream = out.captureStream(30)
  processedTrack?.stop()
  processedTrack = stream.getVideoTracks()[0]
}

function onResults(res: any) {
  if (!canvasRef.value || !videoRef.value) return
  const ctx = canvasRef.value.getContext('2d')!
  const vw = videoRef.value.videoWidth, vh = videoRef.value.videoHeight
  if (!vw || !vh) return

  ctx.clearRect(0, 0, vw, vh)
  if (mode.value === 'blur') {
    ctx.filter = 'blur(16px)'; ctx.drawImage(videoRef.value, 0, 0, vw, vh); ctx.filter = 'none'
  } else if (mode.value === 'image') {
    if (bgReady.value) ctx.drawImage(bgImage, 0, 0, vw, vh)
    else ctx.drawImage(videoRef.value, 0, 0, vw, vh)
  }

  const pctx = personCtx
  pctx.clearRect(0, 0, vw, vh)
  pctx.drawImage(videoRef.value, 0, 0, vw, vh)
  pctx.globalCompositeOperation = 'destination-in'
  pctx.drawImage(res.segmentationMask, 0, 0, vw, vh)
  pctx.globalCompositeOperation = 'source-over'

  ctx.drawImage(personCanvas, 0, 0, vw, vh)
}

function onPickBackground(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) { mode.value = 'original'; return }
  const url = URL.createObjectURL(file)
  bgImage.onload = () => { bgReady.value = true; URL.revokeObjectURL(url) }
  bgImage.src = url
}

// ✅ 스터디 입장: 역할 자동 판별 후 해당 방으로 이동
async function proceed() {
  if (!groupId) {
    alert('groupId가 없습니다. URL을 확인해주세요.')
    return
  }
  // 1순위: URL query에서 isLeader 정보 사용
  const isLeaderFromQuery = route.query.isLeader === 'true'

  // ✅ 카메라/마이크 상태를 query로 전달
  const cameraMicState = {
    cam: String(camOn.value),
    mic: String(micOn.value)
  }

  // ✅ 가상배경 정보를 LocalStorage에 저장
  if (mode.value === 'image' && bgReady.value) {
    // 이미지를 base64로 변환하여 저장
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = bgImage.width
    canvas.height = bgImage.height
    ctx.drawImage(bgImage, 0, 0)

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8)
    localStorage.setItem(`bgImage_${groupId}`, imageDataUrl)
    localStorage.setItem(`bgMode_${groupId}`, mode.value)

    console.log('🔍 가상배경 이미지 LocalStorage 저장 완료:', {
      groupId,
      mode: mode.value,
      imageSize: imageDataUrl.length
    })
  } else {
    // 다른 모드일 때는 모드만 저장
    localStorage.setItem(`bgMode_${groupId}`, mode.value)
    localStorage.removeItem(`bgImage_${groupId}`)
  }

  let targetUrl: string

  if (isLeaderFromQuery) {
    console.log('🔍 query에서 isLeader=true 확인, 방장용 스터디룸으로 이동')
    targetUrl = `/studyroom/leader/${groupId}?cam=${cameraMicState.cam}&mic=${cameraMicState.mic}`
  } else {
    // 2순위: 서버에서 역할 조회
    const role = await getMyRole(groupId)
    if (role === 'leader') {
      targetUrl = `/studyroom/leader/${groupId}?cam=${cameraMicState.cam}&mic=${cameraMicState.mic}`
    } else {
      targetUrl = `/studyroom/mate/${groupId}?cam=${cameraMicState.cam}&mic=${cameraMicState.mic}`
    }
  }

  // 새 창에서 StudyRoom 열기
  const studyRoomWindow = window.open(targetUrl, '_blank', 'width=1400,height=900,scrollbars=yes,resizable=yes')

  if (!studyRoomWindow) {
    // 팝업이 차단된 경우 사용자에게 안내
    alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.')
    return
  }

  // 새 창 열기 성공 시, 역할에 따라 기존 페이지를 적절한 상세페이지로 이동
  let detailPageUrl: string

  if (isLeaderFromQuery) {
    // query에서 isLeader=true인 경우
    detailPageUrl = `/study/${groupId}/leader`
  } else {
    // 서버에서 역할 조회한 경우
    const role = await getMyRole(groupId)
    detailPageUrl = role === 'leader' ? `/study/${groupId}/leader` : `/study/${groupId}/teammate`
  }

  router.push(detailPageUrl)

  console.log('🔍 JoinForm에서 새 창으로 스터디룸 열기:', {
    groupId,
    targetUrl,
    detailPageUrl,
    cameraMicState
  })

  // 필요 시 processedTrack을 OpenVidu 퍼블리셔 생성 시 videoSource로 사용하세요.
  // (이 컴포넌트에서는 라우팅만 담당)
}
</script>

<style scoped>
.prejoin { max-width: 1100px; margin: 24px auto; padding: 0 16px; }
.topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.title { font-size: 28px; font-weight: 800; margin: 0; }
.bottom-enter {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
.enter-btn {
  background: #3b82f6;
  color: #fff;
  border: 0;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
}
.enter-btn:hover { filter: brightness(0.95); }

.stage { background: #0b0f15; border-radius: 16px; padding: 24px; border: 3px solid #4f83ff33; position: relative; }
.preview { width: 100%; aspect-ratio: 16/9; display: block; border-radius: 10px; object-fit: cover; background: #000; outline: 4px solid #5fa0ff; }
.placeholder { width: 100%; aspect-ratio: 16/9; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: #0b0f15; color: #9aa4b2; font-weight: 600; margin-bottom: 4px; }
.image-hint { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,.55); color: #fff; padding: 10px 14px; border-radius: 8px; font-weight: 700; }

.controls { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 16px; }
.ctrl-btn { width: 100%; padding: 14px 16px; border-radius: 10px; border: 0; background: #7bb27a; color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; }
.ctrl-btn.on { background: #7bb27a; } .ctrl-btn.off { background: #b25959; }
.ctrl-btn:hover { filter: brightness(0.96); }

.bg-group { position: relative; }
.bg-panel { position: absolute; left: 0; right: 0; top: -8px; transform: translateY(-100%); background: #121826; color: #e7e7e7; border: 1px solid #2b3445; border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 12px; z-index: 3; }
.radio { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.file-hidden { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
</style>
