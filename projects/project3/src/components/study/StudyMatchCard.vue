<template>
  <div class="study-matching-container" v-if="currentStudy">
    <!-- 슬라이드 인디케이터 -->
    <div class="slide-indicators">
      <span
        v-for="(_, index) in studies"
        :key="index"
        :class="['indicator', { active: currentIndex === index }]"
        @click="goToSlide(index)"
      ></span>
    </div>

    <!-- 좌측 영역: 이미지 + 요약 + 버튼 -->
    <div class="study-summary">
      <img :src="currentStudy.imageUrl || defaultMeetingImg" alt="스터디 이미지" class="study-image" />
      <div class="study-title">{{ currentStudy.studyName || currentStudy.name }}</div>
      <div class="match-score-badge">
        매칭도 {{ currentStudy.matchScore || 0 }}점
      </div>
      <div class="study-buttons">
        <Button class="pass-btn" variant="outline" @click="handlePass" :disabled="isLastStudy">다음</Button>
        <Button class="join-btn" variant="primary" @click="$emit('join', currentStudy.id)">참여하기</Button>
      </div>
    </div>

    <!-- 우측 영역: 상세 정보 -->
    <div class="study-detail">
      <h3 class="section-title">스터디 소개</h3>
      <ul class="detail-list">
        <li><strong>스터디명</strong> : {{ currentStudy.studyName }}</li>
        <li><strong>스터디장</strong> : {{ currentStudy.leaderNickname }}</li>
        <li><strong>스터디 인원 수</strong> : {{ currentStudy.currentMembers }}/{{ currentStudy.maxMembers }}명</li>
        <li><strong>스터디 카테고리</strong> : {{ currentStudy.category || '카테고리 없음' }}</li>
        <li><strong>스터디 시간</strong> : {{ currentStudy.time }}시간</li>
        <li><strong>시작 시간</strong> : {{ currentStudy.startTime ? formatTime(currentStudy.startTime) : '시간 미정' }}</li>
        <li><strong>모집 기간</strong> : {{ currentStudy.createdAt }} ~ {{ currentStudy.endedAt }}</li>
        <li>
          <span v-if="currentStudy.hashtags?.length" class="hashtags">
            <span v-for="tag in currentStudy.hashtags" :key="tag" class="hashtag">#{{ tag }}</span>
          </span>
          <span v-else>해시태그가 없습니다.</span>
        </li>
      </ul>
    </div>

  </div>

  <!-- 모든 추천 스터디를 PASS한 경우 -->
  <div v-else class="text-center py-5">
    <h3 class="fw-bold mb-3">모든 추천 스터디를 확인했어요</h3>
    <Button variant="primary" @click="$emit('reject')">다른 결과 보기</Button>
  </div>
</template>

<script setup lang="ts">
const defaultMeetingImg = `${import.meta.env.BASE_URL || '/'}images/meeting.png`
import { ref, computed } from 'vue'
import Button from '@/components/common/Button.vue'
import type { Study } from '@/types/study'

interface Props {
  studies: Study[]
}
interface Emits {
  (e: 'join', studyId: number): void
  (e: 'reject'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentIndex = ref(0)

const currentStudy = computed(() => props.studies[currentIndex.value] || null)
const isLastStudy = computed(() => currentIndex.value >= props.studies.length - 1)

function handlePass() {
  if (!isLastStudy.value) {
    currentIndex.value++
  } else {
    emit('reject')
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function nextSlide() {
  if (currentIndex.value < props.studies.length - 1) {
    currentIndex.value++
  }
}

function goToSlide(index: number) {
  currentIndex.value = index
}

// 24시간 형식을 12시간 형식으로 변환
function formatTime(hour: number): string {
  if (hour === 0) return '오전 12시'
  if (hour === 12) return '오후 12시'
  if (hour < 12) return `오전 ${hour}시`
  return `오후 ${hour - 12}시`
}
</script>

<style scoped>
.study-matching-container {
  display: flex;
  gap: 2rem;
  background-color: #d9d9d9;
  padding: 2rem;
  border-radius: 2rem;
  position: relative;
}

.slide-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}


.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: #d79c94;
  transform: scale(1.2);
}

.match-score-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(215, 156, 148, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 10;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-btn:hover:not(:disabled) {
  background-color: white;
  color: #d79c94;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.prev-btn {
  left: 1rem;
}
.next-btn {
  right: 1rem;
}

.study-summary {
  background-color: #d79c94;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  width: 280px;
  flex-shrink: 0;
}

.study-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.study-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.study-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pass-btn,
.join-btn {
  border-radius: 999px;
  padding: 0.6rem 1rem;
  font-weight: bold;
}

.pass-btn {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 2px solid #dee2e6;
}

.join-btn {
  background-color: #d79c94;
  color: white;
  border: 2px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.3);
}

.study-detail {
  flex-grow: 1;
  background-color: #d79c94;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
  color: #212529;
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-list {
  list-style: none;
  padding: 0;
  font-size: 0.95rem;
  line-height: 1.8;
}

.detail-list li {
  margin-bottom: 0.3rem;
}

.rules {
  margin-top: 0.4rem;
  padding-left: 1.2rem;
  list-style: decimal;
}

.hashtags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.hashtag {
  background-color: #f8f9fa;
  color: #6c757d;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid #dee2e6;
}
</style>
