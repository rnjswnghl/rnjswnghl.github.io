/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type ClothesInfoProps = {
  brand: string
  name: string
  price: number
  productUrl?: string
  tags: string[]
}

function formatPrice(num: number) {
  return num.toLocaleString('ko-KR')
}

export default function ClothesInfo({
  brand,
  name,
  price,
  productUrl,
  tags,
}: ClothesInfoProps) {
  // 영문 하이픈 조합(T-SHIRT 등)이 줄바꿈 시 어색하게 끊기지 않도록 비분리 하이픈으로 치환
  const displayName = name.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, '$1\u2011$2')
  return (
    <div css={clothesInfoStyle}>
      <hr css={firstDividerStyle} />
      <div css={metaStyle}>
        <div css={rowStyle}>
          <span css={labelStyle}>BRAND</span>
          <span css={textStyle}>{brand}</span>
        </div>
        <div css={rowStyle}>
          <span css={labelStyle}>NAME</span>
          <span css={textStyle}>{displayName}</span>
        </div>
        <div css={rowStyle}>
          <span css={labelStyle}>PRICE</span>
          <span css={priceStyle}>₩ {formatPrice(price)}</span>
        </div>
        {productUrl && (
          <div css={rowStyle}>
            <span css={labelStyle}>URL</span>
            <a
              css={linkStyle}
              href={productUrl}
              target="_blank"
              rel="noreferrer"
            >
              {productUrl}
            </a>
          </div>
        )}
      </div>

      {/* 태그 섹션 */}
      {tags.length > 0 && (
        <div css={tagsSectionStyle}>
          <span css={labelStyle}>TAGS</span>
          <div css={tagsContainerStyle}>
            {tags.map((tag, index) => (
              <span key={index} css={tagStyle}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <hr css={dividerStyle} />

      {/* 액션 버튼 제거: 찜하기는 이미지 우측 상단 하트로 이동 */}
    </div>
  )
}

const clothesInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  justify-content: space-between;
  color: #e6e8eb;
`

const firstDividerStyle = css`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin-right: 20px;
`

const dividerStyle = css`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin: 0;
`

const metaStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const rowStyle = css`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  gap: 50px;
`

const labelStyle = css`
  font-weight: 800;
  font-size: 17px;
  color: #a8e840;
  min-width: 60px;
  border-bottom: 1px solid #2a2a2a;
  width: 10%;
  letter-spacing: 0.02em;
`

const textStyle = css`
  color: #e6e8eb;
  text-align: right;
  font-weight: 700;
  font-size: 13px;
  flex: 1;
  white-space: normal; /* 여러 줄 허용 */
  word-break: keep-all; /* 한국어 단어 단위로 줄바꿈 */
  overflow-wrap: anywhere; /* 너무 긴 토큰은 적절히 분할 */
`

const priceStyle = css`
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  flex: 1;
`

const linkStyle = css`
  color: #60a5fa; /* 네온 블루 기본 강조 */
  text-decoration: none;
  text-align: right;
  font-size: 13px;
  flex: 1;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: anywhere;

  &:hover {
    color: #3b82f6; /* hover 시 더 진한 네온 블루 */
    text-decoration: underline;
    text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
  }
`

const tagsSectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const tagsContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`

const tagStyle = css`
  background: #111111; /* 네온: 다크 베이스 */
  color: #a8e840; /* 네온 라임 */
  padding: 6px 12px;
  border-radius: 4px; /* 직각에 가까운 라운드 */
  border: 1px solid #2a2a2a; /* 다크 보더 */
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  min-height: 30px;
  line-height: 1;
  transition:
    box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 0 12px rgba(168, 232, 64, 0.25);
    transform: translateY(-1px);
  }
`
