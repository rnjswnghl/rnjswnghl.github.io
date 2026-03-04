<template>
  <div class="study-results-view">
    <div class="container">

      <!-- 로딩 상태 -->
      <div v-if="loading" class="loading-section">
        <div class="loading-spinner"></div>
        <p>스터디를 찾고 있습니다...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="error-section">
        <div class="error-card">
          <h3>검색 중 오류가 발생했습니다</h3>
          <p>{{ error }}</p>
          <Button variant="primary" @click="retrySearch">다시 시도</Button>
        </div>
      </div>

      <!-- AI 추천 스터디 -->
      <div v-else-if="!showAllResults && bestMatch" class="match-section">
        <div class="match-header">
          <div class="match-badge">
            <span class="badge-content">
              <span class="badge-icon">⭐</span>
              추천 스터디
            </span>
          </div>
          <h2 class="match-title">🌱 성장에 딱 맞는 스터디를 찾아왔어요!</h2>
          <p class="match-subtitle">데이터 기반 분석으로 가장 잘 맞는 스터디를 골랐어요</p>
        </div>

        <div class="match-card-wrapper">
          <StudyMatchCard :studies="topMatches" @join="handleJoinStudy" @reject="showAllResults = true" />

        </div>

        <div class="match-actions">
          <button class="view-all-btn" @click="showAllResults = true">
            <span class="btn-text">다른 결과 보기</span>
            <span class="btn-count">({{ allResults.length - 1 }}개)</span>
          </button>
        </div>
      </div>

      <!-- 전체 결과 목록 -->
      <div v-else-if="allResults.length" class="results-section">
        <div class="results-header">
          <h3 class="results-title">
            <span class="title-icon">📋</span>
            전체 검색 결과
          </h3>
          <div class="results-count">
            <span class="count-badge">{{ allResults.length }}개 스터디</span>
          </div>
        </div>

        <div class="results-grid">
          <StudyCard v-for="study in allResults" :key="study.id" :study="study" @click="handleStudyClick" />
        </div>
      </div>

      <!-- 결과 없음 -->
      <div v-else class="no-results-section">
        <div class="no-results-card">
          <div class="no-results-icon">🔍</div>
          <h3>검색 결과가 없습니다</h3>
          <p>조건을 바꿔 다시 검색해보세요</p>
          <Button variant="primary" @click="goToSearch">다시 검색</Button>
        </div>
      </div>
    </div>

    <!-- 로그인 필요 모달 -->
    <Modal :visible="showLoginModal" @close="showLoginModal = false">
      <template #title>로그인이 필요합니다</template>
      <hr class="my-2" />
      <p class="modal-text">
        스터디 검색 결과를 확인하려면 로그인이 필요합니다.<br>
        로그인 후 다시 시도해주세요.
      </p>
      <div class="modal-actions">
        <Button variant="primary" @click="goToLogin">로그인하기</Button>
        <Button variant="secondary" @click="showLoginModal = false">취소</Button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudyService } from '@/services/useStudyService'
import { useUserStore } from '@/stores/user'
import { navigateToStudyDetail } from '@/utils/navigation'
import { getCategoryNameById } from '@/constants/categoryMap'
import StudyMatchCard from '@/components/study/StudyMatchCard.vue'
import StudyCard from '@/components/study/StudyCard.vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import type { Study, StudyFilterParams } from '@/types/study'

const route = useRoute()
const router = useRouter()
const { getMatchingStudy } = useStudyService()
const userStore = useUserStore()

const loading = ref(true)
const error = ref<string | null>(null)
const bestMatch = ref<Study | null>(null)
const allResults = ref<Study[]>([])
const showAllResults = ref(false)
const passedStudies = ref<Set<number>>(new Set())
const showLoginModal = ref(false)

// 로그인 상태 확인 - 스토어의 isLoggedIn 사용
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn
})

async function performSearch() {
  try {
    loading.value = true
    error.value = null

    // 로그인 상태 확인
    if (!isLoggedIn.value) {
      showLoginModal.value = true
      loading.value = false
      return
    }

    await userStore.fetchUser()

    // 백엔드 API 스펙에 맞춰 검색 파라미터 변환
    const searchParams: StudyFilterParams = {}

    // URL 쿼리 파라미터를 백엔드 API 스펙에 맞게 변환
    if (route.query.keyword) {
      searchParams.keyword = route.query.keyword as string
    }

    // categoryId 처리 - 백엔드에서 배열로 받음
    const categoryIds: number[] = []

    // categoryId 단일 값 처리
    if (route.query.categoryId) {
      if (Array.isArray(route.query.categoryId)) {
        categoryIds.push(...route.query.categoryId.map(id => Number(id)))
      } else {
        categoryIds.push(Number(route.query.categoryId))
      }
    }

    // categoryIds 배열 처리
    if (route.query.categoryIds) {
      if (Array.isArray(route.query.categoryIds)) {
        categoryIds.push(...route.query.categoryIds.map(id => Number(id)))
      } else {
        categoryIds.push(Number(route.query.categoryIds))
      }
    }

    // URL에서 직접 categoryIds 파라미터들을 추출 (Vue Router의 한계를 우회)
    const urlParams = new URLSearchParams(window.location.search)
    const categoryIdsFromUrl = urlParams.getAll('categoryIds')
    if (categoryIdsFromUrl.length > 0) {
      categoryIds.push(...categoryIdsFromUrl.map(id => Number(id)))
    }

    // 중복 제거 후 categoryId로 설정 (백엔드 스펙에 맞춤)
    if (categoryIds.length > 0) {
      const uniqueCategoryIds = [...new Set(categoryIds)]
      searchParams.categoryId = uniqueCategoryIds
      console.log('🔍 StudyResultsView - 최종 categoryId (배열):', uniqueCategoryIds)
    }

    if (route.query.tag) {
      // tag가 배열이거나 단일 값일 수 있음
      const tags = Array.isArray(route.query.tag)
        ? route.query.tag.map(tag => String(tag))
        : [String(route.query.tag)]
      searchParams.tag = tags
    }

    if (route.query.maxMembers) {
      searchParams.maxMembers = Number(route.query.maxMembers)
    }

    if (route.query.minMembers) {
      searchParams.minMembers = Number(route.query.minMembers)
    }

    if (route.query.timeId) {
      searchParams.timeId = Number(route.query.timeId)
    }

    console.log('🔍 검색 결과 페이지 파라미터:', searchParams)

    // 백엔드 API 직접 호출
    const { getStudyList } = useStudyService()
    const res = await getStudyList(searchParams.keyword, searchParams.categoryId)

        // 응답 구조에 따라 데이터 추출
    console.log('🔍 API 응답 전체 구조:', res)
    console.log('🔍 API 응답 data:', res.data)
    console.log('🔍 res.data.data 존재 여부:', !!(res.data && (res.data as any).data))
    console.log('🔍 res.data.data 내용:', res.data && (res.data as any).data)

    let studies: Study[] = []
    if (res.data && (res.data as any).data) {
      const rawData = (res.data as any).data
      // API 응답 데이터를 Study 타입에 맞게 매핑
      studies = rawData.map((item: any) => {
        // 카테고리 정보 처리
        let categoryName = item.category
        if (!categoryName && item.categoryId) {
          const categoryInfo = getCategoryNameById(item.categoryId)
          categoryName = categoryInfo
            ? categoryInfo.subCategory
              ? `${categoryInfo.mainCategory} > ${categoryInfo.subCategory}`
              : categoryInfo.mainCategory
            : '카테고리 없음'
        }

        return {
          id: item.id,
          name: item.name,
          studyName: item.studyName,
          nickname: item.nickname,
          leaderNickname: item.leaderNickname,
          categoryId: item.categoryId,
          currentMembers: item.currentMembers,
          maxMembers: item.maxMembers,
          time: item.time,
          startTime: item.startTime,
          createdAt: item.createdAt,
          endedAt: item.endedAt,
          hashtags: item.hashtags || [],
          category: categoryName,
          matchScore: item.matchScore || Math.floor(Math.random() * 30) + 70 // 기본값 70-100
        }
      })
      console.log('🔍 data.data에서 추출:', studies)
      console.log('🔍 추출된 studies 길이:', studies.length)
    } else if (res.data && (res.data as any).results) {
      studies = (res.data as any).results as Study[]
      console.log('🔍 data.results에서 추출:', studies)
    } else if (Array.isArray(res.data)) {
      studies = res.data as Study[]
      console.log('🔍 data 배열에서 추출:', studies)
    } else {
      console.log('❌ 응답 데이터 구조를 찾을 수 없음:', res.data)
    }

    console.log('🔍 최종 추출된 스터디 데이터:', studies)
    if (studies.length > 0) {
      console.log('🔍 첫 번째 스터디 데이터 구조:', studies[0])
      console.log('🔍 첫 번째 스터디 studyName:', studies[0].studyName)
      console.log('🔍 첫 번째 스터디 leaderNickname:', studies[0].leaderNickname)
      console.log('🔍 첫 번째 스터디 matchScore:', studies[0].matchScore)
    }

    allResults.value = studies
    bestMatch.value = studies.length > 0 ? studies[0] : null

    if (studies.length === 0) {
      allResults.value = []
      return
    }

  } catch (err: unknown) {
    console.error('[검색 실패]', err)
    const errorMessage = err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.'
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}

function retrySearch() {
  performSearch()
}

function goToSearch() {
  router.push('/study/search')
}

function goToLogin() {
  showLoginModal.value = false
  router.push('/login')
}

// 매칭율 상위 3개 스터디 (PASS되지 않은 것)
const topMatches = computed(() => {
  return allResults.value
    .filter(study => !passedStudies.value.has(study.id))
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 3)
})

function handleJoinStudy(studyId: number) {
  // 매칭된 스터디의 참여하기 버튼을 클릭하면 기본 상세페이지로 이동
  router.push(`/study/${studyId}`)
}



function handleStudyClick(studyId: number) {
  navigateToStudyDetail(studyId, router)
}

onMounted(() => {
  performSearch()
})
</script>

<style scoped>
.study-results-view {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 헤더 */
.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0;
}

/* 로딩 섹션 */
.loading-section {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #d79c94;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 에러 섹션 */
.error-section {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.error-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.error-card h3 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.error-card p {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

/* 매칭 섹션 */
.match-section {
  padding: 4rem 0;
}

.match-header {
  text-align: center;
  margin-bottom: 3rem;
}

.match-badge {
  display: inline-block;
  margin-bottom: 1.5rem;
}

.match-badge .badge-content {
  background: #d79c94;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.3);
}

.match-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #212529;
}

.match-subtitle {
  font-size: 1rem;
  color: #6c757d;
}

.match-card-wrapper {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.match-actions {
  text-align: center;
}

.view-all-btn {
  background: transparent;
  border: 2px solid #d79c94;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: #d79c94;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.view-all-btn:hover {
  background: #d79c94;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.3);
}

.btn-count {
  color: #6c757d;
  font-size: 0.9rem;
}

/* 결과 섹션 */
.results-section {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.results-title {
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #212529;
}

.title-icon {
  font-size: 1.2rem;
}

.results-count {
  background: #d79c94;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
}

.count-badge {
  color: white;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* 결과 없음 섹션 */
.no-results-section {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.no-results-card {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.no-results-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #495057;
}

.no-results-card p {
  color: #6c757d;
  margin-bottom: 2rem;
}



/* 반응형 디자인 */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }

  .title {
    font-size: 2rem;
  }

  .match-title {
    font-size: 2rem;
  }

  .results-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .results-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .results-section {
    padding: 1.5rem;
  }
}
</style>
