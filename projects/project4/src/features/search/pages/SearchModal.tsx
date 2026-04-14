import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { X } from 'lucide-react'
import PopularSearchList from '@/features/search/components/PopularSearchList'
import RecommSearchList from '@/features/search/components/RecommSearchList'
import ProductCard from '@/common/components/ProductCard'
import { SectionTitle } from '@/features/search/components/SearchItemStyles'
import {
  searchProducts,
  getSearchHistory,
  deleteSearchHistory,
  convertSearchProductToProduct,
  type SearchProduct,
} from '@/features/search/apis/searchApi'
import { useAuthStore } from '@/common/auth'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { isLoggedIn } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 검색 기록 조회
  const fetchSearchHistory = useCallback(async () => {
    if (isLoggedIn) {
      // 회원: API에서 검색 기록 조회
      try {
        const response = await getSearchHistory()
        if (response.success) {
          setRecentSearches(response.data.slice(0, 5)) // 최대 5개만 표시
        }
      } catch (err) {
        console.error('Failed to fetch search history:', err)
        setRecentSearches([])
      }
    } else {
      // 비회원: 세션스토리지에서 검색 기록 조회
      try {
        const sessionSearches = sessionStorage.getItem('recentSearches')
        if (sessionSearches) {
          const searches = JSON.parse(sessionSearches)
          setRecentSearches(searches.slice(0, 5)) // 최대 5개만 표시
        } else {
          setRecentSearches([])
        }
      } catch (err) {
        console.error('Failed to fetch session search history:', err)
        setRecentSearches([])
      }
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isOpen) {
      fetchSearchHistory()
      // 검색 모달이 열릴 때마다 검색어 초기화
      setSearchQuery('')
      setSearchResults([])
    }
  }, [isOpen, fetchSearchHistory])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearch()
    }
  }

  // 검색어 입력 시 실시간 검색 (디바운싱 적용)
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // 이전 타이머 취소
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (value.trim()) {
      // 300ms 후에 검색 실행
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value.trim())
      }, 300)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  // 검색 실행 (실시간 검색용)
  const performSearch = async (searchTerm: string) => {
    setIsSearching(true)
    try {
      const response = await searchProducts({
        keyword: searchTerm,
        page: 0,
        size: 6, // 모달에서는 6개만 표시
      })

      if (response.success) {
        setSearchResults(response.data.content)

        // 실시간 검색 후 해당 검색어를 검색 기록에서 삭제
        // (실시간 검색은 최근 검색어에 저장되지 않도록)
        try {
          await deleteSearchHistory(searchTerm)
        } catch (deleteErr) {
          // 검색 기록 삭제 실패는 조용히 처리
          console.warn(
            'Failed to delete search history for real-time search:',
            deleteErr,
          )
        }
      } else {
        setSearchResults([])
      }
    } catch (err: unknown) {
      console.error('Search error:', err)
      const error = err as {
        message?: string
        code?: string
      }

      // CORS나 네트워크 에러의 경우 조용히 처리 (사용자에게 에러 표시하지 않음)
      if (
        error.code === 'ERR_NETWORK' ||
        error.message?.includes('Network Error') ||
        error.message?.includes('CORS')
      ) {
        console.warn('Network error in search modal, silently handling')
      }

      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery.trim()
    if (searchTerm) {
      // 비회원: 세션스토리지에 검색어 저장
      if (!isLoggedIn) {
        try {
          const sessionSearches = sessionStorage.getItem('recentSearches')
          let searches = sessionSearches ? JSON.parse(sessionSearches) : []

          // 중복 제거 및 최신 검색어를 맨 앞에 추가
          searches = searches.filter((search: string) => search !== searchTerm)
          searches.unshift(searchTerm)

          // 최대 10개까지만 저장
          searches = searches.slice(0, 10)

          sessionStorage.setItem('recentSearches', JSON.stringify(searches))
        } catch (err) {
          console.error('Failed to save search to session storage:', err)
        }
      }

      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      onClose()
    }
  }

  const handleDeleteRecentSearch = async (
    searchToDelete: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation()

    if (isLoggedIn) {
      // 회원: API로 검색 기록 삭제
      try {
        const response = await deleteSearchHistory(searchToDelete)
        if (response.success) {
          // 삭제 성공 시 로컬 상태에서도 제거
          setRecentSearches((prev) =>
            prev.filter((search) => search !== searchToDelete),
          )
          // 검색 기록 다시 조회 (뒤에 있던 검색어가 앞으로 올 수 있음)
          fetchSearchHistory()
        }
      } catch (err) {
        console.error('Failed to delete search history:', err)
      }
    } else {
      // 비회원: 세션스토리지에서 검색 기록 삭제
      try {
        const sessionSearches = sessionStorage.getItem('recentSearches')
        if (sessionSearches) {
          const searches = JSON.parse(sessionSearches)
          const updatedSearches = searches.filter(
            (search: string) => search !== searchToDelete,
          )
          sessionStorage.setItem(
            'recentSearches',
            JSON.stringify(updatedSearches),
          )

          // 로컬 상태에서도 제거
          setRecentSearches((prev) =>
            prev.filter((search) => search !== searchToDelete),
          )
        }
      } catch (err) {
        console.error('Failed to delete session search history:', err)
      }
    }
  }

  return (
    <ModalOverlay onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
      <ModalContent>
        <ModalHeader>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={handleSearchInputChange}
            autoFocus
          />
        </ModalHeader>

        <ModalBody>
          {searchQuery ? (
            <div>
              <SectionTitle>검색 결과</SectionTitle>
              {isSearching ? (
                <LoadingText>검색 중...</LoadingText>
              ) : searchResults.length > 0 ? (
                <SearchResultsGrid>
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.productId}
                      product={convertSearchProductToProduct(product)}
                      onClick={() => {
                        navigate(
                          `/search?q=${encodeURIComponent(product.productName)}`,
                        )
                        onClose()
                      }}
                    />
                  ))}
                </SearchResultsGrid>
              ) : (
                <NoResultsText>검색 결과가 없습니다</NoResultsText>
              )}
            </div>
          ) : (
            <>
              {/* 최근 검색어 */}
              {recentSearches.length > 0 && (
                <>
                  <SectionTitle>최근 검색어</SectionTitle>
                  <RecentSearches>
                    {recentSearches.map((search, index) => (
                      <RecentSearchTag
                        key={index}
                        onClick={() => handleSearch(search)}
                      >
                        <RecentSearchText>{search}</RecentSearchText>
                        <DeleteButton
                          onClick={(e) => handleDeleteRecentSearch(search, e)}
                        >
                          <X size={12} />
                        </DeleteButton>
                      </RecentSearchTag>
                    ))}
                  </RecentSearches>
                </>
              )}

              <TwoColumnLayout>
                <Column>
                  <SectionTitle>추천 검색어</SectionTitle>
                  <RecommSearchList onSearch={handleSearch} />
                </Column>

                <Column>
                  <SectionTitle>실시간 순위</SectionTitle>
                  <PopularSearchList onSearch={handleSearch} />
                </Column>
              </TwoColumnLayout>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const ModalContent = styled.div`
  background: #0f1115;
  border-radius: 3px;
  width: 95%;
  max-width: 700px;
  max-height: 86vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: slideDown 0.2s ease-out;
  border: 1px solid #072bed;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #072bed;
    border-radius: 0;
    border: 2px solid #0f1115;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8e840;
  }

  /* Firefox용 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: #072bed transparent;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid rgb(80, 80, 80);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #ffffff;
  background: transparent;

  &::placeholder {
    color: #ffffff;
  }
`

const ModalBody = styled.div`
  padding: 20px 24px;
`

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const RecentSearches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  margin-bottom: 20px;
`

const RecentSearchTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: transparent;
  border: 1px solid #666666;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  color: #cccccc;
  &:hover {
    border-color: #a8e840;
    color: #ffffff;
  }
`

const RecentSearchText = styled.span`
  font-size: 13px;
  color: inherit;
`

const DeleteButton = styled.span`
  color: #666666;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  background: transparent;

  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
    transform: scale(1.1);
  }
`

const LoadingText = styled.p`
  font-size: 14px;
  color: #072bed;
  margin: 10px 0;
  text-align: center;
`

const NoResultsText = styled.p`
  font-size: 14px;
  color: #072bed;
  margin: 10px 0;
  text-align: center;
`

const SearchResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 16px;
`
