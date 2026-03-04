<template>
  <div class="study-card" @click="handleClick">
    <img :src="study.imageUrl || defaultMeetingImg" alt="스터디 이미지" class="study-image" />
    <div class="study-content">
      <div class="tags">
        <span class="main">{{ getMainCategory() }}</span>
        <span v-if="getSubCategory()" class="sub">
          {{ getSubCategory() }}
        </span>
      </div>
      <div class="title">{{ getStudyName() }}</div>
      <div class="meta">
        🕒 {{ getStudyTime() }}시간 | 👤 {{ getCurrentMembers() }}/{{ getMaxMembers() }}
        <span v-if="getStartTime()"> | ⏰ {{ getStartTime() }}</span>
      </div>
      <div class="schedule" v-if="getSchedule()">
        📅 {{ getSchedule() }}
      </div>
      <div class="period" v-if="getPeriod()">
        📆 {{ getPeriod() }}
      </div>
      <div class="leader" v-if="getLeaderName()">
        👑 {{ getLeaderName() }}
      </div>
      <div class="hashtags" v-if="getHashtags().length > 0">
        <span v-for="tag in getHashtags()" :key="tag" class="hashtag">
          #{{ tag }}
        </span>
      </div>
      <div v-if="study.matchScore" class="match-score">
        매칭도: {{ study.matchScore }}점
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Study } from '@/types/study'
const defaultMeetingImg = `${import.meta.env.BASE_URL || '/'}images/meeting.png`
import { getCategoryNameById } from '@/constants/categoryMap'

interface Props {
  study: Study
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: true
})

const emit = defineEmits<{
  click: [studyId: number]
}>()

const handleClick = () => {
  if (props.clickable) {
    emit('click', props.study.id)
  }
}

// 데이터 처리 함수들
const getMainCategory = () => {
  // 백엔드에서 오는 categoryId를 사용하여 카테고리 이름 가져오기
  const categoryId = (props.study as any).categoryId

  if (categoryId) {
    const categoryInfo = getCategoryNameById(categoryId)
    if (categoryInfo) {
      return categoryInfo.mainCategory
    }
  }

  return '기타'
}

const getSubCategory = () => {
  // 백엔드에서 오는 categoryId를 사용하여 카테고리 이름 가져오기
  const categoryId = (props.study as any).categoryId

  if (categoryId) {
    const categoryInfo = getCategoryNameById(categoryId)
    if (categoryInfo && categoryInfo.subCategory) {
      return categoryInfo.subCategory
    }
  }

  return null
}

const getStudyName = () => {
  return (props.study as any).studyName || '스터디'
}

const getCurrentMembers = () => {
  return (props.study as any).currentMembers || 1
}

const getMaxMembers = () => {
  return (props.study as any).maxMembers || 10
}

const getStudyTime = () => {
  return (props.study as any).time || 0
}

const getStartTime = () => {
  // 백엔드 API 응답 구조에 맞춤
  const startTime = (props.study as any).startTime
  const time = (props.study as any).time

  if (startTime !== undefined && startTime !== null && time !== undefined && time !== null) {
    const startHour = startTime
    const timeValue = typeof time === 'string' ? parseInt(time) : time
    const endHour = (startHour + timeValue) % 24

    const startAmpm = startHour >= 12 ? '오후' : '오전'
    const startDisplayHour = startHour > 12 ? startHour - 12 : startHour === 0 ? 12 : startHour

    const endAmpm = endHour >= 12 ? '오후' : '오전'
    const endDisplayHour = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour

    return `${startAmpm} ${startDisplayHour}:00~${endAmpm} ${endDisplayHour}:00`
  }

  if (startTime !== undefined && startTime !== null) {
    const hour = startTime
    const ampm = hour >= 12 ? '오후' : '오전'
    return `${ampm}`
  }

  return null
}

const getSchedule = () => {
  if ((props.study as any).scheduleDays && Array.isArray((props.study as any).scheduleDays)) {
    return (props.study as any).scheduleDays.join(', ')
  }
  return null
}

const getPeriod = () => {
  const createdAt = (props.study as any).createdAt
  const endedAt = (props.study as any).endedAt

  if (createdAt && endedAt) {
    const startDate = new Date(createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    const endDate = new Date(endedAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    return `${startDate} ~ ${endDate}`
  }
  return null
}

const getLeaderName = () => {
  return (props.study as any).leaderNickname || null
}

const getHashtags = () => {
  return (props.study as any).hashtags || []
}
</script>

<style scoped>
.study-card {
  background: var(--color-background);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: 1px solid var(--color-border);
  cursor: pointer;
}

.study-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.study-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.study-content {
  padding: var(--spacing-xl);
}

.tags {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.tags .main {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-surface);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 0.375rem;
}

.tags .sub {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 0.375rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.title {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
  margin: var(--spacing-md) 0;
  color: var(--color-text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
}

.schedule {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  padding: var(--spacing-md);
  border-radius: 0.5rem;
  margin-top: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
}

.period {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 0.375rem;
  margin-top: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  text-align: center;
}

.leader {
  font-size: var(--font-size-base);
  color: var(--color-primary);
  background-color: rgba(215, 156, 148, 0.1);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 0.375rem;
  margin-top: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  text-align: center;
}

.hashtags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
}

.hashtag {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  background-color: rgba(215, 156, 148, 0.1);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 0.25rem;
  font-weight: var(--font-weight-medium);
}

.match-score {
  font-size: var(--font-size-base);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--spacing-sm);
  text-align: center;
  background-color: rgba(215, 156, 148, 0.1);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 0.375rem;
}

@media (max-width: 768px) {
  .study-content {
    padding: var(--spacing-lg);
  }

  .title {
    font-size: var(--font-size-lg);
  }

  .meta, .schedule, .match-score {
    font-size: var(--font-size-sm);
  }

  .study-image {
    height: 180px;
  }
}
</style>
