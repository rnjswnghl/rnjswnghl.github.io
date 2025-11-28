<template>
  <div class="thread-write-view">
    <h2>쓰레드 작성</h2>
    <ThreadForm :bookId="bookId" @submitted="handleSubmitted" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import ThreadForm from '@/components/ThreadForm.vue'

const route = useRoute()
const router = useRouter()
const bookId = Number(route.params.bookId)

function handleSubmitted() {
  router.push({ name: 'ThreadListView', params: { bookId } })
}
</script>

<style scoped>
.thread-write-view {
  padding: 1.5rem;
  color: #ddd;
}
</style>
