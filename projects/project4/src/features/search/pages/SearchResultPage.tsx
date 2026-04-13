import { useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { X, ChevronUp } from 'lucide-react'
import PopularSearchList from '@/features/search/components/PopularSearchList'
import RecommSearchList from '@/features/search/components/RecommSearchList'
import SearchHeader from '@/features/search/components/SearchHeader'
// FilterSection is used inside RightSide component
import RightSide from '@/features/search/components/rightside'
import ActiveFilters from '@/features/search/components/ActiveFilters'
import ProductGrid from '@/features/search/components/ProductGrid'
import { SectionTitle } from '@/features/search/components/SearchItemStyles'
import ClothesDetailModal from '@/common/clothes_detail/pages/ClothesDetailModal'
import {
  searchProducts,
  getSearchHistory,
  deleteSearchHistory,
  convertSearchProductToProduct,
  toggleProductLike,
  getWishlist,
  type SearchProduct,
} from '@/features/search/apis/searchApi'
import { sendUserMetrics } from '@/features/search/apis/searchApi'
import { type SortOption } from '@/features/search/components/SortFilter'
import { useAuthStore } from '@/common/auth'
import NeedLoginToast from '@/common/components/NeedLoginToast'

type UserActionLog = {
  userId: number
  timestamp: string
  actionType: 'like' | 'unlike' | 'goDetail'
  productId: string | null
  searchTerm: string | null
}

export default function SearchResultPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isLoggedIn, member } = useAuthStore()
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number }[]
  >([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [wishlistOnly, setWishlistOnly] = useState(false)
  const [sortOptions, setSortOptions] = useState<SortOption[]>([])
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  // 검색 결과 관련 상태
  const [products, setProducts] = useState<SearchProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noResults, setNoResults] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [totalElements, setTotalElements] = useState(0)

  // 필터링된 상품 페이지네이션 상태
  const [filteredCurrentPage, setFilteredCurrentPage] = useState(0)

  // 찜한 상품 관리 (핫아이템 패턴)
  const [likedProductIds, setLikedProductIds] = useState<Set<string>>(new Set())
  const [likedProductsLoaded, setLikedProductsLoaded] = useState(false)
  const likedProductIdsRef = useRef<Set<string>>(new Set())

  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<SearchProduct | null>(
    null,
  )
  const [showLoginToast, setShowLoginToast] = useState(false)

  const query = searchParams.get('q') || ''

  // ESC 키로 검색 확장 상태 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchExpanded])

  // 검색 결과에서 브랜드와 스타일 추출
  const availableBrands = Array.from(
    new Set(products.map((product) => product.productBrand).filter(Boolean)),
  ).sort()

  const availableStyles = Array.from(
    new Set(
      products.flatMap((product) => product.styleList || []).filter(Boolean),
    ),
  ).sort()

  // 필터링된 상품 계산
  const filteredProducts = products.filter((product) => {
    // 가격 필터
    if (priceRanges.length > 0) {
      const productPrice = product.productPrice
      const isInPriceRange = priceRanges.some(
        (range) => productPrice >= range.min && productPrice <= range.max,
      )
      if (!isInPriceRange) return false
    }

    // 브랜드 필터
    if (selectedBrands.length > 0) {
      if (!selectedBrands.includes(product.productBrand)) return false
    }

    // 스타일 필터
    if (selectedStyles.length > 0) {
      const productStyles = product.styleList || []
      const hasMatchingStyle = selectedStyles.some((style) =>
        productStyles.includes(style),
      )
      if (!hasMatchingStyle) return false
    }

    // 찜여부 필터
    if (wishlistOnly && !product.isLiked) return false

    return true
  })

  // 정렬된 상품 계산
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOptions.length === 0) return 0

    // 첫 번째 정렬 옵션을 우선 적용
    const primarySort = sortOptions[0]
    let result = 0

    switch (primarySort) {
      case 'name-asc':
        result = a.productName.localeCompare(b.productName)
        break
      case 'name-desc':
        result = b.productName.localeCompare(a.productName)
        break
      case 'price-high':
        result = b.productPrice - a.productPrice
        break
      case 'price-low':
        result = a.productPrice - b.productPrice
        break
      default:
        return 0
    }

    // 동일한 경우 두 번째 정렬 옵션 적용
    if (result === 0 && sortOptions.length > 1) {
      const secondarySort = sortOptions[1]
      switch (secondarySort) {
        case 'name-asc':
          result = a.productName.localeCompare(b.productName)
          break
        case 'name-desc':
          result = b.productName.localeCompare(a.productName)
          break
        case 'price-high':
          result = b.productPrice - a.productPrice
          break
        case 'price-low':
          result = a.productPrice - b.productPrice
          break
      }
    }

    return result
  })

  // 필터링된 상품들에 페이지네이션 적용
  const itemsPerPage = 20
  const isFilterApplied =
    priceRanges.length > 0 ||
    selectedBrands.length > 0 ||
    selectedStyles.length > 0 ||
    wishlistOnly ||
    sortOptions.length > 0

  // 필터가 적용된 경우: 클라이언트 페이지네이션, 필터가 없는 경우: API 페이지네이션
  const paginatedProducts = isFilterApplied
    ? sortedProducts.slice(0, (filteredCurrentPage + 1) * itemsPerPage)
    : sortedProducts
  const hasMoreFiltered = isFilterApplied
    ? paginatedProducts.length < sortedProducts.length
    : false

  // 검색 API 호출
  const fetchSearchResults = useCallback(
    async (keyword: string, page: number = 0, reset: boolean = true) => {
      if (!keyword.trim()) {
        setError('검색어를 입력해주세요.')
        return
      }

      setLoading(true)
      setError(null)
      setNoResults(false)

      try {
        const response = await searchProducts({
          keyword: keyword.trim(),
          page,
          size: 20,
        })

        if (response.success) {
          const newProducts = response.data.content
          setHasMore(!response.data.last)
          setCurrentPage(page)

          // 총 검색 결과 수 저장 (첫 페이지에서만)
          if (reset) {
            setTotalElements(response.data.totalElements)

            // 비회원: 세션스토리지에 검색어 저장
            if (!isLoggedIn) {
              try {
                const sessionSearches = sessionStorage.getItem('recentSearches')
                let searches = sessionSearches
                  ? JSON.parse(sessionSearches)
                  : []

                // 중복 제거 및 최신 검색어를 맨 앞에 추가
                searches = searches.filter(
                  (search: string) => search !== keyword.trim(),
                )
                searches.unshift(keyword.trim())

                // 최대 10개까지만 저장
                searches = searches.slice(0, 10)

                sessionStorage.setItem(
                  'recentSearches',
                  JSON.stringify(searches),
                )
              } catch (err) {
                console.error('Failed to save search to session storage:', err)
              }
            }
          }

          // 찜 상태 적용 (ref를 사용하여 현재 likedProductIds 참조)
          const productsWithLikedStatus = newProducts.map(
            (product: SearchProduct) => ({
              ...product,
              isLiked: likedProductIdsRef.current.has(product.productId),
            }),
          )

          setProducts((prevProducts) => {
            if (reset) {
              return productsWithLikedStatus
            } else {
              return [...prevProducts, ...productsWithLikedStatus]
            }
          })

          // 검색 결과가 없어도 에러가 아님
          setError(null)
          setNoResults(false)
        } else {
          // 검색 결과가 없는 경우 (success: false, code: -10605)
          if (response.code === -10605) {
            setProducts([])
            setHasMore(false)
            setTotalElements(0)
            setError(null)
            setNoResults(true)
          } else {
            setError(response.message || '검색에 실패했습니다.')
          }
        }
      } catch (err: unknown) {
        console.error('Search error:', err)
        const error = err as {
          response?: { data?: { code?: number } }
          message?: string
          code?: string
        }

        if (error.response?.data?.code === -10400) {
          setError('검색어를 입력해주세요.')
        } else if (
          error.code === 'ERR_NETWORK' ||
          error.message?.includes('Network Error')
        ) {
          setError('네트워크 연결을 확인해주세요.')
        } else if (error.message?.includes('CORS')) {
          setError('서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.')
        } else {
          setError('검색 중 오류가 발생했습니다.')
        }
      } finally {
        setLoading(false)
      }
    },
    [isLoggedIn],
  )

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
    setSearchValue(query)

    // 검색어가 있고 찜한 상품 목록이 로드된 후에만 검색 실행
    if (query.trim() && likedProductsLoaded) {
      fetchSearchResults(query, 0, true)
    } else if (!query.trim()) {
      setProducts([])
      setError(null)
    }
  }, [query, likedProductsLoaded, fetchSearchResults])

  // 필터가 변경될 때 필터링된 상품 페이지 초기화
  useEffect(() => {
    setFilteredCurrentPage(0)
  }, [priceRanges, selectedBrands, selectedStyles, wishlistOnly, sortOptions])

  // likedProductIds ref 업데이트
  useEffect(() => {
    likedProductIdsRef.current = likedProductIds
  }, [likedProductIds])

  // 찜한 상품 목록 초기 로드 (핫아이템 패턴)
  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (!isLoggedIn) {
        setLikedProductIds(new Set())
        setLikedProductsLoaded(true)
        return
      }

      try {
        const response = await getWishlist()
        // API 응답 구조: response.data.data (중첩된 구조)
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          const likedIds = new Set<string>(
            response.data.data.map(
              (item: { productId: string }) => item.productId,
            ),
          )
          setLikedProductIds(likedIds)
        } else {
          setLikedProductIds(new Set())
        }
        setLikedProductsLoaded(true)
      } catch (err) {
        console.error('Failed to fetch liked products:', err)
        setLikedProductIds(new Set())
        setLikedProductsLoaded(true)
      }
    }

    fetchLikedProducts()
  }, [isLoggedIn])

  useEffect(() => {
    // 컴포넌트 마운트 시 검색 기록 조회
    fetchSearchHistory()
  }, [fetchSearchHistory])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 스크롤 감지하여 맨 위로 가기 버튼 표시/숨김
  useEffect(() => {
    const mainContent = mainContentRef.current
    if (!mainContent) return

    const handleScroll = () => {
      const scrollTop = mainContent.scrollTop
      setShowScrollToTop(scrollTop > 300)
    }

    mainContent.addEventListener('scroll', handleScroll)
    return () => mainContent.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const mainContent = mainContentRef.current
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setIsSearchExpanded(false)
    }
  }

  const handleSearchInputClick = () => {
    setIsSearchExpanded(true)
    // 검색 드롭다운 열 때마다 최신 검색 기록 조회
    fetchSearchHistory()
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearchInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      handleSearch(searchValue)
    }
  }

  const handleSearchFromDropdown = (searchTerm: string) => {
    handleSearch(searchTerm)
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

  const handlePriceRangesChange = (ranges: { min: number; max: number }[]) => {
    setPriceRanges(ranges)
  }

  const handleSortChange = (sorts: SortOption[]) => {
    setSortOptions(sorts)
  }

  // 상품 클릭 핸들러
  const handleProductClick = useCallback(
    async (productId: string) => {
      const product = paginatedProducts.find((p) => p.productId === productId)
      if (product) {
        setSelectedProduct(product)
        setIsModalOpen(true)

        // goDetail 액션 실시간 전송
        if (member) {
          const goDetailLog: UserActionLog = {
            userId: member.memberId,
            timestamp: new Date().toISOString(),
            actionType: 'goDetail',
            productId: productId,
            searchTerm: query,
          }

          try {
            await sendUserMetrics([goDetailLog])
            console.log('상품 클릭 goDetail 액션이 실시간으로 전송되었습니다.')
          } catch (error) {
            console.error('goDetail 액션 전송 중 오류 발생:', error)
          }
        }
      }
    },
    [paginatedProducts, member, query],
  )

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }, [])

  // 찜하기 토글 핸들러 (메인페이지/핫아이템 패턴)
  const handleToggleLike = useCallback(
    async (productId: string) => {
      if (!isLoggedIn) {
        setShowLoginToast(true)
        return
      }

      // 즉시 UI 업데이트 (낙관적 업데이트)
      const isCurrentlyLiked = likedProductIds.has(productId)

      // React 18의 자동 배치 업데이트를 활용하여 두 상태를 동시에 업데이트
      // 이렇게 하면 한 번의 리렌더링으로 처리됩니다
      setLikedProductIds((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(productId)) {
          newSet.delete(productId)
        } else {
          newSet.add(productId)
        }
        return newSet
      })

      setProducts((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, isLiked: !p.isLiked } : p,
        ),
      )

      try {
        const response = await toggleProductLike(productId)
        if (response.status !== 200) {
          // API 실패 시 원래 상태로 되돌리기
          setLikedProductIds((prev) => {
            const newSet = new Set(prev)
            if (isCurrentlyLiked) {
              newSet.add(productId)
            } else {
              newSet.delete(productId)
            }
            return newSet
          })

          setProducts((prev) =>
            prev.map((p) =>
              p.productId === productId
                ? { ...p, isLiked: isCurrentlyLiked }
                : p,
            ),
          )
        }

        // 세션 스토리지에 찜하기 로그 저장 (recommend 폴더와 동일한 패턴)
        const existingLogs: UserActionLog[] = JSON.parse(
          sessionStorage.getItem('user_actions') || '[]',
        )

        const isAlreadyLiked = existingLogs.some(
          (log) => log.productId === productId,
        )

        const newLog: UserActionLog = {
          userId: member?.memberId || 0,
          timestamp: new Date().toISOString(),
          actionType: isAlreadyLiked ? 'unlike' : 'like',
          productId: productId,
          searchTerm: query, // 검색어를 searchTerm으로 저장
        }

        let updatedLogs: UserActionLog[]

        if (!isAlreadyLiked) {
          updatedLogs = [...existingLogs, newLog]
        } else {
          updatedLogs = existingLogs.filter(
            (log) => log.productId !== productId,
          )
        }

        // 로그를 세션 스토리지에 저장
        sessionStorage.setItem('user_actions', JSON.stringify(updatedLogs))

        // 실시간으로 사용자 액션 전송
        try {
          await sendUserMetrics([newLog])
          console.log('사용자 액션이 실시간으로 전송되었습니다.')
        } catch (error) {
          console.error('사용자 액션 전송 중 오류 발생:', error)
        }

        // 찜한 상품이 5개 이상이면 서버에 저장
        if (updatedLogs.length >= 5) {
          try {
            await sendUserMetrics(updatedLogs)
            // 저장 후 세션 스토리지 비우기 등 추가 로직
            sessionStorage.removeItem('user_actions')
          } catch (error) {
            console.error('서버 저장 중 오류 발생:', error)
          }
        }
      } catch (error) {
        console.error('Failed to toggle wishlist:', error)
      }
    },
    [isLoggedIn, likedProductIds, member?.memberId, query],
  )

  // 모달에서 찜하기 변경 핸들러 (핫아이템 패턴)
  const handleModalLikeChange = useCallback(
    (productId: string, isLiked: boolean) => {
      // 찜한 상품 목록 업데이트
      setLikedProductIds((prev) => {
        const newSet = new Set(prev)
        if (isLiked) {
          newSet.add(productId)
        } else {
          newSet.delete(productId)
        }
        return newSet
      })

      // 상품 목록에서 하트 상태 업데이트
      setProducts((prev) =>
        prev.map((p) => (p.productId === productId ? { ...p, isLiked } : p)),
      )

      // selectedProduct도 업데이트 (모달에서 즉시 반영)
      setSelectedProduct((prev) => (prev ? { ...prev, isLiked } : null))
    },
    [],
  )

  // 더보기 버튼 핸들러
  const handleLoadMore = useCallback(() => {
    // 필터가 적용된 경우: 클라이언트 페이지네이션
    if (isFilterApplied) {
      if (hasMoreFiltered && !loading) {
        setFilteredCurrentPage((prev) => prev + 1)
      }
    } else {
      // 필터가 없는 경우: 기존 API 페이지네이션
      if (hasMore && !loading) {
        fetchSearchResults(query, currentPage + 1, false)
      }
    }
  }, [
    isFilterApplied,
    hasMoreFiltered,
    loading,
    hasMore,
    fetchSearchResults,
    query,
    currentPage,
  ])

  // 필터 핸들러들
  const handleRemovePriceRange = (index: number) => {
    const newRanges = priceRanges.filter((_, i) => i !== index)
    setPriceRanges(newRanges)
  }

  const handleRemoveBrand = (index: number) => {
    const newBrands = selectedBrands.filter((_, i) => i !== index)
    setSelectedBrands(newBrands)
  }

  const handleRemoveStyle = (index: number) => {
    const newStyles = selectedStyles.filter((_, i) => i !== index)
    setSelectedStyles(newStyles)
  }

  const handleRemoveWishlist = () => {
    setWishlistOnly(false)
  }

  const handleRemoveSort = (index: number) => {
    const newSortOptions = sortOptions.filter((_, i) => i !== index)
    setSortOptions(newSortOptions)
  }

  const handleClearAll = () => {
    setPriceRanges([])
    setSelectedBrands([])
    setSelectedStyles([])
    setWishlistOnly(false)
    setSortOptions([])
  }

  // 검색어 지우기 핸들러
  const handleClearSearch = () => {
    setSearchValue('')
    navigate('/search')
  }

  return (
    <Container>
      <MainContent ref={mainContentRef}>
        {/* 검색바 */}
        <SearchBar ref={searchRef} isExpanded={isSearchExpanded}>
          <SearchInput
            type="text"
            value={searchValue}
            onClick={handleSearchInputClick}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
            placeholder="검색어를 입력하세요"
          />
          {searchValue && (
            <ClearButton onClick={handleClearSearch}>
              <X size={16} />
            </ClearButton>
          )}
          <SearchIcon onClick={() => handleSearch(searchValue)}>🔍︎</SearchIcon>

          {isSearchExpanded && (
            <SearchDropdown>
              {/* 최근 검색어 */}
              {recentSearches.length > 0 && (
                <>
                  <SectionTitle>최근 검색어</SectionTitle>
                  <RecentSearches>
                    {recentSearches.map((search, index) => (
                      <RecentSearchTag
                        key={index}
                        onClick={() => handleSearchFromDropdown(search)}
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
                  <RecommSearchList onSearch={handleSearchFromDropdown} />
                </Column>

                <Column>
                  <SectionTitle>실시간 순위</SectionTitle>
                  <PopularSearchList onSearch={handleSearchFromDropdown} />
                </Column>
              </TwoColumnLayout>
            </SearchDropdown>
          )}
        </SearchBar>

        {/* 검색 결과 헤더 */}
        <SearchHeader
          query={query}
          resultCount={isFilterApplied ? sortedProducts.length : totalElements}
        />

        {/* 현재 적용된 필터 표시 */}
        <ActiveFilters
          priceRanges={priceRanges}
          selectedBrands={selectedBrands}
          selectedStyles={selectedStyles}
          wishlistOnly={wishlistOnly}
          sortOptions={sortOptions}
          onRemovePriceRange={handleRemovePriceRange}
          onRemoveBrand={handleRemoveBrand}
          onRemoveStyle={handleRemoveStyle}
          onRemoveWishlist={handleRemoveWishlist}
          onRemoveSort={handleRemoveSort}
          onClearAll={handleClearAll}
        />

        {/* 검색 결과 */}
        <ProductGrid
          products={paginatedProducts}
          loading={loading}
          error={error}
          noResults={noResults}
          hasMore={isFilterApplied ? hasMoreFiltered : hasMore}
          onProductClick={handleProductClick}
          onToggleLike={handleToggleLike}
          onLoadMore={handleLoadMore}
        />
      </MainContent>

      {/* 우측 필터 사이드바 */}
      <RightSide
        priceRanges={priceRanges}
        onPriceRangesChange={handlePriceRangesChange}
        selectedBrands={selectedBrands}
        onBrandsChange={setSelectedBrands}
        selectedStyles={selectedStyles}
        onStylesChange={setSelectedStyles}
        wishlistOnly={wishlistOnly}
        onWishlistChange={setWishlistOnly}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
        availableBrands={availableBrands}
        availableStyles={availableStyles}
      />

      {/* 상품 상세 모달 */}
      {selectedProduct && (
        <ClothesDetailModal
          open={isModalOpen}
          onClose={handleCloseModal}
          data={convertSearchProductToProduct(selectedProduct)}
          onLikeChange={handleModalLikeChange}
        />
      )}

      {/* 로그인 필요 토스트 */}
      <NeedLoginToast
        show={showLoginToast}
        onClose={() => setShowLoginToast(false)}
        message="로그인이 필요합니다."
      />

      {/* 맨 위로 가기 버튼 */}
      {showScrollToTop && (
        <ScrollToTopButton onClick={scrollToTop}>
          <ChevronUp size={20} />
        </ScrollToTopButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: none;
  margin: 0;
  padding: 0 0 20px 0;
  background: #0f1115;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`

const MainContent = styled.div`
  width: 80%;
  height: 100vh;
  overflow-y: auto;
  padding: 0 20px;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`

// Sidebar styles moved to RightSide component

const SearchBar = styled.div<{ isExpanded: boolean }>`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 80px auto 30px;
  border: 2px solid ${(props) => (props.isExpanded ? '#007bff' : '#e9ecef')};
  border-radius: 3px;
  background: white;
  transition: border-color 0.2s ease;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 40px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  background: transparent;
`

const ClearButton = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  transition: all 0.2s ease;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    color: #333;
    background-color: #f5f5f5;
    transform: translateY(-50%) scale(1.1);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
  }
`

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #0f1115;
  border: 1px solid #072bed;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  margin-top: 8px;
  padding: 20px;
`

const RecentSearches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`

const RecentSearchTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  margin-top: 5px;
  background: #1a1a1a;
  border: 1px solid #374151;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0f1115;
    border-color: #a8e840;
  }
`

const RecentSearchText = styled.span`
  font-size: 14px;
  color: #cccccc;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.1);
    color: #ff6b6b;
    transform: scale(1.1);
  }
`

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 280px;
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  border: 1px solid #a8e840;
  border-radius: 50%;
  color: #a8e840;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 232, 64, 0.3);
  transition: all 0.3s ease;
  z-index: 2000;

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    transform: translateY(-2px);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`
