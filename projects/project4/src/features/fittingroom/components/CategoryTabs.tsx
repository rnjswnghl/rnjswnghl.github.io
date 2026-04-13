import styled from '@emotion/styled'

interface CategoryTabsProps {
  activeCategory: 'Total' | 'Upper' | 'Lower'
  onCategoryClick: (category: 'Total' | 'Upper' | 'Lower') => void
}

const CategoryTabs = ({
  activeCategory,
  onCategoryClick,
}: CategoryTabsProps) => {
  return (
    <CategoryTabContainer>
      <CategoryTabButtons>
        <CategoryTab
          $active={activeCategory === 'Total'}
          onClick={() => onCategoryClick('Total')}
        >
          Total
        </CategoryTab>
        <CategoryTab
          $active={activeCategory === 'Upper'}
          onClick={() => onCategoryClick('Upper')}
        >
          Upper
        </CategoryTab>
        <CategoryTab
          $active={activeCategory === 'Lower'}
          onClick={() => onCategoryClick('Lower')}
        >
          Lower
        </CategoryTab>
      </CategoryTabButtons>
    </CategoryTabContainer>
  )
}

const CategoryTabContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 0 auto 10px auto; /* 중앙 정렬 강화를 위한 margin 추가 */
  padding: 6px 0;
  background: transparent;
  width: 100%; /* 전체 너비 활용 */
  text-align: center; /* 하위 요소 중앙 정렬 */

  /* 큰 화면 (height ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-height: 1200px) {
    margin: 0 auto 16px auto; /* 중앙 정렬 유지 */
    padding: 8px 0;
    gap: 16px;
  }

  /* 중간 화면 (height: 900px-1199px) - QHD, 큰 노트북 */
  @media (min-height: 900px) and (max-height: 1199px) {
    margin: 0 auto 12px auto; /* 중앙 정렬 유지 */
    padding: 6px 0;
    gap: 14px;
  }

  /* 표준 화면 (height: 768px-899px) - FHD, 표준 노트북 */
  @media (min-height: 768px) and (max-height: 899px) {
    margin: 0 auto 8px auto; /* 중앙 정렬 유지 */
    padding: 4px 0;
    gap: 12px;
  }

  /* 작은 화면 (height < 768px) - HD, 작은 노트북, 태블릿 */
  @media (max-height: 767px) {
    margin: 0 auto 6px auto; /* 중앙 정렬 유지 */
    padding: 4px 0;
    gap: 10px;
  }

  /* 모바일 너비 추가 고려 */
  @media (max-width: 480px) {
    margin: 0 auto 8px auto; /* 중앙 정렬 유지 */
    padding: 4px 0;
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }
`

const CategoryTabButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%; /* 전체 너비 활용 */
  margin: 0 auto; /* 추가 중앙 정렬 */

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    gap: 14px;
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
    flex-wrap: wrap;
    justify-content: center;
  }
`

const CategoryTab = styled.button<{ $active?: boolean }>`
  padding: 8px 20px;
  border: none;
  background: ${(props) => (props.$active ? '#404650' : '#2C3038')};
  color: ${(props) => (props.$active ? '#FFFFFF' : '#B0B8C1')};
  font-family: 'NanumSquare', sans-serif;
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${(props) => (props.$active ? '#404650' : '#404650')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;

  &:hover {
    background: ${(props) => (props.$active ? '#5A6169' : '#404650')};
    color: ${(props) => (props.$active ? '#FFFFFF' : '#FFFFFF')};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateY(1px);
  }

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    padding: 10px 24px;
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  /* 중간 화면 (width: 1024px-1199px) - QHD, 큰 노트북 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  /* 표준 화면 (width: 768px-1023px) - FHD, 표준 노트북 */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 20px;
    font-size: 14px;
    letter-spacing: 0.2px;
  }

  /* 작은 화면 (width: 480px-767px) - 태블릿 */
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 7px 18px;
    font-size: 13px;
    letter-spacing: 0.1px;
  }

  /* 모바일 (width < 480px) */
  @media (max-width: 479px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0;
    min-width: 60px;
  }

  /* 매우 작은 모바일 (width < 360px) */
  @media (max-width: 359px) {
    padding: 5px 12px;
    font-size: 11px;
    min-width: 50px;
  }
`

export default CategoryTabs
