<script setup>
import api from '@/utils/api.js'
import { ref, watch } from 'vue'
import LikeButton from './LikeButton.vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  thread: Object,
  canEdit: Boolean,
  isEditing: Boolean,
  title: String,
  content: String,
  currentUser: String,
})

const emit = defineEmits([
  'edit-start',
  'edit-cancel',
  'edit-save',
  'delete-thread',
  'update:title',       // ★ 추가
  'update:content',     // ★ 추가
])

const localTitle = ref(props.title)
const localContent = ref(props.content)

watch(() => props.title, (newVal) => {
  localTitle.value = newVal
})

watch(() => props.content, (newVal) => {
  localContent.value = newVal
})

// localTitle, localContent 바뀔 때 update 이벤트 emit
watch(localTitle, (newVal) => {
  emit('update:title', newVal)
})

watch(localContent, (newVal) => {
  emit('update:content', newVal)
})

// 댓글 상태 관리
const comments = ref([])
const newComment = ref('')

// 댓글 목록 불러오기
async function fetchComments() {
  try {
    const res = await api.get(`threads/posts/${props.thread.id}/comments/`)
    comments.value = res.data
  } catch (error) {
    alert('댓글 목록을 불러오는데 실패했습니다.')
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString() // 원하는 포맷으로 변경 가능
}

// 댓글 등록
async function submitComment() {
  if (!newComment.value.trim()) {
    alert('댓글 내용을 입력해주세요.')
    return
  }
  try {
    await api.post(`threads/posts/${props.thread.id}/comments/`, {
      content: newComment.value,
    })
    newComment.value = ''
    await fetchComments()
  } catch (error) {
    alert('댓글 등록에 실패했습니다.')
  }
}

// 댓글 삭제
async function deleteComment(commentId) {
  const confirmed = confirm('댓글을 삭제하시겠습니까?')
  if (!confirmed) return

  try {
    await api.delete(`threads/posts/${props.thread.id}/comments/${commentId}/`)
    await fetchComments()
  } catch (error) {
    alert('댓글 삭제에 실패했습니다.')
  }
}

// 좋아요 상태 업데이트 콜백
function updateLikeStatus(payload) {
  props.thread.is_liked = payload.liked
  props.thread.like_count = payload.likeCount
}

// 저장 버튼 처리
function save() {
  if (!localTitle.value.trim() || !localContent.value.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }
  emit('edit-save', { title: localTitle.value, content: localContent.value })
}

// 컴포넌트 마운트 시 댓글 불러오기
fetchComments()
</script>

<template>
  <div class="thread-content">
    <div v-if="!isEditing">
      <h3 class="thread-title">{{ thread.title }}</h3>
      <div class="meta-info">
        <router-link :to="`/profile/${thread.author}`" class="thread-author">
          작성자 : {{ thread.author }}
        </router-link>
        <span class="thread-date">{{ formatDate(thread.created_at) }}</span>
      </div>
      <p class="thread-body">{{ thread.content }}</p>

      <!-- 좋아요 버튼 -->
      <LikeButton
        :threadId="thread.id"
        :initialLiked="thread.is_liked"
        :initialLikeCount="thread.like_count"
        @update-like="updateLikeStatus"
      />

      <div v-if="canEdit" class="button-area">
        <button @click="$emit('edit-start')" class="btn edit-btn">수정</button>
        <button @click="$emit('delete-thread')" class="btn delete-btn">삭제</button>
      </div>
    </div>

    <div v-else>
      <input
        v-model="localTitle"
        class="edit-input title-input"
        type="text"
        placeholder="제목을 입력하세요"
      />
      <textarea
        v-model="localContent"
        class="edit-input content-textarea"
        rows="6"
        placeholder="내용을 입력하세요"
      ></textarea>

      <div class="button-area">
        <button @click="save" class="btn save-btn">저장</button>
        <button @click="$emit('edit-cancel')" class="btn cancel-btn">취소</button>
      </div>
    </div>

    <!-- 댓글 섹션 -->
    <section class="comments-section">
      <h4>댓글 ({{ comments.length }})</h4>

      <div v-for="comment in comments" :key="comment.id">
        <CommentItem
          :comment="comment"
          :currentUser="currentUser"
          @delete-comment="deleteComment"
        />
      </div>

      <textarea
        v-model="newComment"
        placeholder="댓글을 입력하세요."
        rows="3"
        class="comment-input"
      ></textarea>
      <button @click="submitComment" class="btn submit-comment-btn">댓글 등록</button>
    </section>
  </div>
</template>

<style scoped>
.thread-content {
  margin-top: 0;
  padding-top: 0;
}

.thread-content > *:first-child {
  margin-top: 0 !important;
}

.thread-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #000000d6;
  margin: 0;
  word-break: break-word;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.thread-author {
  color: #4da3ff;
  text-decoration: none;
  font-weight: 500;
}

.thread-author:hover {
  text-decoration: underline;
}

.thread-date {
  color: #999;
  font-size: 0.9rem;
}

.thread-body {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4e4e4e;
  white-space: pre-line;
  word-wrap: break-word;
}

.edit-input {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: inherit;
  resize: vertical;
}

.title-input {
  margin-bottom: 1rem;
}

.content-textarea {
  min-height: 120px;
}

.button-area {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.5rem 1.3rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #4da3ff;
  color: white;
}

.edit-btn:hover {
  background-color: #3a8dde;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
}

.delete-btn:hover {
  background-color: #d84343;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.save-btn:hover {
  background-color: #1e7e34;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

.comments-section {
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.comment-input {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: inherit;
  resize: vertical;
  margin-top: 1rem;
}

.submit-comment-btn {
  margin-top: 0.5rem;
  background-color: #4da3ff;
  color: white;
  border: none;
  padding: 0.5rem 1.3rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-family: inherit;
  transition: background-color 0.3s ease;
}

.submit-comment-btn:hover {
  background-color: #3a8dde;
}
</style>
