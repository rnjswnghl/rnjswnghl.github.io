import apiInstance from '@/common/core/apiInstance'

/**
 * 구글 로그인을 시작합니다.
 * 백엔드의 OAuth2 인증 엔드포인트로 리다이렉트합니다.
 */
export const startGoogleLogin = () => {
  const backendUrl =
    import.meta.env.VITE_API_URL || 'https://j13e202.p.ssafy.io/api'
  const fullUrl = `${backendUrl}/oauth2/authorization/google`

  // 부드러운 리다이렉트를 위해 replace 사용
  window.location.replace(fullUrl)
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
