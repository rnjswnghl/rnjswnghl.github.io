import apiInstance from '@/common/core/apiInstance'
import fastApi from '@/common/core/apiFastInstance'

// 검색 API 응답 타입 정의
export interface SearchProduct {
  productId: string
  productImageUrl: string
  productBrand: string
  productName: string
  productPrice: number
  productUrl: string
  styleList: string[]
  isLiked: boolean
}

// SearchProduct를 Product 타입으로 변환하는 유틸리티 함수
export const convertSearchProductToProduct = (searchProduct: SearchProduct) => {
  const { isLiked, ...rest } = searchProduct
  return {
    ...rest,
    liked: isLiked,
  }
}

export interface SearchPageInfo {
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  numberOfElements: number
  empty: boolean
}

export interface SearchResponse {
  success: boolean
  code: number
  message: string
  data: {
    content: SearchProduct[]
  } & SearchPageInfo
}

export interface SearchParams {
  keyword: string
  page?: number
  size?: number
}

// 상품 검색 API
export const searchProducts = async (
  params: SearchParams,
): Promise<SearchResponse> => {
  const { keyword, page = 0, size = 20 } = params

  try {
    const response = await apiInstance.get('/products/search', {
      params: { keyword, page, size },
      paramsSerializer: (p) => {
        return new URLSearchParams(
          Object.entries(p).map(([k, v]) => [k, String(v)]),
        ).toString()
      },
    })

    return response.data
  } catch (error: unknown) {
    const axiosError = error as {
      response?: {
        status: number
        data?: { code: number }
      }
    }
    // 404 에러이고 검색 결과가 없는 경우는 정상적인 응답으로 처리
    if (
      axiosError.response?.status === 404 &&
      axiosError.response?.data?.code === -10605
    ) {
      return {
        success: false,
        code: -10605,
        message: '검색어에 일치하는 상품이 없습니다.',
        data: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          size: size,
          number: page,
          first: true,
          last: true,
          numberOfElements: 0,
          empty: true,
        },
      }
    }

    // 다른 에러는 그대로 throw
    throw error
  }
}

// 검색 기록 조회 API
export const getSearchHistory = async (): Promise<{
  success: boolean
  code: number
  message: string
  data: string[]
}> => {
  const response = await apiInstance.get('/search/history')
  return response.data
}

// 검색 기록 삭제 API
export const deleteSearchHistory = async (
  keyword: string,
): Promise<{
  success: boolean
  code: number
  message: string
  data: null
}> => {
  const response = await apiInstance.delete('/search/history', {
    params: { keyword },
    paramsSerializer: (p) => {
      return new URLSearchParams(
        Object.entries(p).map(([k, v]) => [k, String(v)]),
      ).toString()
    },
  })
  return response.data
}

// 인기 검색어 순위 조회 API
export const getPopularSearchRank = async (): Promise<{
  success: boolean
  code: number
  message: string
  data: string[]
}> => {
  const response = await apiInstance.get('/search/rank')
  return response.data
}

// 추천 상품 타입 정의
export interface RecommendProduct {
  productId: string
  productName: string
  productBrand: string
  productPrice: number
  productImageUrl: string
  productUrl: string
  styleList: string[]
}

export interface RecommendResponse {
  status: number
  message: string
  result: {
    recommended_products: RecommendProduct[]
    styleTags: Array<[string, number]>
    pagination: {
      current_page: number
      page_size: number
      total_items: number
      total_pages: number
      has_next: boolean
    }
  }
}

// 추천 상품 조회 API (검색어 추출용)
export const getRecommendedProductsForSearch = async (
  page: number = 0,
  size: number = 5,
  memberId?: number,
): Promise<RecommendResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  if (memberId !== undefined) {
    params.append('member_id', memberId.toString())
  }

  const response = await fastApi.get(`/recommend?${params.toString()}`)
  return response.data
}

// 상품명에서 추천 검색어 추출
export const extractSearchKeywords = (
  products: RecommendProduct[],
  styleTags: Array<[string, number]> = [],
): string[] => {
  const brandKeywords = new Set<string>()
  const styleKeywords = new Set<string>()
  const productKeywords = new Set<string>()

  if (!products || !Array.isArray(products)) return []

  products.forEach((product) => {
    if (product.productBrand?.trim()) {
      brandKeywords.add(product.productBrand.trim())
    }

    const cleanName = product.productName
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .trim()

    const words = cleanName
      .split(/\s+/)
      .filter(
        (word) =>
          word.length > 1 &&
          !/^\d+$/.test(word) &&
          ![
            '케이블',
            '반팔',
            '긴팔',
            '니트',
            '티셔츠',
            '셔츠',
            '후드',
            '자켓',
            '코트',
            '바지',
            '청바지',
            '스커트',
            '원피스',
            '가방',
            '신발',
            '스니커즈',
            '부츠',
            '샌들',
            '슬리퍼',
            '모자',
            '스카프',
            '벨트',
            '시계',
            '반지',
            '목걸이',
            '귀걸이',
            '팔찌',
            '안경',
            '선글라스',
            '마스크',
            '장갑',
            '양말',
            '속옷',
            '잠옷',
            '수영복',
            '운동복',
            '정장',
            '드레스',
            '한복',
            '기모',
            '쭈리',
            '오버핏',
            '슬림핏',
            '레귤러핏',
            '와이드핏',
            '스트레이트핏',
            '테이퍼드핏',
            '스키니핏',
            '부츠컷핏',
            '플레어핏',
            '벨보텀핏',
            '하이웨이스트핏',
            '로우웨이스트핏',
            '미드웨이스트핏',
            '크롭핏',
            '롱핏',
            '숏핏',
            '미니핏',
            '맥시핏',
            '미디핏',
          ].includes(word),
      )

    words.forEach((w) => productKeywords.add(w))

    if (Array.isArray(product.styleList)) {
      product.styleList.forEach((s) => {
        if (s && s.length > 1) styleKeywords.add(s)
      })
    }
  })

  styleTags.forEach(([tag]) => {
    if (tag && tag.length > 1) styleKeywords.add(tag)
  })

  const result: string[] = []
  const sortedBrands = [...brandKeywords].sort((a, b) => a.length - b.length)
  if (sortedBrands.length > 0) result.push(sortedBrands[0])

  result.push(
    ...[...styleKeywords].sort((a, b) => a.length - b.length).slice(0, 2),
  )
  result.push(
    ...[...productKeywords].sort((a, b) => a.length - b.length).slice(0, 2),
  )

  return result
}

// 찜하기 토글 API (핫아이템과 동일한 패턴)
export const toggleProductLike = (productId: string) => {
  return apiInstance.post(`/products/likes/${productId}`)
}

// 찜 목록 조회 API
export const getWishlist = async () => {
  const response = await apiInstance.get('/my/likes')
  return response
}

// 사용자 지표 타입 정의
type UserMetrics = {
  userId: number
  timestamp: string
  actionType: string
  productId: string | null
  searchTerm: string | null
}

// 사용자 지표 전송 API
export const sendUserMetrics = (data: UserMetrics[]) => {
  return fastApi.post('/user/save', data)
}
