// src/api/files.ts
import { axiosInstance } from '@/utils/axios'
import { MOCK_MODE } from '@/utils/mockData'
import type { AxiosProgressEvent } from 'axios'

/**
 * 업로드 공통 설정
 * - 허용 확장자/타입
 * - MOCK_MODE: mockData.ts에서 전역 설정
 */
const ACCEPT_EXT = new Set(['pdf', 'txt'])
const ACCEPT_MIME = new Set(['application/pdf', 'text/plain'])

/**
 * 파일 검증: pdf/txt만 허용
 * - 허용되지 않는 파일이 있으면 에러 throw
 * - 호출부에서 try/catch로 잡아 UI에 메시지 보여주면 됨
 */
function assertAllowedFiles(files: File[]) {
  for (const f of files) {
    const ext = (f.name.split('.').pop() || '').toLowerCase()
    const mime = f.type
    const extOk = ACCEPT_EXT.has(ext)
    const mimeOk = !mime || ACCEPT_MIME.has(mime) // 일부 브라우저는 빈 타입일 수 있음
    if (!extOk || !mimeOk) {
      throw new Error('pdf 또는 txt 파일만 업로드할 수 있습니다.')
    }
  }
}

/**
 * (MOCK) 서버 없이 업로드 성공으로 가정
 */
async function mockUpload(groupOrRoomId: string, files: File[]) {
  await new Promise((r) => setTimeout(r, 600))
  return files.map((f) => ({
    ok: true,
    name: f.name,
    size: f.size,
    id: Math.random().toString(36).slice(2, 9),
    groupOrRoomId,
  }))
}

/**
 * studies API (여러 파일 한번에)
 * POST /studies/{groupId}/files
 * Form key: "files" (여러 개)
 *
 * 헤더:
 * - Authorization: Bearer {token}
 * - Content-Type은 FormData 사용 시 브라우저가 boundary 포함해 자동 세팅 → 명시 X
 */
export async function uploadStudyFiles(
  groupId: string,
  files: File[],
  onProgress?: (percent: number) => void
) {
  assertAllowedFiles(files)

  if (MOCK_MODE) {
    return mockUpload(groupId, files)
  }

  const form = new FormData()
  files.forEach((f) => form.append('files', f))

  const res = await axiosInstance.post(`/studies/${groupId}/files`, form, {
    // 진행률 콜백(optional)
    onUploadProgress: (e: AxiosProgressEvent) => {
      if (!onProgress) return
      const loaded = e.loaded ?? 0
      const total = e.total ?? 0
      const percent = total ? Math.round((loaded / total) * 100) : 0
      onProgress(percent)
    },
  })
  return res.data
}

/**
 * gpt/summarize API (서버 스펙: 단일 파일 param "file")
 * POST /gpt/summarize/{roomId}
 * Form key: "file" (단일)
 *
 * 여러 개 선택 시 순차 업로드 실행
 */
export async function uploadSummarizeFilesSequential(
  roomId: string,
  files: File[],
  onEachProgress?: (index: number, percent: number) => void
) {
  assertAllowedFiles(files)

  if (MOCK_MODE) {
    return mockUpload(roomId, files)
  }

  const results: any[] = []

  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    const form = new FormData()
    form.append('file', f)

    const res = await axiosInstance.post(`/gpt/summarize/${roomId}`, form, {
      onUploadProgress: (e: AxiosProgressEvent) => {
        if (!onEachProgress) return
        const loaded = e.loaded ?? 0
        const total = e.total ?? 0
        const percent = total ? Math.round((loaded / total) * 100) : 0
        onEachProgress(i, percent)
      },
    })
    results.push(res.data)
  }

  return results
}

/**
 * test-openvidu 페이지/방장 알림 모달에서 쓰기 좋은 통합 함수
 * - mode: "study"(여러개 한 번에) | "summarize"(단일 파라미터로 순차 업로드)
 * - identifier: groupId 또는 roomId를 동일 인자에 전달
 *
 * 예)
 *   await uploadFiles({ mode: 'study', identifier: groupId, files })
 *   await uploadFiles({ mode: 'summarize', identifier: roomId, files })
 */

// 오버로드 시그니처로 콜백 타입 안전하게 분기
export async function uploadFiles(params: {
  mode: 'study'
  identifier: string
  files: File[]
  onProgress?: (percent: number) => void
}): Promise<any>
export async function uploadFiles(params: {
  mode: 'summarize'
  identifier: string
  files: File[]
  onProgress?: (index: number, percent: number) => void
}): Promise<any>
export async function uploadFiles(params: {
  mode: 'study' | 'summarize'
  identifier: string
  files: File[]
  // 두 모드 중 하나에 맞춰 사용되므로 유니언으로 받되 내부에서 분기
  onProgress?: ((percent: number) => void) | ((index: number, percent: number) => void)
}) {
  const { mode, identifier, files, onProgress } = params

  if (mode === 'study') {
    return uploadStudyFiles(identifier, files, onProgress as (percent: number) => void)
  } else {
    return uploadSummarizeFilesSequential(
      identifier,
      files,
      onProgress as (index: number, percent: number) => void
    )
  }
}
