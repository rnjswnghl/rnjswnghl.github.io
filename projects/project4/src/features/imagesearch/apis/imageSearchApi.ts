// Note: apiInstance, fastApi 미사용. 필요 시 확장 대비 보존 가능
import runpodApi from '@/common/core/apiRunpodInstance'

export type ImageSearchItem = {
  id: string
  name: string
  brand: string
  price: number
  thumbnail: string
}

export type ImageSearchResponse = {
  upper: ImageSearchItem[]
  lower: ImageSearchItem[]
}

// 업로드 소스 타입: 파일 또는 URL(DataURL/HTTP)
export type ImageUploadSource = { file: File }

// 이미지 검색 API 호출: 업로드 소스에 따라 멀티파트 또는 JSON 전송
export const postImageSearch = async (
  source: ImageUploadSource,
): Promise<ImageSearchResponse> => {
  if ('file' in source) {
    const form = new FormData()
    // 서버 스펙에 맞춰 필드명을 'file'로 전송
    form.append('file', source.file)
    const { data } = await runpodApi.post<ImageSearchResponse>(
      '/products/image-search',
      form,
      {
        timeout: 10000,
      },
    )
    return data
  }

  // 브라우저 CORS 제약으로 외부 이미지 fetch 불가 → 서버에 URL을 전달하여 서버 측에서 다운로드하도록 요청
  // URL 업로드는 지원하지 않음
  throw new Error('Only file upload is supported')
}
