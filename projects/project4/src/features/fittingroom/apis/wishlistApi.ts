import apiInstance from '@/common/core/apiInstance'
import { type WishlistApiResponse } from '@/features/fittingroom/types'

/**
 * 찜목록 조회 API
 * GET /my/likes
 * Authorization: Bearer {JWT_ACCESS_TOKEN}
 */
export const getWishlist = async (): Promise<WishlistApiResponse> => {
  const response = await apiInstance.get<WishlistApiResponse>('/my/likes')
  return response.data
}
