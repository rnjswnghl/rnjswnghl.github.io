/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import MainContent from '../components/MainContent'
import NeedLoginToast from '@/common/components/NeedLoginToast'
import { useAuthStore } from '@/common/auth'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function MainPage() {
  const location = useLocation()
  const [showLoginToast, setShowLoginToast] = useState(false)
  const { setAuthFromRedirect } = useAuthStore()

  // 네비게이션 상태에서 로그인 토스트 표시 여부 확인
  useEffect(() => {
    if (location.state && location.state.showLoginToast) {
      setShowLoginToast(true)
      // 상태 정리를 위해 히스토리에서 state 제거
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  // OAuth 리다이렉트 토큰 처리 (백엔드가 루트 경로로 리다이렉트)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const grantType = searchParams.get('grantType')
    const accessToken = searchParams.get('accessToken')

    if (grantType && accessToken) {
      const success = setAuthFromRedirect(window.location.href)
      if (success) {
        // 토큰 정보 URL에서 제거
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        )
      }
    }
  }, [location.search, setAuthFromRedirect])

  return (
    <>
      <div css={mainContainerStyle}>
        <MainContent />
      </div>
      <NeedLoginToast
        show={showLoginToast}
        onClose={() => setShowLoginToast(false)}
        message="로그인이 필요한 서비스입니다."
      />
    </>
  )
}

const mainContainerStyle = css`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`
