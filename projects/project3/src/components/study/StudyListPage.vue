<template>
  <div class="study-list-page">
    <!-- 카테고리 탭 -->
    <div class="tab-bar">
      <!-- 전체 탭 추가 -->
      <button
        class="tab-btn"
        :class="{ active: selectedMain === '' }"
        @click="selectMain('')"
      >
        전체
      </button>
      <button
        v-for="main in Object.keys(categoryMap)"
        :key="main"
        class="tab-btn"
        :class="{ active: selectedMain === main }"
        @click="selectMain(main)"
      >
        {{ main }}
      </button>
    </div>

    <!-- 중분류 버튼 -->
    <div class="subcategories" v-if="selectedMain !== undefined && selectedMain !== ''">
      <button
        v-for="sub in categoryMap[selectedMain as keyof typeof categoryMap]"
        :key="sub"
        class="sub-btn"
        :class="{ active: selectedSub === sub }"
        @click="selectSub(sub)"
      >
        {{ sub }}
      </button>
    </div>

    <!-- 스터디 목록 -->
    <div class="study-list-container">
      <!-- 스터디가 있을 때 -->
      <div v-if="filteredStudies.length > 0" class="study-grid">
        <StudyCard
          v-for="study in filteredStudies"
          :key="study.id"
          :study="study"
          @click="handleStudyClick"
        />
      </div>

      <!-- 스터디가 없을 때 -->
      <div v-else class="empty-state">
        <div class="empty-icon">📃</div>
        <h3 class="empty-title">스터디가 없습니다</h3>
        <p class="empty-description">
          {{ selectedMain === '' ? '현재 등록된' : selectedMain ? `${selectedMain} 카테고리에` : '선택한 카테고리에' }}
          {{ selectedSub ? `${selectedSub} 스터디가` : '스터디가' }} 아직 없어요.
        </p>
        <p class="empty-suggestion">
          첫 번째 스터디를 만들어보세요! 🚀
        </p>
        <Button variant="primary" class="create-first-btn" @click="$emit('create')">
          스터디 생성하기
        </Button>
      </div>

      <!-- 스터디 생성 버튼 (스터디가 있을 때만) -->
      <div v-if="filteredStudies.length > 0" class="create-btn">
        <Button variant="primary" @click="$emit('create')">스터디 생성하기</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { navigateToStudyDetail } from '@/utils/navigation'
import Button from '@/components/common/Button.vue'
import StudyCard from '@/components/study/StudyCard.vue'
import { categoryMap, getCategoryId, getCategoryNameById } from '@/constants/categoryMap'
import type { Study } from '@/types/study'

const router = useRouter()
const props = defineProps<{ studies: Study[] }>()
const emit = defineEmits<{'create': []}>()

const selectedMain = ref('')
const selectedSub = ref('')
const filteredStudies = ref<Study[]>([])

// 클라이언트 사이드 카테고리 필터링 (백엔드 필터링이 작동하지 않으므로)
const filterStudiesByCategory = () => {
  let filteredData = props.studies

  // 전체 탭이 아닌 경우에만 필터링 적용
  if (selectedMain.value !== '') {
    filteredData = props.studies.filter(study => {
      const categoryId = (study as Study & { categoryId?: number }).categoryId
      const studyName = (study as Study & { studyName?: string }).studyName || study.name

      if (!categoryId) {
        return false // categoryId가 없는 스터디는 제외
      }

      if (selectedSub.value) {
        // 중분류가 선택된 경우
        const expectedCategoryId = getCategoryId(selectedMain.value, selectedSub.value)
        const isMatch = categoryId === expectedCategoryId
        return isMatch
      } else {
        // 대분류만 선택된 경우
        const categoryInfo = getCategoryNameById(categoryId)
        if (categoryInfo) {
          const isMatch = categoryInfo.mainCategory === selectedMain.value
          return isMatch
        }
        return false
      }
    })
  }

  filteredStudies.value = filteredData
}

// 전체 탭 선택 시 모든 스터디 표시
const showAllStudies = () => {
  filteredStudies.value = props.studies
}

// 카테고리 선택 감지
watch([selectedMain, selectedSub], ([newMain, newSub], [oldMain, oldSub]) => {
  if (newMain === '') {
    // 전체 탭 선택
    showAllStudies()
  } else {
    // 특정 카테고리 선택
    filterStudiesByCategory()
  }
})

// 컴포넌트 마운트 시 초기화
const initializeStudies = () => {
  showAllStudies()
}

// props.studies가 변경될 때도 업데이트
watch(() => props.studies, (newStudies, oldStudies) => {
  // 전체 탭이 선택된 경우에만 전체 스터디 표시
  if (selectedMain.value === '') {
    showAllStudies()
  } else {
    filterStudiesByCategory()
  }
}, { immediate: true })

// 컴포넌트 마운트 시 초기화
onMounted(() => {
  initializeStudies()
})

function selectMain(main: string) {
  selectedMain.value = main
  selectedSub.value = ''
}

function selectSub(sub: string) {
  selectedSub.value = selectedSub.value === sub ? '' : sub
}

function handleStudyClick(studyId: number) {
  navigateToStudyDetail(studyId, router)
}


</script>

<style scoped>
.study-list-page {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 2rem;
  min-height: 80vh;
}

.tab-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tab-btn {
  position: relative;
  background-color: #e9ecef;
  color: #495057;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 1rem 1rem 0 0;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 140px;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-btn:hover {
  background-color: #dee2e6;
  transform: translateY(-2px);
}

.tab-btn.active {
  background-color: #d79c94;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(215, 156, 148, 0.3);
}

.subcategories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
  border: 2px solid #e9ecef;
}

.sub-btn {
  background: white;
  border: 2px solid #dee2e6;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  color: #495057;
}

.sub-btn:hover {
  border-color: #d79c94;
  color: #d79c94;
  transform: translateY(-1px);
}

.sub-btn.active {
  background-color: #d79c94;
  color: white;
  border-color: #d79c94;
  box-shadow: 0 2px 4px rgba(215, 156, 148, 0.3);
}

.study-list-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.study-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #495057;
}

.empty-description {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.empty-suggestion {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #28a745;
  font-weight: 500;
}

.create-first-btn {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.create-btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.create-btn button {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .study-list-page {
    padding: 1rem;
  }

  .tab-bar {
    gap: 0.25rem;
  }

  .tab-btn {
    min-width: 100px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .study-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .study-list-container {
    padding: 1.5rem;
  }
}
</style>
