import { create } from 'zustand'

export interface ToastState {
  show: boolean
  message: string
}

export interface ToastActions {
  showToast: (message: string) => void
  hideToast: () => void
}

const initialState: ToastState = {
  show: false,
  message: '',
}

export const useToastStore = create<ToastState & ToastActions>()((set) => ({
  ...initialState,

  // 토스트 메시지 표시
  showToast: (message: string) => {
    set({
      show: true,
      message,
    })
  },

  // 토스트 메시지 숨기기
  hideToast: () => {
    set({
      show: false,
      message: '',
    })
  },
}))
