<template>
  <div class="chat-panel">
    <!-- 헤더 -->
    <div class="chat-header">
      <h4>chatting</h4>
    </div>

    <!-- 메시지 출력 영역 -->
    <div
      ref="messagesContainer"
      class="chat-messages"
    >
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        class="chat-message"
      >
        <strong>{{ msg.nickname }}</strong>: {{ msg.text }}
      </div>
    </div>

    <!-- 입력 영역 -->
    <div class="chat-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="메시지를 입력하세요..."
        ref="messageInput"
      />
      <button @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'

// ✅ props로 메시지 리스트 받기
const props = defineProps<{
  messages: { nickname: string; text: string }[]
}>()

// ✅ emit 이름을 'send'로 변경 (부모와 일치)
const emit = defineEmits<{
  (e: 'send', text: string): void
}>()

const newMessage = ref('')
const messagesContainer = ref<HTMLDivElement>()
const messageInput = ref<HTMLInputElement>()

// ✅ 전송 함수
const sendMessage = () => {
  const text = newMessage.value.trim()
  if (text !== '') {
    emit('send', text)
    newMessage.value = ''
    // 메시지 전송 후 자동 스크롤
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 자동 스크롤 함수
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 메시지가 추가될 때마다 자동 스크롤
watch(() => props.messages.length, () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { flush: 'post' })

// 컴포넌트 마운트 시 자동 스크롤
onMounted(() => {
  nextTick(() => {
    scrollToBottom()
  })
})
</script>

<style scoped>
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0; /* flexbox 오버플로우 문제 해결 */
}

.chat-header {
  flex-shrink: 0; /* 헤더 크기 고정 */
  padding: 0.5rem;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ccc;
}

.chat-header h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
}

.chat-messages {
  flex: 1; /* 남은 공간 모두 차지 */
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  min-height: 0; /* flexbox 오버플로우 문제 해결 */
  scroll-behavior: smooth; /* 부드러운 스크롤 */
}

.chat-message {
  margin-bottom: 0.5rem;
  word-break: break-word;
  line-height: 1.4;
}

.chat-input {
  flex-shrink: 0; /* 입력창 크기 고정 */
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-top: 1px solid #ccc;
  background: #fff;
  box-sizing: border-box;
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  min-width: 0; /* flexbox 오버플로우 방지 */
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 0.9rem;
}

.chat-input button {
  flex-shrink: 0; /* 버튼 크기 고정 */
  background-color: #6db3f2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap; /* 버튼 텍스트 줄바꿈 방지 */
}

.chat-input button:hover {
  background-color: #5aa1e0;
}

/* 스크롤바 스타일링 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
