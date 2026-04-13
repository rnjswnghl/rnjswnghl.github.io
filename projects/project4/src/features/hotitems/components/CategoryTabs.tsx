/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type CategoryType = 'upper' | 'lower'

interface Category {
  key: string
  label: string
}

interface CategoryTabsProps {
  selectedCategory: CategoryType
  activeSection: string
  categories: Category[]
  onCategoryChange: (category: CategoryType) => void
  onSubCategoryClick: (subCategory: string) => void
}

export default function CategoryTabs({
  selectedCategory,
  activeSection,
  categories,
  onCategoryChange,
  onSubCategoryClick,
}: CategoryTabsProps) {
  return (
    <div css={stickyTabsStyle}>
      <div css={categoryTabsStyle}>
        <button
          css={[
            categoryTabStyle,
            selectedCategory === 'upper' && activeCategoryTabStyle,
          ]}
          onClick={() => onCategoryChange('upper')}
        >
          Upper
        </button>
        <button
          css={[
            categoryTabStyle,
            selectedCategory === 'lower' && activeCategoryTabStyle,
          ]}
          onClick={() => onCategoryChange('lower')}
        >
          Lower
        </button>
      </div>

      {/* 하위 카테고리 버튼들 */}
      <div css={subCategoryContainerStyle}>
        {categories.map((category) => {
          const sectionId = `${selectedCategory}/${category.key}`
          const isActive = activeSection === sectionId
          return (
            <button
              key={category.key}
              css={[
                subCategoryButtonStyle,
                isActive && activeSubCategoryButtonStyle,
              ]}
              onClick={() => onSubCategoryClick(category.key)}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      {/* 그라데이션 구분선 (하위 카테고리 아래) */}
      <div css={dividerStyle} />
    </div>
  )
}

const stickyTabsStyle = css`
  background: transparent;
  padding: 0;
  border-bottom: none;
`

const categoryTabsStyle = css`
  display: flex;
  gap: 8px;
  margin-bottom: 0;
  justify-content: center;
`

const categoryTabStyle = css`
  padding: 0px 16px 20px 16px;
  border: none;
  background: transparent;
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  flex: 1;
  min-width: 80px;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #a8e840;
    transition: width 0.3s ease;
    z-index: 2;
  }
`

const activeCategoryTabStyle = css`
  color: #a8e840;

  &::after {
    width: 100%;
  }
`

const subCategoryContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
  padding: 0 2px;
`

const subCategoryButtonStyle = css`
  padding: 12px 12px;
  border: 1px solid #374151;
  background: #1a1a1a;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 800;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(168, 232, 64, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: #a8e840;
    background: #0f1115;
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(168, 232, 64, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:focus-visible {
    outline: 2px solid #a8e840;
    outline-offset: 2px;
  }
`

const activeSubCategoryButtonStyle = css`
  background: #0f1115;
  color: #a8e840;
  border: 1px solid #a8e840;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 232, 64, 0.3);
  transform: translateY(-1px);

  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(168, 232, 64, 0.2),
      transparent
    );
  }

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }
`

const dividerStyle = css`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 25px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`
