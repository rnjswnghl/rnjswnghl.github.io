// src/stores/study.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Study } from '@/types/study'

export const useStudyStore = defineStore('study', () => {
  // 1) 기존 기능: 내가 참여한 스터디 목록
  const joinedStudies = ref<Study[]>([])
  function setJoinedStudies(data: Study[]) {
    joinedStudies.value = data
  }

  // 2) 추가 기능: 스터디 시작/종료 & 타이머 상태
  const isLive = ref(false)
  const startedAt = ref<number | null>(null)
  const endedAt = ref<number | null>(null)
  const elapsedSec = ref(0) // 종료할 때마다 누적

  function start(ts = Date.now()) {
    if (isLive.value) return
    isLive.value = true
    startedAt.value = ts
    endedAt.value = null
  }

  function end(ts = Date.now()) {
    if (!isLive.value) return
    isLive.value = false
    endedAt.value = ts
    if (startedAt.value) {
      elapsedSec.value += Math.max(0, Math.floor((ts - startedAt.value) / 1000))
    }
  }

  function reset() {
    isLive.value = false
    startedAt.value = null
    endedAt.value = null
    elapsedSec.value = 0
  }

  const sessionSec = computed(() =>
    isLive.value && startedAt.value ? Math.floor((Date.now() - startedAt.value) / 1000) : 0
  )

  return {
    // 기존
    joinedStudies,
    setJoinedStudies,
    // 추가
    isLive,
    startedAt,
    endedAt,
    elapsedSec,
    sessionSec,
    start,
    end,
    reset,
  }
})
