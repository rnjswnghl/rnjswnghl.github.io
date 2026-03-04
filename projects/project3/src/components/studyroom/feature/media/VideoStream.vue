<!-- src/components/studyroom/feature/media/VideoStream.vue -->
<template>
  <div class="video-stream" :class="{ speaking: isSpeaking }">
    <!-- 🎥 비디오 요소 -->
    <video
      ref="videoRef"
      autoplay
      playsinline
      :muted="isLocal"
      class="video-element"
      :class="{ 'mirror-fix': isLocal }"
    ></video>

    <!-- 😊 이모지 오버레이 -->
    <div v-if="overlayEmoji" class="emoji-overlay">
      {{ overlayEmoji }}
    </div>

    <!-- ℹ️ 하단 정보바 -->
    <div class="info-bar">
      <span class="nickname">{{ nickname || '익명' }}</span>
      <div class="status-icons">
        <span class="icon mic" :class="{ off: !micOn }">
          <i v-if="micOn" class="fi fi-sr-volume"></i>
          <i v-else class="fi fi-sr-volume-slash"></i>
        </span>
        <span class="icon cam" :class="{ off: !cameraOn }">
          <i v-if="cameraOn" class="fi fi-rr-webcam"></i>
          <i v-else class="fi fi-rr-webcam-slash"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Props 정의
 * @prop {any}    stream        OpenVidu StreamManager (비디오 소스)
 * @prop {string} nickname      참가자 닉네임
 * @prop {boolean} isLocal      내 로컬 비디오 여부 (true면 video muted)
 * @prop {boolean} micOn        마이크 상태
 * @prop {boolean} cameraOn     카메라 상태
 * @prop {boolean} [isSpeaking] 말하는 상태 여부(테두리 하이라이트), 기본값 false
 * @prop {string}  [overlayEmoji] 비디오 위에 표시할 실시간 이모지 (예: '👏', '👍')
 */
interface Props {
  stream: any
  nickname?: string
  isLocal?: boolean
  micOn: boolean
  cameraOn: boolean
  isSpeaking?: boolean
  overlayEmoji?: string
}
const props = withDefaults(defineProps<Props>(), { isSpeaking: false })

import { ref, onMounted, watch } from 'vue'
const videoRef = ref<HTMLVideoElement | null>(null)

/** OpenVidu 스트림을 HTMLVideoElement와 바인딩 */
const addVideo = () => {
  if (videoRef.value && props.stream) {
    try {
      props.stream.addVideoElement(videoRef.value)
    } catch (e) {
      console.warn('비디오 연결 실패:', e)
    }
  }
}

onMounted(addVideo)
watch(() => [props.stream, videoRef.value], addVideo, { immediate: true })
</script>

<style scoped>
.video-stream {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  background: #000;
  border: 2px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

/* 🗣 말하는 사람 하이라이트 */
.video-stream.speaking {
  border-color: #00e0ff;
  box-shadow: 0 0 10px #00e0ff;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 🔄 좌우반전 해결 (로컬 스트림만) */
.mirror-fix {
  transform: scaleX(-1);
}

/* 😊 이모지 오버레이 스타일 */
.emoji-overlay {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  z-index: 10;
  animation: pop-fade 2s ease-out forwards;
  text-shadow: 0 2px 6px rgba(0,0,0,.35);
  pointer-events: none;
  user-select: none;
}

/* 이모지 표시 애니메이션 */
@keyframes pop-fade {
  0%   { opacity: 0; transform: translateX(-50%) scale(0.8); }
  20%  { opacity: 1; transform: translateX(-50%) scale(1.2); }
  40%  { transform: translateX(-50%) scale(1); }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) scale(0.8); }
}

/* ℹ️ 참가자명 + 상태바 */
.info-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  font-size: 0.8rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-icons {
  display: flex;
  gap: 6px;
}

/* 🔊 상태 아이콘 스타일 */
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

.icon i {
  font-size: 12px;
  color: white;
}

.icon.off {
  opacity: 0.4;
}

.icon.off i {
  color: #ff6b6b;
}
</style>
