/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Heart } from 'lucide-react'
import ClothesImage from '@/common/clothes_detail/components/ClothesImage'
import ClothesInfo from '@/common/clothes_detail/components/FittingClothesInfo'
import {
  getProductDetail,
  toggleProductLike,
  getLikedProducts,
} from '@/common/clothes_detail/apis/clothesDetailApi'
import type { ClothesData } from '@/common/clothes_detail/types/clothes'
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

type ClothesDetailModalProps = {
  open: boolean
  onClose: () => void
  data: ClothesData
  onLikeChange?: (productId: string, isLiked: boolean) => void
}

export default function ClothesDetailModal({
  open,
  onClose,
  data,
  onLikeChange,
}: ClothesDetailModalProps) {
  const { isLoggedIn, member } = useAuthStore()
  const [productDetail, setProductDetail] = useState<ClothesData | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  // 모달이 열려있는 동안 배경 스크롤(페이지/컨테이너) 잠금
  useEffect(() => {
    if (!open) return

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [open])

  const fetchProductDetail = useCallback(async () => {
    try {
      setIsDetailLoading(true)
      setError(null)

      const response = await getProductDetail(data.productId)
      if (response.success && response.data) {
        const productData: ClothesData = {
          productId: response.data.productId,
          productBrand: response.data.productBrand,
          productName: response.data.productName,
          productPrice: response.data.productPrice,
          productUrl: response.data.productUrl,
          styleList: response.data.styleList,
          productImageUrl: response.data.productImageUrl,
          liked: response.data.isLiked,
        }
        setProductDetail(productData)
        // 찜 상태는 fetchLikedStatus에서 별도로 설정
      } else {
        setError(response.message || '상품 정보를 불러오는데 실패했습니다.')
        // API 실패 시 전달받은 데이터 사용
        setProductDetail(data)
      }
    } catch (err) {
      console.error('상품 상세 정보 조회 실패:', err)
      setError('상품 정보를 불러오는데 실패했습니다.')
      // API 실패 시 전달받은 데이터 사용
      setProductDetail(data)
    } finally {
      setIsDetailLoading(false)
    }
  }, [data])

  // 찜 목록 조회하여 하트 상태 설정
  const fetchLikedStatus = useCallback(async () => {
    if (!isLoggedIn || !data.productId) {
      setIsLiked(false)
      return
    }

    try {
      const likedProducts = await getLikedProducts()
      const isProductLiked = likedProducts.some(
        (item) => item.productId === data.productId,
      )
      setIsLiked(isProductLiked)
    } catch (err) {
      console.error('찜 목록 조회 실패:', err)
      setIsLiked(false)
    }
  }, [isLoggedIn, data.productId])

  // 모달이 열릴 때 상품 상세 정보와 찜 상태 가져오기
  useEffect(() => {
    if (open && data.productId) {
      // 이미 데이터가 있으면 API 호출하지 않음
      if (data.productId && data.productName && data.productBrand) {
        setProductDetail(data)
        setIsDetailLoading(false)
      } else {
        fetchProductDetail()
      }

      // 이미 찜 상태가 있으면 API 호출하지 않음
      if (data.liked !== undefined) {
        setIsLiked(data.liked)
      } else {
        fetchLikedStatus()
      }
    }
  }, [open, data, fetchProductDetail, fetchLikedStatus])

  const handleToggleLike = async () => {
    // 로그인 상태가 아닐 때는 찜하기 기능 비활성화
    if (!isLoggedIn) {
      setShowLoginToast(true)
      return
    }

    try {
      const response = await toggleProductLike(data.productId)

      if (response.success) {
        // 찜 상태를 다시 조회하여 정확한 상태 설정
        await fetchLikedStatus()

        // 부모 컴포넌트에 찜 상태 변경 알림
        if (onLikeChange) {
          onLikeChange(data.productId, !isLiked)
        }

        // 세션 스토리지에 찜하기 로그 저장 (recommend 폴더와 동일한 패턴)
        const existingLogs: UserActionLog[] = JSON.parse(
          sessionStorage.getItem('user_actions') || '[]',
        )

        const isAlreadyLiked = existingLogs.some(
          (log) => log.productId === data.productId,
        )

        const newLog: UserActionLog = {
          userId: member?.memberId || 0,
          timestamp: new Date().toISOString(),
          actionType: isAlreadyLiked ? 'unlike' : 'like',
          productId: data.productId,
          searchTerm: null, // 상세 모달에서는 검색어 정보 없음
        }

        let updatedLogs: UserActionLog[]

        if (!isAlreadyLiked) {
          updatedLogs = [...existingLogs, newLog]
        } else {
          updatedLogs = existingLogs.filter(
            (log) => log.productId !== data.productId,
          )
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

        // 찜한 상품이 5개 이상이면 서버에 저장
        if (updatedLogs.length >= 5) {
          try {
            await sendUserMetrics(updatedLogs)
            // 저장 후 세션 스토리지 비우기 등 추가 로직
            sessionStorage.removeItem('user_actions')
          } catch (error) {
            console.error('서버 저장 중 오류 발생:', error)
          }
        }
      }
    } catch (err) {
      console.error('찜하기 토글 실패:', err)
    }
  }

  // 시착 버튼 제거로 사용하지 않음

  if (!open) return null

  const displayData = productDetail || data

  return createPortal(
    <div
      css={backdropStyle}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
    >
      <div css={containerStyle} onClick={(e) => e.stopPropagation()}>
        <button css={closeButtonStyle} onClick={onClose}>
          ✕
        </button>

        {isDetailLoading ? (
          <div css={loadingStyle}>상품 정보를 불러오는 중...</div>
        ) : error ? (
          <div css={errorStyle}>{error}</div>
        ) : (
          <>
            {/* 좌측: 이미지 */}
            <section css={leftSectionStyle}>
              <div css={imageFillStyle}>
                <ClothesImage
                  src={displayData.productImageUrl}
                  alt={displayData.productName}
                />
                <button
                  type="button"
                  css={likeBtnStyle}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleLike()
                  }}
                  aria-label="like"
                >
                  <Heart
                    size={18}
                    color={isLiked ? '#ff4444' : '#60a5fa'}
                    fill={isLiked ? '#ff4444' : 'transparent'}
                    style={{ display: 'block' }}
                  />
                </button>
              </div>
            </section>

            {/* 우측: 정보 */}
            <section css={rightSectionStyle}>
              <ClothesInfo
                brand={displayData.productBrand}
                name={displayData.productName}
                price={displayData.productPrice}
                productUrl={displayData.productUrl}
                tags={displayData.styleList || []}
              />
            </section>
          </>
        )}
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
  background: #0f0f10; /* 네온 컨셉 다크 베이스 */
  width: 850px;
  height: min(550px, 86vh);
  max-height: 86vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  position: relative;
  border: 1px solid #1a1a1a;
  border-radius: 0; /* 직각 스타일 */
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.5),
    0 0 24px rgba(168, 232, 64, 0.15);
  overflow: hidden;
  min-height: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: min(92vw, 850px);
    height: min(86vh, 720px);
  }
`

const closeButtonStyle = css`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  color: #a8e840; /* 네온 라임 */
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
  overflow: hidden;
`

const imageFillStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`

const rightSectionStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`

const likeBtnStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid #2a2a2a;
  background: #111111; /* 네온 다크 베이스 */
  border-radius: 4px; /* 직각 무드 */
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

// likeIconStyle removed (emoji → icon)

const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
`

const errorStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #e03131;
`
