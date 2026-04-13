import fastApi from '@/common/core/apiFastInstance'
import apiInstance from '@/common/core/apiInstance'

export const getPopularProducts = (
  category: string,
  page: number,
  size: number = 10,
) => {
  return apiInstance.get(
    `/products/rank?category=${category}&page=${page}&size=${size}`,
  )
}

// 찜하기
export const addToWishlist = (productId: string) => {
  return apiInstance.post(`/products/likes/${productId}`)
}

// 찜 목록 조회
export const getWishlist = () => {
  return apiInstance.get(`/my/likes`)
}

type UserMetrics = {
  userId: number
  timestamp: string
  actionType: string
  productId: string | null
  searchTerm: string | null
}

// 사용자 지표 전송
export const sendUserMetrics = (data: UserMetrics[]) => {
  return fastApi.post('/user/save', data)
}
