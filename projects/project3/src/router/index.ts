// src/router/index.ts
import { createRouter, createWebHistory, type RouteLocationRaw } from 'vue-router'

// Test
import TestOpenViduView from '@/views/StudyRoom/TestOpenViduView.vue'

// Home
import HomeView from '@/views/Home/HomeView.vue'

// Auth
import SignIn from '@/views/Auth/SignInView.vue'
import TermsView from '@/views/Auth/TermsView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import FindId from '@/views/Auth/FindIdView.vue'

// Study Room
import JoinFormView from '@/views/StudyRoom/JoinFormView.vue'
import LeaderDashboardView from '@/views/StudyRoom/LeaderDashboardView.vue'
import TeamMateDashboardView from '@/views/StudyRoom/TeamMateDashboardView.vue'

// Study Search
import StudySearchView from '@/views/Study/StudySearchView.vue'
import StudyResultsView from '@/views/Study/StudyResultsView.vue'
import StudyListView from '@/views/Study/StudyListView.vue'
import StudyDetailView from '@/views/Study/StudyDetailView.vue'
import StudyDetailTeamMateView from '@/views/Study/StudyDetailTeamMateView.vue'
import StudyDetailLeaderView from '@/views/Study/StudyDetailLeaderView.vue'
import StudyCreateView from '@/views/Study/StudyCreateView.vue'

// My Page
import MyPageView from '@/views/MyPage/MyPageView.vue'
import ProfileInfo from '@/components/mypage/ProfileInfo.vue'
import EditProfileForm from '@/components/mypage/EditProfileForm.vue'
import MyStudiesView from '@/views/MyPage/MyStudiesView.vue'
import StudyTimelineView from '@/views/MyPage/StudyTimelineView.vue'

const routes = [
  { path: '/test-openvidu', name: 'TestOpenVidu', component: TestOpenViduView },

  { path: '/', name: 'home', component: HomeView },

  // Auth
  { path: '/login', name: 'login', component: SignIn },
  { path: '/signin', name: 'signin', component: SignIn },
  { path: '/register/terms', name: 'RegisterTerms', component: TermsView },
  { path: '/register/form', name: 'RegisterView', component: RegisterView },
  { path: '/find-id', name: 'FindId', component: FindId },
  { path: '/reset-password', name: 'ResetPassword', component: () => import('@/views/Auth/ResetPasswordView.vue') },

  // Pre-Join
  {
    path: '/study/join/:groupId',
    name: 'StudyPrejoin',
    component: JoinFormView,
    props: true,
    meta: { hideLayout: true },
  },
  {
    path: '/join/:role(leader|mate)',
    redirect: (to: any): RouteLocationRaw => {
      const groupId = to.query.groupId as string | undefined
      return groupId ? { name: 'StudyPrejoin', params: { groupId: String(groupId) } } : '/'
    },
  },

  // Studyroom
  {
    path: '/studyroom',
    name: 'StudyRoomBase',
    children: [
      {
        path: 'leader/:groupId',
        name: 'LeaderDashboard',
        component: LeaderDashboardView,
        props: true,
        meta: { hideLayout: true },
      },
      {
        path: 'mate/:groupId',
        name: 'TeamMateDashboard',
        component: TeamMateDashboardView,
        props: true,
        meta: { hideLayout: true },
      },
      {
        path: 'leader',
        redirect: (to: any): RouteLocationRaw => {
          const groupId = to.query.groupId as string | undefined
          return groupId ? { name: 'LeaderDashboard', params: { groupId: String(groupId) } } : '/'
        },
      },
      {
        path: 'mate',
        redirect: (to: any): RouteLocationRaw => {
          const groupId = to.query.groupId as string | undefined
          return groupId ? { name: 'TeamMateDashboard', params: { groupId: String(groupId) } } : '/'
        },
      },
    ],
  },

  // Study
  {
    path: '/study',
    name: 'StudySearchBase',
    children: [
      { path: '', name: 'StudyList', component: StudyListView },
      { path: 'list', name: 'StudyListExplicit', component: StudyListView },
      { path: 'search', name: 'StudySearch', component: StudySearchView },
      { path: 'results', name: 'StudyResults', component: StudyResultsView },
      { path: 'create', name: 'StudyCreate', component: StudyCreateView },
      { path: ':id', name: 'StudyDetail', component: StudyDetailView },
      { path: ':id/teammate', name: 'StudyDetailTeamMate', component: StudyDetailTeamMateView },
      { path: ':id/leader', name: 'StudyDetailLeader', component: StudyDetailLeaderView },
    ],
  },

  // My Page
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPageView,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'MyProfile', component: ProfileInfo },
      { path: 'edit', name: 'EditProfile', component: EditProfileForm },
      { path: 'study', name: 'MyStudy', component: MyStudiesView },
      { path: 'log', name: 'MyActivityLog', component: StudyTimelineView },
    ],
  },

  { path: '/mystudy', name: 'MyStudyStandalone', component: MyStudiesView },

  // Quiz/AI
  { path: '/quiz-result', name: 'QuizResult', component: () => import('@/components/quiz/ResultSummaryPage.vue') },
  { path: '/ai-quiz', name: 'AIQuizPage', component: () => import('@/components/quiz/AIQuizPage.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 가드: 불필요한 마이페이지 강제 이동 제거
router.beforeEach((to, from, next) => {
  // 1) 로그인 페이지는 무조건 진입 허용
  if (to.name === 'signin' || to.name === 'login') return next()

  // 2) 보호 라우트만 인증 요구
  const authed = !!localStorage.getItem('accessToken')
  if (to.matched.some(r => r.meta?.requiresAuth) && !authed) {
    return next({ name: 'signin', query: { redirect: to.fullPath } })
  }

  next()
})

export default router
