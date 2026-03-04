// types/user.ts

export interface UserProfile {
  profile_img?: string
  nickname: string
  login_id: string
  email: string
  gender: string
  time_id: number
  interest_id: string
  interests?: string[]
  studies?: Array<{
    study_id: number
    study_name: string
    role?: 'leader' | 'member'
  }>
}

export interface UserUpdateRequest {
  nickname?: string
  phone?: string
  age?: number
  gender?: 'M' | 'F' | 'Other'
  interest?: string
  timeId?: number // 선호시간대 ID (1: 오전, 2: 오후, 3: 저녁, 4: 새벽)
  studyLevel?: string
}

export interface PasswordChangeRequest {
  currentPassword: string
  newPassword: string
}
