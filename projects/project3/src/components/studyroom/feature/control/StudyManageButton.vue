<!-- src/components/studyroom/feature/control/StudyManageButton.vue -->
<template>
  <button
    class="study-btn"
    :class="{ started: study.isLive }"
    :disabled="!isLeader"
    :title="isLeader ? '' : '리더만 제어할 수 있어요'"
    @click="onClick"
  >
    {{ study.isLive ? '스터디 종료' : '스터디 시작' }}
  </button>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useStudyStore } from '@/stores/study'
import {
  attachStudySignalListener,
  detachStudySignalListener,
  sendStudySignal,
  installLeaderLateJoinSync,
} from '@/composables/useOpenVidu'

const props = withDefaults(defineProps<{ isLeader?: boolean }>(), { isLeader: false })
const study = useStudyStore()

onMounted(() => {
  // 신호 수신 → 모든 클라이언트에서 study.isLive/startedAt 동기화
  attachStudySignalListener()
  // 리더는 늦게 들어온 참가자 동기화
  if (props.isLeader) installLeaderLateJoinSync()
})

onBeforeUnmount(() => {
  detachStudySignalListener()
})

// 부모에서 필요하면 수신 가능(선택)
const emit = defineEmits(['started', 'ended'])

const onClick = async () => {
  if (!props.isLeader) return
  try {
    if (study.isLive) {
      await sendStudySignal('end')
      emit('ended')
    } else {
      await sendStudySignal('start')
      emit('started')
    }
  } catch (e) {
    console.error('study start/stop failed', e)
  }
}
</script>

<style scoped>
.study-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2000;

  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #6db3f2; /* 기본 파랑 */
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 102, 204, 0.2);
  transition: background-color 0.3s;
}
.study-btn:hover { background-color: #519dd9; }

/* 진행 중 상태 */
.study-btn.started {
  background-color: #f44336;
  box-shadow: 0 2px 6px rgba(204, 0, 0, 0.4);
}
.study-btn.started:hover { background-color: #d32f2f; }
.study-btn:disabled { opacity:.6; cursor:not-allowed; }
</style>
