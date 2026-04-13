import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
  useId,
} from 'react'
import styled from '@emotion/styled'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { Shirt } from 'lucide-react'
import pantsIcon from '@/common/assets/pants.svg'

gsap.registerPlugin(Observer)

// ClothingTypeIcon 스타일드 컴포넌트
const ClothingTypeIcon = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 20;

  svg,
  img {
    width: 16px;
    height: 16px;
    color: #333;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    top: 6px;
    left: 6px;

    svg,
    img {
      width: 14px;
      height: 14px;
    }
  }
`

// AnimatedCheckbox 컴포넌트 인터페이스
interface AnimatedCheckboxProps {
  checked: boolean
  onChange: () => void
}

// AnimatedCheckbox 컴포넌트
const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  checked,
  onChange,
}) => {
  const checkboxId = useId()

  return (
    <>
      <HiddenCheckboxInput
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
      />
      <CheckboxLabel htmlFor={checkboxId} $checked={checked}>
        <CheckboxSvg width="18px" height="18px" viewBox="0 0 18 18">
          <CheckboxPath
            d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
            $checked={checked}
          />
          <CheckboxPolyline points="1 9 7 14 15 4" $checked={checked} />
        </CheckboxSvg>
      </CheckboxLabel>
    </>
  )
}

import {
  type ClothingItem,
  type CodiClothingItem,
  type WishlistItem,
  type CoordinationItem,
} from '@/features/fittingroom/types'
import type { ClothesData } from '@/common/clothes_detail/types/clothes'
import { getProductDetail } from '@/common/clothes_detail/apis/clothesDetailApi'

interface HybridScrollGridProps {
  items: ClothingItem[] | CodiClothingItem[]
  activeTab: 'wishlist' | 'mycodi'
  activeCategory: 'Total' | 'Upper' | 'Lower'
  className?: string
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  isSelectionMode?: boolean
  selectedItems?: { upperId?: string; lowerId?: string }
  onItemSelect?: (itemId: string, itemType: string) => void
  onTryOn?: (itemId: string, itemType: string) => void
  isTryingOn?: boolean
  onDetailClick?: (itemData: ClothesData) => void
  rawWishlistData?: WishlistItem[]
  rawCoordinationData?: CoordinationItem[]
  // 코디 삭제 관련 props
  isDeleteMode?: boolean
  selectedCodiIds?: number[]
  onCodiSelect?: (coordinationId: number) => void
  // 현재 시착중인 아이템들
  currentTryOnItems?: { upperId?: string; lowerId?: string }
}

const HybridScrollGrid = ({
  items,
  activeTab,
  activeCategory,
  className,
  isLoading = false,
  error = null,
  onRetry,
  isSelectionMode = false,
  selectedItems = {},
  onItemSelect,
  onTryOn,
  isTryingOn = false,
  onDetailClick,
  rawWishlistData = [],
  rawCoordinationData = [],
  isDeleteMode = false,
  selectedCodiIds = [],
  onCodiSelect,
  currentTryOnItems,
}: HybridScrollGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pageInfoRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const pageInfoTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Refs for stable Observer access to current values
  const currentPageRef = useRef(1)
  const totalPagesRef = useRef(1)
  const isAnimatingRef = useRef(false)

  // 반응형 페이지당 아이템 수 계산 (4개씩 한 줄로 유지)
  // FHD 이상 해상도에서 최소 8개 보장
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1200 ? 8 : window.innerWidth >= 768 ? 8 : 4
    }
    return 8
  })

  // 화면 크기에 따른 페이지당 아이템 수 계산
  useEffect(() => {
    const calculateItemsPerPage = () => {
      // containerRef가 없으면 기본값 반환
      if (!containerRef.current) {
        return 8 // 기본 2행
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRect.height
      const containerWidth = containerRect.width
      const width = window.innerWidth

      // 컨테이너가 아직 렌더링되지 않았다면 기본값 사용
      if (containerHeight === 0 || containerWidth === 0) {
        if (width >= 1200) {
          return 8 // FHD 이상에서 최소 8개 보장
        } else if (width >= 768) {
          return 8 // 태블릿에서 8개
        } else {
          return 4 // 모바일에서 4개
        }
      }

      // 실제 사용 가능한 높이 (패딩 제외)
      const padding = 20
      const availableHeight = containerHeight - padding * 2

      // 그리드 간격 (CSS와 일치하도록 12px로 공백 감소)
      const gap = 12

      // 카드 너비 계산 (4개씩 배치)
      const cardWidth = (containerWidth - gap * 3) / 4

      // 카드 높이 계산 (모든 카드를 3:4 비율로 통일)
      // 의류 카드와 코디 카드 모두 동일한 3:4 비율 사용 (안전 마진 제거로 정확한 비율 유지)
      const cardHeight = (cardWidth * 4) / 3 // 정확한 3:4 비율

      // 한 페이지에 들어갈 행의 개수 계산 (행 간격 고려)
      // 필요한 높이 = (행 수 * 카드높이) + ((행 수-1) * 행간격)
      // availableHeight >= rows * cardHeight + (rows-1) * gap
      // availableHeight + gap >= rows * (cardHeight + gap)
      const maxRows = Math.floor((availableHeight + gap) / (cardHeight + gap))

      // 화면 크기별 최소/최대 제한
      let finalRows = Math.max(1, maxRows) // 최소 1행

      if (width >= 1200) {
        // 큰 화면: 최소 2행, 최대 4행 (FHD 해상도에서 최소 8개 보장)
        finalRows = Math.min(Math.max(finalRows, 2), 4)
      } else if (width >= 768) {
        // 중간 화면: 최소 2행, 최대 3행
        finalRows = Math.min(Math.max(finalRows, 2), 3)
      } else {
        // 모바일: 최소 1행, 최대 2행
        finalRows = Math.min(Math.max(finalRows, 1), 2)
      }

      const itemsCount = finalRows * 4 // 4개씩 한 줄

      // 최종 안전장치: 최소 4개는 항상 보장 (단, 모바일 제외)
      if (width >= 768 && itemsCount < 4) {
        return 4
      }

      return itemsCount
    }

    const updateItemsPerPage = () => {
      setItemsPerPage(calculateItemsPerPage())
    }

    // 초기 설정 (약간의 지연을 두어 DOM이 완전히 렌더링된 후 계산)
    const timer = setTimeout(updateItemsPerPage, 100)

    // 리사이즈 이벤트 리스너
    const handleResize = () => {
      // 리사이즈 시에도 약간의 지연을 두어 안정적인 계산
      setTimeout(updateItemsPerPage, 50)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeTab]) // activeTab 변경 시에도 재계산

  // activeTab 변경 시 itemsPerPage 재계산
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRect.height
      const containerWidth = containerRect.width
      const width = window.innerWidth

      if (containerHeight === 0 || containerWidth === 0) {
        if (width >= 1200) {
          setItemsPerPage(8) // FHD 이상에서 최소 8개 보장
        } else if (width >= 768) {
          setItemsPerPage(8) // 태블릿에서 8개
        } else {
          setItemsPerPage(4) // 모바일에서 4개
        }
        return
      }

      const padding = 20
      const availableHeight = containerHeight - padding * 2
      const gap = 12 // CSS와 일치하도록 12px로 공백 감소
      const cardWidth = (containerWidth - gap * 3) / 4

      // 카드 높이 계산 (모든 카드를 3:4 비율로 통일)
      // 의류 카드와 코디 카드 모두 동일한 3:4 비율 사용 (안전 마진 제거로 정확한 비율 유지)
      const cardHeight = (cardWidth * 4) / 3 // 정확한 3:4 비율

      // 한 페이지에 들어갈 행의 개수 계산 (행 간격 고려)
      const maxRows = Math.floor((availableHeight + gap) / (cardHeight + gap))
      let finalRows = Math.max(1, maxRows)

      if (width >= 1200) {
        // 큰 화면: 최소 2행, 최대 4행 (FHD 해상도에서 최소 8개 보장)
        finalRows = Math.min(Math.max(finalRows, 2), 4)
      } else if (width >= 768) {
        // 중간 화면: 최소 2행, 최대 3행
        finalRows = Math.min(Math.max(finalRows, 2), 3)
      } else {
        // 모바일: 최소 1행, 최대 2행
        finalRows = Math.min(Math.max(finalRows, 1), 2)
      }

      const itemsCount = finalRows * 4

      // 최종 안전장치: 최소 4개는 항상 보장 (단, 모바일 제외)
      if (width >= 768 && itemsCount < 4) {
        setItemsPerPage(4)
        return
      }

      setItemsPerPage(itemsCount)
    }

    // 탭 변경 후 약간의 지연을 두고 재계산
    const timer = setTimeout(updateItemsPerPage, 100)
    return () => clearTimeout(timer)
  }, [activeTab])

  // 호버 상태 추적 (카드ID별로 어떤 영역이 호버되었는지 추적)
  const [hoveredAreaState, setHoveredAreaState] = useState<{
    [cardId: string]: 'try-on' | 'detail' | null
  }>({})

  // 호버 이벤트 핸들러 - 단순한 교차 호버 효과
  const handleAreaHover = useCallback(
    (cardId: string, area: 'try-on' | 'detail') => {
      setHoveredAreaState((prev) => ({ ...prev, [cardId]: area }))
    },
    [],
  )

  const handleAreaLeave = useCallback((cardId: string) => {
    setHoveredAreaState((prev) => ({ ...prev, [cardId]: null }))
  }, [])

  // 카테고리별 필터링
  const filteredItems = useMemo(() => {
    if (activeCategory === 'Total') {
      return items
    }

    return items.filter((item) => {
      if (activeCategory === 'Upper') {
        // 상의: 상의 단일상품만 (전체 코디 제외)
        return item.type === 'top'
      }
      if (activeCategory === 'Lower') {
        // 하의: 하의 단일상품만 (전체 코디 제외)
        return item.type === 'bottom'
      }
      return false
    })
  }, [items, activeCategory])

  // 페이지별로 그룹화 (클라이언트 사이드 페이지네이션)
  const pages = useMemo(() => {
    const pageGroups = []

    // API에서 받은 데이터가 적은 경우를 고려해서 더 유연하게 처리
    const totalItems = filteredItems.length
    const maxPages = Math.min(Math.ceil(totalItems / itemsPerPage) || 1, 10) // 최대 10페이지

    for (let i = 0; i < maxPages; i++) {
      const startIndex = i * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const pageItems = filteredItems.slice(startIndex, endIndex)

      if (pageItems.length > 0) {
        pageGroups.push(pageItems)
      } else if (i === 0 && filteredItems.length === 0) {
        // 빈 페이지라도 첫 번째는 추가
        pageGroups.push([])
      }
    }

    return pageGroups
  }, [filteredItems, itemsPerPage])

  const totalPages = pages.length || 1

  // Update refs when state changes to provide stable access for Observer
  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])

  useEffect(() => {
    totalPagesRef.current = totalPages
  }, [totalPages])

  useEffect(() => {
    isAnimatingRef.current = isAnimating
  }, [isAnimating])

  // PageInfo 자동 표시/숨김 함수
  const showPageInfoTemporarily = useCallback(() => {
    const pageInfo = pageInfoRef.current
    if (!pageInfo) return

    // 이전 타이머가 있으면 클리어
    if (pageInfoTimeoutRef.current) {
      clearTimeout(pageInfoTimeoutRef.current)
    }

    // PageInfo 애니메이션으로 나타나기 (fadein + slide up)
    gsap.fromTo(
      pageInfo,
      {
        autoAlpha: 0,
        y: 20,
        scale: 0.9,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      },
    )

    // 2초 후 fadeout 애니메이션으로 숨기기 (slide down)
    pageInfoTimeoutRef.current = setTimeout(() => {
      gsap.to(pageInfo, {
        autoAlpha: 0,
        y: 10,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }, 2000)
  }, [])

  // 페이지 이동 함수
  const goToPage = useCallback(
    (pageNumber: number) => {
      if (isAnimating || pageNumber === currentPage) return

      const previousPage = currentPage
      setIsAnimating(true)
      // 즉시 페이지 상태 업데이트
      setCurrentPage(pageNumber)
      // PageInfo 임시 표시
      showPageInfoTemporarily()

      const container = containerRef.current
      if (!container) return

      // 이전 페이지 숨기기
      const allPages = container.querySelectorAll('.page-section')
      allPages.forEach((page, index) => {
        if (index === previousPage - 1) {
          gsap.to(page, {
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          })
        }
      })

      // 새 페이지 보이기
      const targetPage = container.querySelector(
        `.page-section:nth-child(${pageNumber})`,
      )
      if (targetPage) {
        gsap.fromTo(
          targetPage,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            onComplete: () => {
              setIsAnimating(false)
            },
          },
        )
      } else {
        // 대상 페이지를 찾지 못한 경우에도 애니메이션 상태를 리셋
        console.warn(`Page ${pageNumber} not found, resetting animation state`)
        setIsAnimating(false)
      }
    },
    [isAnimating, currentPage, showPageInfoTemporarily],
  )

  // GSAP Observer - 초기화 완료 후에만 생성하여 첫 페이지 스크롤 문제 해결
  useEffect(() => {
    if (!isInitialized || totalPages <= 1 || !containerRef.current) return

    const container = containerRef.current

    // 모든 초기화가 완료된 후 Observer 생성
    const timer = setTimeout(() => {
      const observer = Observer.create({
        target: container,
        type: 'wheel,touch,pointer',
        wheelSpeed: -1,
        onDown: () => {
          // 직접 구현으로 안정성 확보
          if (isAnimatingRef.current || totalPagesRef.current <= 1) return

          const prev =
            currentPageRef.current <= 1
              ? totalPagesRef.current
              : currentPageRef.current - 1

          // 직접 애니메이션 실행
          if (isAnimatingRef.current || prev === currentPageRef.current) return

          const previousPage = currentPageRef.current
          isAnimatingRef.current = true
          currentPageRef.current = prev
          setCurrentPage(prev)
          setIsAnimating(true)

          // GSAP 애니메이션
          const allPages = container.querySelectorAll('.page-section')
          allPages.forEach((page, index) => {
            if (index === previousPage - 1) {
              gsap.to(page, {
                autoAlpha: 0,
                duration: 0.5,
                ease: 'power2.inOut',
              })
            }
          })

          const targetPage = container.querySelector(
            `.page-section:nth-child(${prev})`,
          )
          if (targetPage) {
            gsap.fromTo(
              targetPage,
              { autoAlpha: 0, y: 50 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
                onComplete: () => {
                  isAnimatingRef.current = false
                  setIsAnimating(false)
                },
              },
            )
          } else {
            isAnimatingRef.current = false
            setIsAnimating(false)
          }
        },
        onUp: () => {
          // 직접 구현으로 안정성 확보
          if (isAnimatingRef.current || totalPagesRef.current <= 1) return

          const next =
            currentPageRef.current >= totalPagesRef.current
              ? 1
              : currentPageRef.current + 1

          // 직접 애니메이션 실행
          if (isAnimatingRef.current || next === currentPageRef.current) return

          const previousPage = currentPageRef.current
          isAnimatingRef.current = true
          currentPageRef.current = next
          setCurrentPage(next)
          setIsAnimating(true)

          // GSAP 애니메이션
          const allPages = container.querySelectorAll('.page-section')
          allPages.forEach((page, index) => {
            if (index === previousPage - 1) {
              gsap.to(page, {
                autoAlpha: 0,
                duration: 0.5,
                ease: 'power2.inOut',
              })
            }
          })

          const targetPage = container.querySelector(
            `.page-section:nth-child(${next})`,
          )
          if (targetPage) {
            gsap.fromTo(
              targetPage,
              { autoAlpha: 0, y: 50 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
                onComplete: () => {
                  isAnimatingRef.current = false
                  setIsAnimating(false)
                },
              },
            )
          } else {
            isAnimatingRef.current = false
            setIsAnimating(false)
          }
        },
        tolerance: 10,
        preventDefault: true,
      })

      return () => observer.kill()
    }, 200) // 초기화 완료 후 추가 지연

    return () => clearTimeout(timer)
  }, [isInitialized, totalPages]) // 초기화 완료와 totalPages에만 의존

  // 초기 설정 - 완료 후 초기화 상태 업데이트
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 모든 페이지 숨기고 첫 번째 페이지만 보이기
    const allPages = container.querySelectorAll('.page-section')
    allPages.forEach((page, index) => {
      gsap.set(page, {
        autoAlpha: index === 0 ? 1 : 0,
        y: 0,
      })
    })

    setCurrentPage(1)

    // 초기 설정 완료 후 초기화 상태 업데이트 (약간의 지연 후)
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [pages])

  // 탭/카테고리 변경 시 첫 페이지로 이동 및 초기화 재설정
  useEffect(() => {
    if (totalPages > 0) {
      // 초기화 상태 재설정
      setIsInitialized(false)
      setCurrentPage(1)

      const container = containerRef.current
      if (container) {
        const allPages = container.querySelectorAll('.page-section')
        allPages.forEach((page, index) => {
          gsap.set(page, {
            autoAlpha: index === 0 ? 1 : 0,
            y: 0,
          })
        })

        // 탭/카테고리 변경 후 초기화 완료 및 PageInfo 표시
        setTimeout(() => {
          setIsInitialized(true)
          showPageInfoTemporarily()
        }, 300)
      }
    }
  }, [activeTab, activeCategory, totalPages, showPageInfoTemporarily])

  // PageInfo 초기 상태 설정 및 첫 표시
  useEffect(() => {
    const pageInfo = pageInfoRef.current
    if (pageInfo) {
      // 초기에는 숨김 상태로 설정
      gsap.set(pageInfo, { autoAlpha: 0, y: 20, scale: 0.9 })

      // 컴포넌트 마운트 후 잠시 후 첫 표시
      const timer = setTimeout(() => {
        showPageInfoTemporarily()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [showPageInfoTemporarily])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (pageInfoTimeoutRef.current) {
        clearTimeout(pageInfoTimeoutRef.current)
      }
    }
  }, [])

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <LoadingState>
        <LoadingSpinner />
        <LoadingMessage>찜목록을 불러오는 중...</LoadingMessage>
      </LoadingState>
    )
  }

  // 에러 상태 처리
  if (error) {
    return (
      <ErrorState>
        <ErrorMessage>{error}</ErrorMessage>
        {onRetry && <RetryButton onClick={onRetry}>다시 시도</RetryButton>}
      </ErrorState>
    )
  }

  // 빈 상태 처리
  if (filteredItems.length === 0) {
    return (
      <EmptyState>
        <EmptyMessage>
          {activeTab === 'wishlist'
            ? '찜 목록이 비어있습니다'
            : '내 코디 목록이 비어있습니다'}
        </EmptyMessage>
        <EmptySubMessage>아이템을 추가해보세요!</EmptySubMessage>
      </EmptyState>
    )
  }

  return (
    <HybridContainer className={className} ref={containerRef}>
      {pages.map((pageItems, pageIndex) => (
        <PageSection
          key={`page-${pageIndex}-${activeTab}-${activeCategory}`}
          className="page-section"
        >
          <ProductGrid>
            {pageItems.map((item, itemIndex) => {
              // 코디 아이템인지 확인 (TypeScript 타입 가드)
              const isCodiItem =
                'coordinationId' in item && item.coordinationId !== undefined
              const codiItem = isCodiItem ? (item as CodiClothingItem) : null
              const cardId = `${item.id}-${pageIndex}-${itemIndex}`

              // 현재 카드의 호버 상태 가져오기
              const currentHoveredArea = hoveredAreaState[cardId]

              // 이미지 URL들을 직접 계산 (최적화를 위해 상수로 추출)
              const upperImage = codiItem?.upperImage
              const lowerImage = codiItem?.lowerImage

              // 체크박스 표시 조건 디버깅
              const shouldShowCheckbox =
                (activeTab === 'wishlist' && isSelectionMode) ||
                (activeTab === 'mycodi' && isDeleteMode)

              // 체크박스 모드에서 카드 클릭 핸들러
              const handleCardClick = () => {
                if (shouldShowCheckbox) {
                  if (activeTab === 'wishlist') {
                    onItemSelect?.(item.id, item.type)
                  } else {
                    // 내 코디에서 삭제 모드
                    if (codiItem?.coordinationId !== undefined) {
                      onCodiSelect?.(codiItem.coordinationId)
                    }
                  }
                }
              }

              // 체크박스가 선택된 상태인지 확인
              const isSelected =
                shouldShowCheckbox &&
                (activeTab === 'wishlist'
                  ? // 찜목록: 상의/하의 선택 확인
                    (item.type === 'top' &&
                      selectedItems.upperId === item.id) ||
                    (item.type === 'bottom' &&
                      selectedItems.lowerId === item.id)
                  : // 내 코디: 코디 ID 선택 확인
                    codiItem?.coordinationId !== undefined &&
                    selectedCodiIds.includes(codiItem.coordinationId))

              // 현재 시착중인 아이템인지 확인
              const isCurrentlyTryingOn =
                currentTryOnItems &&
                ((item.type === 'top' &&
                  currentTryOnItems.upperId === item.id) ||
                  (item.type === 'bottom' &&
                    currentTryOnItems.lowerId === item.id))

              return (
                <ClothingItemCard
                  key={cardId}
                  className="clothing-item-card"
                  onClick={shouldShowCheckbox ? handleCardClick : undefined}
                  $isCheckboxMode={shouldShowCheckbox}
                  $isTryingOn={isCurrentlyTryingOn}
                  $isCodiCard={activeTab === 'mycodi'}
                >
                  {/* 체크박스 (찜목록에서 선택 모드일 때 또는 내 코디에서 삭제 모드일 때 표시) */}
                  {shouldShowCheckbox && (
                    <CheckboxContainer
                      onClick={(e) => {
                        e.stopPropagation() // 이벤트 버블링 방지
                      }}
                    >
                      <AnimatedCheckbox
                        checked={
                          activeTab === 'wishlist'
                            ? // 찜목록: 상의/하의 선택 확인
                              (item.type === 'top' &&
                                selectedItems.upperId === item.id) ||
                              (item.type === 'bottom' &&
                                selectedItems.lowerId === item.id)
                            : // 내 코디: 코디 ID 선택 확인
                              codiItem?.coordinationId !== undefined &&
                              selectedCodiIds.includes(codiItem.coordinationId)
                        }
                        onChange={() => {
                          // AnimatedCheckbox의 onChange - label 클릭 시 실행되는 실제 로직
                          if (activeTab === 'wishlist') {
                            onItemSelect?.(item.id, item.type)
                          } else {
                            // 내 코디에서 삭제 모드
                            if (codiItem?.coordinationId !== undefined) {
                              onCodiSelect?.(codiItem.coordinationId)
                            }
                          }
                        }}
                      />
                    </CheckboxContainer>
                  )}

                  {/* 단일 상품과 전체 코디에 따른 이미지 구조 분기 */}
                  {codiItem?.isFullCoordination ? (
                    // 전체 코디: 분할 이미지 구조 사용
                    <SplitCoordinationImage
                      className="clothing-image"
                      data-image-container="split"
                      $isFullCoordination={true}
                    >
                      <MemoizedUpperHalf
                        $imageUrl={upperImage}
                        $isSelected={isSelected}
                      />
                      <MemoizedLowerHalf
                        $imageUrl={lowerImage}
                        $isSelected={isSelected}
                      />
                      {/* 카드 전체를 상하로 나누어 호버 시 흑백 필터 적용 */}
                      <CardUpperHoverOverlay
                        $isVisible={currentHoveredArea === 'try-on'}
                      />
                      <CardLowerHoverOverlay
                        $isVisible={currentHoveredArea === 'detail'}
                      />
                    </SplitCoordinationImage>
                  ) : (
                    // 단일 상품: 전체 이미지 구조 사용 (호버 시 필터 오버레이 적용)
                    <SingleProductImage
                      className="clothing-image"
                      data-image-container="single"
                      $imageUrl={item.image}
                      $isSelected={isSelected}
                    >
                      <SingleProductFilterOverlay
                        $isVisible={currentHoveredArea === 'try-on'}
                        $area="upper"
                      />
                      <SingleProductFilterOverlay
                        $isVisible={currentHoveredArea === 'detail'}
                        $area="lower"
                      />
                      {/* 찜목록 Total 탭일 때만 의류 타입 아이콘 표시 */}
                      {activeTab === 'wishlist' &&
                        activeCategory === 'Total' && (
                          <ClothingTypeIcon>
                            {item.type === 'top' ? (
                              <Shirt />
                            ) : item.type === 'bottom' ? (
                              <img src={pantsIcon} alt="pants" />
                            ) : null}
                          </ClothingTypeIcon>
                        )}
                    </SingleProductImage>
                  )}

                  {/* 호버 시 나타나는 버튼 오버레이 (체크박스 모드가 아닐 때만 표시) */}
                  {!shouldShowCheckbox && (
                    <HoverOverlay data-hover-overlay>
                      <TryOnArea
                        onMouseEnter={() => handleAreaHover(cardId, 'try-on')}
                        onMouseLeave={() => handleAreaLeave(cardId)}
                      >
                        <TryOnButton
                          data-try-on-button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onTryOn && !isTryingOn) {
                              onTryOn(item.id, item.type)
                            }
                          }}
                          disabled={isTryingOn}
                        >
                          {isTryingOn ? 'AI 처리중...' : '시착하기'}
                        </TryOnButton>
                      </TryOnArea>
                      <DetailArea
                        onMouseEnter={() => handleAreaHover(cardId, 'detail')}
                        onMouseLeave={() => handleAreaLeave(cardId)}
                      >
                        <DetailButton
                          data-detail-button
                          onClick={async (e) => {
                            e.stopPropagation()

                            let clothesData: ClothesData

                            if (activeTab === 'wishlist') {
                              // 찜목록: API 호출을 통해 실제 상품 정보 가져오기
                              try {
                                const productDetailResponse =
                                  await getProductDetail(item.id)

                                if (
                                  productDetailResponse.success &&
                                  productDetailResponse.data
                                ) {
                                  clothesData = {
                                    productId:
                                      productDetailResponse.data.productId,
                                    productBrand:
                                      productDetailResponse.data.productBrand,
                                    productName:
                                      productDetailResponse.data.productName,
                                    productPrice:
                                      productDetailResponse.data.productPrice,
                                    productUrl:
                                      productDetailResponse.data.productUrl,
                                    productImageUrl:
                                      productDetailResponse.data
                                        .productImageUrl,
                                    styleList:
                                      productDetailResponse.data.styleList,
                                    liked: productDetailResponse.data.isLiked,
                                  }
                                } else {
                                  // API 호출 실패 시 기본값 사용
                                  const wishlistItem = rawWishlistData.find(
                                    (raw) => raw.productId === item.id,
                                  )
                                  clothesData = {
                                    productId: item.id,
                                    productBrand: 'Unknown Brand',
                                    productName: 'Unknown Item',
                                    productPrice: 0,
                                    productUrl: '',
                                    productImageUrl:
                                      wishlistItem?.productImageUrl ||
                                      item.image,
                                    styleList: [],
                                    liked: true,
                                  }
                                }
                              } catch (error) {
                                console.error(
                                  '상품 상세 정보 조회 실패:',
                                  error,
                                )
                                // 에러 발생 시 기본값 사용
                                const wishlistItem = rawWishlistData.find(
                                  (raw) => raw.productId === item.id,
                                )
                                clothesData = {
                                  productId: item.id,
                                  productBrand: 'Unknown Brand',
                                  productName: 'Unknown Item',
                                  productPrice: 0,
                                  productUrl: '',
                                  productImageUrl:
                                    wishlistItem?.productImageUrl || item.image,
                                  styleList: [],
                                  liked: true,
                                }
                              }
                            } else {
                              // 코디목록: rawCoordinationData에서 실제 데이터 찾기
                              const codiItem = item as CodiClothingItem
                              const coordinationId = codiItem.coordinationId
                              const coordinationData = rawCoordinationData.find(
                                (raw) => raw.coordinationId === coordinationId,
                              )

                              clothesData = {
                                productId:
                                  coordinationId?.toString() || item.id,
                                productBrand: 'Unknown Brand', // 코디 데이터에는 브랜드 정보 없음
                                productName: codiItem.isFullCoordination
                                  ? 'Full Coordination'
                                  : 'Single Item',
                                productPrice: 0, // 코디 데이터에는 가격 정보 없음
                                productUrl: '',
                                productImageUrl:
                                  coordinationData?.upperImageUrl ||
                                  coordinationData?.lowerImageUrl ||
                                  item.image,
                                styleList: [],
                                liked: false,
                              }
                            }

                            onDetailClick?.(clothesData)
                          }}
                        >
                          상세 페이지
                        </DetailButton>
                      </DetailArea>
                    </HoverOverlay>
                  )}
                </ClothingItemCard>
              )
            })}
          </ProductGrid>
        </PageSection>
      ))}

      {/* 우측 페이지 네비게이션 */}
      {totalPages > 1 && (
        <PageSidebar>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageIndicatorBar
              key={i + 1}
              $isActive={currentPage === i + 1}
              onClick={() => goToPage(i + 1)}
              disabled={isAnimating}
            />
          ))}
        </PageSidebar>
      )}

      {/* PageInfo - 항상 렌더링되지만 애니메이션으로 표시/숨김 */}
      <PageInfo ref={pageInfoRef}>
        <PageText>
          {currentPage} / {totalPages} 페이지
        </PageText>
        <ItemsText>총 {filteredItems.length}개 상품</ItemsText>
      </PageInfo>
    </HybridContainer>
  )
}

// Styled Components
const HybridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%; /* GridContainer의 동적 크기를 따라가도록 변경 */
  overflow: hidden; /* 넘침 방지 */
  background: transparent;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 상품 카드들을 수직으로 중앙정렬 */
  box-sizing: border-box; /* 크기 계산 일관성 유지 */

  /* 모든 화면 크기에서 동적 높이 사용 */
  @media (min-width: 1440px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 300px; /* 최소 높이만 유지 */
  }

  @media (min-width: 1200px) and (max-width: 1439px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 250px; /* 최소 높이만 유지 */
  }

  /* 반응형 높이 조정 */
  @media (max-width: 768px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 200px; /* 최소 높이만 유지 */
    padding-right: 15px; /* 모바일에서 더 작은 여백 */
  }

  @media (max-width: 480px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 150px; /* 최소 높이만 유지 */
    padding-right: 12px; /* 작은 화면에서 최소 여백 */
  }
`

const PageSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start; /* ProductGrid를 상단에 위치하여 공백 문제 해결 */
  justify-content: center; /* ProductGrid를 수평 중앙에 위치 */
  flex-direction: column; /* 세로 방향으로 배치하여 자연스러운 높이 계산 */
  opacity: 0;
  visibility: hidden;
  box-sizing: border-box; /* 패딩을 전체 크기에 포함하여 크기 불일치 해결 */

  /* 대형 디스플레이 */
  @media (min-width: 1440px) {
    padding: 18px; /* 공백 감소 (24px → 18px) */
  }

  @media (min-width: 1200px) and (max-width: 1439px) {
    padding: 16px; /* 공백 감소 (22px → 16px) */
  }

  /* 반응형 패딩 조정 */
  @media (max-width: 768px) {
    padding: 12px; /* 공백 감소 (16px → 12px) */
  }

  @media (max-width: 480px) {
    padding: 8px; /* 공백 감소 (12px → 8px) */
  }
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px; /* 공백 감소를 위해 gap 축소 (18px → 12px) */
  max-width: 1450px; /* 그리드 최대 너비 추가 확장 (1400px → 1450px) */
  width: 100%;
  /* height: 100% 제거 - 카드들이 자연스러운 비율을 유지할 수 있도록 함 */
  align-items: start; /* stretch에서 start로 변경 - 카드가 강제로 늘어나지 않도록 함 */
  justify-items: center;
  justify-content: space-between; /* 공간 효율적 활용 */
  isolation: isolate;
  margin: 0 auto; /* 중앙 정렬 */
  box-sizing: border-box; /* 크기 계산 일관성 보장 */
  /* min-height: 100% 제거 - aspect-ratio가 우선되도록 함 */

  /* 대형 디스플레이에서 최적화된 레이아웃 */
  @media (min-width: 1401px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px; /* 공백 감소 (20px → 14px) */
    padding: 0px 10px 0px 0; /* 충분한 우측 여백 유지 */
  }

  @media (min-width: 1200px) and (max-width: 1400px) {
    gap: 12px; /* 공백 감소 (16px → 12px) */
    padding: 0px 10px 0px 0; /* 축소된 사이드바에 맞춰 적절한 여백 (28px → 35px) */
    max-width: 1350px; /* 중간 크기 화면에서 적절한 너비 */
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; /* 공백 감소 (16px → 10px) */
    padding: 0px 10px 0px 0; /* 태블릿에서 적절한 여백 (25px → 30px) */
    max-width: 1200px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px; /* 공백 감소 (14px → 8px) */
    padding: 0px 10px 0px 0; /* 모바일에서 적절한 여백 (20px → 25px) */
    max-width: 100%;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px; /* 공백 감소 (12px → 6px) */
    padding: 0px 10px 0px 0; /* 작은 화면에서 적절한 여백 (18px → 22px) */
    max-width: 100%;
  }
`

const ClothingItemCard = styled.div<{
  $isCheckboxMode?: boolean
  $isTryingOn?: boolean
  $isCodiCard?: boolean
}>`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: ${({ $isCheckboxMode }) => ($isCheckboxMode ? 'pointer' : 'default')};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: #f8f8f8;
  box-shadow: ${({ $isTryingOn }) =>
    $isTryingOn
      ? '0 0 0 3px #072bed, 0 8px 25px rgba(7, 43, 237, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.06)'};
  margin: 0 auto;
  border: ${({ $isTryingOn }) => ($isTryingOn ? '2px solid #072bed' : 'none')};

  /* 모든 카드를 정확한 3:4 비율로 통일 */
  aspect-ratio: 3 / 4 !important; /* 가로:세로 = 3:4 비율 강제 적용 */
  height: auto !important; /* aspect-ratio에 의해 높이가 자동 계산되도록 강제 설정 */
  min-height: unset !important; /* 부모에서 오는 min-height 제약 제거 */
  max-height: unset !important; /* 부모에서 오는 max-height 제약 제거 */

  &:hover {
    transform: scale(1.03) translateY(-2px);
    box-shadow: ${({ $isTryingOn }) =>
      $isTryingOn
        ? '0 0 0 3px #072bed, 0 12px 35px rgba(7, 43, 237, 0.4)'
        : '0 8px 25px rgba(0, 0, 0, 0.12)'};
  }

  /* 카드 호버 시 버튼 오버레이 표시 */
  &:hover [data-hover-overlay] {
    opacity: 1;
    visibility: visible;
  }
`

// 전체 코디용 분할 이미지 컨테이너
const SplitCoordinationImage = styled.div<{ $isFullCoordination?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: filter;
`

// 상의 이미지 (상단 절반) - 상의 전체 이미지 표시
const UpperHalf = styled.div<{
  $imageUrl?: string
  $isSelected?: boolean
}>`
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-repeat: no-repeat;
  background-size: contain; /* 이미지 전체가 보이도록 contain 사용 */
  background-position: center top; /* 상의 이미지는 상단 중앙 정렬로 최적화 */
  position: relative;
  filter: ${(props) =>
    props.$isSelected ? 'grayscale(100%) brightness(0.15)' : 'none'};
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
  }
`

// 하의 이미지 (하단 절반) - 하의 전체 이미지 표시
const LowerHalf = styled.div<{
  $imageUrl?: string
  $isSelected?: boolean
}>`
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-repeat: no-repeat;
  background-size: contain; /* 이미지 전체가 보이도록 contain 사용 */
  background-position: center bottom; /* 하의 이미지는 하단 중앙 정렬로 최적화 */
  filter: ${(props) =>
    props.$isSelected ? 'grayscale(100%) brightness(0.15)' : 'none'};
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`

// 단일 상품용 전체 이미지 컨테이너
const SingleProductImage = styled.div<{
  $imageUrl?: string
  $isSelected?: boolean
}>`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-repeat: no-repeat;
  background-size: cover; /* 카드 전체를 덮도록 cover 사용 */
  background-position: center; /* 중앙 정렬 */
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: ${(props) =>
    props.$isSelected ? 'grayscale(100%) brightness(0.15)' : 'none'};

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`

// 단일 상품용 필터 오버레이 (영역별 호버 시 필터만 적용)
const SingleProductFilterOverlay = styled.div<{
  $isVisible?: boolean
  $area?: 'upper' | 'lower'
}>`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 10;

  ${(props) =>
    props.$area === 'upper' &&
    `
    top: 0;
  `}

  ${(props) =>
    props.$area === 'lower' &&
    `
    bottom: 0;
  `}
`

// 전체 코디 카드용 상단 호버 오버레이 (카드 상단 50% 전체에 흑백 필터 적용)
const CardUpperHoverOverlay = styled.div<{
  $isVisible?: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 15; /* 이미지 위에, 버튼 아래에 위치 */
  backdrop-filter: grayscale(100%) brightness(0.3);
  -webkit-backdrop-filter: grayscale(100%) brightness(0.3);
`

// 전체 코디 카드용 하단 호버 오버레이 (카드 하단 50% 전체에 흑백 필터 적용)
const CardLowerHoverOverlay = styled.div<{
  $isVisible?: boolean
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 15; /* 이미지 위에, 버튼 아래에 위치 */
  backdrop-filter: grayscale(100%) brightness(0.3);
  -webkit-backdrop-filter: grayscale(100%) brightness(0.3);
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`

const EmptyMessage = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
`

const EmptySubMessage = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  color: #999;
`

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingMessage = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 16px;
  color: #666;
`

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`

const ErrorMessage = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #d32f2f;
  margin-bottom: 16px;
  line-height: 1.5;
`

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`

const PageSidebar = styled.div`
  position: absolute;
  right: 8px; /* 더 오른쪽으로 이동 */
  top: 50%;
  transform: translateY(-50%); /* Y축만 중앙 정렬 */
  display: flex;
  flex-direction: column;
  gap: 8px; /* 간격 축소 (10px → 8px) */
  padding: 12px 5px;
  background: linear-gradient(
    135deg,
    rgba(45, 52, 64, 0.95) 0%,
    rgba(32, 38, 48, 0.95) 100%
  );
  border-radius: 18px; /* 반지름 축소 (24px → 18px) */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000; /* z-index를 더 높게 설정 */
  opacity: 1;
  visibility: visible;
  width: 16px; /* 폭을 절반으로 축소 (32px → 16px) */

  @media (max-width: 768px) {
    right: 6px; /* 더 오른쪽으로 이동 */
    transform: translateY(-50%);
    padding: 8px 4px; /* 패딩 축소 (12px 6px → 8px 4px) */
    gap: 6px; /* 간격 축소 (8px → 6px) */
    border-radius: 14px; /* 반지름 축소 (20px → 14px) */
    width: 12px; /* 모바일에서 더 작게 (기존 16px → 12px) */
  }

  @media (max-width: 480px) {
    right: 4px; /* 더 오른쪽으로 이동 */
    transform: translateY(-50%);
    padding: 6px 3px; /* 패딩 축소 (10px 5px → 6px 3px) */
    gap: 4px; /* 간격 축소 (6px → 4px) */
    border-radius: 12px; /* 반지름 축소 (16px → 12px) */
    width: 10px; /* 작은 화면에서 더 작게 (기존 12px → 10px) */
  }
`

const PageIndicatorBar = styled.button<{ $isActive: boolean }>`
  width: 4px; /* 폭 축소 (6px → 4px) */
  height: 28px; /* 높이 축소 (36px → 28px) */
  border: none;
  border-radius: 2px; /* 반지름 축소 (3px → 2px) */
  background: ${(props) =>
    props.$isActive
      ? 'linear-gradient(180deg, #a8e840 0%, rgba(168, 232, 64, 0.9) 100%)'
      : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid
    ${(props) =>
      props.$isActive ? 'rgba(168, 232, 64, 0.8)' : 'rgba(255, 255, 255, 0.2)'};

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$isActive
        ? 'linear-gradient(180deg, #a8e840 0%, rgba(168, 232, 64, 0.95) 100%)'
        : 'rgba(255, 255, 255, 0.6)'};
    transform: scaleX(1.3);
    box-shadow: 0 4px 12px rgba(168, 232, 64, 0.4);
    border-color: rgba(168, 232, 64, 0.8);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 2px; /* 모바일에서 더 작게 (3px → 2px) */
    height: 22px; /* 높이 축소 (28px → 22px) */
  }

  @media (max-width: 480px) {
    width: 2px; /* 작은 화면에서 동일 (3px → 2px) */
    height: 18px; /* 높이 축소 (24px → 18px) */
  }
`

const PageInfo = styled.div`
  position: absolute;
  bottom: 50px; /* 축소된 코디 버튼 컨테이너 위쪽에 위치 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  z-index: 1000;
  opacity: 1; /* 항상 표시되도록 변경 */
  visibility: visible;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  pointer-events: none; /* 클릭 이벤트 차단 */

  @media (max-width: 768px) {
    bottom: 45px;
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    bottom: 40px;
    padding: 5px 10px;
    border-radius: 12px;
  }
`

const PageText = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const ItemsText = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 11px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`

// 체크박스 관련 스타일
const CheckboxContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 30;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: pointer;
`

// AnimatedCheckbox styled components
const HiddenCheckboxInput = styled.input`
  display: none;
`

const CheckboxLabel = styled.label<{ $checked: boolean }>`
  cursor: pointer;
  position: relative;
  margin: auto;
  width: 18px;
  height: 18px;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);

  &:hover svg {
    stroke: #4285f4;
  }

  ${({ $checked }) =>
    $checked &&
    `
    svg {
      stroke: #4285f4;
    }
  `}
`

const CheckboxSvg = styled.svg`
  position: relative;
  z-index: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #c8ccd4;
  stroke-width: 1.5;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
`

const CheckboxPath = styled.path<{ $checked: boolean }>`
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
  transition: all 0.3s linear;

  ${({ $checked }) =>
    $checked &&
    `
    stroke: #4285f4;
    stroke-dashoffset: 60;
  `}
`

const CheckboxPolyline = styled.polyline<{ $checked: boolean }>`
  stroke-dasharray: 22;
  stroke-dashoffset: 66;
  transition: all 0.2s linear;
  transition-delay: ${({ $checked }) => ($checked ? '0.15s' : '0s')};

  ${({ $checked }) =>
    $checked &&
    `
    stroke: #4285f4;
    stroke-dashoffset: 42;
  `}
`

// 시착하기 영역 (상단 50%) - 단순화
const TryOnArea = styled.div`
  flex: 1;
  display: flex;
  width: 100%
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  transition: background 0.3s ease;
`

// 상세페이지 영역 (하단 50%) - 단순화
const DetailArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  transition: background 0.3s ease;
`

// 호버 오버레이 - 버튼들을 포함하는 컨테이너
const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 20; /* 흑백 오버레이보다 위에 */
`

const TryOnButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 100%;
  background: transparent; /* 배경색 제거 */
  color: ${(props) => (props.disabled ? '#ccc' : 'white')};
  border: none;
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 25; /* 흑백 오버레이보다 위에 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* 텍스트 가독성 향상 */

  &:hover {
    transform: ${(props) => (props.disabled ? 'none' : 'translateY(-1px)')};
  }

  &:active {
    transform: ${(props) => (props.disabled ? 'none' : 'translateY(0)')};
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`

const DetailButton = styled.button`
  width: 100%;
  height: 100%;
  background: transparent; /* 배경색 제거 */
  color: white;
  border: none;
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 25; /* 흑백 오버레이보다 위에 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* 텍스트 가독성 향상 */

  &:hover {
    transform: translateY(1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`

// React.memo로 최적화된 UpperHalf 컴포넌트
const MemoizedUpperHalf = memo<{
  $imageUrl?: string
  $isSelected?: boolean
}>(({ $imageUrl, $isSelected }) => {
  return <UpperHalf $imageUrl={$imageUrl} $isSelected={$isSelected} />
})

MemoizedUpperHalf.displayName = 'MemoizedUpperHalf'

// React.memo로 최적화된 LowerHalf 컴포넌트
const MemoizedLowerHalf = memo<{
  $imageUrl?: string
  $isSelected?: boolean
}>(({ $imageUrl, $isSelected }) => {
  return <LowerHalf $imageUrl={$imageUrl} $isSelected={$isSelected} />
})

MemoizedLowerHalf.displayName = 'MemoizedLowerHalf'

export default HybridScrollGrid
