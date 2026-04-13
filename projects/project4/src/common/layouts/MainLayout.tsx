/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import MainMenu from '@/common/navbar/MainMenu'
import SearchModal from '@/features/search/pages/SearchModal'
import NeedLoginToast from '@/common/components/NeedLoginToast'
import { useToastStore } from '@/common/stores/toastStore'

export default function MainLayout() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const { show, message, hideToast, showToast } = useToastStore()

  const handleSearchClick = () => {
    setIsSearchModalOpen(true)
  }

  const handleSearchModalClose = () => {
    setIsSearchModalOpen(false)
  }

  // 로그아웃 후 플래그 감지하여 토스트 표시
  useEffect(() => {
    const flag = sessionStorage.getItem('toast_logout')
    if (flag) {
      showToast('로그아웃 되었습니다')
      sessionStorage.removeItem('toast_logout')
    }
  }, [showToast])

  return (
    <main css={pageStyle}>
      <MainMenu onSearchClick={handleSearchClick} />
      <Outlet />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={handleSearchModalClose}
      />
      <NeedLoginToast show={show} onClose={hideToast} message={message} />
    </main>
  )
}

const pageStyle = css`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
`
