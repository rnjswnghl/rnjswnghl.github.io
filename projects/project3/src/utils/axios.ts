// src/utils/axios.ts
import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'

// ✅ 개발 환경 여부
const isDevelopment = import.meta.env.DEV

// ✅ 공통 API (회원가입, 로그인, 마이페이지 등)
// 개발 환경에서는 프록시 사용, 프로덕션에서는 실제 서버 사용
const API_BASE_URL = isDevelopment ? '/api' : 'https://i13e207.p.ssafy.io/api'

// ✅ 토큰 저장 키
const ACCESS_TOKEN_KEY = 'accessToken'

// ✅ accessToken 유틸
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || ''
}
export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}
export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// ✅ 로그인/리프레시 응답에서 토큰 추출 유틸 (헤더/바디 둘 다 대응)
function extractTokenFromResponse(res: any): string | undefined {
  // Header: Authorization: Bearer xxx
  const h = res?.headers || {}
  const authHeader =
    h.authorization || h.Authorization || h['authorization'] || h['Authorization']
  if (typeof authHeader === 'string') {
    const m = authHeader.match(/^Bearer\s+(.+)$/i)
    if (m) return m[1]
  }
  // Body: { accessToken | token | jwt }
  const d = res?.data || {}
  return d.accessToken || d.token || d.jwt || undefined
}

// ✅ 공통 axios 인스턴스
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    // Content-Type은 메서드/바디 유형에 따라 인터셉터에서 처리
    ...(isDevelopment ? {} : { 'ngrok-skip-browser-warning': 'true' }),
  },
  // Bearer 토큰 인증이면 쿠키 불필요
  withCredentials: false,
})

const METHODS_WITH_BODY = new Set(['post', 'put', 'patch', 'delete'])

// 🔎 유틸: FormData 여부
function isFormDataBody(cfg: Pick<InternalAxiosRequestConfig, 'data'>) {
  return typeof FormData !== 'undefined' && cfg.data instanceof FormData
}

// 토큰 저장 함수
function saveToken(token: string) {
  localStorage.setItem('accessToken', token)
}

// 토큰 삭제 함수
function removeToken() {
  localStorage.removeItem('accessToken')
}

// 토큰 조회 함수
function getToken(): string | null {
  return localStorage.getItem('accessToken')
}

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

// ✅ OpenVidu 전용 axios (→ 백엔드 경유 사용 시)
export const openviduAxios = axios.create({
  baseURL: isDevelopment ? '/api/openvidu' : 'https://i13e207.p.ssafy.io/api/openvidu',
  withCredentials: true,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    ...(isDevelopment ? {} : { 'ngrok-skip-browser-warning': 'true' }),
  },
})

export default axiosInstance
