import apiInstance from '@/common/core/apiInstance'
import fastApi from '@/common/core/apiFastInstance'

export interface ProductDetailResponse {
  success: boolean
  code: number
  message: string
  data: {
    productId: string
    productImageUrl: string
    productBrand: string
    productName: string
    productPrice: number
    productUrl: string
    styleList: string[]
    isLiked: boolean
  } | null
}

export interface ProductDetailRequest {
  productId: string
}

export interface LikedItem {
  productId: string
  productName: string
  productBrand: string
  productPrice: number
  productImageUrl: string
  productUrl: string
  styleList: string[] | null
}

export interface LikedProductsResponse {
  success: boolean
  code: number
  message: string
  data: LikedItem[]
}

/**
 * 상품 상세 정보 조회
 * @param productId 상품 ID
 * @returns 상품 상세 정보
 */
export const getProductDetail = async (
  productId: string,
): Promise<ProductDetailResponse> => {
  const response = await apiInstance.get<ProductDetailResponse>(
    `/products/detail/${productId}`,
  )
  return response.data
}

export interface LikeResponse {
  success: boolean
  code: number
  message: string
  data: null
}

/**
 * 상품 찜하기/찜취소
 * @param productId 상품 ID
 * @returns 찜하기 결과
 */
export const toggleProductLike = async (
  productId: string,
): Promise<LikeResponse> => {
  const response = await apiInstance.post<LikeResponse>(
    `/products/likes/${productId}`,
  )
  return response.data
}

// 찜한 상품 목록 조회
export const getLikedProducts = async (): Promise<LikedItem[]> => {
  const response = await apiInstance.get<LikedProductsResponse>('/my/likes')
  return response.data.data
}

// 사용자 지표 전송 (FastAPI)
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
