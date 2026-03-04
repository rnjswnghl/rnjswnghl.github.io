import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/auth'
import { validateLogin, getUserProfile, registerUser, getRegisteredUsers } from '@/utils/mockData'

export const useMockAuthService = () => {
  const login = async (payload: LoginRequest): Promise<{ data: LoginResponse }> => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = validateLogin(payload.loginId, payload.password)
    if (!user) {
      throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
    }

    const userProfile = getUserProfile(payload.loginId)
    if (!userProfile) {
      throw new Error('사용자 프로필을 찾을 수 없습니다.')
    }

    // 데모용 고정 토큰 (JWT 디코드 시 오류 방지)
    const accessToken = `mock_token_1234567890`

    return {
      data: {
        accessToken,
        user: userProfile
      }
    }
  }

  const signup = async (payload: RegisterRequest) => {
    await new Promise(resolve => setTimeout(resolve, 800))

    // mockData의 registerUser 함수에 맞는 형태로 변환
    const mockPayload = {
      loginId: payload.loginId,
      password: payload.password,
      name: payload.name,
      email: payload.email,
      gender: payload.gender as 'M' | 'F' | 'Other',
      preferredTime: 1, // 기본값
      studyLevel: '초급', // 기본값
      interest: payload.interests?.map(i => i.field) || ['IT'] // 전달받은 관심분야 배열 또는 기본값
    }

    const success = registerUser(mockPayload)
    if (!success) {
      throw new Error('회원가입에 실패했습니다.')
    }

    return { data: { message: '회원가입이 완료되었습니다.' } }
  }

  const findEmail = async (payload: { email: string; name: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    const users = getRegisteredUsers()
    const user = users.find(u => u.email === payload.email && u.nickname === payload.name)

    if (!user) {
      throw new Error('해당 정보로 가입된 사용자를 찾을 수 없습니다.')
    }

    return { data: { loginId: user.loginId } }
  }

  const requestResetEmail = async (payload: { email: string }) => {
    await new Promise(resolve => setTimeout(resolve, 400))

    const users = getRegisteredUsers()
    const user = users.find(u => u.email === payload.email)

    if (!user) {
      throw new Error('해당 이메일로 가입된 사용자를 찾을 수 없습니다.')
    }

    return { data: { message: '임시 비밀번호가 이메일로 전송되었습니다.' } }
  }

  const resetPassword = async (_payload: { tempPassword: string; newPassword: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    return { data: { message: '비밀번호가 성공적으로 변경되었습니다.' } }
  }

  const logout = async () => {
    await new Promise(resolve => setTimeout(resolve, 200))

    return { data: { message: '로그아웃되었습니다.' } }
  }



  // 이메일 중복확인
  const checkEmail = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    const users = getRegisteredUsers()
    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
      throw new Error('이미 사용 중인 이메일입니다.')
    }

    return { data: { message: '사용 가능한 이메일입니다.' } }
  }

  // 아이디 중복확인
  const checkLoginId = async (loginId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    const users = getRegisteredUsers()
    const existingUser = users.find(u => u.loginId === loginId)

    if (existingUser) {
      throw new Error('이미 사용 중인 아이디입니다.')
    }

    return { data: { message: '사용 가능한 아이디입니다.' } }
  }

  return {
    login,
    signup,
    findEmail,
    requestResetEmail,
    resetPassword,
    logout,
    checkEmail,
    checkLoginId,
  }
}
