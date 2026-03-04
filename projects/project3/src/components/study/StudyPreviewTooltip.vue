<template>
  <div
    v-if="visible && data"
    class="study-preview-tooltip"
    :style="tooltipStyle"
  >
    <div class="tooltip-header">
      <h4>{{ data.date }}</h4>
      <span class="study-count">{{ data.studies.length }}개 스터디</span>
    </div>
    <div class="tooltip-content">
      <div
        v-for="study in data.studies"
        :key="study.id"
        class="study-item"
      >
        <div class="study-info">
          <div class="study-name clickable" @click="goToStudyDetail(study.studyId || study.id)">
            {{ study.studyName }}
          </div>
          <div class="study-time">{{ study.startTime }}</div>
        </div>
        <div class="countdown">
          <div class="countdown-label">시작까지</div>
          <div class="countdown-time">{{ getTimeUntilStudy(study) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="StudyPreviewTooltip">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { navigateToStudyDetail } from '@/utils/navigation'
import type { StudySchedule } from '@/types/calendar'

interface TooltipData {
  date: string
  studies: StudySchedule[]
}

interface Props {
  visible: boolean
  data: TooltipData | null
  position: { x: number; y: number }
}

const props = defineProps<Props>()
const router = useRouter()

const tooltipStyle = computed(() => ({
  left: `${props.position.x}px`,
  top: `${props.position.y}px`
}))

function goToStudyDetail(studyId: number) {
  navigateToStudyDetail(studyId, router)
}

// 마우스 이벤트 핸들러는 더 이상 필요하지 않음
// function handleMouseEnter() {
//   emit('mouseenter')
// }

// function handleMouseLeave() {
//   emit('mouseleave')
// }

function getTimeUntilStudy(study: StudySchedule): string {
  const now = new Date()
  const today = new Date()
  const studyTime = study.startTime.split(':')
  const studyHour = parseInt(studyTime[0])
  const studyMinute = parseInt(studyTime[1])

  // 오늘 스터디 시간 계산
  const studyDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), studyHour, studyMinute)

  // 이미 지난 시간이면 다음 스터디까지
  if (studyDateTime < now) {
    studyDateTime.setDate(studyDateTime.getDate() + 7) // 다음 주
  }

  const diff = studyDateTime.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}일 ${hours}시간`
  } else if (hours > 0) {
    return `${hours}시간 ${minutes}분`
  } else {
    return `${minutes}분`
  }
}
</script>

<style scoped>
.study-preview-tooltip {
  position: fixed;
  z-index: 1000;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  min-width: 280px;
  border: 1px solid #e9ecef;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.tooltip-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #212529;
}

.study-count {
  background: #d79c94;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.study-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #d79c94;
}

.study-info {
  flex: 1;
}

.study-name {
  font-weight: 600;
  color: #212529;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.study-name.clickable {
  cursor: pointer;
  transition: color 0.3s ease;
}

.study-name.clickable:hover {
  color: #d79c94;
  text-decoration: underline;
}

.study-time {
  color: #6c757d;
  font-size: 0.8rem;
}

.countdown {
  text-align: right;
}

.countdown-label {
  font-size: 0.7rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.countdown-time {
  font-weight: 600;
  color: #d79c94;
  font-size: 0.9rem;
}

/* 반응형 */
@media (max-width: 768px) {
  .study-preview-tooltip {
    min-width: 250px;
    left: 10px !important;
    right: 10px;
    width: calc(100vw - 20px);
  }
}
</style>
