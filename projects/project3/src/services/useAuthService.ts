// services/useAuthService.ts
// 인증 서비스 - MOCK_MODE일 때 목데이터, 아니면 백엔드 API 연동

import { MOCK_MODE } from '@/utils/mockData'
import { useMockAuthService } from './useMockAuthService'
import {
  postLogin as apiPostLogin,
  postRegister as apiPostRegister,
  postFindId as apiPostFindId,
  postResetPasswordEmail as apiPostResetPasswordEmail,
  putResetPassword as apiPutResetPassword,
  deleteLogout as apiDeleteLogout,
  postCheckEmail as apiPostCheckEmail,
  postCheckLoginId as apiPostCheckLoginId
} from '@/api/auth'
import type {
  RegisterRequest,
  LoginRequest,
  ResetPasswordEmailRequest,
  ResetPasswordPayload,
  FindIdRequest,
} from '@/types/auth'

export const useAuthService = () => {
  if (MOCK_MODE) {
    return useMockAuthService()
  }
  // 회원가입
  const signup = (payload: RegisterRequest) => apiPostRegister(payload)

  // 로그인
  const login = async (payload: LoginRequest) => {
    try {
      const response = await apiPostLogin(payload.loginId, payload.password)

      // 응답 데이터 구조 확인 및 토큰 추출
      const { accessToken, user } = response.data

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
      } else {
        console.warn('⚠️ 응답에서 accessToken을 찾을 수 없음:', response.data)
      }

      return response
    } catch (error: any) {
      console.error('❌ 로그인 실패:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      })
      throw error
    }
  }

  // 아이디(이메일) 찾기
  const findEmail = (payload: FindIdRequest) => apiPostFindId(payload)

  // 임시 비밀번호 이메일 전송
  const requestResetEmail = (p: ResetPasswordEmailRequest) => apiPostResetPasswordEmail(p)
  // 새 비밀번호 설정 (임시 비밀번호 인증 후)
  const resetPassword = (p: ResetPasswordPayload) => apiPutResetPassword(p)

  // 로그아웃
  const logout = () => apiDeleteLogout()



  // 이메일 중복확인
  const checkEmail = (email: string) => apiPostCheckEmail(email)

  // 아이디 중복확인
  const checkLoginId = (loginId: string) => apiPostCheckLoginId(loginId)

  return {
    signup,
    login,
    findEmail,
    requestResetEmail,
    resetPassword,
    logout,
    checkEmail,
    checkLoginId,
  }
}
