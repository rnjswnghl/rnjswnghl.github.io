import { create } from 'zustand'
import { getWishlist } from '@/features/fittingroom/apis/wishlistApi'
import {
  type WishlistItem,
  type ClothingItem,
  type CategoryType,
} from '@/features/fittingroom/types'

interface WishlistState {
  // 데이터 상태
  wishlistItems: ClothingItem[]
  rawWishlistData: WishlistItem[]
  isLoading: boolean
  error: string | null

  // 필터 상태
  activeCategory: CategoryType

  // 액션
  fetchWishlist: () => Promise<void>
  setCategory: (category: CategoryType) => void
  clearError: () => void
}

// API 데이터를 컴포넌트에서 사용할 형태로 변환
const transformWishlistData = (items: WishlistItem[]): ClothingItem[] => {
  return items.map((item) => ({
    id: item.productId,
    image: item.productImageUrl,
    type: mapCategoryToType(item.productCategory),
  }))
}

// 카테고리를 타입으로 매핑
const mapCategoryToType = (category: string): string => {
  // 새로운 형식: lower/upper 접두사 방식
  if (category.toLowerCase().startsWith('lower')) {
    return 'bottom' // 하의
  }
  if (category.toLowerCase().startsWith('upper')) {
    return 'top' // 상의
  }

  // 기존 형식 호환성 유지
  switch (category) {
    case 'Upper':
      return 'top'
    case 'Lower':
      return 'bottom'
    default:
      return 'other' // 기타 카테고리 (Total에만 표시)
  }
}

export const useWishlistStore = create<WishlistState>()((set) => ({
  // 초기 상태
  wishlistItems: [],
  rawWishlistData: [],
  isLoading: false,
  error: null,
  activeCategory: 'Total',

  // 찜목록 조회
  fetchWishlist: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await getWishlist()

      if (response.success) {
        // 데이터를 최신순으로 정렬 (productId를 기준으로 내림차순)
        const sortedRawData = [...response.data].reverse()
        const transformedItems = transformWishlistData(sortedRawData)

        set({
          rawWishlistData: sortedRawData,
          wishlistItems: transformedItems,
          isLoading: false,
          error: null,
        })
      } else {
        throw {
          code: response.code,
          message: response.message,
          isApiError: true,
        }
      }
    } catch (error: unknown) {
      console.error('찜목록 조회 실패:', error)

      // Axios 에러에서 백엔드 메시지 추출 또는 기본 메시지 사용
      let errorMessage = '찜목록을 불러올 수 없습니다.'

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } }
        }
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message
        }
      }

      set({
        error: errorMessage,
        isLoading: false,
        wishlistItems: [],
        rawWishlistData: [],
      })
    }
  },

  // 카테고리 설정
  setCategory: (category: CategoryType) => {
    set({ activeCategory: category })
  },

  // 에러 초기화
  clearError: () => {
    set({ error: null })
  },
}))
