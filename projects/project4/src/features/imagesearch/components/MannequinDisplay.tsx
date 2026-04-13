/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useRef, useState } from 'react'
import { useToastStore } from '@/common/stores/toastStore'
import { Camera } from 'lucide-react'

type UploadEvent = {
  target: {
    files?: File[] | FileList | null
    value?: string
  }
}

type MannequinDisplayProps = {
  uploadedImage?: string | null
  onImageUpload?: (event: UploadEvent) => void
  onReset?: () => void
  historyImages?: string[]
  onSelectHistory?: (url: string) => void
}

export default function MannequinDisplay({
  uploadedImage,
  onImageUpload,
  onReset,
  historyImages = [],
  onSelectHistory,
}: MannequinDisplayProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const { showToast } = useToastStore()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy'
    }
    console.log('[DragOver] 영역 진입')
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('[DragLeave] 영역 이탈')
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('[Drop] 드롭 이벤트 수신')
    setIsDragOver(false)

    const files = e.dataTransfer.files
    const items = e.dataTransfer.items
    let fileToProcess: File | null = null

    console.log(
      '[Drop] files.length:',
      files?.length,
      ' items.length:',
      items?.length,
    )

    // 파일이 직접 드롭된 경우만 허용
    if (files.length > 0) {
      console.log('[Drop] files 통해 파일 획득')
      fileToProcess = files[0]
    } else if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        console.log('[Drop] item', i, 'kind:', item.kind, 'type:', item.type)
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          console.log('[Drop] items 통해 이미지 파일 획득')
          fileToProcess = item.getAsFile()
          break
        }
        if (item.kind === 'string' && item.type === 'text/uri-list') {
          item.getAsString((url) => {
            console.log('[Drop] URL 드롭 감지, URL 전달:', url)
            const event: UploadEvent = { target: { value: url } }
            onImageUpload?.(event)
          })
          return
        }
      }
    }

    const isImageFile = (file: File) => {
      if (!file) return false
      if (file.type && file.type.startsWith('image/')) return true
      // 일부 환경에서 type이 비어 있는 경우 확장자로 판단
      const name = file.name?.toLowerCase() || ''
      return /(\.jpg|\.jpeg|\.png|\.webp|\.gif|\.bmp)$/i.test(name)
    }

    if (fileToProcess && isImageFile(fileToProcess)) {
      console.log(
        '[Drop] 업로드 트리거 호출, file:',
        fileToProcess?.name,
        fileToProcess?.type,
        fileToProcess?.size,
      )
      const event: UploadEvent = {
        target: { files: [fileToProcess] },
      }
      onImageUpload?.(event)
    } else if (!fileToProcess) {
      showToast('이미지 파일만 업로드할 수 있습니다')
      console.warn('[Drop] 처리할 파일 없음')
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    try {
      const items = e.clipboardData?.items
      if (!items || items.length === 0) return

      // 이미지 파일 붙여넣기만 처리 (텍스트 URL 붙여넣기는 비활성화)
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            const event: UploadEvent = { target: { files: [file] } }
            onImageUpload?.(event)
            return
          }
        }
      }
    } catch (err) {
      console.warn('[Paste] 처리 실패', err)
    }
  }

  return (
    <div
      css={containerStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      <div css={mannequinContainerStyle}>
        {uploadedImage ? (
          <div css={previewWrapperStyle}>
            <img
              src={uploadedImage}
              alt="Uploaded Image"
              css={uploadedImageStyle}
            />
            <button
              type="button"
              css={resetBtnStyle}
              onClick={onReset}
              aria-label="reset image"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            css={[uploadPlaceholderStyle, isDragOver && dragOverStyle]}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDoubleClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const event: UploadEvent = { target: { files: e.target.files } }
                onImageUpload?.(event)
              }}
              css={fileInputStyle}
              id="mannequin-upload"
              ref={fileInputRef}
            />
            <label htmlFor="mannequin-upload" css={uploadLabelStyle}>
              <div css={uploadTextStyle}>
                <span css={uploadIconStyle}>
                  <Camera css={cameraIconStyle} />
                </span>
                <p css={uploadTextStyle}>
                  {isDragOver
                    ? '이미지를 놓으세요'
                    : '원하는 스타일의 이미지 넣기'}
                </p>
                <p css={uploadHintStyle}>
                  붙여넣기(Ctrl+V)와 드래그가 가능해요
                </p>
              </div>
            </label>
          </div>
        )}
      </div>
      <div css={historyBarStyle}>
        {historyImages && historyImages.length > 0 && (
          <div css={historyImageBarStyle}>
            <div css={historyListStyle}>
              {historyImages.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  css={historyItemStyle}
                  onClick={() => onSelectHistory?.(url)}
                  aria-label="select previous image"
                  title="이전 업로드 사용"
                >
                  <img src={url} alt="history" css={historyThumbStyle} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1px 16px 0 16px;
`

const mannequinContainerStyle = css`
  position: relative;
  width: 100%;
  height: calc(100% - 70px);
  max-width: 260px;
  max-height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const previewWrapperStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`

const uploadedImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgb(17, 17, 17);
`

const resetBtnStyle = css`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: scale(1.05);
  }
`

const historyBarStyle = css`
  width: 100%;
  max-width: 260px;
  margin-top: 8px;
`

const historyListStyle = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 44px;
  gap: 8px;
  padding-bottom: 8px;
`
const historyImageBarStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const historyItemStyle = css`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0;
  background: transparent;
  cursor: pointer;
  flex: 0 0 auto;
  overflow: hidden;
`

const historyThumbStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const uploadPlaceholderStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.08);
  }
`

const uploadTextStyle = css`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);

  p {
    margin: 8px 0 0 0 !important;
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.3px;
  }
`

const uploadHintStyle = css`
  margin: 4px 0 0 0 !important;
  font-size: 14px !important;
  color: rgba(255, 255, 255, 0.5) !important;
  font-weight: 700 !important;
`

const uploadIconStyle = css`
  font-size: 32px;
  display: block;
  opacity: 0.9;
`

const cameraIconStyle = css`
  width: 50px;
  height: 50px;
`

const fileInputStyle = css`
  display: none;
`

const uploadLabelStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  /* 더블클릭 시 파일 선택 */
  &:active {
    transform: scale(0.995);
  }
`

const dragOverStyle = css`
  border-color: #4dabf7 !important;
  background: rgba(77, 171, 247, 0.08) !important;
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(77, 171, 247, 0.25);
`
