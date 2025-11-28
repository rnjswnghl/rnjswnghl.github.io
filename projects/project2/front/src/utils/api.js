import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Django 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // 세션 기반 인증일 경우 사용. (JWT 기반이므로 주석 유지)
})

// 요청 인터셉터: localStorage에서 accessToken을 가져와 Authorization 헤더에 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') // 로그인 시 저장된 토큰
    config.headers = config.headers || {}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }

    console.log('API 요청:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
    })

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => {
    console.log('API 응답:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    })
    return response
  },
  (error) => {
    console.error('API 에러:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    })
    return Promise.reject(error)
  }
)

// 📚 Books
export const fetchBooks = () => api.get('books/')
export const fetchBookDetail = (bookId) => api.get(`books/${bookId}/`)

// 🧵 Threads
export const fetchThreads = (params = {}) => api.get('threads/posts/', { params })
export const fetchThreadDetail = (postId) => api.get(`threads/posts/${postId}/`)
export const createThread = (data) => api.post('threads/posts/', data)

// 💬 Comments
export const fetchComments = (postId) => api.get(`threads/posts/${postId}/comments/`)
export const createComment = (postId, commentData) => api.post(`threads/posts/${postId}/comments/`, commentData)

// 👍 좋아요 (Toggle Like)
export const likeThread = (postId) => api.post(`threads/posts/${postId}/toggle-like/`)

// 🎯 추천
export const getRecommendations = () => api.get('recommendations/')

// 👤 사용자 프로필
export const getUserProfile = () => api.get('accounts/profile/')

// 📝 회원가입 & 로그인
export const signupUser = (signupData) => api.post('accounts/signup/', signupData)
export const loginApi = (loginData) => api.post('accounts/login/', loginData)

// 📚 카테고리
export const fetchCategories = () => api.get('books/categories/')

// 👤 현재 로그인한 사용자 정보
export const getCurrentUser = () => api.get('accounts/current/')

// 댓글 삭제
export const deleteComment = (postId, commentId) =>
  api.delete(`threads/posts/${postId}/comments/${commentId}/`)

export const fetchAuthorInfo = (authorName) =>
  api.get('books/author-info/', { params: { name: authorName } })

// 📖 Guestbook - 이모지 방문록
export const fetchGuestbook = (userId) => api.get(`guestbook/${userId}/`)
export const postGuestbook = (userId, emoji) => api.post(`guestbook/${userId}/`, { emoji })
export const deleteGuestbook = (entryId) => api.delete(`guestbook/entry/${entryId}/`)

export default api
