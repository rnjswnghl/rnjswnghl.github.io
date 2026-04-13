/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ProductCard, { type Product } from '@/common/components/ProductCard'

type ProductSectionsProps = {
  uppers: Product[]
  lowers: Product[]
  onProductClick: (productId: string) => void
  onToggleLike: (productId: string, section: 'tops' | 'bottoms') => void
}

export default function ProductSections({
  uppers: tops,
  lowers: bottoms,
  onProductClick,
  onToggleLike,
}: ProductSectionsProps) {
  return (
    <div css={containerStyle}>
      <div css={sectionContainerStyle}>
        <div css={sectionHeaderStyle}>
          <h2 css={sectionTitleStyle}>Upper</h2>
        </div>
        <div css={sectionBodyStyle}>
          <div css={productsGridStyle}>
            {tops.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                onClick={onProductClick}
                onToggleLike={(id) => onToggleLike(id, 'tops')}
              />
            ))}
          </div>
        </div>
      </div>

      <div css={sectionContainerStyle}>
        <div css={sectionHeaderStyle}>
          <h2 css={sectionTitleStyle}>Lower</h2>
        </div>
        <div css={sectionBodyStyle}>
          <div css={productsGridStyle}>
            {bottoms.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                onClick={onProductClick}
                onToggleLike={(id) => onToggleLike(id, 'bottoms')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 24px;
  height: 100%;
  //   overflow: hidden;
`

const sectionContainerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  max-width: 50%;
  background: rgb(17, 17, 17);
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  &:last-of-type {
    border-right: none;
  }
`

const sectionTitleStyle = css`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.3px;
`

const sectionHeaderStyle = css`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 16px 20px;
  background: #072bed;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-color: #a8e840;
`

const sectionBodyStyle = css`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px;
  height: 100%;

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

const productsGridStyle = css`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  flex: 1;
  min-height: 400px;
  max-width: 100%;
  overflow-y: auto;

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
