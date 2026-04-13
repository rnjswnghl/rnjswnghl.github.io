import styled from '@emotion/styled'

interface TabButtonsProps {
  activeTab: 'wishlist' | 'mycodi'
  onTabClick: (tab: 'wishlist' | 'mycodi') => void
}

const TabButtons = ({ activeTab, onTabClick }: TabButtonsProps) => {
  return (
    <TabContainer>
      <TabButtonsWrapper>
        <Tab
          $active={activeTab === 'wishlist'}
          onClick={() => onTabClick('wishlist')}
        >
          LIKES
        </Tab>
        <Tab
          $active={activeTab === 'mycodi'}
          onClick={() => onTabClick('mycodi')}
        >
          OUTFITS
        </Tab>
      </TabButtonsWrapper>
    </TabContainer>
  )
}

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  background: transparent;
`

const TabButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    gap: 16px;
  }

  /* 중간 화면 (width: 1024px-1199px) - QHD, 큰 노트북 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    gap: 12px;
  }

  /* 표준 화면 (width: 768px-1023px) - FHD, 표준 노트북 */
  @media (min-width: 768px) and (max-width: 1023px) {
    gap: 8px;
  }

  /* 작은 화면 (width: 480px-767px) - 태블릿 */
  @media (min-width: 480px) and (max-width: 767px) {
    gap: 6px;
  }

  /* 모바일 (width < 480px) */
  @media (max-width: 479px) {
    gap: 4px;
    flex-direction: column;
    width: 100%;
  }
`

const Tab = styled.button<{ $active?: boolean }>`
  padding: 16px 32px;
  border: none;
  background: transparent;
  color: ${(props) => (props.$active ? '#FFFFFF' : '#B0B8C1')};
  font-family: 'NanumSquare', sans-serif;
  font-weight: ${(props) => (props.$active ? '700' : '500')};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;

  &:hover {
    color: #ffffff;
    background: transparent;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.$active ? '60%' : '0')};
    height: 2px;
    background: #ffffff;
    transition: width 0.3s ease;
    border-radius: 1px;
  }

  &:hover::after {
    width: 60%;
  }

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    padding: 18px 36px;
    font-size: 18px;
    letter-spacing: 0.7px;
  }

  /* 중간 화면 (width: 1024px-1199px) - QHD, 큰 노트북 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    padding: 12px 24px;
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  /* 표준 화면 (width: 768px-1023px) - FHD, 표준 노트북 */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 14px 28px;
    font-size: 15px;
    letter-spacing: 0.4px;
  }

  /* 작은 화면 (width: 480px-767px) - 태블릿 */
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 12px 24px;
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  /* 모바일 (width < 480px) */
  @media (max-width: 479px) {
    padding: 10px 20px;
    font-size: 13px;
    letter-spacing: 0.2px;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }

  /* 매우 작은 모바일 (width < 360px) */
  @media (max-width: 359px) {
    padding: 8px 16px;
    font-size: 12px;
    letter-spacing: 0.1px;
  }
`

export default TabButtons
