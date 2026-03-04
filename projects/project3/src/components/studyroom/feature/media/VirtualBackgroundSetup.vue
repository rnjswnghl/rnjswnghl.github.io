<template>
  <div class="vb-setup">
    <!-- 원본 카메라 (화면에는 숨김) -->
    <video ref="inputVideo" autoplay playsinline muted class="hidden" />

    <!-- 합성 결과 미리보기 -->
    <canvas ref="canvas" class="preview"></canvas>

    <!-- 컨트롤 패널 -->
    <div class="controls">
      <div class="row">
        <label><input type="radio" value="none" v-model="mode" /> 원본</label>
        <label><input type="radio" value="blur" v-model="mode" /> 블러</label>
        <label><input type="radio" value="image" v-model="mode" /> 배경 이미지</label>
      </div>

      <div class="row" v-if="mode === 'blur'">
        <label>블러 강도: {{ blurPx }}px</label>
        <input type="range" min="0" max="30" v-model.number="blurPx" />
      </div>

      <div class="row" v-if="mode === 'image'">
        <input type="file" accept="image/*" @change="onPickBg" />
        <span class="hint">가로/세로 비율은 캔버스에 맞게 cover로 채워집니다.</span>
      </div>

      <div class="row">
        <button @click="start" :disabled="running">미리보기 시작</button>
        <button @click="stop" :disabled="!running">중지</button>
        <button class="primary" @click="useThis" :disabled="!running">이 배경으로 사용</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from 'vue'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'
import { Camera } from '@mediapipe/camera_utils'

const inputVideo = ref<HTMLVideoElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

type Mode = 'none' | 'blur' | 'image'
const mode = ref<Mode>('blur')
const blurPx = ref(12)
const running = ref(false)

let bgImg: HTMLImageElement | null = null
let camera: Camera | null = null
let selfie: SelfieSegmentation | null = null

// 부모에게 가공된 MediaStream을 넘겨주기 위한 이벤트
// emit('ready', MediaStream)
const emit = defineEmits<{ (e: 'ready', stream: MediaStream): void }>()

const ensureSize = () => {
  const v = inputVideo.value!
  const c = canvas.value!
  const w = v.videoWidth || 1280
  const h = v.videoHeight || 720
  if (c.width !== w || c.height !== h) {
    c.width = w
    c.height = h
  }
}

const drawCover = (ctx: CanvasRenderingContext2D, img: CanvasImageSource, cw: number, ch: number) => {
  // object-fit: cover처럼 그리기
  const iw = (img as any).videoWidth || (img as any).naturalWidth || cw
  const ih = (img as any).videoHeight || (img as any).naturalHeight || ch
  const scale = Math.max(cw / iw, ch / ih)
  const dw = iw * scale
  const dh = ih * scale
  const dx = (cw - dw) / 2
  const dy = (ch - dh) / 2
  ctx.drawImage(img, dx, dy, dw, dh)
}

const onResults = (results: any) => {
  const c = canvas.value!
  const ctx = c.getContext('2d')!
  const w = c.width
  const h = c.height

  // 1) 배경 그리기
  if (mode.value === 'none') {
    // 원본 그대로
    ctx.clearRect(0, 0, w, h)
    drawCover(ctx, results.image, w, h)
  } else if (mode.value === 'blur') {
    ctx.clearRect(0, 0, w, h)
    ctx.filter = `blur(${blurPx.value}px)`
    drawCover(ctx, results.image, w, h) // 흐린 배경
    ctx.filter = 'none'
  } else if (mode.value === 'image') {
    ctx.clearRect(0, 0, w, h)
    if (bgImg) {
      drawCover(ctx, bgImg, w, h)
    } else {
      // 배경 이미지 없으면 기본 단색
      ctx.fillStyle = '#1f2937'
      ctx.fillRect(0, 0, w, h)
    }
  }

  // 2) 전경(사람) 합성: 원본 프레임 위에 마스크로 사람만 남김
  ctx.save()
  drawCover(ctx, results.image, w, h)                // 원본 프레임을 그려두고
  ctx.globalCompositeOperation = 'destination-in'    // 마스크로 '남기기'
  ctx.drawImage(results.segmentationMask, 0, 0, w, h) // 사람만 남김
  ctx.restore()
}

const start = async () => {
  if (running.value) return
  const v = inputVideo.value!
  const c = canvas.value!

  // 1) 카메라 켜기
  const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
  v.srcObject = stream
  await v.play()

  await nextTick()
  ensureSize()

  // 2) MediaPipe SelfieSegmentation 설정
  selfie = new SelfieSegmentation({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
  })
  selfie.setOptions({
    modelSelection: 1,   // 0: short-range, 1: general
    selfieMode: true,
  })
  selfie.onResults(onResults)

  // 3) 카메라 프레임 → SelfieSegmentation 로 전달
  camera = new Camera(v, {
    onFrame: async () => {
      if (!selfie) return
      await selfie.send({ image: v })
    },
    width: c.width,
    height: c.height,
  })
  camera.start()
  running.value = true
}

const stop = () => {
  running.value = false
  // 카메라 정지
  if (camera) {
    camera.stop()
    camera = null
  }
  // 비디오 트랙 off
  const v = inputVideo.value
  v?.srcObject && (v.srcObject as MediaStream).getTracks().forEach(t => t.stop())
  if (v) v.srcObject = null
  selfie = null
}

const onPickBg = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.onload = () => {
    bgImg = img
    URL.revokeObjectURL(url)
  }
  img.src = url
}

const useThis = () => {
  if (!canvas.value) return
  // ✅ 합성된 비디오 스트림을 부모로 전달 (OpenVidu Publisher에 사용할 것)
  const stream = canvas.value.captureStream(30)
  emit('ready', stream)
  // 필요 시 오디오도 합치려면(마이크 포함):
  // const mic = new MediaStreamAudioSourceNode(audioCtx, { mediaStream: userMediaWithAudio })
  // → 여기서는 비디오만 넘김. 음성은 OV.initPublisher에서 audioSource: undefined로 기본 마이크 쓰면 됨.
}

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
.vb-setup { display: grid; gap: 12px; }
.hidden { display: none; }
.preview {
  width: 100%; max-width: 720px; aspect-ratio: 16 / 9;
  background: #0b1220; border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0,0,0,.2);
}
.controls { display: grid; gap: 10px; }
.row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
button {
  padding: 8px 14px; border-radius: 10px; border: 1px solid #d1d5db; cursor: pointer;
}
button.primary {
  border: none; background: #6db3f2; color: #fff; font-weight: 600;
}
.hint { color: #6b7280; font-size: 12px; }
</style>
