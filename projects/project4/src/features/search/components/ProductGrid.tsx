import { useEffect, useRef, useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import ProductCard from '@/common/components/ProductCard'
import {
  convertSearchProductToProduct,
  type SearchProduct,
} from '@/features/search/apis/searchApi'

interface ProductGridProps {
  products: SearchProduct[]
  loading: boolean
  error: string | null
  noResults: boolean
  hasMore: boolean
  onProductClick: (productId: string) => void
  onToggleLike: (productId: string) => void
  onLoadMore: () => void
}

export default function ProductGrid({
  products,
  loading,
  error,
  noResults,
  hasMore,
  onProductClick,
  onToggleLike,
  onLoadMore,
}: ProductGridProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)

  // 상품 데이터를 메모이제이션하여 불필요한 리렌더링 방지
  const convertedProducts = useMemo(() => {
    return products.map((product) => convertSearchProductToProduct(product))
  }, [products])

  // 무한 스크롤을 위한 Intersection Observer 설정
  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      {
        rootMargin: '100px', // 100px 전에 미리 로드
      },
    )

    if (loadMoreTriggerRef.current) {
      observerRef.current.observe(loadMoreTriggerRef.current)
    }
  }, [hasMore, loading, onLoadMore])

  // 상품이 변경되거나 hasMore 상태가 변경될 때 observer 재설정
  useEffect(() => {
    if (products.length > 0 && hasMore) {
      setupObserver()
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [products.length, hasMore, setupObserver])
  if (loading && products.length === 0) {
    return (
      <LoadingContainer>
        <LoadingText>검색 중...</LoadingText>
      </LoadingContainer>
    )
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
      </ErrorContainer>
    )
  }

  if (noResults) {
    return (
      <NoResults>
        <NoResultsText>일치하는 상품이 없습니다</NoResultsText>
        <NoResultsText>다른 검색어로 시도해보세요</NoResultsText>
      </NoResults>
    )
  }

  if (products.length === 0) {
    return (
      <NoResults>
        <NoResultsText>검색 결과가 없습니다</NoResultsText>
        <NoResultsText>다른 검색어로 시도해보세요</NoResultsText>
      </NoResults>
    )
  }

  return (
    <>
      <ProductGridContainer>
        {convertedProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onClick={() => onProductClick(product.productId)}
            onToggleLike={onToggleLike}
          />
        ))}
      </ProductGridContainer>

      {/* 무한 스크롤 트리거 요소 */}
      {hasMore && products.length > 0 && (
        <LoadMoreTrigger ref={loadMoreTriggerRef}>
          {loading && (
            <LoadingContainer>
              <LoadingText>더 많은 상품을 불러오는 중...</LoadingText>
            </LoadingContainer>
          )}
        </LoadMoreTrigger>
      )}
    </>
  )
}

const ProductGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-bottom: 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

const LoadingText = styled.p`
  font-size: 16px;
  color: #666;
`

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

const ErrorText = styled.p`
  font-size: 16px;
  color: #dc3545;
`

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
`

const NoResultsText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 8px 0;
`

// 무한 스크롤 트리거 요소
const LoadMoreTrigger = styled.div`
  height: 20px;
  width: 100%;
  margin: 20px 0;
`
