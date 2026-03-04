<template>
  <div class="password-modal-overlay" @click="handleOverlayClick">
    <div class="password-modal" @click.stop>
      <div class="modal-header">
        <div class="modal-title">
          <span class="camera-icon">📹</span>
          스터디룸 비밀번호 입력
        </div>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <div class="modal-content">
        <div class="lock-icon">🔒</div>
        <p class="instruction">스터디룸 비밀번호를 입력하세요</p>

        <div class="password-input-container" @click="focusHiddenInput">
          <div class="password-display">
            <div class="password-dots">
              <div
                v-for="(dot, index) in 6"
                :key="index"
                :class="['password-dot', { filled: index < password.length }]"
              ></div>
            </div>

            <div v-if="showPassword" class="password-text">
              {{ password }}
            </div>
          </div>

          <div class="password-toggle">
            <button
              type="button"
              class="toggle-btn"
              @click="togglePasswordVisibility"
            >
              {{ showPassword ? '숨기기' : '보기' }}
            </button>
          </div>

          <input
            ref="passwordInput"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="hidden-input"
            maxlength="6"
            @input="handlePasswordInput"
            @keydown="handleKeydown"
            placeholder=""
            style="position: absolute; opacity: 0; pointer-events: none;"
          />

          <!-- 숫자 키패드 -->
          <div class="number-keypad">
            <div class="keypad-row" v-for="row in [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', 'backspace']]">
              <button
                v-for="key in row"
                :key="key"
                class="keypad-btn"
                :class="{ 'backspace-btn': key === 'backspace' }"
                @click="handleKeypadClick(key)"
                :disabled="key === ''"
              >
                <span v-if="key === 'backspace'">⌫</span>
                <span v-else>{{ key }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="modal-actions" v-if="password.length === 6">
          <Button variant="primary" @click="handleConfirm" :disabled="loading">
            {{ loading ? '확인 중...' : '확인' }}
          </Button>
        </div>
        <div class="modal-actions" v-else>
          <p class="password-hint">6자리 비밀번호를 입력해주세요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Button from '@/components/common/Button.vue'

const props = defineProps<{
  studyId: number
  studyName: string
}>()

const emit = defineEmits<{
  close: []
  success: [password: string]
}>()

const password = ref('')
const loading = ref(false)
const passwordInput = ref<HTMLInputElement>()
const showPassword = ref(false)

onMounted(() => {
  // 모달 열릴 때 숨겨진 입력에 포커스를 주어 키보드 입력도 허용
  focusHiddenInput()
})

function handlePasswordInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '').slice(0, 6)
  password.value = value

  // 6자리 입력 완료 시 자동 확인
  if (value.length === 6) {
    setTimeout(() => {
      handleConfirm()
    }, 300)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && password.value.length === 6) {
    handleConfirm()
  }
}

function focusHiddenInput() {
  nextTick(() => {
    passwordInput.value?.focus()
  })
}

async function handleConfirm() {
  if (password.value.length !== 6) return

  loading.value = true

  try {
    // 목데이터: 비밀번호 검증 (실제로는 API 호출)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 목데이터 비밀번호: 123456
    if (password.value === '123456') {
      emit('success', password.value)
    } else {
      // 비밀번호 틀림 처리
      alert('비밀번호가 올바르지 않습니다.')
      password.value = ''
      passwordInput.value?.focus()
    }
  } catch (error) {
    console.error('비밀번호 확인 실패:', error)
    alert('비밀번호 확인 중 오류가 발생했습니다.')
  } finally {
    loading.value = false
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function handleKeypadClick(key: string) {
  if (key === 'backspace') {
    password.value = password.value.slice(0, -1)
  } else if (password.value.length < 6) {
    password.value += key
  }

  // 6자리 입력 완료 시 자동 확인
  if (password.value.length === 6) {
    setTimeout(() => {
      handleConfirm()
    }, 300)
  }

  // 키패드 클릭 후에도 키보드 입력을 이어서 받을 수 있도록 포커스 유지
  focusHiddenInput()
}

function handleOverlayClick() {
  emit('close')
}
</script>

<style scoped>
.password-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.password-modal {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.camera-icon {
  font-size: 1.4rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-content {
  text-align: center;
}

.lock-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.instruction {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
}

.password-input-container {
  position: relative;
  margin-bottom: 2rem;
}

.password-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.password-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.password-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5rem;
  font-family: monospace;
}

.password-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.toggle-btn {
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: #f8f9fa;
  border-color: #d79c94;
  color: #d79c94;
}

.number-keypad {
  margin-top: 1.5rem;
}

.keypad-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.keypad-btn {
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.keypad-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #d79c94;
  color: #d79c94;
}

.keypad-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.backspace-btn {
  font-size: 1rem;
}

.password-dot {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.password-dot.filled {
  background: #333;
  border-color: #333;
  transform: scale(1.1);
}

.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.password-hint {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* 애니메이션 */
.password-modal {
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.password-dot.filled {
  animation: dotFill 0.2s ease;
}

@keyframes dotFill {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
