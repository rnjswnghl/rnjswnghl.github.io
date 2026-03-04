// src/api/gpt.ts
import { axiosInstance } from '@/utils/axios'

/** GPT 요약/퀴즈 생성: 단일 파일 업로드 */
export async function summarizeWithGPT(roomId: string, file: File) {
  const fd = new FormData()
  fd.append('file', file) // ← 반드시 'file' 키

  const token = localStorage.getItem('accessToken') || ''
  const { data } = await axiosInstance.post(`/gpt/summarize/${roomId}`, fd, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
