// services/useUserService.ts
// 사용자 서비스 - 백엔드 API 연동

import { ref } from 'vue'
import {
  getMyProfile,
  updateMyProfile,
  updateGoal,
  updateDday,
  checkNickname,
  checkEmail,
  deleteUser,
  getStudyStatus,
  getActivityLog,
} from '@/api/user'

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

export const useUserService = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  console.log('🌐 사용자 서비스: 백엔드 API 연동 모드로 실행 중')

  const fetchMyProfile = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await getMyProfile()
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '프로필 조회에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (data: {
    profileImg?: string
    nickname?: string
    email?: string
    studyTime?: number
    webNotify?: boolean
    emailNotify?: boolean
    interests?: Array<{ field: string }>
    timeId?: number
  }) => {
    loading.value = true
    error.value = null
    try {
      const response = await updateMyProfile(data)
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '프로필 수정에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUserGoal = async (goal: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await updateGoal({ goal })
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '목표 설정에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUserDday = async (d_day: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await updateDday({ d_day })
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || 'D-day 설정에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const checkNicknameDuplicate = async (nickname: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await checkNickname(nickname)
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '닉네임 중복 확인에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const checkEmailDuplicate = async (email: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await checkEmail(email)
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '이메일 중복 확인에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAccount = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await deleteUser()
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '회원 탈퇴에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStudyStatus = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await getStudyStatus()
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '스터디 현황 조회에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchActivityLog = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await getActivityLog()
      return response.data
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.response?.data?.message || '활동 로그 조회에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchMyProfile,
    updateProfile,
    updateUserGoal,
    updateUserDday,
    checkNicknameDuplicate,
    checkEmailDuplicate,
    deleteAccount,
    fetchStudyStatus,
    fetchActivityLog,
  }
}
