// src/api/openviduTestHelper.ts
import { postLogin } from '@/api/auth'
import { createSession, joinSession } from '@/api/openvidu'

// ==== 설정(테스트 편의용) ====
const PASSWORD = 'Password!23'
const ACCESS_TOKEN_KEY = 'accessToken'

// 스펙에 맞춘 그룹장 / 회원 매핑 (테스트용 하드코딩)
const GROUP_LEADERS: Record<number, string> = {
  1: 'hong123',   // users.id=3
  2: 'hong1213',  // users.id=5
  3: 'test',      // users.id=6
}

const GROUP_MEMBERS: Record<number, string[]> = {
  1: ['hong1213', 'hong111123'], // users.id=5,9
  2: ['test', 'test123'],        // users.id=6,22
  3: ['hong123', 'hong11213'],   // users.id=3,7
}

// ==== 공통 유틸 ====
// ✅ 로그인 응답에서 토큰 키 우선순위: data.accessToken → accessToken → data.token → token
function extractJwtToken(resp: any): string {
  return (
    resp?.data?.accessToken ??
    resp?.accessToken ??
    resp?.data?.token ??
    resp?.token ??
    ''
  )
}

export function saveToken(token: string) {
  if (!token) throw new Error('토큰이 비어 있습니다.')
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function getSavedToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export async function loginAndSaveToken(loginId: string, password: string = PASSWORD) {
  const { data } = await postLogin(loginId, password)
  // 디버깅 원하면 아래 주석 해제
  // console.log('[DEBUG]/auth/login response:', data)

  let token = extractJwtToken({ data })
  // 혹시 인터셉터가 이미 저장했으면 그 값으로 보완
  if (!token) token = getSavedToken() || ''

  saveToken(token)
  return token
}

// ==== 시나리오 헬퍼 ====

// 1) 그룹장으로 로그인 → 세션 생성
export async function leaderLoginAndCreateSession(groupId: number) {
  const leaderLoginId = GROUP_LEADERS[groupId]
  if (!leaderLoginId) throw new Error(`groupId=${groupId}의 그룹장 계정 매핑이 없습니다.`)

  await loginAndSaveToken(leaderLoginId, PASSWORD)
  const res = await createSession(String(groupId))
  return res.data // 보통 { status:'SUCCESS', data:{ sessionId: ... } }
}

// 2) 회원으로 로그인 → 입장 토큰 발급
export async function memberLoginAndGetJoinToken(groupId: number, memberLoginId?: string) {
  const candidates = GROUP_MEMBERS[groupId]
  if (!candidates || candidates.length === 0) {
    throw new Error(`groupId=${groupId}의 회원 계정 매핑이 없습니다.`)
  }
  const loginId = memberLoginId ?? candidates[0]

  await loginAndSaveToken(loginId, PASSWORD)

  // joinSession은 바디 JSON 사용
  const res = await joinSession(String(groupId), { role: 'PUBLISHER', data: '' })

  // 보통 여기서는 OpenVidu 접속 토큰이 data.token로 옴 (백엔드에 따라 조정)
  const token =
    res.data?.token ??
    res.data?.data?.token ??
    ''

  if (!token) {
    console.warn('입장 토큰을 응답에서 찾지 못했습니다. 응답 형태를 확인하세요:', res.data)
  }

  return { raw: res.data, token }
}

// 3) 원스텝 테스트
export async function quickTestFlow(groupId: number) {
  const createResp = await leaderLoginAndCreateSession(groupId)
  const joinResp = await memberLoginAndGetJoinToken(groupId)
  return { createResp, joinResp }
}
