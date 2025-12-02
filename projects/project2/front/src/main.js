import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import api from '@/utils/api'  // ★ api 인스턴스 가져오기
import { safeStorage } from '@/utils/storage'

// iframe에서 localStorage 접근 시도 (에러 처리)
const accessToken = safeStorage.getItem('accessToken')
if (accessToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
