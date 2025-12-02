// stores/user.js

import { defineStore } from 'pinia'
import axios from 'axios'
import { loginApi, getUserProfile } from '@/utils/api'
import api from '@/utils/api'
import { safeStorage } from '@/utils/storage'

export const useUserStore = defineStore('user', {
  state: () => {
    // iframe에서 localStorage 접근 시도 (에러 처리)
    const accessToken = safeStorage.getItem('accessToken')
    const refreshToken = safeStorage.getItem('refreshToken')
    return {
      accessToken,
      refreshToken,
      userProfile: null,
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  actions: {
    setTokens(access, refresh) {
      this.accessToken = access
      this.refreshToken = refresh
      safeStorage.setItem('accessToken', access)
      safeStorage.setItem('refreshToken', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`
    },

    async login(credentials) {
      // 백엔드 없이 목데이터만 사용
      const { username, password } = credentials
      
      // 목데이터 - 사용자 계정
      const mockUsers = {
        'testuser': { password: 'test1234', id: 1, username: 'testuser', email: 'test@example.com', bio: '테스트 사용자입니다.' }
      }
      
      const user = mockUsers[username]
      if (user && user.password === password) {
        // 목데이터 토큰 생성 (실제로는 의미 없지만 구조 유지)
        const mockToken = `mock_token_${Date.now()}_${username}`
        this.setTokens(mockToken, `mock_refresh_${Date.now()}`)
        await this.fetchUserProfile()
        return true
      } else {
        throw new Error('Invalid credentials')
      }
    },

    async fetchUserProfile() {
      // 백엔드 없이 목데이터만 사용
      const token = safeStorage.getItem('accessToken')
      if (!token) {
        this.userProfile = null
        return
      }
      
      // 토큰에서 username 추출 (mock_token_1234567890_testuser 형식)
      const usernameMatch = token.match(/mock_token_\d+_(.+)/)
      const username = usernameMatch ? usernameMatch[1] : 'testuser'
      
      // 목데이터 - 사용자 프로필
      const mockProfiles = {
        'testuser': {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          bio: '테스트 사용자입니다. 독서를 좋아합니다.',
          photo_url: '',
          followers_count: 5,
          following_count: 3
        }
      }
      
      this.userProfile = mockProfiles[username] || mockProfiles['testuser']
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.userProfile = null
      safeStorage.removeItem('accessToken')
      safeStorage.removeItem('refreshToken')
      delete axios.defaults.headers.common['Authorization']
      delete api.defaults.headers.common['Authorization']
    },
  },
})

