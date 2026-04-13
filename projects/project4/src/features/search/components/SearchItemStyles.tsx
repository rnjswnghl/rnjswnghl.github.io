import styled from '@emotion/styled'

// 공통 검색 아이템 스타일 컴포넌트들
export const SearchItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 0;
  transition: all 0.2s ease;
  background: transparent;
  border: none;

  &:hover {
    background: rgba(128, 128, 128, 0.1);
    transform: translateX(2px);
  }
`

export const RankNumber = styled.div<{ isHovered: boolean }>`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${(props) => (props.isHovered ? '#a8e840' : '#666')};
  border-radius: 0;
  font-size: 11px;
  font-weight: 600;
  margin-right: 10px;
  flex-shrink: 0;
  transition: all 0.2s ease;
  border: none;
`

export const SearchText = styled.div`
  font-size: 13px;
  color: #cccccc;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const TwoColumnListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

// 로딩 및 에러 상태 스타일
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

export const LoadingText = styled.div`
  font-size: 13px;
  color: #60a5fa;
`

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
`

export const ErrorText = styled.div`
  font-size: 13px;
  color: #60a5fa;
  text-align: center;
`

export const RetryButton = styled.button`
  padding: 4px 8px;
  background: #60a5fa;
  color: #ffffff;
  border: none;
  border-radius: 0;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #a8e840;
  }
`

// 공통 섹션 타이틀 스타일
export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 8px 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 85px;
    height: 2px;
    background: linear-gradient(
      90deg,
      #072bed 0%,
      #072bed 50%,
      rgba(7, 43, 237, 0.3) 80%,
      rgba(7, 43, 237, 0.1) 100%
    );
    // border-radius: 2px;
    box-shadow: 0 0 8px rgba(7, 43, 237, 0.4);
  }
`
