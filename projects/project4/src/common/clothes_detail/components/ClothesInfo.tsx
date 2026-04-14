/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Heart } from 'lucide-react'

type ClothesInfoProps = {
  brand: string
  name: string
  price: number
  productUrl?: string
  tags: string[]
  liked: boolean
  onToggleLike: () => void
  onTryOn: () => void
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
  liked,
  onToggleLike,
  onTryOn,
}: ClothesInfoProps) {
  // 하이픈으로 어색하게 줄바꿈되는 영문 조합(예: T-SHIRT)을 비분리 하이픈(U+2011)으로 치환
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

      {/* 액션 버튼들 */}
      <div css={actionsStyle}>
        <button
          css={[actionButtonStyle, likeButtonStyle, liked && likedButtonStyle]}
          onClick={onToggleLike}
        >
          <span css={likeButtonInnerStyle}>
            <Heart
              size={18}
              color={liked ? '#ff4444' : '#d1d5db'}
              fill={liked ? '#ff4444' : 'transparent'}
              style={{ display: 'block' }}
            />
            <span>{liked ? 'LIKED' : 'LIKE'}</span>
          </span>
        </button>
        <button css={[actionButtonStyle, tryOnButtonStyle]} onClick={onTryOn}>
          TRY ON
        </button>
      </div>
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
  margin-bottom: 50px;
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
  margin-bottom: 50px;
  white-space: normal; /* 여러 줄 허용 */
  word-break: break-all; /* URL은 중간 분할 허용 */
  overflow-wrap: anywhere; /* 특수문자/긴 토큰 안전 분할 */

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

const actionsStyle = css`
  display: flex;
  gap: 12px;
`

const actionButtonStyle = css`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
`

const likeButtonStyle = css`
  background: #111111;
  color: #d1d5db; /* 회색색 */
  border: 1px solid #2a2a2a;

  &:hover {
    color: #ff4444; /* 네온 레드 */
    box-shadow: 0 0 12px rgba(255, 68, 68, 0.25);
  }
`

const likedButtonStyle = css`
  background: #111111;
  color: #ff4444;
  border-color: #2a2a2a;
`

const likeButtonInnerStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const tryOnButtonStyle = css`
  background: #111111; /* 네온 다크 베이스 */
  color: rgb(236, 236, 236); /* 약간 회색 텍스트 */
  border: 1px solid #2a2a2a;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background: #1a1a1a;
    color: #a8e840; /* 네온 초록 강조 */
    box-shadow: 0 0 12px rgba(168, 232, 64, 0.25);
  }
`
