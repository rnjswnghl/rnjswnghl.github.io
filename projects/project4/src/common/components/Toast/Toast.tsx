import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { gsap } from 'gsap'

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'info' | 'warning' | 'help'
  title: string
  message: string
  duration?: number
  onClose: (id: string) => void
}

export const Toast = ({
  id,
  type,
  title,
  message,
  duration = 3000,
  onClose,
}: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // 아이콘은 CSS ::after로 구현됨

  // 입장 애니메이션
  useEffect(() => {
    if (toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        {
          y: -60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
      )

      // 아이콘은 CSS로 처리됨
    }
  }, [type])

  // 자동 닫기 타이머
  useEffect(() => {
    const handleAutoClose = () => {
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          y: -60,
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            onClose(id)
          },
        })
      }
    }

    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleAutoClose()
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [duration, id, onClose])

  const handleClose = () => {
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        y: -60,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          onClose(id)
        },
      })
    }
  }

  const handleManualClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    handleClose()
  }

  return (
    <ToastContainer ref={toastRef} $type={type}>
      <MessageContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </MessageContainer>
      <CloseButton onClick={handleManualClose} />
    </ToastContainer>
  )
}

const ToastContainer = styled.div<{ $type: ToastProps['type'] }>`
  background: linear-gradient(90deg, #1f2333, #22232b);
  color: #f5f5f5;
  padding: 1rem 2rem 1rem 6rem;
  text-align: left;
  border-radius: 0.25rem;
  position: relative;
  font-weight: 300;
  margin: 1rem 0;
  width: auto;
  height: 100%;
  min-width: 320px;
  max-width: 450px;
  min-height: 6rem;
  display: flex;
  align-items: center;
  transition: all 0.5s ease;
  opacity: 1;
  border: 0.15rem solid rgba(255, 255, 255, 0.133);
  box-shadow: inset 0 0 0.5rem 0 #1d1e26;
  font-family: 'Varela Round', sans-serif;
  overflow: visible;

  /* CSS Variables based on type */
  ${({ $type }) => {
    const typeVars = {
      help: css`
        --bg: #05478a;
        --clr: #0070e0;
        --brd: rgba(0, 112, 224, 0.25);
      `,
      success: css`
        --bg: #005e38;
        --clr: #03a65a;
        --brd: rgba(3, 166, 90, 0.25);
      `,
      warning: css`
        --bg: #c24914;
        --clr: #fc8621;
        --brd: rgba(252, 134, 33, 0.25);
      `,
      error: css`
        --bg: #851d41;
        --clr: #db3056;
        --brd: rgba(219, 48, 86, 0.25);
      `,
      info: css`
        --bg: #05478a;
        --clr: #0070e0;
        --brd: rgba(0, 112, 224, 0.25);
      `,
    }
    return typeVars[$type] || typeVars.info
  }}

  &::before {
    content: '';
    position: absolute;
    width: 6.5rem;
    height: 6.15rem;
    bottom: -0.15rem;
    left: -0.15rem;
    z-index: 0;
    border-radius: 0.35rem;
    background:
      radial-gradient(circle at 0% 50%, var(--clr), transparent 5rem),
      radial-gradient(circle at -50% 50%, var(--bg), transparent 5rem);
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    width: 3.5rem;
    height: 3.5rem;
    background: radial-gradient(
      circle at 50% 50%,
      var(--clr) 1.25rem,
      var(--brd) calc(1.25rem + 1px) 100%
    );
    top: 1.2rem;
    left: 1rem;
    border-radius: 3rem;
    padding-top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    box-sizing: border-box;
    color: white;
    z-index: 1;

    ${({ $type }) => {
      const iconContent = {
        help: css`
          content: '?';
        `,
        success: css`
          content: 'L';
          font-size: 1.5rem;
          font-weight: bold;
          padding-bottom: 0.35rem;
          transform: rotateY(180deg) rotate(-38deg);
          text-indent: 0.1rem;
        `,
        warning: css`
          content: '!';
          font-weight: bold;
        `,
        error: css`
          content: '+';
          font-size: 2.85rem;
          line-height: 1.2rem;
          transform: rotate(45deg);
        `,
        info: css`
          content: 'i';
        `,
      }
      return iconContent[$type] || iconContent.info
    }}
  }
`

// Icon is now handled by ::after pseudo-element in ToastContainer

const MessageContainer = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 0.5rem;
`

const Title = styled.h3`
  font-family: 'Varela Round', sans-serif;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.3;
  font-weight: 400;
  color: #f5f5f5;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Message = styled.p`
  font-family: 'Varela Round', sans-serif;
  font-size: 0.85rem;
  color: #e0e0e0;
  line-height: 1.3;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.15rem 0 0;
  position: relative;
  z-index: 1;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      color: var(--clr);
    }
  }
`

const CloseButton = styled.button`
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  text-align: center;
  right: 0.75rem;
  top: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #f5f5f5;
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '×';
    font-family: 'Varela Round', sans-serif;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 1;
    display: block;
  }

  &:hover {
    background: var(--clr);
    color: #22232c;
    border-radius: 50%;
  }
`
