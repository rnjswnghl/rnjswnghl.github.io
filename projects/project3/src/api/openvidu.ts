// src/api/openvidu.ts
import { axiosInstance } from '@/utils/axios'

/** 세션 생성 (방장만 호출) */
export const createSession = (groupId: string) =>
  axiosInstance.post(`/openvidu/sessions/${groupId}`)

/** 세션 입장(토큰 발급) — 쿼리스트링 X, 바디 JSON O */
export const joinSession = (
  groupId: string,
  opts?: { role?: 'PUBLISHER' | 'SUBSCRIBER'; data?: string; isLeader?: boolean }
) => {
  const role = opts?.role ?? 'PUBLISHER'
  const payload = {
    role,
    data: opts?.data ?? '',
    isLeader: !!opts?.isLeader, // ← 백엔드에서 이 값 보고 분기
  }
  return axiosInstance.post(`/openvidu/connections/${groupId}`, payload)
}

/** (필요 시) 기타 API */
export const getSessions = () => axiosInstance.get('/openvidu/sessions')
export const deleteSession = (sessionId: string) =>
  axiosInstance.delete(`/openvidu/sessions/${sessionId}`)
export const getConnections = (sessionId: string) =>
  axiosInstance.get(`/openvidu/connections/${sessionId}`)
export const getConnection = (sessionId: string, connectionId: string) =>
  axiosInstance.get(`/openvidu/connections/${sessionId}/${connectionId}`)
export const deleteConnection = (sessionId: string, connectionId: string) =>
  axiosInstance.delete(`/openvidu/connections/${sessionId}/${connectionId}`)

/** 구버전 금지 */
export async function requestToken(_sessionId: string) {
  console.warn('requestToken은 더 이상 사용되지 않습니다. joinSession을 사용하세요.')
  throw new Error('requestToken은 더 이상 사용되지 않습니다. joinSession을 사용하세요.')
}
