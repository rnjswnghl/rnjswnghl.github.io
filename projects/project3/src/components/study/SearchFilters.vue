// src/components/study/SearchFilter.vue

<template>
  <div class="search-filters">
    <!-- 카테고리 필터 전체 -->
    <div class="filter-section card shadow-sm p-4">
      <h5 class="mb-3 fw-semibold">카테고리 조건</h5>

      <!-- 대분류 -->
      <div class="mb-3">
        <label class="form-label">대분류</label>
        <div class="category-buttons">
          <Button
            v-for="main in Object.keys(categoryMap)"
            :key="main"
            type="button"
            class="category-btn"
            :class="{ selected: selectedMain === main }"
            @click="selectMain(main)"
          >
            #{{ main }}
          </Button>
        </div>
      </div>

      <!-- 중분류 -->
      <div v-if="subCategories.length" class="mb-3 pt-3 border-top border-dashed">
        <label class="form-label">중분류</label>
        <div class="category-buttons">
          <Button
            v-for="sub in subCategories"
            :key="sub"
            type="button"
            class="subcategory-btn"
            :class="{ selected: selectedSub === sub }"
            @click="selectSub(sub)"
          >
            #{{ sub }}
          </Button>
        </div>
      </div>

      <!-- 소분류 키워드 입력 -->
      <div class="mb-3">
        <label class="form-label">소분류 키워드 <span class="text-muted">(최대 3개)</span></label>
        <div class="tag-input-container">
          <div class="tag-list">
            <span
              v-for="(tag, index) in searchTags"
              :key="index"
              class="tag-item"
            >
              <span class="tag-text">#{{ tag }}</span>
              <button
                type="button"
                class="tag-remove-btn"
                @click="removeTag(index)"
                aria-label="태그 삭제"
              >
                ×
              </button>
            </span>
          </div>
          <input
            v-model="tagInput"
            type="text"
            class="tag-input"
            placeholder="키워드를 입력하고 Enter 또는 Space를 누르세요"
            @keydown="handleTagInput"
            @blur="addTagFromInput"
            :disabled="searchTags.length >= 5"
          />
        </div>
      </div>
    </div>

    <!-- 기타 필터 -->
    <div class="filter-section card shadow-sm p-4 mt-4">
      <h5 class="mb-3 fw-semibold">상세 조건</h5>
      <div class="form-grid">
        <div class="grid-item">
          <PreferTime v-model="preferredTime" />
        </div>
        <div class="grid-item">
          <PreferStudy v-model="studyAmount" />
        </div>
        <div class="grid-item">
          <MemberCount v-model="memberCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from '@/components/common/Button.vue'
import PreferTime from '@/components/auth/PreferTime.vue'
import PreferStudy from '@/components/auth/PreferStudy.vue'
import MemberCount from '@/components/study/MemberCount.vue'
import { categoryMap } from '@/constants/categoryMap'

import type { SearchFilters } from '@/types/study'

interface Props {
  modelValue: SearchFilters
}

interface Emits {
  (e: 'update:modelValue', value: SearchFilters): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedMain = ref(props.modelValue.selectedMain)
const selectedSub = ref(props.modelValue.selectedSub)
const rawTags = ref(props.modelValue.rawTags)
const preferredTime = ref(props.modelValue.preferredTime || 1)
const studyAmount = ref(props.modelValue.studyAmount)
const memberCount = ref(props.modelValue.memberCount)

// 태그 관련 변수들
const searchTags = ref<string[]>([])
const tagInput = ref('')

// 기존 rawTags에서 태그 추출
const initializeTags = () => {
  if (rawTags.value) {
    const tags = rawTags.value.split(' ').filter(tag => tag.startsWith('#')).map(tag => tag.slice(1))
    searchTags.value = tags
  }
}

// 컴포넌트 마운트 시 태그 초기화
initializeTags()

const subCategories = computed(() => categoryMap[selectedMain.value as keyof typeof categoryMap] || [])

watch([selectedMain, selectedSub, rawTags, preferredTime, studyAmount, memberCount], () => {
  emit('update:modelValue', {
    selectedMain: selectedMain.value,
    selectedSub: selectedSub.value,
    rawTags: rawTags.value,
    preferredTime: preferredTime.value,
    studyAmount: studyAmount.value,
    memberCount: memberCount.value
  })
}, { deep: true })

function selectMain(main: string) {
  if (selectedMain.value === main) return
  selectedMain.value = main
  selectedSub.value = ''
}

function selectSub(sub: string) {
  selectedSub.value = selectedSub.value === sub ? '' : sub
}

// 태그 관련 함수들
const addTag = (tag: string) => {
  const trimmedTag = tag.trim()
  if (trimmedTag && !searchTags.value.includes(trimmedTag) && searchTags.value.length < 3) {
    searchTags.value.push(trimmedTag)
    updateRawTags()
  }
}

const removeTag = (index: number) => {
  searchTags.value.splice(index, 1)
  updateRawTags()
}

const handleTagInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    addTagFromInput()
  }
}

const addTagFromInput = () => {
  if (tagInput.value.trim()) {
    addTag(tagInput.value)
    tagInput.value = ''
  }
}

const updateRawTags = () => {
  rawTags.value = searchTags.value.map(tag => `#${tag}`).join(' ')
}
</script>

<style scoped>
.filter-section {
  background-color: #f9f9fb;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}
.filter-section.card.p-4 {
  padding: 1rem !important;
}
@media (min-width: 576px) {
  .filter-section.card.p-4 { padding: 1.25rem !important; }
}
@media (min-width: 768px) {
  .filter-section.card.p-4 { padding: 1.5rem !important; }
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-btn,
.subcategory-btn {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
}

.category-btn.selected,
.subcategory-btn.selected {
  background-color: #5e48f3;
  color: white;
  border-color: #5e48f3;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.grid-item {
  flex: 1 1 100%;
}
@media (min-width: 576px) {
  .grid-item {
    flex: 1 1 calc(50% - 0.75rem);
  }
}

/* 태그 입력 스타일 */
.tag-input-container {
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  padding: 0.75rem;
  min-height: 3rem;
  background: white;
  transition: all 0.3s ease;
}

.tag-input-container:focus-within {
  border-color: #5e48f3;
  box-shadow: 0 0 0 0.2rem rgba(94, 72, 243, 0.25);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #5e48f3 0%, #4a3fd8 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  animation: tagSlideIn 0.3s ease;
}

.tag-text {
  white-space: nowrap;
}

.tag-remove-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.tag-remove-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tag-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  width: 100%;
  padding: 0;
}

.tag-input:disabled {
  color: #6c757d;
  cursor: not-allowed;
}

@keyframes tagSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
