<template>
  <div class="book-search d-flex flex-column gap-3 mb-4">
    <div class="d-flex align-items-center gap-2">
      <select v-model="localSearchField" class="form-select search-select">
        <option value="all">전체</option>
        <option value="title">책 제목</option>
        <option value="author">저자</option>
        <option value="publisher">출판사</option>
      </select>

      <input
        type="text"
        v-model="localSearchQuery"
        class="form-control search-input"
        :placeholder="placeholderText"
        @input="onInput"
        autocomplete="off"
      />
    </div>

    <CategoriesList v-model:category="localSelectedCategory" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import debounce from 'lodash.debounce'
import CategoriesList from '@/components/CategoriesList.vue'

const emit = defineEmits(['update:searchQuery', 'update:searchField', 'update:selectedCategory', 'triggerSearch'])

const props = defineProps({
  searchQuery: String,
  selectedCategory: String,
  searchField: String
})

// 로컬 상태로 복사
const localSearchQuery = ref(props.searchQuery || '')
const localSearchField = ref(props.searchField || 'all')
const localSelectedCategory = ref(props.selectedCategory)

// 검색어 변경 시 debounce로 emit
const emitSearchQuery = debounce(() => {
  emit('update:searchQuery', localSearchQuery.value)
  emit('update:searchField', localSearchField.value)
  emit('triggerSearch')
}, 300)

const onInput = () => {
  emitSearchQuery()
}

// 검색 필드 변경 감지
watch(localSearchField, () => {
  emit('update:searchField', localSearchField.value)
  emit('triggerSearch')
})

// 카테고리 변경 감지
watch(localSelectedCategory, (newVal) => {
  emit('update:selectedCategory', newVal)
  emit('triggerSearch')
})

const placeholderText = computed(() => {
  switch (localSearchField.value) {
    case 'title': return '책 제목을 입력하세요'
    case 'author': return '저자 이름을 입력하세요'
    case 'publisher': return '출판사를 입력하세요'
    default: return '검색어를 입력하세요'
  }
})
</script>

<style scoped>
.search-select {
  width: 80px;
  border-radius: 10px;
  background-color: #181818;
  color: #eee;
  border: 1.5px solid #444;
}

.search-select:focus {
  outline: none;
  border-color: #3ea6ff;
  box-shadow: 0 0 10px #3ea6ffaa;
}

</style>
