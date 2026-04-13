import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import { Toast, type ToastProps } from './Toast'

interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return createPortal(
    <Container>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </Container>,
    document.body,
  )
}

const Container = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
  padding: 20px;

  > * {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    top: 60px;
    left: 16px;
    right: 16px;
    transform: none;
    padding: 40px 10px 20px 10px;

    > * {
      max-width: none;
      min-width: 0;
    }
  }
`
