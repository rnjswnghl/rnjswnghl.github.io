import styled from '@emotion/styled'
import { Download, UserPlus, UserX } from 'lucide-react'
import TutorialTooltip from './TutorialTooltip'

interface ActionButtonsProps {
  onUploadClick: () => void
  onDeleteClick: () => void
  onDownloadClick: () => void
  isUploading?: boolean
  isDeleting?: boolean
  isDownloading?: boolean
  isDefaultMannequin?: boolean // 디폴트 마네킹인지 여부
}

const ActionButtons = ({
  onUploadClick,
  onDeleteClick,
  onDownloadClick,
  isUploading = false,
  isDeleting = false,
  isDownloading = false,
  isDefaultMannequin = false,
}: ActionButtonsProps) => {
  return (
    <ActionButtonsContainer>
      <TutorialTooltip
        content="나만의 마네킹 이미지를 업로드하여 가상 피팅을 체험해보세요"
        position="right"
        disabled={isUploading || isDeleting}
      >
        <HorizontalFillDownloadButton
          onClick={onUploadClick}
          disabled={isUploading || isDeleting}
          colorIndex={1}
          title={isUploading ? '변경 중...' : '마네킹 이미지 등록'}
        >
          <UserPlus
            style={{
              width: '16px',
              height: '16px',
              color: 'currentColor',
              strokeWidth: 1.5,
              opacity: isUploading ? 0.6 : 1,
            }}
          />
        </HorizontalFillDownloadButton>
      </TutorialTooltip>

      <TutorialTooltip
        content="현재 등록된 마네킹 이미지를 삭제하고 기본 이미지로 되돌립니다"
        position="right"
        disabled={isDeleting || isUploading || isDefaultMannequin}
      >
        <HorizontalFillDownloadButton
          onClick={onDeleteClick}
          disabled={isDeleting || isUploading || isDefaultMannequin}
          colorIndex={1}
          title={isDeleting ? '삭제 중...' : '마네킹 이미지 삭제'}
        >
          <UserX
            style={{
              width: '16px',
              height: '16px',
              color: 'currentColor',
              strokeWidth: 1.5,
              opacity: isDeleting ? 0.6 : 1,
            }}
          />
        </HorizontalFillDownloadButton>
      </TutorialTooltip>

      <TutorialTooltip
        content="현재 마네킹 이미지를 내 기기에 저장합니다"
        position="right"
        disabled={isDownloading}
      >
        <HorizontalFillDownloadButton
          onClick={onDownloadClick}
          disabled={isDownloading}
          title={isDownloading ? '다운로드 중...' : '마네킹 이미지 다운로드'}
          colorIndex={1}
        >
          <Download
            style={{
              width: '14px',
              height: '14px',
              color: 'currentColor',
              strokeWidth: 1.5,
              opacity: isDownloading ? 0.6 : 1,
            }}
          />
        </HorizontalFillDownloadButton>
      </TutorialTooltip>
    </ActionButtonsContainer>
  )
}

interface HorizontalFillDownloadButtonProps {
  colorIndex: number
  disabled?: boolean
}

const HorizontalFillDownloadButton = styled.button<HorizontalFillDownloadButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 0;
  color: #b0b8c1;
  background: #2c3038;
  border: 1px solid #404650;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-family: 'NanumSquare', 'Raleway', sans-serif;
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  border-radius: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }

  &:hover:not(:disabled) {
    background: #404650;
    border-color: #5a6169;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0px);
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
  }

  &:focus:not(:focus-visible) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled) {
      transform: none;
    }

    &:active:not(:disabled) {
      transform: none;
    }
  }
`

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 12;
  padding: 16px;
  background: #1a1d23;
  border-radius: 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  border: 1px solid #404650;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
    top: 12px;
    left: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 8px;
    top: 10px;
    left: 10px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  }
`

export default ActionButtons
