<template>
  <div class="row g-4 justify-content-center">
    <div
      v-for="cat in categories"
      :key="cat.id"
      class="col-6 col-sm-4 col-md-3 col-lg-2"
    >
      <div class="card category-card shadow-sm" @click="goToCategory(cat.id)">
        <div class="image-wrapper">
          <img
            class="category-image"
            :src="getImageUrl(cat.name)"
            :alt="cat.name"
          >
          <div class="overlay">
            <h6 class="overlay-text">{{ cat.name }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'
import { useRouter } from 'vue-router'

const categories = ref([])
const router = useRouter()

// 목데이터
const mockCategories = [
  { id: 1, name: '소설/시/희곡' },
  { id: 2, name: '인문학' },
  { id: 3, name: '경제경영' },
  { id: 4, name: '사회과학' },
  { id: 5, name: '컴퓨터/모바일' },
  { id: 6, name: '자기계발' },
  { id: 7, name: '건강/취미' },
  { id: 8, name: '역사' },
  { id: 9, name: '기타' }
]

onMounted(async () => {
  // 백엔드 없이 목데이터만 사용
  categories.value = mockCategories
})

// 카테고리 이미지 import
import 소설 from '@/assets/categories/소설.jpeg'
import 기타 from '@/assets/categories/기타.jpg'
import 자기계발 from '@/assets/categories/자기계발.jpg'
import 사회과학 from '@/assets/categories/사회과학.jpeg'
import 컴퓨터 from '@/assets/categories/컴퓨터.jpeg'
import 경제경영 from '@/assets/categories/경제경영.jpeg'
import 인문학 from '@/assets/categories/인문학.jpeg'
import 건강 from '@/assets/categories/건강.jpeg'
import 역사 from '@/assets/categories/역사.jpg'

// 카테고리 이름에 따른 이미지 매핑
function getImageUrl(categoryName) {
  const imageMap = {
    '소설/시/희곡': 소설,
    '기타': 기타,
    '자기계발': 자기계발,
    '사회과학': 사회과학,
    '컴퓨터/모바일': 컴퓨터,
    '경제경영': 경제경영,
    '인문학': 인문학,
    '건강/취미': 건강,
    '역사': 역사,
  }

  return imageMap[categoryName] || 소설
}

function goToCategory(id) {
  router.push({ name: 'BookListView', query: { category: id } })
}
</script>

<style scoped>
.category-card {
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 1rem;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100px;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0));
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 1rem;
}

.overlay-text {
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  padding-bottom: 8px;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
  text-align: center;
  word-break: keep-all;
}
</style>
