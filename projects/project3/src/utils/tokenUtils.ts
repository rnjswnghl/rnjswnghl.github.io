// JWT 토큰 관련 유틸리티 함수들

export interface TokenInfo {
  exp: number
  iat: number
  sub: string
  [key: string]: any
}

/**
 * JWT 토큰을 디코드하여 페이로드를 추출합니다.
 * Mock 토큰 등 JWT 형식이 아닌 경우 null 반환.
 * @param token JWT 토큰 문자열
 * @returns 토큰 페이로드 객체
 */
export function decodeJwtToken(token: string | null | undefined): TokenInfo | null {
  if (!token || typeof token !== 'string') return null
  // Mock 토큰 (mock_token_xxx) 또는 JWT 형식이 아닌 경우 null 반환
  if (token.startsWith('mock_token_') || token.startsWith('mock-jwt-')) return null
  // JWT 형식: header.payload.signature (점 2개 포함)
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const base64Url = parts[1]
    if (!base64Url || typeof base64Url !== 'string') return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

/**
 * Mock 토큰인 경우 가짜 만료 시간 반환 (데모용 - 24시간 후)
 */
export function getMockTokenExpiration(): Date {
  return new Date(Date.now() + 24 * 60 * 60 * 1000)
}

/**
 * 토큰의 만료 시간을 가져옵니다.
 * Mock 토큰인 경우 24시간 후로 고정 반환 (데모용).
 * @param token JWT 토큰 문자열
 * @returns 만료 시간 (Date 객체) 또는 null
 */
export function getTokenExpiration(token: string | null | undefined): Date | null {
  if (!token || typeof token !== 'string') return null
  // Mock 토큰: 고정 만료 시간 (24시간 후)
  if (token.startsWith('mock_token_') || token.startsWith('mock-jwt-')) {
    return getMockTokenExpiration()
  }
  const payload = decodeJwtToken(token)
  if (!payload || !payload.exp) {
    return null
  }
  // exp는 Unix timestamp (초 단위)
  return new Date(payload.exp * 1000)
}

/**
 * 토큰 만료까지 남은 시간을 계산합니다.
 * @param token JWT 토큰 문자열
 * @returns 남은 시간 (밀리초) 또는 null
 */
export function getTimeUntilExpiration(token: string | null | undefined): number | null {
  const expiration = getTokenExpiration(token)
  if (!expiration) {
    return null
  }

  const now = new Date()
  const timeLeft = expiration.getTime() - now.getTime()

  return timeLeft > 0 ? timeLeft : 0
}

/**
 * 토큰이 만료되었는지 확인합니다.
 * @param token JWT 토큰 문자열
 * @returns 만료 여부
 */
export function isTokenExpired(token: string | null | undefined): boolean {
  const timeLeft = getTimeUntilExpiration(token)
  return timeLeft === null || timeLeft <= 0
}

/**
 * 남은 시간을 사람이 읽기 쉬운 형태로 포맷합니다.
 * @param milliseconds 남은 시간 (밀리초)
 * @returns 포맷된 문자열
 */
export function formatTimeRemaining(milliseconds: number): string {
  if (milliseconds <= 0) {
    return '만료됨'
  }

  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}일 ${hours % 24}시간`
  } else if (hours > 0) {
    return `${hours}시간 ${minutes % 60}분`
  } else if (minutes > 0) {
    return `${minutes}분 ${seconds % 60}초`
  } else {
    return `${seconds}초`
  }
}

/**
 * 토큰 만료 경고 레벨을 반환합니다.
 * @param milliseconds 남은 시간 (밀리초)
 * @returns 경고 레벨 ('normal', 'warning', 'danger')
 */
export function getExpirationWarningLevel(milliseconds: number): 'normal' | 'warning' | 'danger' {
  if (milliseconds <= 0) {
    return 'danger'
  }

  const minutes = Math.floor(milliseconds / (1000 * 60))

  if (minutes <= 5) {
    return 'danger'
  } else if (minutes <= 30) {
    return 'warning'
  } else {
    return 'normal'
  }
}
