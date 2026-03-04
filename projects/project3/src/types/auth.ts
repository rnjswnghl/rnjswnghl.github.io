// types/auth.ts

// 로그인 요청
export interface LoginRequest {
  loginId: string
  password: string
}

// 로그인 응답
export interface LoginResponse {
  token: string
  user: {
    profile_img?: string
    nickname: string
    login_id: string
    email: string
    gender: string
    time_id: number
    interest_id: string
    studies?: Array<{
      study_id: number
      study_name: string
    }>
  }
}

// 회원가입 요청 (백엔드 API 명세에 맞게 수정)
export interface RegisterRequest {
  name: string
  loginId: string
  email: string
  password: string
  gender: string
  role: string
  birth?: string
  profileImg?: string
  goal?: string
  studyTime?: number
  webNotify?: boolean
  emailNotify?: boolean
  interests: Array<{ field: string }>
  dday?: string
}

// 아이디 찾기 요청
export interface FindIdRequest {
  name: string
  email: string
}

// 임시 비밀번호 이메일 요청
export interface ResetPasswordEmailRequest {
  email: string
}

// 비밀번호 재설정 요청
export interface ResetPasswordPayload {
  tempPassword: string
  newPassword: string
}

// 사용자 정보
export interface UserProfile {
  profile_img?: string
  nickname: string
  login_id: string
  email: string
  gender: string
  time_id: number
  interest_id: string
  studies?: Array<{
    study_id: number
    study_name: string
  }>
}

// 사용자 정보 수정 요청
export interface UpdateUserRequest {
  profileImg?: string
  nickname?: string
  email?: string
  studyTime?: number
  webNotify?: boolean
  emailNotify?: boolean
  interests?: Array<{ field: string }>
  timeId?: number // 선호시간대 ID (1: 오전, 2: 오후, 3: 저녁, 4: 새벽)
}
