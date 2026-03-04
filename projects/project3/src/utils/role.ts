// src/utils/role.ts
import { axiosInstance } from '@/utils/axios'

export type Role = 'leader' | 'mate'

/** 1순위: 서버에서 내 역할 조회 (엔드포인트만 실제에 맞게 교체) */
export async function fetchMyRoleFromServer(groupId: string): Promise<Role | null> {
  try {
    // 예시: GET /studies/{groupId}/me → { isLeader: boolean }
    const { data } = await axiosInstance.get(`/studies/${groupId}/me`)
    if (typeof data?.isLeader === 'boolean') {
      return data.isLeader ? 'leader' : 'mate'
    }
    return null
  } catch {
    return null
  }
}

/** 2순위: 프론트 스토어로 추론(옵션) */
export function inferRoleFromStore(groupId: string): Role | null {
  try {
    // Pinia 예시:
    // const study = useStudyStore().byGroupId(groupId)
    // const me = useAuthStore().me
    // if (study && me) return study.leaderId === me.id ? 'leader' : 'mate'
    return null
  } catch {
    return null
  }
}

/** 최종: 서버 → 스토어 → 기본값('mate') */
export async function getMyRole(groupId: string): Promise<Role> {
  return (
    (await fetchMyRoleFromServer(groupId)) ??
    inferRoleFromStore(groupId) ??
    'mate'
  )
}
