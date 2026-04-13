import { create } from 'zustand'
import { getCoordination } from '@/features/fittingroom/apis/coordinationApi'
import {
  type CoordinationItem,
  type CodiClothingItem,
  type CategoryType,
} from '@/features/fittingroom/types'

interface CoordinationState {
  // 데이터 상태
  coordinationItems: CodiClothingItem[]
  rawCoordinationData: CoordinationItem[]
  isLoading: boolean
  error: string | null

  // 필터 상태
  activeCategory: CategoryType

  // 액션
  fetchCoordination: () => Promise<void>
  setCategory: (category: CategoryType) => void
  clearError: () => void
}

// API 데이터를 컴포넌트에서 사용할 형태로 변환
const transformCoordinationData = (
  items: CoordinationItem[],
): CodiClothingItem[] => {
  const result: CodiClothingItem[] = []

  items.forEach((item) => {
    const hasUpper = item.upperId && item.upperImageUrl
    const hasLower = item.lowerId && item.lowerImageUrl

    if (hasUpper && hasLower) {
      // 전체 코디 - 상/하의 모두 있는 경우
      const fullCodiItem: CodiClothingItem = {
        id: `${item.coordinationId}-full`,
        image: item.upperImageUrl || '',
        type: 'full',
        upperImage: item.upperImageUrl || '',
        lowerImage: item.lowerImageUrl || '',
        coordinationId: item.coordinationId,
        isFullCoordination: true,
      }
      result.push(fullCodiItem)
    } else if (hasUpper) {
      // 상의만 있는 경우
      const upperItem: CodiClothingItem = {
        id: `${item.coordinationId}-upper`,
        image: item.upperImageUrl || '',
        type: 'top',
        upperImage: item.upperImageUrl || '',
        coordinationId: item.coordinationId,
        isFullCoordination: false,
      }
      result.push(upperItem)
    } else if (hasLower) {
      // 하의만 있는 경우
      const lowerItem: CodiClothingItem = {
        id: `${item.coordinationId}-lower`,
        image: item.lowerImageUrl || '',
        type: 'bottom',
        lowerImage: item.lowerImageUrl || '',
        coordinationId: item.coordinationId,
        isFullCoordination: false,
      }
      result.push(lowerItem)
    }
  })

  return result
}

export const useCoordinationStore = create<CoordinationState>()((set) => ({
  // 초기 상태
  coordinationItems: [],
  rawCoordinationData: [],
  isLoading: false,
  error: null,
  activeCategory: 'Total',

  // 내 코디 목록 조회
  fetchCoordination: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await getCoordination()

      if (response.success) {
        // 데이터를 최신순으로 정렬 (coordinationId를 기준으로 내림차순)
        const sortedCoordinations = [...(response.data || [])].sort(
          (a, b) => b.coordinationId - a.coordinationId,
        )
        const transformedItems = transformCoordinationData(sortedCoordinations)

        set({
          rawCoordinationData: sortedCoordinations,
          coordinationItems: transformedItems,
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
      console.error('코디 목록 조회 실패:', error)

      // Axios 에러에서 백엔드 메시지 추출 또는 기본 메시지 사용
      let errorMessage = '내 코디 목록을 불러올 수 없습니다.'

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
        coordinationItems: [],
        rawCoordinationData: [],
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
