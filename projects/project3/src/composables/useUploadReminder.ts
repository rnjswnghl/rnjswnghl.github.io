// src/composables/useUploadReminder.ts
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import dayjs from 'dayjs'
import bus from '@/services/eventBus' // 네 eventBus

const DONE_KEY = (gid: string) => `uploadDone:${gid}`

export function useUploadReminder(opts: {
  groupId: string
  endAtISO: string
  isLeader: boolean
  leadTimeMinutes?: number // 기본 10, 테스트 시 1로 줄이기
}) {
  const { groupId, endAtISO, isLeader, leadTimeMinutes = 10 } = opts

  const shouldShowToast = ref(false)
  const modalOpen = ref(false)
  let timer: number | null = null

  const setupTimer = () => {
    if (!isLeader) return
    if (localStorage.getItem(DONE_KEY(groupId)) === 'true') return

    const end = dayjs(endAtISO)
    const showAt = end.subtract(leadTimeMinutes, 'minute')
    const now = dayjs()

    if (now.isAfter(showAt)) {
      shouldShowToast.value = true
    } else {
      const ms = showAt.diff(now, 'millisecond')
      timer = window.setTimeout(() => (shouldShowToast.value = true), ms)
    }
  }

  const clearTimer = () => {
    if (timer) window.clearTimeout(timer)
    timer = null
  }

  function markUploaded() {
    localStorage.setItem(DONE_KEY(groupId), 'true')
    shouldShowToast.value = false
    modalOpen.value = false
  }

  const openModal = () => (modalOpen.value = true)
  const closeModal = () => (modalOpen.value = false)

  onMounted(() => {
    setupTimer()

    // 업로드 완료 시그널
    bus.on('upload:done', (p) => {
      if (p.groupId === groupId) markUploaded()
    })

    // 강제 토스트 띄우기 (테스트용)
    bus.on('toast:file-upload', (p) => {
      if (!isLeader) return
      if (p.groupId === groupId && localStorage.getItem(DONE_KEY(groupId)) !== 'true') {
        shouldShowToast.value = true
      }
    })
  })

  onBeforeUnmount(() => {
    clearTimer()
    // mitt에서 off 쓰려면 콜백 저장 필요, 여기선 생략 가능
  })

  watch(() => `${groupId}|${endAtISO}|${isLeader}|${leadTimeMinutes}`, () => {
    clearTimer()
    shouldShowToast.value = false
    modalOpen.value = false
    setupTimer()
  })

  return { shouldShowToast, modalOpen, openModal, closeModal, markUploaded }
}
