// 찜목록 API 응답 타입 정의
export interface WishlistItem {
  productId: string
  productImageUrl: string
  productCategory: string
}

export interface WishlistApiResponse {
  success: boolean
  code: number
  message: string
  data: WishlistItem[]
}

// 컴포넌트에서 사용할 클로딩 아이템 타입 (기존 HybridScrollGrid 호환)
export interface ClothingItem {
  id: string
  image: string
  type: string
}

// 내 코디 목록 API 응답 타입 정의
export interface CoordinationItem {
  coordinationId: number
  upperImageUrl: string | null
  lowerImageUrl: string | null
  upperId: string | null
  lowerId: string | null
}

export interface CoordinationApiResponse {
  success: boolean
  code: number
  message: string
  data: CoordinationItem[] // data가 직접 배열
}

// 컴포넌트에서 사용할 코디 아이템 타입 (HybridScrollGrid 호환)
export interface CodiClothingItem {
  id: string
  image: string
  type: string
  upperImage?: string
  lowerImage?: string
  coordinationId?: number
  isFullCoordination?: boolean // 전체 코디인지 단일 상품인지 구분
}

// 카테고리 타입
export type CategoryType = 'Total' | 'Upper' | 'Lower'

// 탭 타입
export type TabType = 'wishlist' | 'mycodi'

// 코디 저장 API 요청 타입
export interface SaveCoordinationRequest {
  upperId?: string
  lowerId?: string
}

// 코디 저장 API 응답 타입
export interface SaveCoordinationResponse {
  success: true
  code: 201
  message: string
}
