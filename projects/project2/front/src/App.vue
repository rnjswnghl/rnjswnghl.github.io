<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'

const router = useRouter()

// 앱 마운트 시 현재 경로 확인 및 메인 페이지로 리다이렉트
onMounted(() => {
  router.isReady().then(() => {
    const currentPath = router.currentRoute.value.path
    // 경로가 비어있거나 index.html이면 메인 페이지로 이동
    if (currentPath === '' || currentPath === '/index.html' || currentPath === '/projects/project2/front/dist/') {
      router.replace('/')
    }
  })
})
</script>

<style>
:root {
  --font-main: 'Noto Sans KR', sans-serif;
  --font-content: 'Nanum Myeongjo', serif;
  --font-handwriting: 'Nanum Pen Script', cursive;
}

body {
  font-family: var(--font-main);
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-main);
  font-weight: 700;
}

.thread-content {
  font-family: var(--font-content);
  line-height: 1.8;
}

.thread-title {
  font-family: var(--font-main);
  font-weight: 700;
}

.thread-excerpt {
  font-family: var(--font-content);
}

.card-title {
  font-family: var(--font-main);
  font-weight: 600;
}

.comment-content {
  font-family: var(--font-content);
}

/* 기타 스타일 */
</style>

