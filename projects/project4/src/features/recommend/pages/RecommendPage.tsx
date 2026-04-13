/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
// import { useState } from 'react'
import RecommendBody from '@/features/recommend/components/RecommendBody'
import IsHotItemsBody from '@/features/recommend/components/IsHotItemsBody'
import { useAuthStore } from '@/common/auth'

export default function RecommendPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const member = useAuthStore((state) => state.member)
  const updateUserInfoFromToken = useAuthStore(
    (state) => state.updateUserInfoFromToken,
  )

  // 사용자 정보가 기본값인 경우 JWT에서 업데이트
  if (
    isLoggedIn &&
    member &&
    (member.memberName === 'User' || member.memberEmail === 'user@example.com')
  ) {
    updateUserInfoFromToken()
  }

  return (
    <div css={containerStyle}>
      {/* <div css={headStyle}>
        <RecommendHead member={member} />
      </div> */}
      <div css={bodyStyle}>
        {isLoggedIn && member ? <RecommendBody /> : <IsHotItemsBody />}
      </div>
    </div>
  )
}

const containerStyle = css`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #0f1115;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`
const bodyStyle = css`
  display: flex;
`
