/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { css, keyframes } from '@emotion/react'
import { LockKeyhole } from 'lucide-react'

interface LogoutProps {
  show: boolean
  onClose: () => void
  message?: string
}

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const slideDown = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
`

export default function Logout({
  show,
  onClose,
  message = '로그아웃 되었습니다.',
}: LogoutProps) {
  const [isVisible, setIsVisible] = useState(show)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      setAnimateOut(false)

      // 2초 후에 애니메이션 시작
      const timer = setTimeout(() => {
        setAnimateOut(true)
        // 애니메이션 0.3초 뒤에 onClose 실행
        setTimeout(() => {
          setIsVisible(false)
          onClose()
        }, 300)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!isVisible) return null

  return (
    <div css={toastContainerStyle}>
      <div css={toastStyle(!animateOut)}>
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

const toastStyle = (isEntering: boolean) => css`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ${isEntering ? slideUp : slideDown} 0.3s ease-in-out forwards;
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
