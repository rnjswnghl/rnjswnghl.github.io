<template>
  <div class="categories">
    <label class="form-label">관심 분야 (최대 3개 선택)</label>

    <div class="categories-grid">
      <div
        v-for="category in mainCategories"
        :key="category"
        class="category-item"
      >
        <label class="category-checkbox">
          <input
            type="checkbox"
            :value="category"
            v-model="selectedCategories"
            @change="handleCategoryChange"
            :disabled="isDisabled(category)"
          />
          <span class="checkbox-label">{{ category }}</span>
        </label>
      </div>
    </div>

    <div class="selected-info">
      <small class="text-muted">
        선택된 관심분야: {{ selectedCategories.length }}/3
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import { categoryMap } from '@/constants/categoryMap'

const props = defineProps({
  selectedCategories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:selectedCategories'])

// 대분류 카테고리 목록 (카테고리 맵에서 가져옴)
const mainCategories = Object.keys(categoryMap)

// 선택된 카테고리들
const selectedCategories = ref([...props.selectedCategories])

// 카테고리 선택/해제 처리
function handleCategoryChange() {
  // 최대 3개까지만 선택 가능
  if (selectedCategories.value.length > 3) {
    selectedCategories.value = selectedCategories.value.slice(0, 3)
  }

  // 부모 컴포넌트에 변경사항 전달
  emit('update:selectedCategories', selectedCategories.value)
}

// 체크박스 비활성화 여부 확인
function isDisabled(category) {
  return selectedCategories.value.length >= 3 && !selectedCategories.value.includes(category)
}

// props 변경 시 로컬 상태 업데이트
watch(() => props.selectedCategories, (newValue) => {
  selectedCategories.value = [...newValue]
}, { deep: true })
</script>

<style scoped>
.categories {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #495057;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.category-item {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.category-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.category-checkbox:hover {
  background-color: #f8f9fa;
}

.category-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.category-checkbox input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-label {
  font-size: 0.9rem;
  color: #495057;
  cursor: pointer;
  user-select: none;
}

.category-checkbox input[type="checkbox"]:disabled + .checkbox-label {
  color: #6c757d;
  cursor: not-allowed;
}

.selected-info {
  margin-top: 0.5rem;
}

.text-muted {
  color: #6c757d;
  font-size: 0.875rem;
}
</style>
