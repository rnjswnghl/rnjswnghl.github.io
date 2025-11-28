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
import axios from 'axios'
import { useRouter } from 'vue-router'

const categories = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/books/categories/')
    categories.value = res.data
  } catch (err) {
    console.error('카테고리 로드 실패', err)
  }
})

// 카테고리 이름에 따른 이미지 매핑
function getImageUrl(categoryName) {
  const imageMap = {
    '소설/시/희곡': '소설.jpeg',
    '기타': '기타.jpg',
    '자기계발': '자기계발.jpg',
    '사회과학': '사회과학.jpeg',
    '컴퓨터/모바일': '컴퓨터.jpeg',
    '경제경영': '경제경영.jpeg',
    '인문학': '인문학.jpeg',
    '건강/취미': '건강.jpeg',
    '역사': '역사.jpg',
  }

  const fileName = imageMap[categoryName] || 'default.jpg'
  return new URL(`../assets/${fileName}`, import.meta.url).href
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
