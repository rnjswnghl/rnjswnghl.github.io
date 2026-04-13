import styled from '@emotion/styled'
import { memo } from 'react'

interface ButtonsContainerProps {
  activeTab: 'wishlist' | 'mycodi'
  isSelectionMode?: boolean
  isDeleteMode?: boolean
  onSelectClick?: () => void
  onSaveClick?: () => void
  onCancelClick?: () => void
  canSave?: boolean
  onDeleteClick?: () => void
  onDeleteSaveClick?: () => void
  onDeleteCancelClick?: () => void
  canDelete?: boolean
  // 시착 중인 아이템 관련 props
  hasTryOnItems?: boolean
  onTryOnSaveClick?: () => void
  canTryOnSave?: boolean
}

const ButtonsContainer = memo(
  ({
    activeTab,
    isSelectionMode = false,
    isDeleteMode = false,
    onSelectClick,
    onSaveClick,
    onCancelClick,
    canSave = false,
    onDeleteClick,
    onDeleteSaveClick,
    onDeleteCancelClick,
    canDelete = false,
    hasTryOnItems = false,
    onTryOnSaveClick,
    canTryOnSave = false,
  }: ButtonsContainerProps) => {
    return (
      <CoordinationActionsContainer>
        {activeTab === 'wishlist' ? (
          // 찜목록 탭
          isSelectionMode ? (
            // 선택 모드일 때: 코디 저장, 취소 버튼
            <ActionButtonGroup>
              <CoordinationActionButton
                onClick={onSaveClick}
                disabled={!canSave}
                colorIndex={1}
                width="100px"
              >
                코디 저장
              </CoordinationActionButton>
              <CoordinationActionButton
                onClick={onCancelClick}
                disabled={false}
                colorIndex={1}
                width="80px"
              >
                취소
              </CoordinationActionButton>
            </ActionButtonGroup>
          ) : hasTryOnItems ? (
            // 시착 중인 아이템이 있을 때: 코디 선택, 시착 저장 버튼
            <ActionButtonGroup>
              <CoordinationActionButton
                onClick={onSelectClick}
                disabled={false}
                colorIndex={1}
                width="100px"
              >
                코디 선택
              </CoordinationActionButton>
              <CoordinationActionButton
                onClick={onTryOnSaveClick}
                disabled={!canTryOnSave}
                colorIndex={1}
                width="100px"
              >
                코디 저장
              </CoordinationActionButton>
            </ActionButtonGroup>
          ) : (
            // 기본 상태: 코디 선택 버튼만
            <CoordinationActionButton
              onClick={onSelectClick}
              disabled={false}
              colorIndex={1}
              width="120px"
            >
              코디 선택
            </CoordinationActionButton>
          )
        ) : // 내 코디 탭: 코디 삭제 버튼 표시
        isDeleteMode ? (
          <ActionButtonGroup>
            <CoordinationActionButton
              onClick={onDeleteSaveClick}
              disabled={!canDelete}
              colorIndex={2}
              width="100px"
            >
              삭제
            </CoordinationActionButton>
            <CoordinationActionButton
              onClick={onDeleteCancelClick}
              disabled={false}
              colorIndex={1}
              width="80px"
            >
              취소
            </CoordinationActionButton>
          </ActionButtonGroup>
        ) : (
          <CoordinationActionButton
            onClick={onDeleteClick}
            disabled={false}
            colorIndex={2}
            width="120px"
          >
            코디 삭제
          </CoordinationActionButton>
        )}
      </CoordinationActionsContainer>
    )
  },
)

ButtonsContainer.displayName = 'ButtonsContainer'

// 코디 선택/삭제 버튼 컨테이너 - GridContainer와 시각적 정렬을 위한 우측 여백 적용
const CoordinationActionsContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 50px 16px 20px; /* GridContainer와 동일한 우측 여백 적용 */
  background: transparent;
  z-index: 10;
  min-height: 60px;
  flex-shrink: 0; /* 크기 고정 */

  @media (max-width: 768px) {
    padding: 14px 40px 14px 18px; /* 모바일에서도 우측 여백 유지 */
    gap: 10px;
    min-height: 56px;
  }

  @media (max-width: 480px) {
    padding: 12px 35px 12px 16px; /* 작은 화면에서도 우측 여백 유지 */
    gap: 8px;
    min-height: 52px;
  }
`

// 액션 버튼 그룹
const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 767px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
  }
`

// 코디 액션 버튼 인터페이스
interface CoordinationActionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  colorIndex?: number
  width?: string
  className?: string
  title?: string
}

// 코디 액션 버튼 컴포넌트
const CoordinationActionButton = ({
  children,
  onClick,
  disabled = false,
  colorIndex = 0,
  width = '140px',
  className,
  title,
}: CoordinationActionButtonProps) => {
  return (
    <StyledCoordinationActionButton
      onClick={onClick}
      disabled={disabled}
      colorIndex={colorIndex}
      width={width}
      className={className}
      title={title}
    >
      {children}
    </StyledCoordinationActionButton>
  )
}

interface StyledCoordinationActionButtonProps {
  colorIndex: number
  width: string
}

const StyledCoordinationActionButton = styled.button<StyledCoordinationActionButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  margin: 0;
  background: ${(props) =>
    props.colorIndex === 1
      ? '#404650'
      : '#2C3038'}; /* CategoryTab과 동일한 배경색 */
  color: ${(props) =>
    props.colorIndex === 1
      ? '#FFFFFF'
      : '#B0B8C1'}; /* CategoryTab과 동일한 텍스트 색상 */
  border: 1px solid #404650; /* CategoryTab과 동일한 테두리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* CategoryTab과 동일한 박스 섀도우 */
  border-radius: 0; /* CategoryTab과 동일한 사각형 모양 */
  font-family: 'NanumSquare', sans-serif;
  font-weight: ${(props) =>
    props.colorIndex === 1 ? 700 : 500}; /* CategoryTab과 동일한 폰트 웨이트 */
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease; /* CategoryTab과 동일한 transition */
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
  width: ${(props) => props.width};
  height: 44px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  text-transform: none; /* CategoryTab은 uppercase 사용하지 않음 */
  letter-spacing: 0;
  overflow: visible;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.colorIndex === 1
        ? '#5A6169'
        : '#404650'}; /* CategoryTab과 동일한 호버 배경색 */
    color: #ffffff; /* CategoryTab과 동일한 호버 텍스트 색상 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* CategoryTab과 동일한 호버 박스 섀도우 */
    transform: none;
  }

  &:active:not(:disabled) {
    transform: translateY(1px); /* CategoryTab과 동일한 active 효과 */
  }

  &:focus {
    outline: none;
  }

  /* 큰 화면 (width ≥ 1200px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 1200px) {
    padding: 10px 24px;
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  /* 중간 화면 (width: 1024px-1199px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  /* 표준 화면 (width: 768px-1023px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 20px;
    font-size: 14px;
    letter-spacing: 0.2px;
  }

  /* 작은 화면 (width: 480px-767px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 7px 18px;
    font-size: 13px;
    letter-spacing: 0.1px;
  }

  /* 모바일 (width < 480px) - CategoryTab과 동일한 반응형 */
  @media (max-width: 479px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0;
    min-width: 60px;
  }

  /* 매우 작은 모바일 (width < 360px) - CategoryTab과 동일한 반응형 */
  @media (max-width: 359px) {
    padding: 5px 12px;
    font-size: 11px;
    min-width: 50px;
  }
`

// CategoryTab과 동일한 스타일을 위해 색상 함수들 제거
// colorIndex 1: 활성 상태 (저장/선택 버튼)
// colorIndex 2: 삭제 상태 (삭제 버튼)

export default ButtonsContainer
