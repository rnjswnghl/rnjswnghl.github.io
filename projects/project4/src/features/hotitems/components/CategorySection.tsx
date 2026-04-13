/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ProductSection from '@/features/hotitems/components/ProductSection'
import ProductCardSkeleton from '@/common/components/ProductCardSkeleton'
import type { PopularProduct } from '@/features/hotitems/apis/hotItemsApi'

interface CategoryData {
  products: PopularProduct[]
  page: number
  totalPages: number
  last: boolean
  loading: boolean
  error: string | null
}

interface CategorySectionProps {
  categoryLabel: string
  categoryData: CategoryData | undefined
  onProductClick: (productId: string) => void
  onToggleLike: (productId: string) => void
  onPageChange: (page: number) => void
  onScrollToTop?: () => void
  isLoggedIn?: boolean
}

export default function CategorySection({
  categoryLabel,
  categoryData,
  onProductClick,
  onToggleLike,
  onPageChange,
  onScrollToTop,
  isLoggedIn = true,
}: CategorySectionProps) {
  return (
    <div css={sectionStyle}>
      {/* 카테고리명 표시 */}
      <h3 css={categoryNameStyle}>{categoryLabel}</h3>

      {categoryData?.error && <div css={errorStyle}>{categoryData.error}</div>}

      {categoryData?.products && categoryData.products.length > 0 ? (
        <ProductSection
          products={categoryData.products}
          loading={categoryData.loading}
          page={categoryData.page}
          last={categoryData.last}
          onProductClick={onProductClick}
          onToggleLike={onToggleLike}
          onPageChange={onPageChange}
          onScrollToTop={onScrollToTop}
          isLoggedIn={isLoggedIn}
        />
      ) : categoryData?.loading ? (
        <div css={productGridStyle}>
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </div>
      ) : null}
    </div>
  )
}

const sectionStyle = css`
  margin-bottom: 60px;
  padding: 8px 8px 12px;
  background: transparent;
  border: none;
  border-radius: 0; /* 직각, 네모 느낌 */
`

const categoryNameStyle = css`
  font-size: 28px;
  font-weight: 800;
  color: #e5e7eb;
  margin: 10px 0 24px 0;
  text-align: left; /* 좌측 정렬로 직선적인 헤더 느낌 */
  position: relative;
  padding-bottom: 16px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #1f232b; /* 전체 폭 구분선 */
  }
`

const errorStyle = css`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #e03131;
`

const productGridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
`
