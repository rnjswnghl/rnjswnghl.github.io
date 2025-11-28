<template>
  <div>
    <!-- 히어로 이미지 영역 -->
    <div class="hero" :style="{ backgroundImage: `url(${lib})` }">
      <div class="overlay"></div>
      <div class="hero-text">
        <h1>문장 속 당신을 만나는 곳</h1>
        <h5>읽고, 공감하고, 나누는 이 공간이 당신의 책장이 됩니다.</h5>
        <button @click="scrollToBestSeller">Explore Bestsellers</button>
      </div>
    </div>

    <BestSeller ref="bestSeller" />

    <!-- 카테고리 카드 영역 -->
    <div class="container my-5">
      <h3 class="text-center mb-4 section-title">도서 카테고리</h3>
      <CategoryCards />
    </div>

    <ThreadListMini />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import lib from '@/assets/lib.jpg'
import BestSeller from '@/components/BestSeller.vue'
import CategoryCards from '@/components/CategoryCards.vue'
import ThreadListMini from '@/components/ThreadListMini.vue'

const bestSeller = ref(null)

function scrollToBestSeller() {
  bestSeller.value?.$el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  background-size: cover;
  background-position: center;
  height: 700px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Playfair Display', 'Noto Sans KR', serif;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, rgba(35, 30, 25, 0.5), rgba(10,10,30,0.6));
  z-index: 1;
  backdrop-filter: brightness(0.7);
}

.hero-text {
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fadeInUp 1.2s ease forwards;
}

.hero-text h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(3rem, 6vw, 4.5rem);
  margin-bottom: 0.6rem;
  color: #fdfaf5;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

.hero-text h5 {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #f2e8d5;
  margin-bottom: 2rem;
  line-height: 1.6;
}

button {
  background-color: #e3d5a8;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1.05rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: #3d372c;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(160, 145, 110, 0.4);
}

button:hover {
  background-color: #d9cba0;
  box-shadow: 0 6px 14px rgba(140, 125, 90, 0.5);
  transform: translateY(-2px);
}

.section-title {
  font-family: 'Playfair Display', serif;
  color: #3e3a2f;
  border-bottom: 2px solid #e3d5a8;
  display: inline-block;
  padding-bottom: 0.3rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
