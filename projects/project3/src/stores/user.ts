// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/utils/axios'
import type { UserProfile } from '@/types/user'
import { MOCK_MODE } from '@/utils/mockData'
import { getUserProfile } from '@/utils/mockData'

export interface NotifySettings {
  web: boolean
  email: boolean
}

export interface Study {
  id: number
  name: string
  role: 'leader' | 'member'
}

export interface UserDetail {
  id?: number
  image?: string
  nickname: string
  username: string
  phone: string
  email: string
  interests: string[]
  studies: Study[]
  timeSlot: string
  studyAmount: number
  notify: NotifySettings
}

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile | null>(null)
  const token = ref<string | null>(null)
  const user = ref<UserDetail | null>(null)

  const isLoggedIn = computed(() => !!token.value)

  function setUser(data: UserProfile) {
    // profile_img 경로 정규화 (데모/iframe 환경에서 /src/assets/ 404 오류 방지)
    let profileImg = data?.profile_img
    if (profileImg && profileImg.includes('/src/assets/')) {
      const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/'
      const imgBase = base.endsWith('/') ? base + 'images/' : base + '/images/'
      profileImg = imgBase + (profileImg.includes('logo') ? 'logo.jpg' : 'meeting.png')
      profile.value = { ...data, profile_img: profileImg }
    } else {
      profile.value = data
    }
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  // 초기화 함수 - 로컬 스토리지에서 데이터 복원
  function initializeFromStorage() {
    const storedToken = localStorage.getItem('accessToken')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        token.value = storedToken
        profile.value = userData
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      }
    }
  }

  function logout() {
    profile.value = null
    token.value   = null
    user.value    = null

    // 로컬 스토리지 정리
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  }

  // --- 상세 정보 액션 ---
  async function fetchUser() {
    if (MOCK_MODE) {
      const loginId = localStorage.getItem('loginId')
      if (!loginId) return
      const mockUser = getUserProfile(loginId)
      if (!mockUser) return
      user.value = {
        nickname: mockUser.nickname,
        username: mockUser.login_id,
        phone: '',
        email: mockUser.email ?? '',
        interests: mockUser.interests ?? [],
        studies: (mockUser.studies ?? []).map((s: { study_id: number; study_name: string; role: string }) => ({
          id: s.study_id,
          name: s.study_name,
          role: s.role.toLowerCase() as 'leader' | 'member',
        })),
        timeSlot: String(mockUser.time_id ?? '미설정'),
        studyAmount: 0,
        notify: { web: true, email: true },
      }
      return
    }
    try {
      const { data } = await axios.get('/user/me')
      const backendData = data.data

      const mapped: UserDetail = {
        id: backendData.id,
        image: backendData.profileImg,
        nickname: backendData.nickname,
        username: backendData.nickname ?? backendData.username ?? '',
        phone: '', // 서버에서 제공하지 않음
        email: backendData.email ?? '',
        interests: backendData.interests ?? [],
        studies: (backendData.studies ?? []).map((study: any) => ({
          id: study.groupId ?? study.id,
          name: study.studyName ?? study.name,
          role: String(study.role ?? '').toLowerCase() as 'leader' | 'member',
        })),
        timeSlot:
          Array.isArray(backendData.preferredTimes) && backendData.preferredTimes.length > 0
            ? backendData.preferredTimes.join(', ')
            : (backendData.timeId != null ? String(backendData.timeId) : '미설정'),
        studyAmount: backendData.studyTime ?? 0,
        notify: {
          web: !!backendData.webNotify,
          email: !!backendData.emailNotify,
        },
      }

      user.value = mapped
    } catch {
      // 유저 정보 불러오기 실패
    }
  }

  // --- 비밀번호 재설정 액션 ---
  async function updatePassword(newPassword: string) {
    try {
      // 실제 백엔드 엔드포인트에 맞춰 경로를 조정하세요
      const res = await axios.patch('/user/password', { password: newPassword })
      return res.data
    } catch (err) {
      throw err
    }
  }

  async function updateUser(updateData: Partial<UserDetail>) {
    try {
      const response = await axios.patch('/user/update', updateData)

      // 업데이트된 정보로 로컬 상태 갱신
      if (response.data.data) {
        const updatedUser = response.data.data
        user.value = {
          ...user.value,
          ...updatedUser
        }
      }
      
      return response.data
    } catch (err) {
      throw err
    }
  }

  async function withdraw() {
    try {
      await axios.delete('/user/delete')

      // 로컬 스토리지 정리
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')

      // 스토어 초기화
      logout()
    } catch (err) {
      throw err
    }
  }

  return {
    profile,
    token,
    user,
    fetchUser,
    setToken,
    setUser,
    logout,
    updatePassword,
    updateUser,
    withdraw,
    initializeFromStorage,
    isLoggedIn,
  }
})

/* 
// 기존 목데이터 기반 로직 (주석 처리됨)
import { MOCK_USERS } from '@/utils/mockData'
function fetchMockUser(loginId: string) {
  const mockUser = MOCK_USERS.find(u => u.loginId === loginId)
  if (mockUser) {
    user.value = {
      nickname: mockUser.user.nickname,
      username: mockUser.user.login_id,
      phone: '',
      email: mockUser.user.email,
      interests: [mockUser.user.interest_id],
      studies: mockUser.user.studies.map(s => ({
        id: s.study_id,
        name: s.study_name,
        role: s.role,
      })),
      timeSlot: String(mockUser.user.time_id),
      studyAmount: 0,
      notify: { web: true, email: true }
    }
  }
}
*/
