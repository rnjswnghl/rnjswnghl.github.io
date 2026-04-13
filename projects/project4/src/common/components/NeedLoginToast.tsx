/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { css, keyframes } from '@emotion/react'
import { LockKeyhole } from 'lucide-react'

interface NeedLoginToastProps {
  show: boolean
  onClose: () => void
  message?: string
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`

export default function NeedLoginToast({
  show,
  onClose,
  message = '로그인이 필요합니다.',
}: NeedLoginToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000) // 2초 후 자동으로 사라짐

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div css={toastContainerStyle}>
      <div css={toastStyle(show)}>
        <div css={toastContentStyle}>
          <LockKeyhole size={16} css={iconStyle} />
          <span css={messageStyle}>{message}</span>
        </div>
      </div>
    </div>
  )
}

const toastContainerStyle = css`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  pointer-events: none;
`

const toastStyle = (show: boolean) => css`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ${show ? slideUp : slideDown} 0.3s ease-in-out;
  pointer-events: auto;
`

const toastContentStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

const iconStyle = css`
  color: white;
`

const messageStyle = css`
  font-size: 14px;
  font-weight: 500;
`
