import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logoutApi } from '@/common/auth/apis/authApi'
import { extractUserInfoFromToken } from '@/common/auth/utils/jwtDecoder'
import { useToastStore } from '@/common/stores/toastStore'

export interface Member {
  memberId: number
  memberEmail: string
  memberName: string
}

export interface AuthState {
  isLoggedIn: boolean
  accessToken: string | null
  member: Member | null
  grantType: string | null
}

export interface AuthActions {
  login: (accessToken: string, grantType: string, member: Member) => void
  logout: () => Promise<void>
  setAuthFromRedirect: (url: string) => boolean
  updateUserInfoFromToken: () => void
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  member: null,
  grantType: null,
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // 로그인
      login: (accessToken: string, grantType: string, member: Member) => {
        set({
          isLoggedIn: true,
          accessToken,
          grantType,
          member,
        })
      },

      // 로그아웃
      logout: async () => {
        const { accessToken } = get()

        if (accessToken) {
          try {
            await logoutApi(accessToken)
            sessionStorage.removeItem('user_actions')
          } catch (error) {
            console.error('백엔드 로그아웃 API 호출 실패:', error)
          }
          useToastStore.getState().showToast('로그아웃 되었습니다')
        }

        set(initialState)
        localStorage.removeItem('auth-storage')
        // 다음 페이지에서 토스트를 표시하기 위한 플래그
        sessionStorage.setItem('toast_logout', '1')
        window.location.href = '/main'
      },

      // 리다이렉트 URL에서 인증 정보 파싱
      setAuthFromRedirect: (url: string) => {
        try {
          let urlObj: URL

          if (url.startsWith('redirect://')) {
            const httpUrl = url.replace('redirect://', 'http://')
            urlObj = new URL(httpUrl)
          } else {
            urlObj = new URL(url)
          }

          const params = new URLSearchParams(urlObj.search)

          const grantType = params.get('grantType')
          const accessToken = params.get('accessToken')
          const memberId = params.get('memberId')
          const memberEmail = params.get('memberEmail')
          const memberName = params.get('memberName')

          if (grantType && accessToken) {
            // JWT 토큰에서 사용자 정보 추출
            const userInfo = extractUserInfoFromToken(accessToken)

            const member: Member = {
              memberId: memberId ? parseInt(memberId, 10) : 0,
              memberEmail: memberEmail || userInfo?.email || 'user@example.com',
              memberName: memberName || userInfo?.name || 'User',
            }

            get().login(accessToken, grantType, member)
            return true
          }
          return false
        } catch (error) {
          console.error('리다이렉트 URL 파싱 오류:', error)
          return false
        }
      },

      // JWT 토큰에서 사용자 정보 업데이트
      updateUserInfoFromToken: () => {
        const { accessToken, member } = get()

        if (accessToken && member) {
          const userInfo = extractUserInfoFromToken(accessToken)

          if (userInfo && userInfo.email) {
            const updatedMember: Member = {
              ...member,
              memberEmail: userInfo.email,
              memberName: userInfo.name,
            }

            set((state) => ({
              ...state,
              member: updatedMember,
            }))
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        member: state.member,
        grantType: state.grantType,
      }),
    },
  ),
)
