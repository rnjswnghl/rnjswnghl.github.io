import axios from 'axios'
import { createDemoAxios } from '@/common/core/createDemoAxios'

// Runpod 프록시용 Axios 인스턴스
// 기본은 환경변수 VITE_RUNPOD_URL, 없으면 제공 도메인으로 fallback
const apiRunpodInstance =
  import.meta.env.VITE_RUNPOD_URL?.trim()
    ? axios.create({
        baseURL:
          import.meta.env.VITE_RUNPOD_URL ||
          'https://576c0gyddmq1yh-8000.proxy.runpod.net',
        timeout: 50000,
      })
    : createDemoAxios('runpod')

// 요청 인터셉터: 액세스 토큰 주입 (apiInstance와 동일 정책)
apiRunpodInstance.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      try {
        const authData = JSON.parse(authStorage)
        const token = authData.state?.accessToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        console.error('토큰 파싱 오류:', error)
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터: 공통 401 처리
apiRunpodInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('인증 만료. 로그인 필요')
    }
    return Promise.reject(error)
  },
)

export default apiRunpodInstance
