import fastApi from '@/common/core/apiFastInstance'
import apiInstance from '@/common/core/apiInstance'

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

// (비로그인 시)인기 상품 조회
export const getPopularProducts = (
  category: string,
  page: number,
  size: number = 10,
) => {
  return fastApi.get(
    `/products/rank?category=${category}&page=${page}&size=${size}`,
  )
}

// (로그인 시)추천 상품 조회, size default 10
export const getRecommendedProducts = (
  page: number,
  size: number = 10,
  member_id?: number,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  if (member_id !== undefined) {
    params.append('member_id', member_id.toString())
  }

  return fastApi.get(`/recommend?${params.toString()}`)
}

// 찜하기
export const addToWishlist = (productId: string) => {
  return apiInstance.post(`/products/likes/${productId}`)
}

// 찜 목록 조회
export const getWishlist = () => {
  return apiInstance.get(`/my/likes`)
}
