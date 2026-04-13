/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'
import ProductCard from '@/common/components/ProductCard'
import type { PopularProduct } from '@/features/hotitems/apis/hotItemsApi'

interface ProductSectionProps {
  products: PopularProduct[]
  loading: boolean
  page: number
  last: boolean
  onProductClick: (productId: string) => void
  onToggleLike: (productId: string) => void
  onPageChange: (page: number) => void
  onScrollToTop?: () => void
  isLoggedIn?: boolean
}

export default function ProductSection({
  products,
  loading,
  page,
  last,
  onProductClick,
  onToggleLike,
  onPageChange,
  onScrollToTop,
  isLoggedIn = true,
}: ProductSectionProps) {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !last) {
          // 아직 마지막이 아니면 다음 페이지 로드
          onPageChange(page + 1)
        } else if (entries[0].isIntersecting && last && onScrollToTop) {
          // 마지막에 도달했을 때 맨 위로 스크롤 (즉시)
          onScrollToTop()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px', // 마지막에서는 더 가까이에서 트리거
      },
    )

    const currentRef = observerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [loading, last, page, onPageChange, onScrollToTop])

  return (
    <div css={productSectionStyle}>
      {/* 상품 그리드 */}
      <div css={productGridStyle}>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={{
              productId: product.productId,
              productName: product.productName,
              productBrand: product.productBrand,
              productPrice: product.productPrice,
              productImageUrl: product.productImageUrl,
              productUrl: product.productUrl,
              styleList: product.styleList,
              liked: isLoggedIn ? product.liked : false,
            }}
            onClick={onProductClick}
            onToggleLike={onToggleLike}
          />
        ))}
        {loading && (
          <div css={loadingOverlayStyle}>
            <div css={loadingSpinnerStyle}></div>
          </div>
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      {!last && <div ref={observerRef} css={infiniteScrollTriggerStyle}></div>}
    </div>
  )
}

const productSectionStyle = css`
  position: relative;
  display: block;
  background: transparent;
  border: none;
  border-radius: 0; /* 네모 박스 */
`

const productGridStyle = css`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 행은 자동으로 증가하여 30개 이상도 자연스럽게 배치 */
  gap: 0;
  flex: 1;
  /* 고정 높이를 제거해 섹션이 내용에 맞춰 자연스럽게 높이 결정 */

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

const infiniteScrollTriggerStyle = css`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`

const loadingOverlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border-radius: 8px;
`

const loadingSpinnerStyle = css`
  width: 40px;
  height: 40px;
  border: 3px solid #2a2f3a;
  border-top: 3px solid #e5e7eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
