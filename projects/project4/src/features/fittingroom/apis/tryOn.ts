import apiInstance from '@/common/core/apiInstance'

// 시착하기 API 요청 타입
export interface TryOnRequest {
  mannequinId: number
  upperId?: string
  lowerId?: string
}

// 시착하기 API 응답 타입 (실제 API 구조에 맞게 수정)
export interface TryOnResponse {
  UnionImageUrl: string
  unionImageUrl?: string
  imageUrl?: string
  image_url?: string
  data?: {
    UnionImageUrl?: string
    unionImageUrl?: string
    imageUrl?: string
    image_url?: string
  }
}

// 시착하기 API 호출 함수
export const tryOnClothes = async (
  requestData: TryOnRequest,
): Promise<TryOnResponse> => {
  const response = await apiInstance.post<TryOnResponse>(
    '/my/try-on',
    requestData,
    {
      timeout: 60000, // AI 이미지 처리를 위해 60초로 연장
    },
  )
  return response.data
}
