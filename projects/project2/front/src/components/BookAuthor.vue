<template>
  <div class="author-section">
    <h3>저자 정보</h3>

    <!-- 저자 이미지 및 설명 -->
    <div class="author-info-box" v-if="hasAuthorInfo">
      <img
        :src="authorInfo.photo ? authorInfo.photo : defaultImage"
        alt="저자 사진"
        class="author-photo"
        @error="onImageError"
      />
      <p class="author-description" v-if="authorInfo.description">
        {{ authorInfo.description }}
      </p>
    </div>

    <!-- 개발 중 자리 표시자 -->
    <div v-else class="author-info-box dev-placeholder">
      <div class="author-photo-placeholder">
        <span>저자 사진 영역 (추후 추가 예정)</span>
      </div>
      <p class="author-description">
        <em>※ 이곳에 저자 설명이 표시될 예정입니다. (OpenAI + 위키 연동 예정)</em>
      </p>
    </div>

    <!-- 저자의 다른 책 목록 -->
    <div v-if="otherBooks.length">
      <h4>저자의 다른 책</h4>
      <ul>
        <li v-for="(b, index) in otherBooks" :key="index">{{ b.title }}</li>
      </ul>
    </div>
    <p v-else>다른 책 정보가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import defaultImage from '@/assets/images.png'

// 저자 이미지 import
import author김호연 from '@/assets/author/김호연.jpg'
import author이미예 from '@/assets/author/이미예.jpg'
import author매트헤이그 from '@/assets/author/매트헤이그.jpg'
import author칼세이건 from '@/assets/author/칼세이건.jpg'
import author폴그레이엄 from '@/assets/author/폴그레이엄.png'
import author로버트마틴 from '@/assets/author/로버트c마틴.jpg'

const props = defineProps({
  author: { type: String, required: true },
  currentBookId: { type: Number, required: true }
})

const otherBooks = ref([])
const authorInfo = ref({
  photo: '',
  description: ''
})

const hasAuthorInfo = computed(() => {
  return !!(authorInfo.value.photo || authorInfo.value.description)
})

// 깜빡임 방지를 위한 플래그
const imageErrorHandled = ref(false)

const onImageError = (event) => {
  if (!imageErrorHandled.value) {
    imageErrorHandled.value = true
    event.target.src = defaultImage
  }
}

// 저자 이름을 소문자, 괄호 제거 후 배열로 반환
const splitAndStrip = (authorsStr) => {
  return authorsStr
    .split(',')
    .map(name => name.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase())
    .filter(Boolean)
}

// 목데이터 - 도서 목록
const mockBooks = [
  { id: 1, title: '불편한 편의점', author: '김호연', category: { name: '소설/시/희곡' } },
  { id: 2, title: '달러구트 꿈 백화점', author: '이미예', category: { name: '소설/시/희곡' } },
  { id: 3, title: '미드나잇 라이브러리', author: '매트 헤이그', category: { name: '소설/시/희곡' } },
  { id: 4, title: '코스모스', author: '칼 세이건', category: { name: '인문학' } },
  { id: 5, title: '해커와 화가', author: '폴 그레이엄', category: { name: '컴퓨터/모바일' } },
  { id: 6, title: '클린 코드', author: '로버트 C. 마틴', category: { name: '컴퓨터/모바일' } }
]

// 목데이터 - 저자 정보
const mockAuthorInfo = {
  '김호연': {
    photo: author김호연,
    description: '김호연은 한국의 소설가로, 일상 속에서 발견하는 따뜻한 이야기를 그려내는 작가입니다. 작은 공간에서 펼쳐지는 인간의 이야기를 섬세하게 그려내는 것이 특징입니다. 대표작으로는 "불편한 편의점"이 있으며, 일상의 소소한 순간들을 따뜻하게 그려내는 작품 세계로 많은 독자들에게 사랑받고 있습니다.'
  },
  '이미예': {
    photo: author이미예,
    description: '이미예는 상상력이 풍부한 작가로, 독특한 설정과 감동적인 이야기로 많은 독자들에게 사랑받고 있습니다. 꿈과 현실을 넘나드는 작품 세계가 특징입니다. 대표작 "달러구트 꿈 백화점"을 통해 독특한 상상력과 따뜻한 메시지를 전달하며, 독자들에게 새로운 꿈과 희망을 선사합니다.'
  },
  '매트 헤이그': {
    photo: author매트헤이그,
    description: '매트 헤이그는 영국의 작가로, 인생의 다양한 가능성과 선택에 대해 깊이 있게 다루는 작가입니다. 우울증과 정신 건강에 대한 경험을 바탕으로 한 작품들로 유명합니다. "미드나잇 라이브러리"를 통해 인생의 무한한 가능성과 선택의 중요성을 보여주며, 많은 독자들에게 위로와 용기를 전달합니다.'
  },
  '칼 세이건': {
    photo: author칼세이건,
    description: '칼 세이건은 미국의 천문학자이자 과학 저술가로, 우주와 과학을 대중에게 쉽게 전달한 선구자입니다. 과학과 인문학을 아우르는 작품으로 많은 사람들에게 영감을 주었습니다. "코스모스"를 통해 우주의 광대함과 인간의 위치를 과학적이고 철학적으로 탐구하며, 과학의 아름다움을 대중에게 전달했습니다.'
  },
  '폴 그레이엄': {
    photo: author폴그레이엄,
    description: '폴 그레이엄은 프로그래머이자 작가로, 프로그래밍과 창의성에 대한 통찰을 제공합니다. Y Combinator의 공동 창립자이기도 하며, 프로그래머의 사고방식에 대해 깊이 있게 다룹니다. "해커와 화가"를 통해 프로그래밍과 창의성, 스타트업에 대한 통찰을 담아 많은 개발자들에게 영감을 주었습니다.'
  },
  '로버트 C. 마틴': {
    photo: author로버트마틴,
    description: '로버트 C. 마틴은 소프트웨어 엔지니어링 분야의 권위자로, 클린 코드와 소프트웨어 설계 원칙에 대한 저서로 유명합니다. "클린 코드"는 프로그래머들의 필독서로 꼽히며, 읽기 좋고 유지보수하기 쉬운 코드를 작성하는 방법을 제시합니다. 소프트웨어 개발의 품질과 전문성에 대한 깊은 통찰을 제공합니다.'
  }
}

// 저자의 다른 책 목록 불러오기
const fetchAuthorBooks = async () => {
  if (!props.author) return

  // 백엔드 없이 목데이터만 사용
  const propsAuthors = splitAndStrip(props.author)
  
  otherBooks.value = mockBooks.filter(book => {
    const bookAuthors = splitAndStrip(book.author)
    const hasCommonAuthor = bookAuthors.some(a => propsAuthors.includes(a))
    return hasCommonAuthor && book.id !== props.currentBookId
  })
}

// 설명을 문장 단위로 최대 maxLines까지만 요약하는 함수
const summarizeDescription = (text, maxLines = 10) => {
  const lines = text.split(/\.\s+/) // 마침표 + 공백 기준 분리
  const selectedLines = lines.slice(0, maxLines)
  return selectedLines.join('. ') + (lines.length > maxLines ? '...' : '')
}

// 저자 정보 불러오기 (목데이터 사용)
const fetchAuthorInfo = async () => {
  if (!props.author) return

  const firstAuthorRaw = props.author.split(',')[0].trim()
  const firstAuthor = firstAuthorRaw.replace(/\s*\(.*?\)\s*/g, '').trim()

  // 백엔드 없이 목데이터만 사용
  const info = mockAuthorInfo[firstAuthor] || {
    photo: '',
    description: `${firstAuthor}에 대한 정보입니다. (데모 모드)`
  }

  authorInfo.value = {
    photo: info.photo || '',
    description: info.description
  }

  // 이미지 에러 플래그 초기화
  imageErrorHandled.value = false
}

const fetchAll = async () => {
  await Promise.all([fetchAuthorBooks(), fetchAuthorInfo()])
}

onMounted(fetchAll)
watch(() => props.author, fetchAll, { immediate: true })
</script>


<style scoped>
.author-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #1e1e1e;
  border-radius: 12px;
  color: #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.author-section h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #a6cee3;
}

.author-section h4 {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #b2df8a;
}

.author-info-box {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
}

.dev-placeholder {
  border: 2px dashed #888;
  background-color: #2a2a2a;
  color: #aaa;
}

.author-photo-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.75rem;
  padding: 0.5rem;
}

.author-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.author-description {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #ccc;
}
</style>
