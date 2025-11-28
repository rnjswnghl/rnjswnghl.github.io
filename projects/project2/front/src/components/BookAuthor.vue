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
import axios from 'axios'
import { fetchAuthorInfo as fetchAuthorInfoApi } from '@/utils/api'

import defaultImage from '@/assets/images.png'

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

// 저자의 다른 책 목록 불러오기
const fetchAuthorBooks = async () => {
  if (!props.author) return

  const propsAuthors = splitAndStrip(props.author)
  const cleanAuthor = propsAuthors[0] || ''

  try {
    const response = await axios.get(`/api/books/book-list/?author=${encodeURIComponent(cleanAuthor)}`)
    const books = response.data

    otherBooks.value = books.filter(book => {
      const bookAuthors = splitAndStrip(book.author)
      const hasCommonAuthor = bookAuthors.some(a => propsAuthors.includes(a))
      return hasCommonAuthor && book.id !== props.currentBookId
    })
  } catch (error) {
    console.error('저자의 다른 책을 불러오는데 실패했습니다.', error)
  }
}

// 설명을 문장 단위로 최대 maxLines까지만 요약하는 함수
const summarizeDescription = (text, maxLines = 10) => {
  const lines = text.split(/\.\s+/) // 마침표 + 공백 기준 분리
  const selectedLines = lines.slice(0, maxLines)
  return selectedLines.join('. ') + (lines.length > maxLines ? '...' : '')
}

// 저자 정보 불러오기 (OpenAI + 위키 API 연동 가정)
const fetchAuthorInfo = async () => {
  if (!props.author) return

  const firstAuthorRaw = props.author.split(',')[0].trim()
  const firstAuthor = firstAuthorRaw.replace(/\s*\(.*?\)\s*/g, '').trim()

  try {
    const response = await fetchAuthorInfoApi(firstAuthor)
    console.log('authorInfo API 응답:', response.data)

    const info = response.data.author_info || {}
    let desc = info.description || ''

    // 설명이 너무 길면 요약 처리
    desc = summarizeDescription(desc, 10)

    // 설명이 너무 짧으면 보완 문구 추가
    if (desc.length < 60) {
      desc += ` ${firstAuthor}에 대한 더 많은 정보는 추후 업데이트될 예정입니다.`
    }

    authorInfo.value = {
      photo: info.image_url || '',
      description: desc
    }

    // 이미지 에러 플래그 초기화 (새로운 이미지 로드 대비)
    imageErrorHandled.value = false

  } catch (error) {
    console.error('저자 정보를 불러오는데 실패했습니다.', error)
  }
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
