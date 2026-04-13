/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type CodiImagesProps = {
  src?: string
  alt?: string
}

export default function CodiImages({ src, alt }: CodiImagesProps) {
  return (
    <div css={imageContainerStyle}>
      <img src={src} alt={alt || '코디 이미지'} css={imageStyle} />
    </div>
  )
}

const imageContainerStyle = css`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  overflow: hidden;
`

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover; /* contain에서 cover로 변경 - 컨테이너를 완전히 채움 */
`
