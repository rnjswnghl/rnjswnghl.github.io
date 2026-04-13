import apiInstance from '@/common/core/apiInstance'

// 마네킹 정보 타입 (실제 API 스펙에 맞게 수정)
export interface Mannequin {
  mannequinId: number
  mannequinImageUrl: string
}

// 마네킹 목록 조회 응답 타입 (실제 API 스펙에 맞게 수정)
export interface GetMannequinsResponse {
  success: true
  code: 200
  message: string
  data: Mannequin[] // 직접 배열로 반환
}

// 마네킹 이미지 변경 요청 타입
export interface UpdateMannequinRequest {
  mannequinId: number
  newMannequin: File
}

// 마네킹 이미지 변경 응답 타입 (백엔드 API 스펙에 맞게 수정)
export interface UpdateMannequinResponse {
  success: true
  code: 200
  message: string
  data: {
    mannequinId: number // Integer: 마네킹 id
    mannequinImageUrl: string // String: 새로운 마네킹 이미지
  }
}

// 마네킹 이미지 삭제 응답 타입
export interface DeleteMannequinResponse {
  success: true
  code: 200
  message: string
  data: {
    defaultMannequinImageUrl: string // String: 삭제된 마네킹에 적용할 디폴트 마네킹 이미지
  }
}

/**
 * 마네킹 목록 조회 API
 * GET /my/mannequins
 * Authorization: Bearer {JWT_ACCESS_TOKEN}
 */
export const getMannequins = async (): Promise<GetMannequinsResponse> => {
  const response =
    await apiInstance.get<GetMannequinsResponse>('/my/mannequins')
  return response.data
}

/**
 * 마네킹 이미지 변경 API
 * PUT /my/mannequins/{mannequinId}
 * Authorization: Bearer {JWT_ACCESS_TOKEN}
 * Content-Type: multipart/form-data
 * Accept: application/json
 *
 * Request Parameters:
 * - mannequinId (integer): 변경하고자하는 마네킹 아이디 (URL path parameter)
 * - image (File): 변경하는 이미지 파일 (FormData)
 *
 * Response Parameters:
 * - mannequinId (Integer): 마네킹 id
 * - mannequinImageUrl (String): 새로운 마네킹 이미지
 */

export interface UpdateMannequinRequest {
  mannequinId: number
  image: File
}

export const updateMannequin = async (
  mannequinId: number,
  imageFile: File,
): Promise<UpdateMannequinResponse> => {
  const formData = new FormData()
  formData.append('image', imageFile)
  const response = await apiInstance.put<UpdateMannequinResponse>(
    `/my/mannequins/${mannequinId}`,
    formData,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data
}

/**
 * 마네킹 이미지 삭제 API
 * PUT /my/mannequins/delete/{mannequinId}
 * Authorization: Bearer {JWT_ACCESS_TOKEN}
 *
 * Path Parameters:
 * - mannequinId (integer): 삭제하고자하는 마네킹 아이디 (URL path parameter)
 *
 * Response Parameters:
 * - defaultMannequinImageUrl (String): 삭제된 마네킹에 적용할 디폴트 마네킹 이미지
 */
export const deleteMannequin = async (
  mannequinId: number,
): Promise<DeleteMannequinResponse> => {
  const response = await apiInstance.put<DeleteMannequinResponse>(
    `/my/mannequins/delete/${mannequinId}`,
  )

  return response.data
}
