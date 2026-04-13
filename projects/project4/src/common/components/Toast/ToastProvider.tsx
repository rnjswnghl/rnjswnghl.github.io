import { useState, useCallback, type ReactNode } from 'react'
import { ToastContainer } from './ToastContainer'
import type { ToastProps } from './Toast'
import { ToastContext, type ToastContextType } from './context'

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (
      title: string,
      message: string,
      type: ToastProps['type'] = 'info',
      duration: number = 3000,
    ) => {
      const id = `toast-${Date.now()}-${Math.random()}`
      const newToast: ToastProps = {
        id,
        type,
        title,
        message,
        duration,
        onClose: removeToast,
      }

      setToasts((prev) => [...prev, newToast])

      // 최대 5개까지만 유지
      setToasts((prev) => {
        if (prev.length > 5) {
          return prev.slice(-5)
        }
        return prev
      })
    },
    [removeToast],
  )

  const success = useCallback(
    (title: string, message: string, duration: number = 3000) => {
      showToast(title, message, 'success', duration)
    },
    [showToast],
  )

  const error = useCallback(
    (title: string, message: string, duration: number = 4000) => {
      showToast(title, message, 'error', duration)
    },
    [showToast],
  )

  const warning = useCallback(
    (title: string, message: string, duration: number = 3500) => {
      showToast(title, message, 'warning', duration)
    },
    [showToast],
  )

  const info = useCallback(
    (title: string, message: string, duration: number = 3000) => {
      showToast(title, message, 'info', duration)
    },
    [showToast],
  )

  const help = useCallback(
    (title: string, message: string, duration: number = 3000) => {
      showToast(title, message, 'help', duration)
    },
    [showToast],
  )

  const value: ToastContextType = {
    showToast,
    success,
    error,
    warning,
    info,
    help,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}
