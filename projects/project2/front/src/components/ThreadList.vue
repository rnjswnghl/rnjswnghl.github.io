<script setup>
import ThreadItem from '@/components/ThreadItem.vue'
import { onMounted, watch } from 'vue'
import { useThreadStore } from '@/stores/threadStore'

const props = defineProps({
  userId: {
    type: Number,
    required: false,
  },
  bookId: {
    type: Number,
    required: false,
  },
  autoFetch: {
    type: Boolean,
    default: true,
  },
})

const threadStore = useThreadStore()

const fetchBasedOnProps = () => {
  if (props.bookId != null) {
    threadStore.fetchThreads({ book: props.bookId })
  } else if (props.userId != null) {
    threadStore.fetchThreads({ user: props.userId })
  } else if (props.autoFetch) {
    threadStore.fetchThreads()
  }
}

onMounted(() => {
  fetchBasedOnProps()
})

watch(
  () => [props.userId, props.bookId],
  () => {
    fetchBasedOnProps()
  }
)
</script>

<template>
  <div class="thread-list-container">
    <div class="thread-list-header">
      <h3 class="thread-list-title">
        {{ userId ? '내가 쓴 쓰레드' : '전체 쓰레드 목록' }}
      </h3>
      <div class="thread-list-stats">
        <span class="thread-count">총 {{ threadStore.threads.length }}개의 쓰레드</span>
      </div>
    </div>

    <div v-if="threadStore.threads.length === 0" class="empty-state">
      <i class="fas fa-comments"></i>
      <p>아직 작성된 쓰레드가 없습니다.</p>
    </div>

    <div v-else class="thread-list">
      <ThreadItem
        v-for="thread in threadStore.threads"
        :key="thread.id"
        :thread="thread"
        class="thread-item"
      />
    </div>
  </div>
</template>

<style scoped>
.thread-list-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.thread-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.thread-list-title {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.thread-list-stats {
  color: #6c757d;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #6c757d;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #dee2e6;
}

.empty-state p {
  margin: 0;
  font-size: 1.1rem;
}

.thread-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.thread-item {
  transition: transform 0.2s;
}

.thread-item:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .thread-list-container {
    padding: 1rem;
  }

  .thread-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .thread-list-title {
    font-size: 1.2rem;
  }
}
</style>
