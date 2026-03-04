<template>
  <div class="study-search-view">
    <h2 class="text-center mb-4 fw-bold">스터디 검색</h2>

    <!-- 스터디명 검색 -->
    <SearchInput v-model="searchName" />

    <!-- 검색 필터 -->
    <SearchFilters v-model="filters" />

    <!-- 검색 버튼 -->
    <div class="text-center mt-4">
      <Button variant="primary" size="md" @click="handleSearch">
        내 조건에 맞는 스터디 찾기
      </Button>
    </div>
  </div>

  <!-- 로그인 필요 모달 -->
  <Modal :visible="showLoginModal" @close="showLoginModal = false">
    <template #title>로그인이 필요합니다</template>
    <hr class="my-2" />
    <p class="modal-text">
      스터디 검색을 이용하려면 로그인이 필요합니다.<br>
      로그인 후 다시 시도해주세요.
    </p>
    <div class="modal-actions">
      <Button variant="primary" @click="goToLogin">로그인하기</Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import SearchInput from '@/components/study/SearchInput.vue'
import SearchFilters from '@/components/study/SearchFilters.vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import type { SearchFilters as SearchFiltersType } from '@/types/study'
import { getCategoryId, getCategoryIds, getTagNames, extractTagsFromText } from '@/constants/categoryMap'

const router = useRouter()
const userStore = useUserStore()

const searchName = ref('')
const filters = ref<SearchFiltersType>({
  selectedMain: '',
  selectedSub: '',
  rawTags: '',
  preferredTime: 1,
  studyAmount: '',
  memberCount: ''
})

const showLoginModal = ref(false)

// 로그인 상태 확인 - 스토어의 isLoggedIn 사용
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn
})

function parseMemberRange(rangeStr: string) {
  if (!rangeStr) return {}
  if (rangeStr === '16+') return { maxMembers: 16 }
  const [min, max] = rangeStr.split('~').map(Number)
  return { minMembers: min, maxMembers: max }
}

function handleSearch() {
  // 로그인 상태 확인
  if (!isLoggedIn.value) {
    showLoginModal.value = true
    return
  }

  // 백엔드 API 스펙에 맞춰 파라미터 변환
  const memberRange = parseMemberRange(filters.value.memberCount)

  // 카테고리 ID들 추출 (대분류 선택 시 모든 중분류 ID 포함)
  const categoryIds = getCategoryIds(filters.value.selectedMain, filters.value.selectedSub)
  console.log('🔍 카테고리 검색 디버깅:', {
    selectedMain: filters.value.selectedMain,
    selectedSub: filters.value.selectedSub,
    categoryIds: categoryIds
  })

  // 해시태그에서 태그 이름 추출
  const extractedTags = extractTagsFromText(filters.value.rawTags)
  const tagNames = getTagNames(extractedTags)

  // 검색 파라미터 구성 (백엔드 API 스펙에 맞춤)
  const query: Record<string, any> = {}

  if (searchName.value) {
    query.keyword = searchName.value
  }

  if (categoryIds.length > 0) {
    // 백엔드 스펙에 맞춰 categoryId 배열로 전달
    query.categoryId = categoryIds
    console.log('🔍 카테고리 ID 배열 전달:', categoryIds)
  } else {
    console.log('⚠️ 카테고리 ID가 없음 - 모든 스터디 검색됨')
  }

  if (tagNames.length > 0) {
    query.tag = tagNames
  }

  if (memberRange.maxMembers) {
    query.maxMembers = memberRange.maxMembers
  }

  if (memberRange.minMembers) {
    query.minMembers = memberRange.minMembers
  }

  // 선호시간대 추가 (백엔드 형식)
  if (filters.value.preferredTime) {
    query.timeId = filters.value.preferredTime
  }

  console.log('🔍 검색 파라미터:', query)

  // URL 생성 예시 로깅
  const queryString = new URLSearchParams()
  if (query.keyword) queryString.append('keyword', String(query.keyword))

  // categoryId 배열 처리
  if (Array.isArray(query.categoryId)) {
    query.categoryId.forEach(id => queryString.append('categoryId', String(id)))
  } else if (typeof query.categoryId === 'number') {
    queryString.append('categoryId', String(query.categoryId))
  }

  if (Array.isArray(query.tag)) {
    query.tag.forEach(tag => queryString.append('tag', String(tag)))
  }
  if (typeof query.maxMembers === 'number') {
    queryString.append('maxMembers', String(query.maxMembers))
  }
  if (typeof query.minMembers === 'number') {
    queryString.append('minMembers', String(query.minMembers))
  }
  if (typeof query.timeId === 'number') {
    queryString.append('timeId', String(query.timeId))
  }

  console.log('🔗 생성될 URL:', `/study/results?${queryString.toString()}`)

  // ✅ 매칭 결과 페이지로 이동 - queryString을 사용하여 정확한 URL 생성
  router.push({ path: '/study/results', query: Object.fromEntries(queryString) })
}

function goToLogin() {
  showLoginModal.value = false
  router.push('/login')
}
</script>

<style scoped>
.study-search-view {
  max-width: 840px;
  margin: 0 auto;
  padding: 1rem 0.75rem;
  min-height: calc(100vh - 160px);
  min-height: calc(100dvh - 160px);
}
@media (min-width: 576px) {
  .study-search-view { padding: 1.5rem 1rem; }
}
@media (min-width: 768px) {
  .study-search-view { padding: 2rem 1rem; }
}

.modal-text {
  margin: 0;
  line-height: 1.6;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}
</style>
