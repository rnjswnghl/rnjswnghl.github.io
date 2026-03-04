import { axiosInstance } from '@/utils/axios'
import type { RegisterRequest } from '@/types/auth'

// 로그인
export const postLogin = (loginId: string, password: string) => {
  return axiosInstance.post('/auth/login', { loginId, password })
}

// 회원가입
export const postRegister = (data: RegisterRequest) => {
  return axiosInstance.post('/auth/regist', data)
}

// 아이디 찾기
export const postFindId = (data: {
  name: string
  email: string
}) => {
  return axiosInstance.post('/auth/findId', data)
}

// 임시 비밀번호 발송
export const postResetPasswordEmail = (data: { email: string }) => {
  return axiosInstance.post('/auth/reset-password-email', data)
}

// 비밀번호 변경
export const putResetPassword = (data: { tempPassword: string; newPassword: string }) => {
  return axiosInstance.put('/auth/reset-password', data)
}

// 로그아웃
export const deleteLogout = () => {
  return axiosInstance.delete('/auth/logout')
}

// 이메일 중복확인
export const postCheckEmail = (email: string) => {
  return axiosInstance.get(`/user/check-email?email=${email}`)
}

// 아이디 중복확인
export const postCheckLoginId = (loginId: string) => {
  return axiosInstance.get(`/user/check-id?loginId=${loginId}`)
}
