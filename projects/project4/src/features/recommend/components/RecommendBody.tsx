/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import '@emotion/react'
import { useState, useCallback, useEffect, useRef } from 'react'
import ProductCard from '@/common/components/ProductCard'
import ProductCardSkeleton from '@/common/components/ProductCardSkeleton'
import ClothesDetailModal from '@/common/clothes_detail/pages/ClothesDetailModal'
import {
  addToWishlist,
  getRecommendedProducts,
  getWishlist,
  sendUserMetrics,
} from '@/features/recommend/apis/RecommendApis'
import { getProductDetail } from '@/common/clothes_detail/apis/clothesDetailApi'
import type { ClothesData } from '@/common/clothes_detail/types/clothes'
import { useAuthStore } from '@/common/auth'
import NeedLoginToast from '@/common/components/NeedLoginToast'
import Spinner from '@/common/components/Spinner'
import { ChevronUp } from 'lucide-react'

type Product = {
  productId: string
  productName: string
  productBrand: string
  productPrice: number
  productImageUrl: string
  productUrl: string
  styleList: Array<string>
  liked: boolean
}

type LikedProduct = {
  productId: string
  productUrl: string
  productCategory: string
}

type UserActionLog = {
  userId: number
  timestamp: string
  actionType: 'like' | 'unlike' | 'goDetail'
  productId: string | null
  searchTerm: string | null
}

export default function RecommendBody() {
  const { member } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ClothesData | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoginToast, setShowLoginToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [styleTagsList, setStyleTagsList] = useState<string[]>([])
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const productsPerPage = 20 // 한 번에 불러올 상품 수
  const maxProducts = 100 // 최대 상품 수

  // 찜 목록 조회
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await getWishlist()
      const wishlistProducts = response.data.data
      return wishlistProducts
    } catch (err) {
      console.error('Error fetching wishlist products:', err)
      return []
    }
  }, [])

  // 상품 불러오기
  const fetchProducts = useCallback(
    async (pageNum: number, isInitial = false) => {
      if (isInitial) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      try {
        const wishlist = await fetchWishlist()
        const response = await getRecommendedProducts(pageNum, productsPerPage)
        const { recommended_products, styleTags } = response.data.result

        if (isInitial && styleTags) {
          const newStyleTagsList = styleTags.map(
            (tag: [string, number]) => tag[0],
          )
          setStyleTagsList(newStyleTagsList)
        }

        const likedIds = new Set(
          wishlist.map((item: LikedProduct) => item.productId),
        )

        // 중복 제거 방어 코드
        const uniqueMap = new Map<string, Product>()
        recommended_products.forEach((product: Product) =>
          uniqueMap.set(product.productId, {
            ...product,
            liked: likedIds.has(product.productId),
          }),
        )
        const uniqueProducts = Array.from(uniqueMap.values())

        if (isInitial) {
          setProducts(uniqueProducts)
        } else {
          setProducts((prev) => {
            // 전체 배열에서 중복 제거
            const allProducts = [...prev, ...uniqueProducts]
            const uniqueMap = new Map<string, Product>()
            allProducts.forEach((p) => uniqueMap.set(p.productId, p))
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
        console.error('Error fetching recommended products:', err)
        if (isInitial) {
          setIsLoading(false)
        } else {
          setIsLoadingMore(false)
        }
      }
    },
    [fetchWishlist, productsPerPage],
  )

  useEffect(() => {
    fetchProducts(0, true)
  }, [fetchProducts])

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
      setShowScrollToTop(scrollTop > 150)
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

  const scrollToTop = () => {
    const el = mainContentRef.current
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 찜하기, 찜한 상품 정보(id) 세션 저장
  const onToggleLike = async (id: string) => {
    if (!member) {
      setShowLoginToast(true)
      return
    }

    const response = await addToWishlist(id)
    if (response.status === 200) {
      setProducts((prev) =>
        prev.map((p: Product) =>
          p.productId === id ? { ...p, liked: !p.liked } : p,
        ),
      )
    }

    const existingLogs: UserActionLog[] = JSON.parse(
      sessionStorage.getItem('user_actions') || '[]',
    )

    const isAlreadyLiked = existingLogs.some((log) => log.productId === id)

    const newLog: UserActionLog = {
      userId: member?.memberId || 0,
      timestamp: new Date().toISOString(),
      actionType: 'like',
      productId: id,
      searchTerm: null,
    }

    let updatedLogs: UserActionLog[]

    if (!isAlreadyLiked) {
      updatedLogs = [...existingLogs, newLog]
    } else {
      updatedLogs = existingLogs.filter((log) => log.productId !== id)
    }

    sessionStorage.setItem('user_actions', JSON.stringify(updatedLogs))

    if (updatedLogs.length >= 1) {
      try {
        await sendUserMetrics(updatedLogs)
        console.log('찜 목록이 1개가 되어 서버로 전송되었습니다.')
        sessionStorage.removeItem('user_actions')
      } catch (error) {
        console.error('서버 저장 중 오류 발생:', error)
      }
    }
  }

  const handleProductClick = async (productId: string) => {
    try {
      const response = await getProductDetail(productId)
      if (response.success && response.data) {
        const d = response.data
        const clothesData: ClothesData = {
          productId: d.productId,
          productBrand: d.productBrand,
          productName: d.productName,
          productPrice: d.productPrice,
          productImageUrl: d.productImageUrl,
          productUrl: d.productUrl,
          styleList: d.styleList,
          liked: d.isLiked,
        }
        setSelectedProduct(clothesData)
        setIsModalOpen(true)

        // // 상품 조회 로그 저장
        const existingLogs: UserActionLog[] = JSON.parse(
          sessionStorage.getItem('user_actions') || '[]',
        )
        const newLog: UserActionLog = {
          userId: member?.memberId || 0,
          timestamp: new Date().toISOString(),
          actionType: 'goDetail',
          productId,
          searchTerm: null,
        }
        const updatedLogs = [...existingLogs, newLog]
        sessionStorage.setItem('user_actions', JSON.stringify(updatedLogs))

        if (updatedLogs.length >= 1) {
          try {
            await sendUserMetrics(updatedLogs)
            console.log('사용자 행동 로그가 1개가 되어 서버로 전송되었습니다.')
            sessionStorage.removeItem('user_actions')
          } catch (error) {
            console.error('서버 저장 중 오류 발생:', error)
          }
        }
        return
      }
    } catch (err) {
      console.warn('상품 상세 API 실패, 목록 데이터로 대체합니다.', err)
    }

    // 폴백: 현재 목록에서 동일 상품을 찾아 모달 표시
    const found = products.find((p) => p.productId === productId)
    if (found) {
      const fallback: ClothesData = {
        productId: found.productId,
        productBrand: found.productBrand,
        productName: found.productName,
        productPrice: found.productPrice,
        productImageUrl: found.productImageUrl,
        productUrl: found.productUrl,
        styleList: found.styleList,
        liked: found.liked,
      }
      setSelectedProduct(fallback)
      setIsModalOpen(true)
    } else {
      console.warn('상품 정보를 불러오지 못했어요')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleModalLikeChange = (productId: string, isLiked: boolean) => {
    setProducts((prev) =>
      prev.map((p: Product) =>
        p.productId === productId ? { ...p, liked: isLiked } : p,
      ),
    )
  }

  return (
    <>
      <div css={mainContentStyle} onScroll={handleScroll} ref={mainContentRef}>
        {isLoading ? (
          <>
            <ul css={gridStyle}>
              {Array(10)
                .fill(null)
                .map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
            </ul>
          </>
        ) : (
          <ul css={gridStyle}>
            {products.map((p) => (
              <ProductCard
                key={p.productId}
                product={p}
                onClick={() => handleProductClick(p.productId)}
                onToggleLike={onToggleLike}
              />
            ))}
            {isLoadingMore && (
              <div css={loadingMoreStyle}>
                <Spinner />
              </div>
            )}
          </ul>
        )}
        {/* 맨 위로 가기 버튼 */}
        {showScrollToTop && (
          <button css={scrollToTopButtonStyle} onClick={scrollToTop}>
            <ChevronUp size={20} />
          </button>
        )}
      </div>
      <div css={rightContentStyle}>
        <div css={rightContentBoxStyle}>
          <div css={titleContainerStyle}>
            <span css={highlightStyle}>MY</span>
            <span css={titleStyle}>STYLE</span>
          </div>
          <p css={descStyle}>
            당신만의
            <br />
            <span css={gradientTextStyle}>맞춤 스타일</span>
            로<br />
            추천해드려요
          </p>
          <div css={dividerContainerStyle}>
            <div css={dividerStyle} />
            <p css={textTitleStyle}>{member?.memberName}님의 취향은?</p>
            <p css={textSubTitleStyle}>
              관심 있는 상품을 찜하고, 취향에 맞는 추천을 받아보세요!
            </p>
          </div>
          <div css={styleTagsContainerStyle}>
            {styleTagsList.map((tag, index) => (
              <span key={index} css={styleTagStyle}>
                #{tag}
              </span>
            ))}
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

const mainContentStyle = css`
  width: 80%;
  height: 100vh;
  overflow-y: scroll;
  padding: 35px 28px;

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
  border-radius: 5px;
  color: #a8e840;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: default;
`

const loadingMoreStyle = css`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  padding: 20px;
`

const scrollToTopButtonStyle = css`
  position: fixed;
  right: 280px;
  bottom: 20px;
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

const gridStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
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

const textTitleStyle = css`
  font-size: 25px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
  margin: 0;
`

const textSubTitleStyle = css`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -1px;
  margin-top: 10px;
  margin-bottom: -20px;
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
  filter: drop-shadow(0 0 8px rgba(168, 232, 64, 0.6));
`
