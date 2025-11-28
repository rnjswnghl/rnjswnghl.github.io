<template>
  <div class="thread-list-view">
    <ThreadList :autoFetch="false" />
  </div>
</template>

<script setup>
import ThreadList from '@/components/ThreadList.vue'
import { useThreadStore } from '@/stores/threadStore'
import { onMounted } from 'vue'

const threadStore = useThreadStore()

onMounted(() => {
  threadStore.fetchThreads()  // 전체 쓰레드 목록 불러오기
})
</script>

<style scoped>
.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #000000;
  padding-bottom: 0.5rem;
  user-select: none;
  margin-top: 2rem;
  margin-left: 2rem;
}
</style>
