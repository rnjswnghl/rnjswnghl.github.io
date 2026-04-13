import apiInstance from '@/common/core/apiInstance'
import { type CoordinationApiResponse } from '@/features/fittingroom/types'
import { AxiosError } from 'axios'

/**
 * 내 코디 목록 조회 API
 * GET /my/coordination
 * Authorization: Bearer {JWT_ACCESS_TOKEN}
 */
export const getCoordination = async (): Promise<CoordinationApiResponse> => {
  const response =
    await apiInstance.get<CoordinationApiResponse>('/my/coordination')
  return response.data
}

/**
 * 코디 삭제 API
 * DELETE /coordination/{coordinationId}
 * Authorization: Bearer {JWT_ACCESS_TOKEN}
 */
export const deleteCoordination = async (
  coordinationId: number,
): Promise<{
  success: boolean
  message: string
}> => {
  try {
    const response = await apiInstance.delete(
      `my/coordination/${coordinationId}`,
    )

    // 성공 응답: 200 OK
    if (response.status === 200) {
      return {
        success: true,
        message: response.data?.message || '코디가 성공적으로 삭제되었습니다.',
      }
    }

    return {
      success: false,
      message: '코디 삭제에 실패했습니다.',
    }
  } catch (error: unknown) {
    // API 명세서에 따른 에러 처리
    if (error instanceof AxiosError) {
      if (
        error.response?.status === 403 ||
        error.response?.data?.code === -10403
      ) {
        throw new Error('로그인이 필요합니다.')
      }

      if (error.response?.data?.code === -10700) {
        throw new Error('존재하지 않는 코디입니다.')
      }

      if (error.response?.data?.code === -10701) {
        throw new Error('본인의 코디만 삭제할 수 있습니다.')
      }

      // 기타 에러
      const errorMessage =
        error.response?.data?.message || '코디 삭제 중 오류가 발생했습니다.'
      throw new Error(errorMessage)
    }

    // AxiosError가 아닌 다른 에러
    throw new Error('코디 삭제 중 알 수 없는 오류가 발생했습니다.')
  }
}
