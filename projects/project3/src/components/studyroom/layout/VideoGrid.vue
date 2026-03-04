<template>
  <div>
    <!-- 화면 공유 중일 때 -->
    <div v-if="isScreenSharing" class="carousel-container">
      <button @click="prevPage" :disabled="currentPage === 0" class="nav-btn">‹</button>

      <div class="carousel-wrapper">
        <div class="carousel-track" :style="carouselStyle">
          <VideoStream
            v-for="(user, index) in participants"
            :key="index"
            v-bind="user"
            class="video-tile"
          />
        </div>
      </div>

      <button
        @click="nextPage"
        :disabled="endIndex >= participants.length"
        class="nav-btn"
      >
        ›
      </button>
    </div>

    <!-- 일반 모드일 때 -->
    <div v-else class="grid-wrapper">
      <VideoStream
        v-for="(user, index) in participants"
        :key="index"
        v-bind="user"
        class="video-tile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VideoStream from '../feature/media/VideoStream.vue'

// 📌 Props or Pinia store에서 받아올 수 있음
const props = defineProps<{
  participants: Array<any>
  isScreenSharing: boolean
}>()

const currentPage = ref(0)
const pageSize = 4

const startIndex = computed(() => currentPage.value * pageSize)
const endIndex = computed(() => startIndex.value + pageSize)

const carouselStyle = computed(() => ({
  transform: `translateX(-${startIndex.value * 25}%)`, // 4개 중 하나 당 25%
}))
const nextPage = () => {
  if (endIndex.value < props.participants.length) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}
</script>

<style scoped>
/* ✅ 기본 레이아웃 (4명씩 자동 줄바꿈) */
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
}

/* ✅ 화면 공유 중: 슬라이더 레이아웃 */
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 16px 0;
}

.carousel-wrapper {
  width: 100%;
  overflow: hidden;
  max-width: 1000px;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease;
}

.video-tile {
  flex: 0 0 25%; /* 4명만 보여주도록 */
  padding: 8px;
  box-sizing: border-box;
}

.nav-btn {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #6db3f2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 12px;
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
