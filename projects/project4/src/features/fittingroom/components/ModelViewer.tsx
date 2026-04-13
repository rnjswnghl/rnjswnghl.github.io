import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import defaultMannequinImage from '@/common/assets/default_mannequin2.png'
import SkateLoading from './SkateLoading'

interface ModelViewerProps {
  mannequinImage: string
  currentAvatarIndex: number
  avatarImages: string[]
  onLeftArrow: () => void
  onRightArrow: () => void
  onThumbnailClick: (index: number) => void
  isLoading?: boolean
}

const ModelViewer = ({
  mannequinImage,
  currentAvatarIndex,
  avatarImages,
  onLeftArrow,
  onRightArrow,
  onThumbnailClick,
  isLoading = false,
}: ModelViewerProps) => {
  const [displayImage, setDisplayImage] = useState(mannequinImage)

  // mannequinImage prop이 변경되면 즉시 displayImage 업데이트
  useEffect(() => {
    setDisplayImage(mannequinImage)
  }, [mannequinImage])

  return (
    <ModelFrame>
      <ModelImage key={displayImage} $imageUrl={displayImage} />

      {/* 시착 로딩 모달 표시 */}
      {/* <TryOnLoadingModal isVisible={isLoading} /> */}
      <SkateLoading isVisible={isLoading} />

      <NavigationButtons>
        <LeftArrowButton onClick={onLeftArrow}>
          <ArrowIcon>‹</ArrowIcon>
        </LeftArrowButton>
        <RightArrowButton onClick={onRightArrow}>
          <ArrowIcon>›</ArrowIcon>
        </RightArrowButton>
      </NavigationButtons>
      <PhotoGallery>
        {avatarImages.map((image, index) => (
          <PhotoThumbnail
            key={index}
            $imageUrl={image}
            $isActive={index === currentAvatarIndex}
            $isLoading={!image} // 빈 문자열이면 로딩 상태로 표시
            onClick={() => image && onThumbnailClick(index)} // 이미지가 있을 때만 클릭 가능
          />
        ))}
      </PhotoGallery>
    </ModelFrame>
  )
}

const ModelFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%; /* 부모 컨테이너 높이에 맞춤 */
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* margin-top 제거하여 완전한 높이 일치 */

  @media (max-width: 768px) {
    width: 280px;
    height: 390px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    height: 400px;
  }
`

const ModelImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$imageUrl});
  background-size: contain; /* contain으로 설정하여 이미지 전체가 보이도록 함 */
  background-position: center;
  background-repeat: no-repeat;
`

const NavigationButtons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
`

const LeftArrowButton = styled.button`
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`

const RightArrowButton = styled(LeftArrowButton)``

const ArrowIcon = styled.span`
  font-size: 16px;
  color: #404040;
  line-height: 1;
`

const PhotoGallery = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`

const PhotoThumbnail = styled.div<{
  $isEmpty?: boolean
  $imageUrl?: string
  $isActive?: boolean
  $isLoading?: boolean
}>`
  width: 32px;
  height: 43px;
  background-color: ${(props) =>
    props.$isLoading ? '#f0f0f0' : props.$isEmpty ? '#ffffff' : '#e0e0e0'};
  background-image: ${(props) => {
    if (props.$isLoading) return 'none'
    if (props.$isEmpty) return 'none'
    if (props.$imageUrl) return `url(${props.$imageUrl})`
    return `url(${defaultMannequinImage})`
  }};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid
    ${(props) =>
      props.$isLoading
        ? '#d0d0d0'
        : props.$isActive
          ? '#404040'
          : 'rgba(0, 0, 0, 0.69)'};
  border-radius: 5px;
  cursor: ${(props) => (props.$isLoading ? 'default' : 'pointer')};
  transition: border-color 0.2s ease;
  opacity: ${(props) => (props.$isLoading ? 0.6 : 1)};

  &:hover {
    border-color: ${(props) => (props.$isLoading ? '#d0d0d0' : '#404040')};
  }

  /* 로딩 상태일 때 점점이 애니메이션 효과 */
  ${(props) =>
    props.$isLoading &&
    `
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      margin: -6px 0 0 -6px;
      border: 2px solid #ccc;
      border-top-color: #666;
      border-radius: 50%;
      animation: thumbnail-loading 1s infinite linear;
    }

    @keyframes thumbnail-loading {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`

export default ModelViewer
