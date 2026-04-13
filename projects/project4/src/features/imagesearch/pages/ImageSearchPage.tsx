/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { postImageSearch } from '@/features/imagesearch/apis/imageSearchApi'
import { useToastStore } from '@/common/stores/toastStore'
import type { Product } from '@/common/components/ProductCard'
import type { ImageSearchItem } from '@/features/imagesearch/apis/imageSearchApi'
import MannequinDisplay from '@/features/imagesearch/components/MannequinDisplay'
import ProductSections from '@/features/imagesearch/components/ProductSections'
import ClothesDetailModal from '@/common/clothes_detail/pages/ClothesDetailModal'
import {
  getProductDetail,
  getLikedProducts,
} from '@/common/clothes_detail/apis/clothesDetailApi'
import type { ClothesData } from '@/common/clothes_detail/types/clothes'
import { addToWishlist } from '@/features/recommend/apis/RecommendApis'
import { useAuthStore } from '@/common/auth'

const mapImageSearchItemToProduct = (item: ImageSearchItem): Product => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyItem = item as unknown as Record<string, any>
  const id = anyItem.product_id
  const name = anyItem.name
  const brand = anyItem.brand
  const price = anyItem.price
  const thumbnail = anyItem.thumbnail
  const originUrl = anyItem.originUrl
  const styleListRaw = anyItem.styleList
  const isLikedRaw = anyItem.isLiked ?? anyItem.liked ?? anyItem.is_liked
  const parsedStyles = Array.isArray(styleListRaw)
    ? styleListRaw
    : typeof styleListRaw === 'string'
      ? styleListRaw
          .split(',')
          .map((s: string) => s.trim().replace(/\(.*?\)/g, ''))
          .filter((s: string) => s.length > 0)
      : null

  return {
    productId: id,
    productName: name,
    productBrand: brand,
    productPrice: price,
    productImageUrl: thumbnail,
    productUrl: originUrl,
    styleList: parsedStyles,
    liked: Boolean(isLikedRaw),
  }
}

export default function ImageSearchPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ClothesData | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tops, setTops] = useState<Product[]>([])
  const [bottoms, setBottoms] = useState<Product[]>([])
  const [historyImages, setHistoryImages] = useState<string[]>([])
  const { showToast } = useToastStore()
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  type UploadEvent = {
    target: {
      files?: File[] | FileList | null
      value?: string
    }
  }

  // 이전 업로드 기록 초기 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem('imageSearchHistory')
      if (saved) {
        const arr = JSON.parse(saved)
        if (Array.isArray(arr)) setHistoryImages(arr)
      }
    } catch {
      // 무시
    }
  }, [])

  const addToHistory = (src: string) => {
    setHistoryImages((prev) => {
      const max = 10
      const next = [src, ...prev.filter((u) => u !== src)].slice(0, max)
      try {
        localStorage.setItem('imageSearchHistory', JSON.stringify(next))
      } catch {
        // 무시
      }
      return next
    })
  }

  const handleImageUpload = async (event: UploadEvent) => {
    console.log(
      '[Upload] 이벤트 수신, has files:',
      !!event?.target?.files,
      ' value:',
      event?.target?.value,
    )
    // URL 드롭 처리 (백엔드 CORS 허용됨)
    if (event.target?.value && !event.target?.files) {
      try {
        const url = String(event.target.value)
        console.log('[Upload] URL 드롭 수신:', url)
        // 프리뷰 우선 적용
        setUploadedImage(url)
        addToHistory(url)
        // 다음 페인트가 완료될 때까지 대기하여 프리뷰가 먼저 보이도록 보장
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        )

        // 개발환경: Vite 프록시(/api/s3)로 S3 CORS 우회 후 blob→File 업로드 시도
        let proxiedUrl = url
        const s3Prefix = 'https://myssafy.s3.us-east-1.amazonaws.com/'
        if (url.startsWith(s3Prefix)) {
          proxiedUrl = `${url}?${Date.now()}`
        }

        setIsSearching(true)
        console.log('[API] URL→File 업로드 시도 (proxiedUrl):', proxiedUrl)
        try {
          const resp = await fetch(proxiedUrl)
          const blob = await resp.blob()
          const ext = (blob.type.split('/')[1] || 'jpg').toLowerCase()
          const fileFromUrl = new File([blob], `dropped.${ext}`, {
            type: blob.type,
          })
          const res = await postImageSearch({ file: fileFromUrl })
          console.log(
            '[API] URL→File 응답 수신, upper:',
            res.upper?.length,
            ' lower:',
            res.lower?.length,
          )
          const mappedTops: Product[] = res.upper.map(
            mapImageSearchItemToProduct,
          )
          const mappedBottoms: Product[] = res.lower.map(
            mapImageSearchItemToProduct,
          )
          await applyLikedStateAndSet(mappedTops, mappedBottoms)
          return
        } catch (proxyErr) {
          console.warn('[API] URL→File 변환 실패, 서버 URL 처리 시도', proxyErr)
        }
      } catch (err) {
        console.error('[Upload] URL 처리 실패', err)
        showToast(
          'URL 이미지는 파일 변환/서버 처리 실패. 파일로 업로드해 주세요',
        )
      } finally {
        setIsSearching(false)
      }
      return
    }

    // 파일 업로드 처리
    const file = event.target.files?.[0]
    if (file) {
      console.log('[Upload] 파일 선택됨:', file.name, file.type, file.size)
      setIsSearching(true)
      try {
        // 파일 프리뷰 먼저 완료
        const previewPromise = new Promise<string>((resolve) => {
          const previewReader = new FileReader()
          previewReader.onload = (e) => {
            console.log('[Preview] onload 완료, 프리뷰 적용')
            const result = e.target?.result as string
            setUploadedImage(result)
            addToHistory(result)
            resolve(result)
          }
          previewReader.readAsDataURL(file)
        })

        // 프리뷰 완료 후 다음 페인트까지 대기 → 프레임 렌더를 보장
        await previewPromise
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        )
        console.log('[API] 이미지 검색 요청 시작')
        const res = await postImageSearch({ file })
        console.log(
          '[API] 응답 수신, upper:',
          res.upper?.length,
          ' lower:',
          res.lower?.length,
        )
        const mappedTops: Product[] = res.upper.map(mapImageSearchItemToProduct)
        const mappedBottoms: Product[] = res.lower.map(
          mapImageSearchItemToProduct,
        )
        await applyLikedStateAndSet(mappedTops, mappedBottoms)
      } catch (e) {
        console.error('[API] 오류', e)
      } finally {
        console.log('[API] 처리 종료')
        setIsSearching(false)
      }
    }
  }

  const handleSelectHistory = async (src: string) => {
    try {
      addToHistory(src)
      setUploadedImage(src)
      setIsSearching(true)

      let useFile: File
      if (/^https?:\/\//i.test(src)) {
        let proxiedUrl = src
        const s3Prefix = 'https://myssafy.s3.us-east-1.amazonaws.com/'
        if (src.startsWith(s3Prefix)) {
          proxiedUrl = `${src}?${Date.now()}`
        }
        const resp = await fetch(proxiedUrl)
        const blob = await resp.blob()
        const ext = (blob.type.split('/')[1] || 'jpg').toLowerCase()
        useFile = new File([blob], `history.${ext}`, { type: blob.type })
      } else if (src.startsWith('data:')) {
        const resp = await fetch(src)
        const blob = await resp.blob()
        const ext = (blob.type.split('/')[1] || 'png').toLowerCase()
        useFile = new File([blob], `pasted.${ext}`, { type: blob.type })
      } else {
        showToast('지원하지 않는 이미지 형식입니다')
        return
      }

      const res = await postImageSearch({ file: useFile })
      const mappedTops: Product[] = res.upper.map(mapImageSearchItemToProduct)
      const mappedBottoms: Product[] = res.lower.map(
        mapImageSearchItemToProduct,
      )
      await applyLikedStateAndSet(mappedTops, mappedBottoms)
    } catch (e) {
      console.warn('히스토리 이미지 처리 실패', e)
    } finally {
      setIsSearching(false)
    }
  }

  // 추천 컴포넌트 처리 방식과 동일하게, 서버의 찜 목록을 불러와 리스트에 반영
  const applyLikedStateAndSet = async (
    nextTops: Product[],
    nextBottoms: Product[],
  ) => {
    try {
      const likedItems = await getLikedProducts()
      const likedSet = new Set(likedItems.map((i) => String(i.productId)))
      const topsWithLike = nextTops.map((p) => ({
        ...p,
        liked: likedSet.has(p.productId) || p.liked,
      }))
      const bottomsWithLike = nextBottoms.map((p) => ({
        ...p,
        liked: likedSet.has(p.productId) || p.liked,
      }))
      setTops(topsWithLike)
      setBottoms(bottomsWithLike)
    } catch (e) {
      console.warn('찜 목록 조회 실패, 원본 리스트로 진행합니다.', e)
      setTops(nextTops)
      setBottoms(nextBottoms)
    }
  }

  const handleProductClick = async (productId: string) => {
    const fallbackFromList = (): ClothesData | null => {
      const found = [...tops, ...bottoms].find((p) => p.productId === productId)
      if (!found) return null
      return {
        productId: found.productId,
        productBrand: found.productBrand,
        productName: found.productName,
        productPrice: found.productPrice,
        productUrl: found.productUrl || '',
        styleList: found.styleList || null,
        productImageUrl: found.productImageUrl,
        liked: found.liked,
      }
    }

    try {
      const response = await getProductDetail(productId)
      if (response.success && response.data) {
        const d = response.data
        const clothesData: ClothesData = {
          productId: d.productId,
          productBrand: d.productBrand,
          productName: d.productName,
          productPrice: d.productPrice,
          productUrl: d.productUrl,
          styleList: d.styleList,
          productImageUrl: d.productImageUrl,
          liked: d.isLiked,
        }
        setSelectedProduct(clothesData)
        setIsModalOpen(true)
        return
      }
    } catch (err) {
      console.warn('getProductDetail 실패, 리스트 데이터로 대체합니다.', err)
    }

    const fallback = fallbackFromList()
    if (fallback) {
      setSelectedProduct(fallback)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleModalLikeChange = (productId: string, isLiked: boolean) => {
    // 모달에서 찜 상태 변경 시 처리 (필요시 상태 업데이트)
    console.log(`Product ${productId} liked: ${isLiked}`)
  }

  const handleToggleLike = async (id: string, section: 'tops' | 'bottoms') => {
    if (!id || id === 'undefined') {
      console.warn('[Like] invalid id, abort')
      showToast('상품 ID를 확인할 수 없습니다')
      return
    }
    if (!isLoggedIn) {
      showToast('로그인이 필요합니다')
      return
    }

    const updateState = (arr: Product[]) =>
      arr.map((p) => (p.productId === id ? { ...p, liked: !p.liked } : p))

    // Optimistic update
    if (section === 'tops') {
      setTops((prev) => updateState(prev))
    } else {
      setBottoms((prev) => updateState(prev))
    }

    try {
      await addToWishlist(id)
    } catch (e) {
      console.error('찜 API 오류', e)
      // rollback
      if (section === 'tops') {
        setTops((prev) => updateState(prev))
      } else {
        setBottoms((prev) => updateState(prev))
      }
      showToast('찜 처리 중 오류가 발생했습니다')
    }
  }

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <div css={leftPanelStyle}>
          <div css={leftPanelContentStyle}>
            <div css={headerStyle}>
              <div css={headerContentStyle}>
                <div css={titleContainerStyle}>
                  <span css={headerHighlightStyle}>Image Search</span>
                </div>
              </div>
              {/* <div css={headerDecorStyle}>
                <span css={headerCircleStyle} />
                <span css={headerLineStyle} />
              </div> */}
            </div>

            {isSearching && (
              <div
                css={[loadingStyle, loadingBelowHeaderStyle]}
                role="status"
                aria-live="polite"
              >
                <span>
                  상품 검색 중<span className="dots">...</span>
                </span>
              </div>
            )}

            <MannequinDisplay
              uploadedImage={uploadedImage}
              onImageUpload={handleImageUpload}
              onReset={() => {
                setUploadedImage(null)
              }}
              historyImages={historyImages}
              onSelectHistory={handleSelectHistory}
            />
          </div>
        </div>

        <div css={rightPanelStyle}>
          <div css={rightPanelContentStyle}>
            <ProductSections
              uppers={tops}
              lowers={bottoms}
              onProductClick={handleProductClick}
              onToggleLike={handleToggleLike}
            />
          </div>
        </div>
      </div>

      {/* 상품 상세 모달 */}
      {selectedProduct && (
        <ClothesDetailModal
          open={isModalOpen}
          onClose={handleCloseModal}
          data={selectedProduct}
          onLikeChange={handleModalLikeChange}
        />
      )}
    </div>
  )
}

const containerStyle = css`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background:
    radial-gradient(
      1200px 400px at 20% -10%,
      rgba(79, 142, 252, 0.08),
      transparent 60%
    ),
    radial-gradient(
      1000px 350px at 85% 0%,
      rgba(34, 211, 238, 0.06),
      transparent 55%
    ),
    #0f1115;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`

const headerStyle = css`
  padding: 16px 16px 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #072bed;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-color: #a8e840;
`

const headerContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: -15px;
  gap: 6px;
`

const titleContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 17px;
`

const headerHighlightStyle = css`
  font-size: 40px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -0.5px;
`

// const headerMainTitleStyle = css`
//   font-size: 40px;
//   font-weight: 800;
//   color: #ffffff;
//   letter-spacing: -0.5px;
// `

// const headerDecorStyle = css`
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `

// const headerCircleStyle = css`
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   background: #a8e840;
//   box-shadow: 0 0 8px rgba(168, 232, 64, 0.5);
// `

// const headerLineStyle = css`
//   width: 36px;
//   height: 2px;
//   background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
// `

const contentStyle = css`
  display: flex;
  gap: 24px;
  height: 100vh;
  max-height: none;
  padding: 20px;
`

// (툴팁 제거됨)

const leftPanelStyle = css`
  flex: 0 0 340px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const leftPanelContentStyle = css`
  width: 100%;
  height: 100%;
  background: rgb(17, 17, 17);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const rightPanelStyle = css`
  flex: 1;
  height: 100%;
  min-width: 0;
`

const rightPanelContentStyle = css`
  height: 100%;
  background: rgb(17, 17, 17);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`

const loadingStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e7f0ff;
  font-size: 20px;
  font-weight: 700;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.15);
  // border: 1px solid rgba(79, 142, 252, 0.35);/
  border-radius: 3px;
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border-top: 2px solid #a8e840;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .dots::after {
    content: '';
    display: inline-block;
    width: 1.2em;
    text-align: left;
    animation: dots 1.2s steps(4, end) infinite;
  }
  @keyframes dots {
    0%,
    20% {
      content: '';
    }
    40% {
      content: '.';
    }
    60% {
      content: '..';
    }
    80%,
    100% {
      content: '...';
    }
  }
`

const loadingBelowHeaderStyle = css`
  margin: 40px auto 0 auto;
`
