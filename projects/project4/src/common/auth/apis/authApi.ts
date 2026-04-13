import apiInstance from '@/common/core/apiInstance'

/**
 * 포트폴리오/데모 환경: OAuth 없이 즉시 로그인 처리합니다.
 * (백엔드 도메인 접근 불가/불필요)
 */
export const startGoogleLogin = () => {
  void import('@/common/auth/stores/authStore').then(({ useAuthStore }) => {
    useAuthStore.getState().login('demo-token', 'demo', {
      memberId: 1,
      memberEmail: 'demo@onwear.local',
      memberName: '데모 사용자',
    })
  })
}

/**
 * 리다이렉트 URL에서 인증 정보를 파싱합니다.
 * @param url - 리다이렉트된 URL
 * @returns 파싱 성공 여부
 */
export const parseAuthFromRedirect = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    const params = new URLSearchParams(urlObj.search)

    const grantType = params.get('grantType')
    const accessToken = params.get('accessToken')
    const memberId = params.get('memberId')
    const memberEmail = params.get('memberEmail')
    const memberName = params.get('memberName')

    if (grantType && accessToken && memberId && memberEmail && memberName) {
      return true
    }
    return false
  } catch (error) {
    console.error('리다이렉트 URL 파싱 오류:', error)
    return false
  }
}

interface ApiResponse {
  success?: boolean
  code: number
  message: string
  data?: unknown
}

/**
 * 백엔드 로그아웃 API를 호출합니다.
 * @param accessToken - JWT 액세스 토큰
 * @returns Promise<boolean> - 로그아웃 성공 여부
 */
export const logoutApi = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await apiInstance.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const data: ApiResponse = response.data

    if (data.success) {
      return true
    } else {
      console.error('로그아웃 API 오류:', data.message)
      return false
    }
  } catch (error) {
    console.error('로그아웃 API 호출 실패:', error)
    return false
  }
}

/**
 * 로그아웃을 처리합니다.
 * 백엔드 API 호출 후 클라이언트 상태도 정리합니다.
 */
export const logout = async () => {
  console.log('로그아웃 처리')
}
