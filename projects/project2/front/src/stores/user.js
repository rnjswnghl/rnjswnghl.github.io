// stores/user.js

import { defineStore } from 'pinia'
import axios from 'axios'
import { loginApi, getUserProfile } from '@/utils/api'
import api from '@/utils/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    userProfile: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  actions: {
    setTokens(access, refresh) {
      this.accessToken = access
      this.refreshToken = refresh
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`
    },

    async login(credentials) {
      try {
        const response = await loginApi(credentials)
        const { access, refresh } = response.data
        this.setTokens(access, refresh)
        await this.fetchUserProfile()
        return true
      } catch (error) {
        throw error
      }
    },

    async fetchUserProfile() {
      try {
        const response = await getUserProfile()
        this.userProfile = response.data
      } catch (error) {
        console.error('Failed to load user profile:', error)
        this.userProfile = null
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.userProfile = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      delete axios.defaults.headers.common['Authorization']
      delete api.defaults.headers.common['Authorization']
    },
  },
})

