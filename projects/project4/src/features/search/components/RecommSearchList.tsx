import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SearchItem,
  RankNumber,
  SearchText,
  ListContainer,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  RetryButton,
} from '@/features/search/components/SearchItemStyles'
import {
  getRecommendedProductsForSearch,
  extractSearchKeywords,
} from '@/features/search/apis/searchApi'
import { useAuthStore } from '@/common/auth'

interface RecommSearchListProps {
  onSearch?: (query: string) => void
}

export default function RecommSearchList({ onSearch }: RecommSearchListProps) {
  // 기본 추천 검색어 (API 실패 시 사용)
  const defaultSearches = ['나이키', '아디다스', '캠프', '빈티지', '힙']

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [recommendedSearches, setRecommendedSearches] =
    useState<string[]>(defaultSearches)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const member = useAuthStore((state) => state.member)

  // 추천 상품에서 검색어 추출
  const fetchRecommendedSearches = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getRecommendedProductsForSearch(
        0,
        5,
        member?.memberId,
      )

      // API 응답에서 products 배열과 styleTags 추출
      const products = response.result?.recommended_products || []
      const styleTags = response.result?.styleTags || []
      const keywords = extractSearchKeywords(products, styleTags)

      if (keywords.length > 0) {
        setRecommendedSearches(keywords)
      } else {
        setRecommendedSearches(defaultSearches)
      }
    } catch (err) {
      console.error('Failed to fetch recommended searches:', err)
      setError('추천 검색어를 불러올 수 없습니다.')
      setRecommendedSearches(defaultSearches)
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.memberId])

  useEffect(() => {
    // 로그인한 사용자만 API 호출, 비로그인은 기본 검색어 유지
    if (isLoggedIn && member?.memberId) {
      fetchRecommendedSearches()
    }
  }, [isLoggedIn, member?.memberId, fetchRecommendedSearches])

  const handleSearchClick = (searchTerm: string) => {
    try {
      if (onSearch) {
        onSearch(searchTerm)
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      }
    } catch (error) {
      console.error('Error handling search click:', error)
      // 에러 발생 시 기본 동작 수행
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>추천 검색어를 불러오는 중...</LoadingText>
      </LoadingContainer>
    )
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
        <RetryButton onClick={fetchRecommendedSearches}>다시 시도</RetryButton>
      </ErrorContainer>
    )
  }

  return (
    <ListContainer>
      {recommendedSearches.map((search, index) => (
        <SearchItem
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleSearchClick(search)}
        >
          <RankNumber isHovered={hoveredIndex === index}>
            {index + 1}
          </RankNumber>
          <SearchText>{search}</SearchText>
        </SearchItem>
      ))}
    </ListContainer>
  )
}
