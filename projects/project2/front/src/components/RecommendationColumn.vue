<template>
    <div class="col-md-4 d-flex justify-content-center align-items-center position-relative">
        <button class="btn btn-link fs-3 me-2" @click="$emit('prev')" style="user-select: none;">
            ‹
        </button>

        <div class="text-center">
            <h5 class="mb-3">{{ title }}</h5>
            <div v-if="books.length && currentBook">
                <router-link :to="`/books/${currentBook.id}`" class="text-decoration-none text-dark">
                    <div class="card mx-auto" style="width: 8rem;">
                        <img :src="currentBook.cover || defaultCover" class="card-img-top" alt="책 표지"
                            style="height: 12rem; object-fit: cover;" />
                        <div class="card-body p-2">
                            <p class="card-title text-truncate mb-0" :title="currentBook.title">
                                {{ currentBook.title }}
                            </p>
                        </div>
                    </div>
                </router-link>
            </div>
            <p v-else class="text-muted">{{ emptyText }}</p>
        </div>

        <button class="btn btn-link fs-3 ms-2" @click="$emit('next')" style="user-select: none;">
            ›
        </button>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    books: Array,
    currentBook: Object,
    page: Number,
    defaultCover: String,
    emptyText: String
})
</script>
