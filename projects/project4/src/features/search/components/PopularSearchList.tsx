import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPopularSearchRank } from '@/features/search/apis/searchApi'
import {
  SearchItem,
  RankNumber,
  SearchText,
  TwoColumnListContainer,
  Column,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  RetryButton,
} from '@/features/search/components/SearchItemStyles'

interface PopularSearchListProps {
  onSearch?: (query: string) => void
}

export default function PopularSearchList({
  onSearch,
}: PopularSearchListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [popularSearches, setPopularSearches] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // 인기 검색어 데이터 가져오기
  const fetchPopularSearches = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getPopularSearchRank()

      if (response.success) {
        setPopularSearches(response.data)
      } else {
        setError('인기 검색어를 불러올 수 없습니다.')
        // 에러 시 기본 데이터 사용
        setPopularSearches([
          '청바지',
          '니트',
          '코트',
          '스니커즈',
          '가방',
          '원피스',
          '셔츠',
          '후드티',
        ])
      }
    } catch (err) {
      console.error('Failed to fetch popular searches:', err)
      setError('인기 검색어를 불러올 수 없습니다.')
      // 에러 시 기본 데이터 사용
      setPopularSearches([
        '청바지',
        '니트',
        '코트',
        '스니커즈',
        '가방',
        '원피스',
        '셔츠',
        '후드티',
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopularSearches()
  }, [])

  const handleSearchClick = (searchTerm: string) => {
    if (onSearch) {
      onSearch(searchTerm)
    } else {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  // 좌측 열 (1~5순위)
  const leftColumnItems = popularSearches.slice(
    0,
    Math.ceil(popularSearches.length / 2),
  )

  // 우측 열 (6~10순위)
  const rightColumnItems = popularSearches.slice(
    Math.ceil(popularSearches.length / 2),
  )

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>인기 검색어를 불러오는 중...</LoadingText>
      </LoadingContainer>
    )
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
        <RetryButton onClick={fetchPopularSearches}>다시 시도</RetryButton>
      </ErrorContainer>
    )
  }

  return (
    <TwoColumnListContainer>
      <Column>
        {leftColumnItems.map((search, index) => (
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
      </Column>

      <Column>
        {rightColumnItems.map((search, index) => {
          const actualIndex = index + leftColumnItems.length
          return (
            <SearchItem
              key={actualIndex}
              onMouseEnter={() => setHoveredIndex(actualIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSearchClick(search)}
            >
              <RankNumber isHovered={hoveredIndex === actualIndex}>
                {actualIndex + 1}
              </RankNumber>
              <SearchText>{search}</SearchText>
            </SearchItem>
          )
        })}
      </Column>
    </TwoColumnListContainer>
  )
}
