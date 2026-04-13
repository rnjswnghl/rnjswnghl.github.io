/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { Info } from 'lucide-react'
import type { Member } from '@/common/auth'

interface RecommendHeadProps {
  member: Member | null
}

export default function RecommendHead({ member }: RecommendHeadProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const nickname = member ? member.memberName : ''

  return (
    <div css={containerStyle}>
      <div css={titleRowStyle}>
        {nickname ? (
          <p css={titleStyle}>{nickname}님을 위한 다양한 추천 상품</p>
        ) : (
          <p css={titleStyle}>지금 인기 상품을 추천해드려요</p>
        )}
        <div css={tooltipContainerStyle}>
          <Info
            css={infoIconStyle}
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          />
          {isTooltipOpen && (
            <div css={tooltipStyle}>
              {nickname ? (
                <>
                  <p css={fontStyle}>
                    취향, 찜한 상품을 분석해 맞춤 상품을 추천해드려요.
                  </p>
                </>
              ) : (
                <>
                  <p css={fontStyle}>로그인 후 패션을 추천받을 수 있습니다.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const containerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const titleRowStyle = css`
  display: flex;
  align-items: center;
  gap: 9px;
`

const titleStyle = css`
  margin: 0;
  font-size: 30px;
  font-weight: 800;
`
const tooltipContainerStyle = css`
  position: relative;
  display: inline-flex;
  align-items: center;
`

const tooltipStyle = css`
  position: absolute;
  top: 50%;
  left: 100%;
  margin: 5px;
  transform: translateY(-50%);
  background: #3b82f6;
  color: white;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`

const infoIconStyle = css`
  width: 25px;
  height: 25px;
  color: #4f8efc;
  margin-left: 5px;
`
const fontStyle = css`
  margin-left: 5px;
  margin-top: 2px;
`
