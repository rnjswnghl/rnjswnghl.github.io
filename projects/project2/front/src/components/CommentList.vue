<template>
<div>
    <CommentItem v-for="c in comments" :key="c.id" :comment="c" />
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchComments } from '@/utils/api'
import CommentItem from './CommentItem.vue'

const props = defineProps({
threadId: Number
})

const comments = ref([])

onMounted(async () => {
comments.value = await fetchComments(props.threadId)
})
</script>