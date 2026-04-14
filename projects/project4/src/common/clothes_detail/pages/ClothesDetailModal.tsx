/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import ClothesImage from '@/common/clothes_detail/components/ClothesImage'
import ClothesInfo from '@/common/clothes_detail/components/ClothesInfo'
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
  productName?: string
  productBrand?: string
  productPrice?: number
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
  const navigate = useNavigate()
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

  // 모달 열기 로깅 함수
  const logModalView = useCallback(async () => {
    if (!member || !data.productId) return

    const modalViewLog: UserActionLog = {
      userId: member.memberId,
      timestamp: new Date().toISOString(),
      actionType: 'goDetail',
      productId: data.productId,
      productName: data.productName,
      productBrand: data.productBrand,
      productPrice: data.productPrice,
      searchTerm: null, // 상세 모달에서는 검색어 정보 없음
    }

    // 기존 모달 열기 로그 가져오기
    const existingLogs: UserActionLog[] = JSON.parse(
      sessionStorage.getItem('user_actions') || '[]',
    )

    // 중복 방지: 같은 상품의 모달 열기 로그가 이미 있는지 확인
    const isAlreadyLogged = existingLogs.some(
      (log) => log.productId === data.productId,
    )

    if (!isAlreadyLogged) {
      const updatedLogs = [...existingLogs, modalViewLog]
      sessionStorage.setItem('user_actions', JSON.stringify(updatedLogs))

      // 실시간으로 모달 열기 액션 전송
      try {
        await sendUserMetrics([modalViewLog])
        console.log('모달 열기 액션이 실시간으로 전송되었습니다.')
      } catch (error) {
        console.error('모달 열기 액션 전송 중 오류 발생:', error)
      }

      // 모달 열기 로그가 5개 이상이면 서버에 전송
      if (updatedLogs.length >= 5) {
        try {
          // 전송
          sendUserMetrics(updatedLogs).then(() => {
            console.log('사용자 행동 로그가 5개가 되어 서버로 전송되었습니다.')
            sessionStorage.removeItem('user_actions')
          })
        } catch (error) {
          console.error('모달 열기 로그 서버 저장 중 오류 발생:', error)
        }
      }
    }
  }, [member, data])

  // 모달이 열릴 때 상품 상세 정보와 찜 상태 가져오기
  useEffect(() => {
    if (open && data.productId) {
      // 모달 열기 로깅
      logModalView()

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
  }, [open, data, fetchProductDetail, fetchLikedStatus, logModalView])

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

        // 세션 스토리지에 찜하기 로그 저장 (메인페이지/핫아이템 패턴)
        const existingLogs: UserActionLog[] = JSON.parse(
          sessionStorage.getItem('user_actions') || '[]',
        )

        // 해당 상품이 이미 찜 목록에 있는지 확인
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

        // filter로 새로운 배열 반환하기 때문에 사용
        let updatedLogs: UserActionLog[]

        if (!isAlreadyLiked) {
          // 찜하기: 로그 추가
          updatedLogs = [...existingLogs, newLog]
        } else {
          // 찜 취소: 해당 상품 로그 제거
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

  const handleTryOn = async () => {
    // 로그인 상태가 아닐 때는 시착하기 기능 비활성화
    if (!isLoggedIn) {
      setShowLoginToast(true)
      return
    }

    try {
      // 찜이 안 되어 있다면 자동으로 찜 처리
      if (!isLiked) {
        const response = await toggleProductLike(data.productId)
        if (response.success) {
          setIsLiked(true)
          if (onLikeChange) {
            onLikeChange(data.productId, true)
          }

          // 세션 스토리지에 찜하기 로그 저장 (메인/핫아이템과 동일 패턴)
          const existingLogs: UserActionLog[] = JSON.parse(
            sessionStorage.getItem('user_actions') || '[]',
          )

          const newLog: UserActionLog = {
            userId: member?.memberId || 0,
            timestamp: new Date().toISOString(),
            actionType: 'like',
            productId: data.productId,
            searchTerm: null,
          }

          const updatedLogs = [...existingLogs, newLog]
          sessionStorage.setItem('user_actions', JSON.stringify(updatedLogs))

          // 실시간으로 사용자 액션 전송
          try {
            await sendUserMetrics([newLog])
            console.log('사용자 액션이 실시간으로 전송되었습니다.')
          } catch (error) {
            console.error('사용자 액션 전송 중 오류 발생:', error)
          }

          if (updatedLogs.length >= 5) {
            try {
              await sendUserMetrics(updatedLogs)
              sessionStorage.removeItem('user_actions')
            } catch (error) {
              console.error('서버 저장 중 오류 발생:', error)
            }
          }
        }
      }
    } catch (err) {
      console.error('TRY ON 중 찜하기 자동 처리 실패:', err)
    } finally {
      // 모달 닫기 후 피팅룸으로 이동
      onClose()
      navigate('fittingroom')
    }
  }

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
                liked={isLiked}
                onToggleLike={handleToggleLike}
                onTryOn={handleTryOn}
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
  /* 고정 높이 모달은 뷰포트가 작을 때 내부 스크롤이 막히기 쉬워서
     height + max-height 조합으로 안전하게 처리 */
  height: min(550px, 86vh);
  max-height: 86vh;
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
  min-height: 0; /* grid 아이템 수축 허용 */
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
