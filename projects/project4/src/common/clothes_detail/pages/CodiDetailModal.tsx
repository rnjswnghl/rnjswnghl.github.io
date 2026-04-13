/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import CodiImages from '@/common/clothes_detail/components/CodiImages'
import CodiDetail from '@/common/clothes_detail/components/CodiInfo'
import { useAuthStore } from '@/common/auth'
import NeedLoginToast from '@/common/components/NeedLoginToast'
import { sendUserMetrics } from '@/common/clothes_detail/apis/clothesDetailApi'

type UserActionLog = {
  userId: number
  timestamp: string
  actionType: 'like' | 'unlike' | 'goDetail'
  productId: string | null
  searchTerm: string | null
}

type ClothesItem = {
  id: string
  brand: string
  name: string
  price: number
  productUrl: string
  tags?: string[]
  imageUrl: string
}

type CodiDetailData = {
  id: string
  upper?: ClothesItem
  lower?: ClothesItem
}

type CodiDetailModalProps = {
  open: boolean
  onClose: () => void
  data: CodiDetailData
  upperLiked: boolean
  lowerLiked: boolean
  onToggleUpperLike: () => void
  onToggleLowerLike: () => void
  onTryOn?: () => void
}

export default function CodiDetailModal({
  open,
  onClose,
  data,
  upperLiked,
  lowerLiked,
  onToggleUpperLike,
  onToggleLowerLike,
}: CodiDetailModalProps) {
  const { isLoggedIn, member } = useAuthStore()
  const [viewMode, setViewMode] = useState<'upper' | 'lower'>('upper')
  const [showLoginToast, setShowLoginToast] = useState(false)

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  // 로그인 체크 공통 함수
  const checkLoginAndExecute = (callback: () => void) => {
    if (!isLoggedIn) {
      setShowLoginToast(true)
      return
    }
    callback()
  }

  // 세션스토리지 로그 저장 및 실시간 전송 공통 함수
  const saveLikeActionToSession = async (productId: string) => {
    const existingLogs: UserActionLog[] = JSON.parse(
      sessionStorage.getItem('user_actions') || '[]',
    )

    const isAlreadyLiked = existingLogs.some(
      (log) => log.productId === productId,
    )

    const newLog: UserActionLog = {
      userId: member?.memberId || 0,
      timestamp: new Date().toISOString(),
      actionType: isAlreadyLiked ? 'unlike' : 'like',
      productId: productId,
      searchTerm: null, // 코디 모달에서는 검색어 정보 없음
    }

    let updatedLogs: UserActionLog[]

    if (!isAlreadyLiked) {
      updatedLogs = [...existingLogs, newLog]
    } else {
      updatedLogs = existingLogs.filter((log) => log.productId !== productId)
    }

    // 로그를 세션 스토리지에 저장
    sessionStorage.setItem('user_actions', JSON.stringify(updatedLogs))

    // 실시간으로 사용자 액션 전송
    try {
      await sendUserMetrics([newLog])
      console.log('사용자 액션이 실시간으로 전송되었습니다.')
    } catch (error) {
      console.error('사용자 액션 전송 중 오류 발생:', error)
    }

    // 찜한 상품이 1개 이상이면 서버에 저장
    if (updatedLogs.length >= 1) {
      try {
        await sendUserMetrics(updatedLogs)
        // 저장 후 세션 스토리지 비우기
        sessionStorage.removeItem('user_actions')
      } catch (error) {
        console.error('서버 저장 중 오류 발생:', error)
      }
    }
  }

  // (옵션) 외부에서 try-on 동작을 연결하고 싶을 때 사용할 수 있도록 보존
  // 현재 UI에는 버튼이 없지만 prop이 넘어오면 상위에서 트리거 가능
  // intentionally unused for now; keep for future use

  // 찜하기 핸들러 (로그인 체크 + 세션스토리지 저장 및 실시간 전송 포함)
  const handleToggleUpperLike = () => {
    checkLoginAndExecute(async () => {
      await onToggleUpperLike()
      if (data.upper?.id) {
        await saveLikeActionToSession(data.upper.id)
      }
    })
  }

  const handleToggleLowerLike = () => {
    checkLoginAndExecute(async () => {
      await onToggleLowerLike()
      if (data.lower?.id) {
        await saveLikeActionToSession(data.lower.id)
      }
    })
  }

  if (!open) return null

  const currentItem = viewMode === 'upper' ? data.upper : data.lower

  if (!currentItem) {
    return (
      <div css={backdropStyle} onClick={onClose}>
        <div css={containerStyle} onClick={(e) => e.stopPropagation()}>
          <button css={closeButtonStyle} onClick={onClose}>
            ✕
          </button>
          <p>
            선택한 {viewMode === 'upper' ? '상의' : '하의'} 정보가 없습니다.
          </p>
        </div>
      </div>
    )
  }

  return createPortal(
    <div css={backdropStyle} onClick={onClose}>
      <div css={containerStyle} onClick={(e) => e.stopPropagation()}>
        <button css={closeButtonStyle} onClick={onClose}>
          ✕
        </button>

        <section css={leftSectionStyle}>
          <div css={imageFillStyle}>
            <CodiImages src={currentItem.imageUrl} alt={currentItem.name} />
            <button
              css={likeBtnStyle}
              onClick={(e) => {
                e.stopPropagation()
                if (viewMode === 'upper') {
                  handleToggleUpperLike()
                } else {
                  handleToggleLowerLike()
                }
              }}
              aria-label="like"
            >
              <span
                css={likeIconStyle(
                  viewMode === 'upper' ? upperLiked : lowerLiked,
                )}
              >
                {(viewMode === 'upper' ? upperLiked : lowerLiked) ? '❤️' : '♡'}
              </span>
            </button>
          </div>
          {/* Upper/Lower 토글은 2열(CodiInfo) 탭으로 이동 */}
        </section>

        <section css={rightSectionStyle}>
          <CodiDetail
            brand={currentItem.brand}
            name={currentItem.name}
            price={currentItem.price}
            productUrl={currentItem.productUrl}
            tags={currentItem.tags}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
          />
        </section>
      </div>

      {/* 로그인 필요 토스트 */}
      <NeedLoginToast
        show={showLoginToast}
        onClose={() => setShowLoginToast(false)}
        message="로그인이 필요합니다."
      />
    </div>,
    document.body,
  )
}

const backdropStyle = css`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`

const containerStyle = css`
  background: #0f0f10;
  width: 850px;
  height: 550px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  position: relative;
  border: 1px solid #1a1a1a;
  border-radius: 0;
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.5),
    0 0 24px rgba(168, 232, 64, 0.15);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const closeButtonStyle = css`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  color: #a8e840;
  font-size: 20px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    color 0.2s ease,
    text-shadow 0.2s ease;

  &:hover {
    color: #666; /* 회색 */
    transform: scale(1.05);
  }
`

const leftSectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
`

const imageFillStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`

/* 좌측 슬라이더 토글 제거됨 (2열 탭으로 이동) */
const rightSectionStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const likeBtnStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid #2a2a2a;
  background: #111111;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.12s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px rgba(96, 165, 250, 0.25);
  }
`

const likeIconStyle = (liked: boolean) => css`
  font-size: 16px;
  color: ${liked ? '#ff4444' : '#60a5fa'};
  transition:
    color 0.2s ease,
    transform 0.12s ease,
    filter 0.2s ease;
  position: relative;
  button:hover & {
    transform: scale(1.06);
    filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.5));
  }
`
