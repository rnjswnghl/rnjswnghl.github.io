import styled from '@emotion/styled'
import { FolderUp } from 'lucide-react'
import { useEffect } from 'react'

interface UploadModalProps {
  showUploadModal: boolean
  isDragOver: boolean
  onClose: () => void
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

const UploadModal = ({
  showUploadModal,
  isDragOver,
  onClose,
  onFileUpload,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadModalProps) => {
  useEffect(() => {
    if (!showUploadModal) return

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [showUploadModal])

  if (!showUploadModal) return null

  return (
    <ModalOverlay onWheel={(e) => e.preventDefault()}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>사진 업로드</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <UploadArea
          $isDragOver={isDragOver}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <FileInput
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={onFileUpload}
            id="fileInput"
          />
          <UploadLabel htmlFor="fileInput">
            <FolderUp
              style={{
                width: '70px',
                height: '70px',
                color: 'currentColor',
                strokeWidth: 1.5,
              }}
            />
            <UploadText>
              {isDragOver
                ? '파일을 여기에 놓으세요'
                : '클릭하여 이미지를 선택하거나 파일을 드래그하세요'}
            </UploadText>
            <UploadSubtext>JPG, PNG, WEBP 파일만 업로드 가능</UploadSubtext>
            <UploadSubtext style={{ marginTop: '4px' }}>
              최대 파일 크기: 10MB
            </UploadSubtext>
          </UploadLabel>
        </UploadArea>
      </ModalContent>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  font-family: 'NanumSquare', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #404040;
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #404040;
  }
`

const UploadArea = styled.div<{ $isDragOver?: boolean }>`
  border: 2px dashed ${(props) => (props.$isDragOver ? '#404040' : '#ddd')};
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$isDragOver ? 'rgba(64, 64, 64, 0.05)' : 'transparent'};

  &:hover {
    border-color: ${(props) => (props.$isDragOver ? '#404040' : '#999')};
    background-color: ${(props) =>
      props.$isDragOver ? 'rgba(64, 64, 64, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  }
`

const FileInput = styled.input`
  display: none;
`

const UploadLabel = styled.label`
  display: block;
  cursor: pointer;
`

const UploadText = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #404040;
  margin-bottom: 8px;
`

const UploadSubtext = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  color: #666;
`

export default UploadModal
