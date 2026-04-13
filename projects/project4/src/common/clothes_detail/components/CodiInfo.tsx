/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type CodiDetailProps = {
  brand?: string
  name?: string
  price?: number
  productUrl?: string
  tags?: string[]
  viewMode: 'upper' | 'lower'
  onChangeViewMode: (mode: 'upper' | 'lower') => void
}

function formatPrice(num: number) {
  return num.toLocaleString('ko-KR')
}

export default function CodiDetail({
  brand = '브랜드명',
  name = '코디 아이템',
  price = 0,
  productUrl = '#',
  tags = [],
  viewMode,
  onChangeViewMode,
}: CodiDetailProps) {
  const displayName = name.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, '$1\u2011$2')
  return (
    <div css={codiInfoStyle}>
      <hr css={firstDividerStyle} />
      <div css={sliderContainerStyle}>
        <div css={sliderTrackStyle}>
          <div
            css={[
              sliderThumbStyle,
              viewMode === 'lower' && sliderThumbActiveStyle,
            ]}
          />
        </div>
        <button
          css={[
            sliderButtonStyle,
            viewMode === 'upper' && sliderButtonActiveStyle,
          ]}
          onClick={() => onChangeViewMode('upper')}
        >
          {viewMode === 'upper' ? <span>UPPER</span> : <span>UPPER</span>}
        </button>
        <button
          css={[
            sliderButtonStyle,
            viewMode === 'lower' && sliderButtonActiveStyle,
          ]}
          onClick={() => onChangeViewMode('lower')}
        >
          {viewMode === 'lower' ? <span>LOWER</span> : <span>LOWER</span>}
        </button>
      </div>
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
        <div css={rowStyle}>
          <span css={labelStyle}>URL</span>
          <a css={linkStyle} href={productUrl} target="_blank" rel="noreferrer">
            {productUrl}
          </a>
        </div>
      </div>

      {/* 하단 영역 - 태그 */}
      <div css={bottomSectionStyle}>
        {/* 태그 섹션 */}
        {tags && tags.length > 0 && (
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
      </div>
    </div>
  )
}

const codiInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  justify-content: space-between;
  color: #e6e8eb;
`

const sliderContainerStyle = css`
  display: flex;
  align-items: center;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  padding: 4px;
  position: relative;
  justify-content: flex-start;
  width: fit-content;
  height: 34px;
  margin-bottom: 8px;
`

const sliderTrackStyle = css`
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: transparent;
  border-radius: 4px;
  pointer-events: none;
`

const sliderThumbStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 4px;
  transition: transform 0.25s ease;
  box-shadow:
    inset 0 0 0 1px #2a2a2a,
    0 0 0 rgba(168, 232, 64, 0);
  z-index: 0; /* 버튼 텍스트가 위에 오도록 */
  pointer-events: none;
`

const sliderThumbActiveStyle = css`
  transform: translateX(100%);
`

const sliderButtonStyle = css`
  padding: 6px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  color: #adb5bd;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

const sliderButtonActiveStyle = css`
  color: #a8e840;
  text-shadow: 0 0 8px rgba(168, 232, 64, 0.35);
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
  color: #60a5fa;
  text-decoration: none;
  text-align: right;
  font-size: 13px;
  flex: 1;
  white-space: normal;
  word-break: break-all; /* URL은 중간 분할 허용 */
  overflow-wrap: anywhere;

  &:hover {
    color: #3b82f6;
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
  background: #111111;
  color: #a8e840;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #2a2a2a;
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

const bottomSectionStyle = css`
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
