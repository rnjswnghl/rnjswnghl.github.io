import apiInstance from '@/common/core/apiInstance'
import fastApi from '@/common/core/apiFastInstance'

export interface PopularProduct {
  productId: string
  productImageUrl: string
  productBrand: string
  productName: string
  productPrice: number
  productUrl: string
  styleList: Array<string> | null
  liked: boolean
}

export interface PopularClothesResponse {
  popularClothes: {
    content: PopularProduct[]
    pageable: {
      sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
      }
      offset: number
      pageNumber: number
      pageSize: number
      paged: boolean
      unpaged: boolean
    }
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    first: boolean
    numberOfElements: number
    empty: boolean
  }
}

export interface HotItemsApiResponse {
  success: boolean
  code: number
  message: string
  data: PopularClothesResponse
}

export interface LikedItem {
  productId: string
  productImageUrl: string
  productCategory: string
}

export interface LikedProductsResponse {
  success: boolean
  code: number
  message: string
  data: LikedItem[]
}

/**
 * 인기 상품 조회
 * @param category 카테고리
 * @param page 페이지 번호 (기본값: 0)
 * @param size 상품 개수 (기본값: 30)
 * @returns 인기 상품 목록
 */
export const getPopularProducts = async (
  category: string,
  page: number = 0,
  size: number = 30,
): Promise<HotItemsApiResponse> => {
  const response = await apiInstance.get<HotItemsApiResponse>(
    `/products/rank?category=${category}&page=${page}&size=${size}`,
  )
  return response.data
}

// 찜하기 / 찜취소
export const addToWishlist = (productId: string) => {
  return apiInstance.post(`/products/likes/${productId}`)
}

// 찜한 상품 목록 조회
export const getLikedProducts = async (): Promise<LikedItem[]> => {
  const response = await apiInstance.get<LikedProductsResponse>('/my/likes')
  return response.data.data
}

// 사용자 지표 전송
export const sendUserMetrics = (
  data: {
    userId: number
    timestamp: string
    actionType: string
    productId: string | null
    searchTerm: string | null
  }[],
) => {
  return fastApi.post('/user/save', data)
}
