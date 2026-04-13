import axios from 'axios'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
apiInstance.interceptors.request.use(
  (config) => {
    // Zustand persist에서 토큰 가져오기
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

// 응답 인터셉터
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('인증 만료. 로그인 필요')
    }
    return Promise.reject(error)
  },
)

export default apiInstance
