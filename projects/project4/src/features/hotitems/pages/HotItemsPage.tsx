/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronUp } from 'lucide-react'
import CategoryTabs from '@/features/hotitems/components/CategoryTabs'
import ProductCardSkeleton from '@/common/components/ProductCardSkeleton'
import CategorySection from '@/features/hotitems/components/CategorySection'
import ClothesDetailModal from '@/common/clothes_detail/pages/ClothesDetailModal'
import {
  getPopularProducts,
  addToWishlist,
  getLikedProducts,
  sendUserMetrics,
  type PopularProduct,
} from '@/features/hotitems/apis/hotItemsApi'
import { getProductDetail } from '@/common/clothes_detail/apis/clothesDetailApi'
import type { ClothesData } from '@/common/clothes_detail/types/clothes'
import { useAuthStore } from '@/common/auth'
import NeedLoginToast from '@/common/components/NeedLoginToast'

type CategoryType = 'upper' | 'lower'

type UserActionLog = {
  userId: number
  timestamp: string
  actionType: 'like' | 'unlike' | 'goDetail'
  productId: string | null
  searchTerm: string | null
}

const UPPER_CATEGORIES = [
  { key: 'hoodie', label: 'Hoodie' },
  { key: 'knitSweater', label: 'Knit' },
  { key: 'longSleeve', label: 'Long Sleeve' },
  { key: 'manToManSweat', label: 'Sweatshirt' },
  { key: 'piqueCollarTee', label: 'Polo' },
  { key: 'shirtBlouse', label: 'Shirt' },
  { key: 'shortSleeve', label: 'Short Sleeve' },
  { key: 'sleevelessTee', label: 'Sleeveless' },
]

const LOWER_CATEGORIES = [
  { key: 'cotton', label: 'Cotton' },
  { key: 'denim', label: 'Denim' },
  { key: 'leggings', label: 'Leggings' },
  { key: 'short', label: 'Shorts' },
  { key: 'suit', label: 'Suit' },
  { key: 'training', label: 'Training' },
]

interface CategoryProducts {
  [key: string]: {
    products: PopularProduct[]
    page: number
    totalPages: number
    last: boolean
    loading: boolean
    error: string | null
  }
}

export default function HotItemsPage() {
  const { member, isLoggedIn } = useAuthStore()
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('upper')
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>({})
  const [selectedProduct, setSelectedProduct] = useState<ClothesData | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likedProductIds, setLikedProductIds] = useState<Set<string>>(new Set())
  const [likedProductsLoaded, setLikedProductsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('upper/hoodie')
  const [showLoginToast, setShowLoginToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  // 단일 섹션 렌더링으로 스크롤/관찰 상태 제거

  // 컴포넌트 마운트 시 찜한 상품 목록 가져오기 (로그인 상태일 때만)
  useEffect(() => {
    const fetchLikedProducts = async () => {
      // 로그인 상태가 아닐 때는 찜 목록을 빈 상태로 초기화
      if (!isLoggedIn) {
        setLikedProductIds(new Set())
        setLikedProductsLoaded(true)
        return
      }

      try {
        const likedProducts = await getLikedProducts()
        const likedIds = new Set(likedProducts.map((item) => item.productId))
        setLikedProductIds(likedIds)
        setLikedProductsLoaded(true)

        // 메인페이지와 동일하게 초기 로드 시에는 세션스토리지에 저장하지 않음
        // 찜하기 액션 시에만 세션스토리지에 로그 저장
      } catch (err) {
        console.error('Error fetching liked products:', err)
        setLikedProductsLoaded(true)
      }
    }

    fetchLikedProducts()
  }, [isLoggedIn, member?.memberId])

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

  // 특정 카테고리의 상품 가져오기
  const fetchCategoryProducts = useCallback(
    async (
      category: CategoryType,
      subCategory: string,
      page: number = 0,
      append: boolean = false,
    ) => {
      const categoryKey = `${category}/${subCategory}`

      // 무한 스크롤을 위한 페이지 정규화 (0-9 범위)
      const normalizedPage = ((page % 10) + 10) % 10

      // 로딩 상태 설정 (첫 로드가 아닌 경우에만)
      if (!append) {
        setCategoryProducts((prev) => ({
          ...prev,
          [categoryKey]: {
            ...prev[categoryKey],
            loading: true,
            error: null,
          },
        }))
      }

      try {
        const response = await getPopularProducts(
          categoryKey,
          normalizedPage,
          30,
        )
        if (response.success && response.data) {
          const productsWithLikedStatus =
            response.data.popularClothes.content.map((product) => ({
              ...product,
              liked: likedProductIds.has(product.productId),
            }))

          setCategoryProducts((prev) => ({
            ...prev,
            [categoryKey]: {
              products: append
                ? [
                    ...(prev[categoryKey]?.products || []),
                    ...productsWithLikedStatus,
                  ]
                : productsWithLikedStatus,
              page: normalizedPage,
              totalPages: response.data.popularClothes.totalPages,
              last: response.data.popularClothes.last,
              loading: false,
              error: null,
            },
          }))
        } else {
          setCategoryProducts((prev) => ({
            ...prev,
            [categoryKey]: {
              ...prev[categoryKey],
              loading: false,
              error: response.message || '상품을 불러오는데 실패했습니다.',
            },
          }))
        }
      } catch (err) {
        console.error('Error fetching popular products:', err)
        setCategoryProducts((prev) => ({
          ...prev,
          [categoryKey]: {
            ...prev[categoryKey],
            loading: false,
            error: '상품을 불러오는데 실패했습니다.',
          },
        }))
      }
    },
    [likedProductIds],
  )

  // 선택된 카테고리의 활성 하위 카테고리만 로드
  useEffect(() => {
    const loadActiveSubCategory = async () => {
      if (!likedProductsLoaded) return

      const [category, subCategory] = activeSection.split('/') as [
        CategoryType,
        string,
      ]
      const categoryKey = `${category}/${subCategory}`

      // 이미 로드되어 있으면 스킵
      if (categoryProducts[categoryKey]?.products?.length) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        await fetchCategoryProducts(category, subCategory, 0, false)
      } finally {
        setIsLoading(false)
      }
    }

    loadActiveSubCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, likedProductsLoaded, fetchCategoryProducts])

  // Intersection Observer 및 섹션 ref 로직 제거

  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category)

    // 첫 번째 하위 카테고리로 설정
    const categories =
      category === 'upper' ? UPPER_CATEGORIES : LOWER_CATEGORIES
    const firstCategory = categories[0]
    const sectionId = `${category}/${firstCategory.key}`

    // activeSection을 즉시 설정
    setActiveSection(sectionId)

    // 단일 섹션 표시: 스크롤 제어 불필요
  }

  const handleSubCategoryClick = (subCategory: string) => {
    const sectionId = `${selectedCategory}/${subCategory}`

    // activeSection을 즉시 설정
    setActiveSection(sectionId)

    // 단일 섹션 표시: 스크롤 제어 불필요
  }

  const loadMoreProducts = (
    category: CategoryType,
    subCategory: string,
    page: number,
  ) => {
    const categoryKey = `${category}/${subCategory}`
    const currentData = categoryProducts[categoryKey]
    // 무한 스크롤: 0-9 페이지 범위에서 순환
    if (currentData && !currentData.loading) {
      // 페이지를 0-9 범위로 정규화 (무한 스크롤)
      const normalizedPage = ((page % 10) + 10) % 10
      fetchCategoryProducts(category, subCategory, normalizedPage, true)
    }
  }

  const handleProductClick = async (productId: string) => {
    try {
      const response = await getProductDetail(productId)
      if (response.success && response.data) {
        const clothesData: ClothesData = {
          productId: response.data.productId,
          productBrand: response.data.productBrand,
          productName: response.data.productName,
          productPrice: response.data.productPrice,
          productUrl: response.data.productUrl,
          styleList: response.data.styleList,
          productImageUrl: response.data.productImageUrl,
          liked: response.data.isLiked,
        }
        setSelectedProduct(clothesData)
        setIsModalOpen(true)

        // goDetail 액션 실시간 전송
        if (member) {
          const goDetailLog: UserActionLog = {
            userId: member.memberId,
            timestamp: new Date().toISOString(),
            actionType: 'goDetail',
            productId: productId,
            searchTerm: null,
          }

          try {
            await sendUserMetrics([goDetailLog])
            console.log('상품 클릭 goDetail 액션이 실시간으로 전송되었습니다.')
          } catch (error) {
            console.error('goDetail 액션 전송 중 오류 발생:', error)
          }
        }
      }
    } catch (err) {
      console.error('Error fetching product detail:', err)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // 모달에서 찜 상태 변경 시 핫아이템 페이지 상태 업데이트
  const handleModalLikeChange = (productId: string, isLiked: boolean) => {
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

    // 모든 카테고리의 상품 목록에서 하트 상태 업데이트
    setCategoryProducts((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((key) => {
        updated[key] = {
          ...updated[key],
          products: updated[key].products.map((p) =>
            p.productId === productId ? { ...p, liked: isLiked } : p,
          ),
        }
      })
      return updated
    })
  }

  const handleToggleLike = async (productId: string) => {
    // 로그인 상태가 아닐 때는 찜하기 기능 비활성화
    if (!isLoggedIn) {
      setShowLoginToast(true)
      return
    }

    try {
      const response = await addToWishlist(productId)
      if (response.status === 200) {
        // 찜한 상품 목록 업데이트
        setLikedProductIds((prev) => {
          const newSet = new Set(prev)
          if (newSet.has(productId)) {
            newSet.delete(productId)
          } else {
            newSet.add(productId)
          }
          return newSet
        })

        // 모든 카테고리의 상품 목록에서 하트 상태 업데이트
        setCategoryProducts((prev) => {
          const updated = { ...prev }
          Object.keys(updated).forEach((key) => {
            updated[key] = {
              ...updated[key],
              products: updated[key].products.map((p) =>
                p.productId === productId ? { ...p, liked: !p.liked } : p,
              ),
            }
          })
          return updated
        })
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
        searchTerm: null,
      }

      let updatedLogs: UserActionLog[]

      if (!isAlreadyLiked) {
        updatedLogs = [...existingLogs, newLog]
      } else {
        updatedLogs = existingLogs.filter((log) => log.productId !== productId)
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
      console.error('찜하기/찜 취소 처리 중 오류 발생:', error)
    }
  }

  return (
    <div css={containerStyle}>
      <div css={mainContentStyle} ref={mainContentRef}>
        {isLoading ? (
          <>
            <div css={categorySectionStyle}>
              {(() => {
                return (
                  <div css={sectionStyle}>
                    <div css={productGridStyle}>
                      {Array(30)
                        .fill(null)
                        .map((_, i) => (
                          <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                  </div>
                )
              })()}
            </div>
          </>
        ) : (
          <>
            {/* 활성 하위 카테고리 섹션만 표시 */}
            <div css={categorySectionStyle}>
              {(() => {
                const [cat, subKey] = activeSection.split('/') as [
                  CategoryType,
                  string,
                ]
                const sectionId = `${cat}/${subKey}`
                const categoryData = categoryProducts[sectionId]
                const label = (
                  selectedCategory === 'upper'
                    ? UPPER_CATEGORIES
                    : LOWER_CATEGORIES
                ).find((c) => c.key === subKey)?.label

                return (
                  <div data-section={sectionId}>
                    <CategorySection
                      categoryLabel={label || ''}
                      categoryData={
                        categoryData || {
                          products: [],
                          page: 0,
                          totalPages: 0,
                          last: true,
                          loading: false,
                          error: null,
                        }
                      }
                      onProductClick={handleProductClick}
                      onToggleLike={handleToggleLike}
                      onPageChange={(page) =>
                        loadMoreProducts(cat, subKey, page)
                      }
                      onScrollToTop={scrollToTop}
                      isLoggedIn={isLoggedIn}
                    />
                  </div>
                )
              })()}
            </div>
          </>
        )}
      </div>

      <div css={rightContentStyle}>
        <div css={rightContentBoxStyle}>
          <div css={titleContainerStyle}>
            <span css={highlightStyle}>HOT</span>
            <span css={titleStyle}>ITEMS</span>
          </div>
          <p css={descStyle}>
            지금
            <br />
            <span css={gradientTextStyle}>인기 있는</span> 아이템을
            <br />
            만나보세요
          </p>

          {/* 첫 번째 그라데이션 구분선 */}
          <div css={dividerStyle} />

          {/* 카테고리 탭 */}
          <div css={categoryTabsContainerStyle}>
            <CategoryTabs
              selectedCategory={selectedCategory}
              activeSection={activeSection}
              categories={
                selectedCategory === 'upper'
                  ? UPPER_CATEGORIES
                  : LOWER_CATEGORIES
              }
              onCategoryChange={handleCategoryChange}
              onSubCategoryClick={handleSubCategoryClick}
            />
          </div>

          <div css={decorStyle}>
            <span css={circleStyle} />
            <span css={lineStyle} />
          </div>
        </div>
      </div>

      {/* 상품 상세 모달 */}
      {selectedProduct && (
        <ClothesDetailModal
          open={isModalOpen}
          onClose={handleCloseModal}
          data={selectedProduct}
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
        <button css={scrollToTopButtonStyle} onClick={scrollToTop}>
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  )
}

const containerStyle = css`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #0f1115;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`

const categorySectionStyle = css`
  margin-bottom: 60px;
`

const productGridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 8px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
  }
`

const sectionStyle = css`
  margin-bottom: 60px; /* 카테고리 섹션 간 간격 증가 */
  padding: 4px 0; /* 상하 패딩 최소화 */
`

const mainContentStyle = css`
  width: 80%;
  height: 100vh;
  overflow-y: scroll;
  padding: 0 20px;

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

const rightContentStyle = css`
  width: 20%;
  height: 100vh;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`

const rightContentBoxStyle = css`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow-y: auto;
  box-sizing: border-box;
`

const titleContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

const highlightStyle = css`
  font-size: 32px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const titleStyle = css`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
`

const descStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0 0 20px 0;
`

const gradientTextStyle = css`
  color: #a8e840;
  font-weight: 800;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const categoryTabsContainerStyle = css`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 0;
`

const decorStyle = css`
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 20px;
`

const circleStyle = css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`

const lineStyle = css`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`

const dividerStyle = css`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 55px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`

const scrollToTopButtonStyle = css`
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
