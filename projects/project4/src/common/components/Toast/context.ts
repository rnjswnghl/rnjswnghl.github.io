import { createContext } from 'react'
import type { ToastProps } from './Toast'

export interface ToastContextType {
  showToast: (
    title: string,
    message: string,
    type?: ToastProps['type'],
    duration?: number,
  ) => void
  success: (title: string, message: string, duration?: number) => void
  error: (title: string, message: string, duration?: number) => void
  warning: (title: string, message: string, duration?: number) => void
  info: (title: string, message: string, duration?: number) => void
  help: (title: string, message: string, duration?: number) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
)
