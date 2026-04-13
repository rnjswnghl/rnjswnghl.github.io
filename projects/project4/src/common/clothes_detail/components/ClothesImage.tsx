/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import sampleImage from '@/common/assets/의류_예시이미지_1.webp'

type ClothesImageProps = {
  src?: string
  alt?: string
}

export default function ClothesImage({ src, alt }: ClothesImageProps) {
  return (
    <div css={imageContainerStyle}>
      <img
        src={src || sampleImage}
        alt={alt || '의류 이미지'}
        css={imageStyle}
      />
    </div>
  )
}

const imageContainerStyle = css`
  width: 100%;
  height: 100%; /* 부모 영역을 꽉 채우도록 */
  min-height: 0; /* grid/flex 컨테이너 수축 허용 */
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
