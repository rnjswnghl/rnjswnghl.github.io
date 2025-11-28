<template>
  <div :id="id" class="thread-detail-view">
    <h2 class="page-title">쓰레드 상세 페이지</h2>

    <div v-if="thread" class="thread-detail-content">
      <!-- 왼쪽: 책 정보 -->
      <div class="book-info" v-if="thread.book && typeof thread.book === 'object'">
        <ThreadBookInfo :book="thread.book" />
      </div>

      <!-- 오른쪽: 쓰레드 내용 -->
      <div class="thread-card">
        <div v-if="thread.ai_image_url" class="thread-image-container">
          <img :src="fullImageUrl" alt="AI 이미지" class="ai-image" />
        </div>

        <ThreadContent 
          :thread="thread" 
          :can-edit="canEditOrDelete" 
          @edit-start="startEdit" 
          @edit-cancel="cancelEdit" 
          @edit-save="saveEdit"
          @delete-thread="deleteThread"
          :is-editing="isEditing"
          v-model:title="editTitle"
          v-model:content="editContent"
          :currentUser="currentUser"
        />
      </div>
    </div>

    <p v-else class="loading-text">게시글을 불러오는 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

import ThreadContent from '@/components/ThreadContent.vue'
import ThreadBookInfo from '@/components/ThreadBookInfo.vue'

const props = defineProps({
  id: [String, Number],
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const thread = ref(null)
const isEditing = ref(false)
const editTitle = ref('')
const editContent = ref('')
const currentUser = computed(() => userStore.userProfile?.username || null)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const canEditOrDelete = computed(() => {
  return (
    userStore.userProfile &&
    thread.value &&
    userStore.userProfile.username === thread.value.author
  )
})

const fullImageUrl = computed(() => {
  if (!thread.value?.ai_image_url) return ''
  return thread.value.ai_image_url.startsWith('http')
    ? thread.value.ai_image_url
    : API_BASE_URL + thread.value.ai_image_url
})

async function fetchThread() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/threads/posts/${route.params.id}/`)
    thread.value = response.data

    // thread.book이 숫자(id)로 들어올 때 책 상세 정보 요청
    if (typeof thread.value.book === 'number') {
      try {
        const bookRes = await axios.get(`${API_BASE_URL}/api/books/book-list/${thread.value.book}/`)
        thread.value.book = bookRes.data
      } catch (error) {
        console.warn('책 상세 정보를 불러오지 못했습니다.', error)
        thread.value.book = null
      }
    }

    editTitle.value = thread.value.title
    editContent.value = thread.value.content
  } catch (error) {
    console.error('게시글을 불러오지 못했습니다.', error)
  }
}

function startEdit() {
  if (!thread.value) return
  isEditing.value = true
  editTitle.value = thread.value.title
  editContent.value = thread.value.content
}

function cancelEdit() {
  isEditing.value = false
  editTitle.value = ''
  editContent.value = ''
}

async function saveEdit({ title, content }) {
  if (!title.trim() || !content.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  if (!userStore.accessToken) {
    alert('로그인이 필요합니다.')
    return
  }

  // book 필드가 배열, 객체, 숫자일 경우 적절히 처리
  let bookId = null
  if (Array.isArray(thread.value.book)) {
    bookId = thread.value.book[0]
  } else if (typeof thread.value.book === 'object' && thread.value.book?.id) {
    bookId = thread.value.book.id
  } else if (typeof thread.value.book === 'number') {
    bookId = thread.value.book
  }

  try {
    await axios.put(
      `${API_BASE_URL}/api/threads/posts/${route.params.id}/`,
      { title, content, book: bookId },
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
    )
    alert('게시글이 수정되었습니다.')
    isEditing.value = false
    await fetchThread()
  } catch (error) {
    console.error('게시글 수정에 실패했습니다.', error.response?.data || error)
    alert('수정 중 오류가 발생했습니다.')
  }
}

async function deleteThread() {
  if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return

  if (!userStore.accessToken) {
    alert('로그인이 필요합니다.')
    return
  }

  try {
    await axios.delete(`${API_BASE_URL}/api/threads/posts/${route.params.id}/`, {
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    })
    alert('게시글이 삭제되었습니다.')
    router.push('/threads')
  } catch (error) {
    console.error('게시글 삭제에 실패했습니다.', error)
    alert('삭제 중 오류가 발생했습니다.')
  }
}

onMounted(async () => {
  await fetchThread()

  if (userStore.isLoggedIn && !userStore.userProfile) {
    await userStore.fetchUserProfile()
  }
})
</script>

<style scoped>
.thread-detail-view {
  max-width: 1080px;
  margin: 3rem auto;
  padding: 0 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.page-title {
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: left;

  white-space: normal;
  word-break: normal;
  overflow-wrap: break-word;
}


.thread-detail-content {
  display: flex;
  gap: 3.5rem;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex-wrap: nowrap;
}

.book-info {
  flex: 0 0 30%;
  min-width: 280px;
  margin-right: 10rem;
}

.thread-card {
  flex: 1 1 65%;
  min-width: 500px;
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: box-shadow 0.3s ease;
}

.thread-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.thread-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.ai-image {
  width: 100%;
  height: auto;
  max-height: 320px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading-text {
  font-size: 1.2rem;
  font-style: italic;
  color: #979797;
  text-align: center;
  width: 100%;
}
</style>
