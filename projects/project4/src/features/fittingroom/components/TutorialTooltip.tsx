import { type ReactNode } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface TutorialTooltipProps {
  children: ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
}

const TutorialTooltip = ({
  children,
  content,
  position = 'top',
  disabled = false,
}: TutorialTooltipProps) => {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <TooltipContainer>
      {children}
      <TooltipContent position={position} data-position={position}>
        {content}
      </TooltipContent>
    </TooltipContainer>
  )
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  /* 호버 시 tooltip을 표시 - top/bottom 위치 */
  &:hover > div[data-position='top'],
  &:hover > div[data-position='bottom'] {
    opacity: 1;
    visibility: visible;
  }

  &:hover > div[data-position='top'] {
    transform: translateX(-50%) translateY(0);
  }

  &:hover > div[data-position='bottom'] {
    transform: translateX(-50%) translateY(0);
  }

  /* 호버 시 tooltip을 표시 - left/right 위치 */
  &:hover > div[data-position='left'],
  &:hover > div[data-position='right'] {
    opacity: 1;
    visibility: visible;
  }

  &:hover > div[data-position='left'] {
    transform: translateY(-50%) translateX(0);
  }

  &:hover > div[data-position='right'] {
    transform: translateY(-50%) translateX(0);
  }
`

const TooltipContent = styled.div<{
  position: 'top' | 'bottom' | 'left' | 'right'
}>`
  position: absolute;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.92) 0%,
    rgba(139, 92, 246, 0.92) 100%
  );
  backdrop-filter: blur(10px);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

  /* 초기 상태는 보이지 않음 */
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: all 0.2s ease-in-out;

  /* 위치별 스타일링 */
  ${({ position }) => {
    switch (position) {
      case 'top':
        return css`
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: rgba(99, 102, 241, 0.92);
          }
        `
      case 'bottom':
        return css`
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(-4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-bottom-color: rgba(99, 102, 241, 0.92);
          }
        `
      case 'left':
        return css`
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%) translateX(4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-left-color: rgba(99, 102, 241, 0.92);
          }
        `
      case 'right':
        return css`
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%) translateX(-4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-right-color: rgba(99, 102, 241, 0.92);
          }
        `
      default:
        return ''
    }
  }}

  /* 반응형 폰트 크기 */
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 8px 12px;
    max-width: 200px;
    white-space: normal;
  }
`

export default TutorialTooltip
