/**
 * JWT 토큰 디코딩 유틸리티
 */

export interface JwtPayload {
  sub: string
  name: string
  given_name?: string
  family_name?: string
  email: string
  picture?: string
  iat?: number
  exp?: number
}

/**
 * JWT 토큰을 디코딩하여 사용자 정보 추출
 * @param idToken JWT 토큰
 * @returns 디코딩된 사용자 정보
 */
export function decodeJwtResponse(idToken: string): JwtPayload | null {
  try {
    // JWT 토큰을 '.'으로 나누어 payload 부분 추출
    const base64Url = idToken.split('.')[1]
    if (!base64Url) {
      return null
    }

    // URL-safe Base64 형식에서 표준 Base64 형식으로 변환
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    // Base64 디코딩 및 UTF-8 변환
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )

    const payload = JSON.parse(jsonPayload)
    return payload
  } catch {
    return null
  }
}

/**
 * JWT 토큰에서 사용자 정보 추출 (간단한 버전)
 * @param accessToken 액세스 토큰
 * @returns 사용자 정보
 */
export function extractUserInfoFromToken(accessToken: string): {
  email: string
  name: string
  id: string
} | null {
  const payload = decodeJwtResponse(accessToken)

  if (!payload) {
    return null
  }

  // sub 필드가 이메일인 경우 (Google OAuth)
  const email = payload.email || payload.sub || ''
  const name =
    payload.name || payload.given_name || (email ? email.split('@')[0] : 'User')

  return {
    email: email,
    name: name,
    id: payload.sub || '',
  }
}
