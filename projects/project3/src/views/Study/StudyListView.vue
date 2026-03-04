<template>
  <div class="study-list-view">
    <div class="header">
      <h1 class="title">스터디 목록</h1>
      <p class="subtitle">관심 있는 스터디를 찾아보세요</p>
    </div>

    <StudyListPage
      :studies="studies"
      @create="handleCreateStudy"
    />

    <!-- 로그인 필요 모달 -->
    <Modal :visible="showLoginModal" @close="showLoginModal = false">
      <template #title>로그인이 필요합니다</template>
      <hr class="my-2" />
      <p class="modal-text">
        스터디 목록을 확인하려면 로그인이 필요합니다.<br>
        로그인 후 다시 시도해주세요.
      </p>
      <div class="modal-actions">
        <Button variant="primary" @click="goToLogin">로그인하기</Button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useStudyService } from '@/services/useStudyService'
import StudyListPage from '@/components/study/StudyListPage.vue'
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import type { Study } from '@/types/study'

const router = useRouter()
const userStore = useUserStore()
const { getStudyList } = useStudyService()

const studies = ref<Study[]>([])
const showLoginModal = ref(false)

// 로그인 상태 확인 - 스토어의 isLoggedIn 사용
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn
})

onMounted(async () => {
  // 로그인 상태 확인
  if (!isLoggedIn.value) {
    showLoginModal.value = true
    return
  }

  try {
    const response = await getStudyList()
    console.log('📋 StudyListView - API 응답 전체:', response)
    console.log('📋 StudyListView - response.data:', response.data)

    // 새로운 백엔드 API 응답 구조: { data: [...], status: "SUCCESS" }
    if (response.data && Array.isArray(response.data)) {
      studies.value = response.data as Study[]
      console.log('📋 StudyListView - 배열로 직접 설정:', studies.value.length)
    } else if (response.data && (response.data as any).data && Array.isArray((response.data as any).data)) {
      studies.value = (response.data as any).data
      console.log('📋 StudyListView - data.data로 설정:', studies.value.length)
    } else {
      studies.value = []
      console.log('📋 StudyListView - 빈 배열로 설정')
    }

    console.log('📋 StudyListView - 최종 studies 배열:', studies.value)
  } catch (error) {
    console.error('스터디 목록 로드 실패:', error)
    // 에러 처리
  }
})

function handleCreateStudy() {
  // 로그인 상태 확인
  if (!isLoggedIn.value) {
    showLoginModal.value = true
    return
  }

  router.push('/study/create')
}

function goToLogin() {
  showLoginModal.value = false
  router.push('/login')
}
</script>

<style scoped>
.study-list-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 200px);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
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

/* 반응형 디자인 */
@media (max-width: 768px) {
  .study-list-view {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
