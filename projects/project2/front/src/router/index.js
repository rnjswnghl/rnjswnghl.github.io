import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import BookListView from '../views/BookListView.vue';
import BookDetailView from '../views/BookDetailView.vue';
import ThreadListView from '../views/ThreadListView.vue';
import ThreadDetailView from '../views/ThreadDetailView.vue';
import ThreadWriteView from '../views/ThreadWriteView.vue';
import MyPageView from '../views/MyPageView.vue';
import GuestBook from '../views/GuestBook.vue';

import SignupView from '../views/Signup.vue';
import LoginView from '../views/Login.vue';
// ProfileView 컴포넌트가 MyPageView로 통합된 경우, ProfileView 임포트 필요 없을 수 있음

import { useUserStore } from '@/stores/user';

const routes = [
  { path: '/', name: 'MainView', component: MainView },
  { path: '/books', name: 'BookListView', component: BookListView },
  { path: '/books/:bookId', name: 'BookDetailView', component: BookDetailView },
  { path: '/books/:bookId/threads', name: 'ThreadListByBookView', component: ThreadListView, props: true },
  { path: '/guestbook', name: 'GuestBook', component: GuestBook },

  { path: '/threads', name: 'ThreadListAllView', component: ThreadListView },

  { path: '/threads/write', name: 'ThreadWriteView', component: ThreadWriteView, meta: { requiresAuth: true } },
  { path: '/threads/:id', name: 'ThreadDetailView', component: ThreadDetailView, props: true }, // 스레드 상세 페이지

  { path: '/mypage', name: 'MyPageView', component: MyPageView, meta: { requiresAuth: true } },

  { path: '/signup', name: 'SignupView', component: SignupView },
  { path: '/login', name: 'LoginView', component: LoginView },

  { path: '/profile/:username', name: 'MyPageViewByUsername', component: MyPageView, props: true },

  // 아래 /posts/:postId 경로는 삭제하거나 /threads/:id로 통합하세요.
  // { path: '/posts/:postId', name: 'PostDetail', component: () => import('@/components/ThreadContent.vue'), props: true },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드: 로그인 필요 페이지는 로그인 안 되어 있으면 /login으로 이동
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    alert('로그인이 필요합니다.');
    next('/login');
  } else {
    next();
  }
});

export default router;
