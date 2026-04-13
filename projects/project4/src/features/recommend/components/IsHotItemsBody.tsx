/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronUp } from 'lucide-react'
import ProductCard from '@/common/components/ProductCard'
import ProductCardSkeleton from '@/common/components/ProductCardSkeleton'
import Spinner from '@/common/components/Spinner'
import ClothesDetailModal from '@/common/clothes_detail/pages/ClothesDetailModal'
import {
  getRecommendedProducts,
  addToWishlist,
  getWishlist,
  sendUserMetrics,
} from '@/features/recommend/apis/RecommendApis'
import { getProductDetail } from '@/common/clothes_detail/apis/clothesDetailApi'
import type { ClothesData } from '@/common/clothes_detail/types/clothes'
import NeedLoginToast from '@/common/components/NeedLoginToast'
import { useAuthStore } from '@/common/auth'

type RecommendedProduct = {
  productId: string
  similarityScore: number
  productName: string
  productBrand: string
  productPrice: number
  productImageUrl: string
  productUrl: string
  styleList: Array<string> | null
  liked: boolean
}

type LikedProduct = {
  productId: string
  productUrl: string
  productCategory: string
}

type LikeActionLog = {
  userId: number
  timestamp: string
  actionType: 'like' | 'unlike'
  productId: string | null
  searchTerm: string | null
}

export default function IsHotItemsBody() {
  const { member } = useAuthStore()
  const [products, setProducts] = useState<RecommendedProduct[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ClothesData | null>(
    null,
  )
  const [, setWishlist] = useState<LikedProduct[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLoginToast, setShowLoginToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const productsPerPage = 20 // 한 번에 불러올 상품 수
  const maxProducts = 100 // 최대 상품 수

  // 찜 목록 조회
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await getWishlist()
      const wishlistProducts = response.data.data
      setWishlist(wishlistProducts)
    } catch (err) {
      console.error('Error fetching wishlist products:', err)
    }
  }, [])

  const fetchProducts = useCallback(
    async (pageNum: number, isInitial = false) => {
      if (isInitial) {
        setError(null)
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      try {
        const response = await getRecommendedProducts(pageNum, productsPerPage)
        const { recommended_products } = response.data.result

        // 중복 제거 방어 코드
        const uniqueMap = new Map<string, RecommendedProduct>()
        recommended_products.forEach((p: RecommendedProduct) =>
          uniqueMap.set(p.productId, p),
        )
        const uniqueProducts = Array.from(uniqueMap.values())

        if (isInitial) {
          setProducts(uniqueProducts)
        } else {
          setProducts((prev) => {
            // 전체 배열에서 중복 제거
            const allProducts = [...prev, ...uniqueProducts]
            const uniqueMap = new Map<string, RecommendedProduct>()
            allProducts.forEach((p: RecommendedProduct) =>
              uniqueMap.set(p.productId, p),
            )
            return Array.from(uniqueMap.values())
          })
        }

        // 더 불러올 상품이 있는지 확인
        setHasMore(
          uniqueProducts.length === productsPerPage &&
            (pageNum + 1) * productsPerPage < maxProducts,
        )

        if (isInitial) {
          setIsLoading(false)
        } else {
          setIsLoadingMore(false)
        }
      } catch (err) {
        setError('추천 상품을 불러오지 못했어요.')
        console.error('Error fetching recommended products:', err)
        if (isInitial) {
          setIsLoading(false)
        } else {
          setIsLoadingMore(false)
        }
      }
    },
    [productsPerPage],
  )

  useEffect(() => {
    // 로그인 상태일 때만 찜 목록 조회
    if (member) {
      fetchWishlist()
    }
  }, [fetchWishlist, member])

  useEffect(() => {
    fetchProducts(0, true)
  }, [fetchProducts])

  // 스크롤 감지하여 맨 위로 가기 버튼 표시/숨김
  useEffect(() => {
    const mainContent = mainContentRef.current
    if (!mainContent) return

    const handleScroll = () => {
      const scrollTop = mainContent.scrollTop
      setShowScrollToTop(scrollTop > 150)
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

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        // 스크롤이 하단에 가까워지면
        if (!isLoadingMore && hasMore) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchProducts(nextPage, false)
        }
      }
    },
    [fetchProducts, isLoadingMore, hasMore, page],
  )

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // 찜하기, 찜한 상품 정보(id) 세션 저장
  const onToggleLike = async (id: string) => {
    if (!member) {
      setShowLoginToast(true)
      return
    }

    const response = await addToWishlist(id)
    if (response.status === 200) {
      // 하트 업데이트
      setProducts((prev) =>
        prev.map((p) => (p.productId === id ? { ...p, liked: !p.liked } : p)),
      )
    }

    const existingLogs: LikeActionLog[] = JSON.parse(
      sessionStorage.getItem('liked_products') || '[]',
    )

    // 해당 상품이 이미 찜 목록에 있는지 확인
    const isAlreadyLiked = existingLogs.some((log) => log.productId === id)

    const newLog: LikeActionLog = {
      userId: member?.memberId || 0,
      timestamp: new Date().toISOString(),
      actionType: 'like',
      productId: id,
      searchTerm: null,
    }

    // filter로 새로운 배열 반환하기 때문에 사용
    let updatedLogs: LikeActionLog[]

    if (!isAlreadyLiked) {
      updatedLogs = [...existingLogs, newLog]
    } else {
      updatedLogs = existingLogs.filter((log) => log.productId !== id)
    }

    // 로그를 세션 스토리지에 저장
    sessionStorage.setItem('liked_products', JSON.stringify(updatedLogs))

    // 찜한 상품이 5개 이상이면 서버에 저장
    if (updatedLogs.length >= 5) {
      try {
        await sendUserMetrics(updatedLogs)
        console.log('찜 목록이 5개가 되어 서버로 전송되었습니다.')
        // 저장 후 세션 스토리지 비우기 등 추가 로직
        sessionStorage.removeItem('liked_products')
      } catch (error) {
        console.error('서버 저장 중 오류 발생:', error)
      }
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
          productImageUrl: response.data.productImageUrl,
          productUrl: response.data.productUrl,
          styleList: response.data.styleList,
          liked: response.data.isLiked,
        }
        setSelectedProduct(clothesData)
        setIsModalOpen(true)
      }
    } catch (err) {
      console.error('Error fetching product detail:', err)
    }
  }

  // 모달에서 하트 상태 동기화
  const handleModalLikeChange = (productId: string, isLiked: boolean) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === productId ? { ...p, liked: isLiked } : p,
      ),
    )
  }
  return (
    <>
      <div css={containerStyle}>
        {isLoading ? (
          <>
            <div css={mainContentStyle}>
              <ul css={gridStyle}>
                {Array(10)
                  .fill(null)
                  .map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
              </ul>
            </div>
            <div css={rightContentStyle}>
              <div css={rightContentBoxStyle}>
                <div css={titleContainerStyle}>
                  <span css={highlightStyle}>SHUFFLE</span>
                  <span css={titleStyle}>PICKs</span>
                </div>
                <p css={descStyle}>
                  로그인하고
                  <br />
                  <span css={gradientTextStyle}>나만의 스타일</span>로<br />
                  추천받아보세요
                </p>
                <div css={decorStyle}>
                  <span css={circleStyle} />
                  <span css={lineStyle} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {error && <div css={errorStyle}>{error}</div>}
            <div
              css={sliderContainerStyle}
              ref={mainContentRef}
              onScroll={handleScroll}
            >
              {/* 맨 위로 가기 버튼 */}
              {showScrollToTop && (
                <button css={scrollToTopButtonStyle} onClick={scrollToTop}>
                  <ChevronUp size={20} />
                </button>
              )}

              <ul css={gridStyle}>
                {products.map((p) => (
                  <ProductCard
                    key={p.productId}
                    product={p}
                    onClick={() => handleProductClick(p.productId)}
                    onToggleLike={onToggleLike}
                  />
                ))}
                {isLoadingMore ? (
                  <div css={loadingMoreStyle}>
                    <Spinner />
                  </div>
                ) : (
                  !hasMore &&
                  products.length > 0 && (
                    <div css={endMessageStyle}>
                      <div css={endLineStyle} />
                      <p css={endTextStyle}>모든 상품을 불러왔어요</p>
                      <div css={endLineStyle} />
                    </div>
                  )
                )}
              </ul>
            </div>
            <div css={rightContentStyle}>
              <div css={rightContentBoxStyle}>
                <div css={titleContainerStyle}>
                  <span css={highlightStyle}>HOT</span>
                  <span css={titleStyle}>ITEMS</span>
                </div>
                <p css={descStyle}>
                  로그인하고
                  <br />
                  <span css={gradientTextStyle}>나만의 스타일</span>로<br />
                  추천받아보세요
                </p>
                <div css={dividerContainerStyle}>
                  <div css={dividerStyle} />
                  {/* <p css={textTitleStyle}>지금 가장 인기있는 아이템</p> */}
                </div>
                <div css={styleTagsContainerStyle}>
                  <span css={styleTagStyle}>#상의</span>
                  <span css={styleTagStyle}>#하의</span>
                  <span css={styleTagStyle}>#아우터</span>
                  <span css={styleTagStyle}>#신발</span>
                  <span css={styleTagStyle}>#악세서리</span>
                </div>
                <div css={dividerStyle} />
                <div css={bgTextContainerStyle}>
                  <div css={[animateTextStyle, leftStyle]}>
                    <span css={scrollingTextStyle}>ON-WEAR&nbsp;</span>
                    <span css={scrollingTextStyle}>ON-WEAR&nbsp;</span>
                    <span css={scrollingTextStyle}>ON-WEAR&nbsp;</span>
                  </div>
                  <div css={animateTextStyle}>
                    <span css={scrollingTextStyle}>GOOD FASHION&nbsp;</span>
                    <span css={scrollingTextStyle}>GOOD FASHION&nbsp;</span>
                    <span css={scrollingTextStyle}>GOOD FASHION&nbsp;</span>
                  </div>
                  <div css={[animateTextStyle, leftStyle]}>
                    <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                      STYLE&nbsp;
                    </span>
                    <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                      STYLE&nbsp;
                    </span>
                    <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                      STYLE&nbsp;
                    </span>
                  </div>
                  <div css={animateTextStyle}>
                    <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                      TREND&nbsp;
                    </span>
                    <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                      TREND&nbsp;
                    </span>
                    <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                      TREND&nbsp;
                    </span>
                  </div>
                </div>
                <div css={decorStyle}>
                  <span css={circleStyle} />
                  <span css={lineStyle} />
                </div>
              </div>
            </div>
          </>
        )}
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
    </>
  )
}

const containerStyle = css`
  display: flex;
  width: 100%;
  height: 100vh;
`

const mainContentStyle = css`
  width: 80%;
  height: 100vh;
  overflow-y: scroll;
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

const errorStyle = css`
  text-align: center;
  padding: 20px;
  color: #e03131;
  font-size: 16px;
`

const sliderContainerStyle = css`
  position: relative;
  width: 80%; /* 3:1 비율로 변경 */
  height: 100vh;
  padding: 0 20px;
  overflow-y: scroll;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
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
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
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
  margin: 0;
  margin-bottom: 20px;
`

const gradientTextStyle = css`
  color: #a8e840;
  font-weight: 800;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const decorStyle = css`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
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

const dividerContainerStyle = css`
  margin-top: 40px;
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
  margin-top: 15px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`

// const textTitleStyle = css`
//   font-size: 25px;
//   font-weight: 800;
//   color: #ffffff;
//   letter-spacing: -1px;
//   margin: 0;
// `

const styleTagsContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
`

const styleTagStyle = css`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(168, 232, 64, 0.2);
  border: 1px solid rgba(168, 232, 64, 0.4);
  border-radius: 20px;
  color: #a8e840;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: default;
`

const bgTextContainerStyle = css`
  position: relative;
  width: 100%;
  overflow: hidden;
  transform: skewY(-5deg);
  margin: 20px 0;
  margin-top: 150px;
  height: 400px;
`

const animateTextStyle = css`
  animation: textScrolling 20s linear infinite;
  will-change: transform;
  display: block;
  position: relative;
  white-space: nowrap;

  @keyframes textScrolling {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
`

const leftStyle = css`
  animation-direction: reverse;
`

const scrollingTextStyle = css`
  font-family: 'Montserrat', sans-serif;
  font-size: 100px;
  color: transparent;
  -webkit-text-stroke: 2px #a8e840;
  text-transform: uppercase;
  display: inline-block;
  line-height: 0.75;
  font-weight: 800;
  opacity: 0.9;
  user-select: none;
  text-shadow:
    0 0 10px rgba(168, 232, 64, 0.4),
  filter: drop-shadow(0 0 5px rgba(168, 232, 64, 0.3));
`

const gridStyle = css`
  list-style: none;
  margin: 0;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  transition: transform 0.5s ease-in-out;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const loadingMoreStyle = css`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  padding: 20px;
`

const scrollToTopButtonStyle = css`
  position: fixed;
  top: 92%;
  bottom: 24px;
  z-index: 2000;
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

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }
`

const endMessageStyle = css`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  width: 100%;
`

const endLineStyle = css`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.1),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
`

const endTextStyle = css`
  color: rgba(168, 232, 64, 0.6);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
`
