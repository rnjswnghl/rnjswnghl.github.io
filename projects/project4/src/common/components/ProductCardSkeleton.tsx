/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'

export default function ProductCardSkeleton() {
  return (
    <li css={cardStyle}>
      <div css={thumbnailStyle}>
        <div css={imageSkeletonStyle}></div>
      </div>
      <div css={cardBodyStyle}>
        <div css={[textSkeletonStyle, brandSkeletonStyle]}></div>
        <div css={[textSkeletonStyle, nameSkeletonStyle]}></div>
        <div css={[textSkeletonStyle, priceSkeletonStyle]}></div>
      </div>
    </li>
  )
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const skeletonBase = css`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`

const cardStyle = css`
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  margin: 8px;
  min-width: 220px;
  min-height: 180px;
`

const thumbnailStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f8f9fa;
`

const imageSkeletonStyle = css`
  ${skeletonBase}
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
`

const cardBodyStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 10px 10px;
`

const textSkeletonStyle = css`
  ${skeletonBase}
  border-radius: 4px;
`

const brandSkeletonStyle = css`
  width: 40%;
  height: 10px;
`

const nameSkeletonStyle = css`
  width: 80%;
  height: 13px;
`

const priceSkeletonStyle = css`
  width: 30%;
  height: 12px;
  margin-top: 4px;
`
