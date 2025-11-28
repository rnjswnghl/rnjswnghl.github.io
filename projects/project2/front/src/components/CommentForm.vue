<template>
<form @submit.prevent="submit">
    <input v-model="comment" placeholder="Write a comment..." />
    <button type="submit">Submit</button>
</form>
</template>

<script setup>
import { ref } from 'vue'
import { createComment } from '@/utils/api'

const props = defineProps({
threadId: Number
})

const comment = ref('')

const submit = async () => {
await createComment(props.threadId, comment.value)
comment.value = ''
}
</script>