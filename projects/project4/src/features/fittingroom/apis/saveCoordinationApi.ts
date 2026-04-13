import apiInstance from '@/common/core/apiInstance'
import {
  type SaveCoordinationRequest,
  type SaveCoordinationResponse,
} from '@/features/fittingroom/types'

/**
 * 코디를 저장합니다
 * @param data - 저장할 코디 정보 (상의 ID, 하의 ID)
 * @returns 저장 결과
 */
export const saveCoordination = async (
  data: SaveCoordinationRequest,
): Promise<SaveCoordinationResponse> => {
  const response = await apiInstance.post<SaveCoordinationResponse>(
    '/my/coordination',
    data,
  )
  return response.data
}

/**
 * 코디 저장 전 유효성 검사
 * @param data - 검사할 코디 데이터
 * @returns 유효성 검사 결과
 */
export const validateCoordinationData = (
  data: SaveCoordinationRequest,
): {
  isValid: boolean
  message: string
} => {
  // 상의 또는 하의 중 최소 1개는 있어야 함
  if (!data.upperId && !data.lowerId) {
    return {
      isValid: false,
      message: '상의 또는 하의 중 최소 1개 이상을 선택해주세요',
    }
  }

  return {
    isValid: true,
    message: '',
  }
}
