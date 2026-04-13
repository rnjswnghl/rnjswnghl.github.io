/** @jsxImportSource @emotion/react */
import React, { memo } from 'react'
import { css } from '@emotion/react'

export type Product = {
  productId: string
  productName: string
  productBrand: string
  productPrice: number
  productImageUrl: string
  productUrl: string
  styleList: Array<string> | null
  liked: boolean
}

type ProductCardProps = {
  product: Product
  onToggleLike?: (id: string) => void
  onClick?: (id: string) => void
}

function ProductCard({ product, onToggleLike, onClick }: ProductCardProps) {
  const {
    productId,
    productImageUrl,
    productName,
    productBrand,
    productPrice,
  } = product

  const handleToggleLike: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    onToggleLike?.(productId)
  }

  // 가격을 천원 단위로 포맷팅
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR')
  }

  const handleClick = () => {
    onClick?.(productId)
  }

  return (
    <li css={cardStyle}>
      <div css={thumbnailStyle} onClick={handleClick}>
        <img
          src={productImageUrl}
          alt={productName}
          css={imageStyle}
          loading="lazy"
        />
        <button
          type="button"
          onClick={handleToggleLike}
          css={likeBtnStyle}
          aria-label="like"
        >
          <span css={likeIconStyle(product.liked)} aria-label="like">
            {product.liked ? '❤️' : '♡'}
          </span>
        </button>
      </div>

      <div css={cardBodyStyle}>
        <div css={brandStyle}>{productBrand}</div>
        <div css={nameStyle}>{productName}</div>
        <div css={priceStyle}>{`\u20A9 ${formatPrice(productPrice)}`}</div>
      </div>
    </li>
  )
}

const cardStyle = css`
  background: rgb(17, 17, 17);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    z-index: 1;
    cursor: pointer;
  }
`

const thumbnailStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: rgb(17, 17, 17);
  overflow: hidden;
`

const imageStyle = css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const likeBtnStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #ff4444, #ff4444);
    transition: transform 0.3s ease-in-out;
  }

  &:before {
    transform: translateX(-100%);
  }

  &:after {
    transform: translateX(100%);
  }

  &:hover {
    transform: scale(1.3);
    border: 2px solid #ff4444;

    &:before {
      transform: translateX(0%);
    }

    &:after {
      transform: translateX(0%);
    }
  }
`

const likeIconStyle = (liked: boolean) => css`
  font-size: 14px;
  color: ${liked ? '#fa5252' : '#adb5bd'};
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;

  button:hover & {
    color: white;
    transform: scale(1.2);
  }
`

const cardBodyStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
  background: rgb(17, 17, 17);
  text-align: left;
`

const brandStyle = css`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin: 0;
  max-width: 90%;
`

const nameStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
  margin: 4px 0;
  max-width: 90%;
`

const priceStyle = css`
  margin: 8px 0 0;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  max-width: 90%;
`

export default memo(ProductCard)
