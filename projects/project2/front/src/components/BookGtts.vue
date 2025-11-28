<template>
  <div class="tts-placeholder">
    <h4>책 소개 음성 읽어주기</h4>
    <p>📢 책 소개 내용을 음성으로 들려드립니다.</p>
    <button @click="speak">▶️ 재생</button>
    <button @click="stop">⏹ 중지</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  introduction: {
    type: String,
    required: true
  }
})

const synth = window.speechSynthesis
const voices = ref([])
let currentIndex = 0
let sentences = []

const loadVoices = () => {
  voices.value = synth.getVoices()
  console.log('사용 가능한 음성:', voices.value.map(v => `${v.name} (${v.lang})`))
}

onMounted(() => {
  loadVoices()
  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = loadVoices
  }
})

// 한 문장씩 읽는 함수
const speakNext = () => {
  if (currentIndex >= sentences.length) {
    console.log('모든 문장 읽기 완료')
    return
  }

  const utterance = new SpeechSynthesisUtterance(sentences[currentIndex])
  utterance.lang = 'ko-KR'

  // 한국어 Google 음성 우선 선택
  const voice = voices.value.find(v => v.name.includes('Google') && v.lang === 'ko-KR')
              || voices.value.find(v => v.lang === 'ko-KR')
              || voices.value[0]

  if (voice) utterance.voice = voice

  utterance.rate = 0.9
  utterance.pitch = 1
  utterance.volume = 1

  utterance.onend = () => {
    currentIndex++
    speakNext()
  }
  utterance.onerror = (e) => {
    console.error('TTS 에러:', e)
  }

  synth.speak(utterance)
}

const speak = () => {
  if (synth.speaking) {
    console.warn('이미 음성이 재생 중입니다.')
    return
  }
  if (!props.introduction) {
    console.warn('소개 내용이 없습니다.')
    return
  }
  // 문장 단위로 분리 (마침표, 느낌표, 물음표 뒤에 띄어쓰기 기준)
  sentences = props.introduction.split(/(?<=[.?!])\s+/).filter(Boolean)
  currentIndex = 0
  speakNext()
}

const stop = () => {
  if (synth.speaking) {
    synth.cancel()
    console.log('음성 재생이 중지되었습니다.')
  }
}
</script>

<style scoped>
.tts-placeholder {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background-color: #222;
  border: 2px dashed #666;
  border-radius: 10px;
  color: #bbb;
  text-align: center;
  font-style: italic;
}

.tts-placeholder h4 {
  color: #82aaff;
  margin-bottom: 0.5rem;
}

.tts-placeholder button {
  margin: 0.5rem 0.5rem 0 0.5rem;
  background-color: #444;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

</style>
