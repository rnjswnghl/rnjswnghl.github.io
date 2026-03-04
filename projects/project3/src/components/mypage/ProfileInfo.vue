<template>
  <div class="profile-wrapper" v-if="user">
    <!-- 왼쪽: 프로필 정보 -->
    <div class="profile-left">
      <img :src="user.image || defaultImage" alt="profile" class="profile-img" />
      <div class="info">
        <p class="nickname">{{ user.nickname }}</p>
        <div class="row">
          <span class="label">학습량</span>
          <span>{{ getStudyAmountText(user.studyAmount) }}</span>
        </div>
        <div class="row">
          <span class="label">이메일</span>
          <span>{{ user.email }}</span>
        </div>
        <Button variant="primary" size="md" class="edit-btn" @click="goToEdit">프로필 수정</Button>
      </div>
    </div>

    <!-- 오른쪽: 관심분야 및 참여 스터디 -->
    <div class="profile-right">
      <div class="section">
        <h3 class="section-title">관심 분야</h3>
        <div class="tags">
          <span
            v-for="interest in interests"
            :key="interest"
            class="tag"
          >
            #{{ interest }}
          </span>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">참여 중인 스터디 ({{ user.studies?.length || 0 }}개)</h3>

        <!-- 필터 버튼 -->
        <div v-if="user.studies && user.studies.length > 0" class="filter-buttons">
          <button
            @click="selectedFilter = 'all'"
            :class="['filter-btn', { active: selectedFilter === 'all' }]"
          >
            전체 ({{ user.studies.length }})
          </button>
          <button
            @click="selectedFilter = 'leader'"
            :class="['filter-btn', { active: selectedFilter === 'leader' }]"
          >
            스터디장 ({{ leaderStudies.length }})
          </button>
          <button
            @click="selectedFilter = 'member'"
            :class="['filter-btn', { active: selectedFilter === 'member' }]"
          >
            멤버 ({{ memberStudies.length }})
          </button>
        </div>

        <div v-if="user.studies && user.studies.length > 0" class="study-grid" :class="{ 'scrollable': filteredStudies.length > 4 }">
          <div
            v-for="study in filteredStudies"
            :key="study.id"
            class="study-card"
            @click="goToStudyDetail(study)"
          >
            <div class="study-info">
              <h4 class="study-title">{{ study.name }}</h4>
              <div class="study-footer">
                <span :class="['role-badge', study.role || 'member']">
                  {{ study.role === 'leader' ? '스터디장' : '멤버' }}
                </span>
                <span class="click-hint">클릭하여 상세보기 →</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-study">참여중인 스터디가 존재하지 않습니다!</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const defaultImage = `${import.meta.env.BASE_URL || '/'}images/logo.jpg`

// 필터링 관련 상태
const selectedFilter = ref<'all' | 'leader' | 'member'>('all')

// 스터디 분류
const leaderStudies = computed(() => {
  return user.value?.studies?.filter((study: any) => study.role === 'leader') || []
})

const memberStudies = computed(() => {
  return user.value?.studies?.filter((study: any) => study.role === 'member') || []
})

// 필터링된 스터디 목록
const filteredStudies = computed(() => {
  if (!user.value?.studies) return []

  switch (selectedFilter.value) {
    case 'leader':
      return leaderStudies.value
    case 'member':
      return memberStudies.value
    default:
      return user.value.studies
  }
})

const goToEdit = () => {
  router.push('/mypage/edit')
}

const goToStudyDetail = (study: { id: number; name: string; role?: 'leader' | 'member' }) => {
  if (study.role === 'leader') {
    router.push(`/study/${study.id}/leader`)
  } else {
    router.push(`/study/${study.id}/teammate`)
  }
}

// 사용자 데이터가 로드되지 않았으면 로드
onMounted(async () => {
  if (!user.value) {
    await userStore.fetchUser()
  }
})

// 관심분야 배열 계산 - 대분류만 추출
const interests = computed(() => {
  if (!user.value) return []
  return (user.value.interests || []).map((interest: string) => {
    // "대분류,중분류" 형태에서 대분류만 추출
    const parts = interest.split(',')
    return parts[0].trim()
  }).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) // 중복 제거
})

// 학습량 값을 텍스트로 변환하는 함수
const getStudyAmountText = (studyAmount: number | undefined) => {
  if (studyAmount === undefined || studyAmount === null) return '미설정'

  switch (studyAmount) {
    case 0:
      return '하루 30분 이하'
    case 1:
      return '하루 1~2시간'
    case 2:
      return '하루 3시간 이상'
    default:
      return '미설정'
  }
}
</script>

<style scoped>
.profile-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  background-color: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  gap: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.profile-left {
  width: 30%;
  text-align: center;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 2.5rem;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 4px solid #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info {
  margin-bottom: 1.5rem;
  width: 100%;
}

.nickname {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #212529;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.label {
  font-weight: 600;
  color: #6c757d;
  font-size: 0.9rem;
}

.edit-btn {
  margin-top: 1.5rem;
  background: #d79c94;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(215, 156, 148, 0.3);
}

.edit-btn:hover {
  background: #c88a82;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 156, 148, 0.4);
}

.profile-right {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #212529;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 40px;
  height: 3px;
  background: #d79c94;
  border-radius: 2px;
}

.tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  background-color: rgba(215, 156, 148, 0.1);
  color: #d79c94;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(215, 156, 148, 0.2);
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #6c757d;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #e9ecef;
  border-color: #d79c94;
  color: #495057;
}

.filter-btn.active {
  background: #d79c94;
  border-color: #d79c94;
  color: white;
}

.study-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.study-grid.scrollable {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.study-grid.scrollable::-webkit-scrollbar {
  width: 6px;
}

.study-grid.scrollable::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 3px;
}

.study-grid.scrollable::-webkit-scrollbar-thumb {
  background: #d79c94;
  border-radius: 3px;
}

.study-grid.scrollable::-webkit-scrollbar-thumb:hover {
  background: #c17f7a;
}

.study-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  min-height: 120px;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
}

.study-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: rgba(215, 156, 148, 0.3);
}

.study-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #d79c94, #c17f7a);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.study-card:hover::before {
  transform: scaleX(1);
}

.study-card:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.study-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.study-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #212529;
  line-height: 1.4;
}

.study-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.click-hint {
  font-size: 0.75rem;
  color: #6c757d;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.study-card:hover .click-hint {
  opacity: 1;
  color: #d79c94;
  transform: translateX(2px);
}

.role-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  align-self: flex-start;
}

.role-badge.leader {
  background-color: rgba(255, 232, 163, 0.3);
  color: #8a6d00;
  border: 1px solid rgba(255, 232, 163, 0.5);
}

.role-badge.member {
  background-color: rgba(211, 240, 255, 0.3);
  color: #005d8f;
  border: 1px solid rgba(211, 240, 255, 0.5);
}

.no-study {
  color: #6c757d;
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  margin-top: 0.5rem;
  text-align: center;
  border: 1px solid #e9ecef;
}

/* 반응형 */
@media (max-width: 768px) {
  .profile-wrapper {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    border-radius: 16px;
  }

  .profile-left {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
    padding-right: 0;
    padding-bottom: 1.5rem;
  }

  .profile-right {
    width: 100%;
  }

  .study-grid {
    flex-direction: column;
  }

  .study-card {
    width: 100%;
  }
}
</style>
