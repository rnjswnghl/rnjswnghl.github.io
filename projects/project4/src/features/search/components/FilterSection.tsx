import { useState } from 'react'
import styled from '@emotion/styled'
import PriceFilter from '@/features/search/components/PriceFilter'
import SortFilter, {
  type SortOption,
} from '@/features/search/components/SortFilter'
import BrandFilter from '@/features/search/components/BrandFilter'
import StyleFilter from '@/features/search/components/StyleFilter'

interface FilterSectionProps {
  priceRanges: { min: number; max: number }[]
  onPriceRangesChange: (ranges: { min: number; max: number }[]) => void
  selectedBrands: string[]
  onBrandsChange: (brands: string[]) => void
  selectedStyles: string[]
  onStylesChange: (styles: string[]) => void
  wishlistOnly: boolean
  onWishlistChange: (wishlistOnly: boolean) => void
  sortOptions: SortOption[]
  onSortChange: (sortOptions: SortOption[]) => void
  availableBrands: string[]
  availableStyles: string[]
}

export default function FilterSection({
  priceRanges,
  onPriceRangesChange,
  selectedBrands,
  onBrandsChange,
  selectedStyles,
  onStylesChange,
  wishlistOnly,
  onWishlistChange,
  sortOptions,
  onSortChange,
  availableBrands,
  availableStyles,
}: FilterSectionProps) {
  const [activeFilter, setActiveFilter] = useState<
    'price' | 'brand' | 'style' | 'wishlist' | 'sort' | null
  >(null)

  return (
    <FilterSectionContainer>
      {activeFilter === null && (
        <>
          {/* 정렬 */}
          <FilterTabs>
            <FilterTab
              isActive={false}
              onClick={() => {
                onWishlistChange(false)
                setActiveFilter('sort')
              }}
            >
              SORT {sortOptions.length > 0 && `(${sortOptions.length})`}
            </FilterTab>
          </FilterTabs>

          {/* 가격별 */}
          <FilterTabs>
            <FilterTab
              isActive={false}
              onClick={() => {
                onWishlistChange(false)
                setActiveFilter('price')
              }}
            >
              PRICE {priceRanges.length > 0 && `(${priceRanges.length})`}
            </FilterTab>
          </FilterTabs>

          {/* 브랜드별 */}
          <FilterTabs>
            <FilterTab
              isActive={false}
              onClick={() => {
                onWishlistChange(false)
                setActiveFilter('brand')
              }}
            >
              BRAND {selectedBrands.length > 0 && `(${selectedBrands.length})`}
            </FilterTab>
          </FilterTabs>

          {/* 스타일별 */}
          <FilterTabs>
            <FilterTab
              isActive={false}
              onClick={() => {
                onWishlistChange(false)
                setActiveFilter('style')
              }}
            >
              STYLE {selectedStyles.length > 0 && `(${selectedStyles.length})`}
            </FilterTab>
          </FilterTabs>

          {/* 찜한 상품 */}
          <FilterTabs>
            <FilterTab
              isActive={false}
              onClick={() => {
                onWishlistChange(true)
                setActiveFilter('wishlist')
              }}
            >
              LIKED {wishlistOnly && '(PICK)'}
            </FilterTab>
          </FilterTabs>
        </>
      )}

      {activeFilter === 'sort' && (
        <>
          <FilterTabs>
            <FilterTab isActive={true} onClick={() => setActiveFilter(null)}>
              SORT {sortOptions.length > 0 && `(${sortOptions.length})`}
            </FilterTab>
          </FilterTabs>
          <Panel>
            <PanelScroll>
              <SortFilter
                onSortChange={onSortChange}
                sortOptions={sortOptions}
              />
            </PanelScroll>
          </Panel>
        </>
      )}

      {activeFilter === 'price' && (
        <>
          <FilterTabs>
            <FilterTab isActive={true} onClick={() => setActiveFilter(null)}>
              PRICE {priceRanges.length > 0 && `(${priceRanges.length})`}
            </FilterTab>
          </FilterTabs>
          <Panel>
            <PanelScroll>
              <PriceFilter
                onPriceRangesChange={onPriceRangesChange}
                priceRanges={priceRanges}
              />
            </PanelScroll>
          </Panel>
        </>
      )}

      {activeFilter === 'brand' && (
        <>
          <FilterTabs>
            <FilterTab isActive={true} onClick={() => setActiveFilter(null)}>
              BRAND {selectedBrands.length > 0 && `(${selectedBrands.length})`}
            </FilterTab>
          </FilterTabs>
          <Panel>
            <PanelScroll>
              <BrandFilter
                onBrandsChange={onBrandsChange}
                availableBrands={availableBrands}
                selectedBrands={selectedBrands}
              />
            </PanelScroll>
          </Panel>
        </>
      )}

      {activeFilter === 'style' && (
        <>
          <FilterTabs>
            <FilterTab isActive={true} onClick={() => setActiveFilter(null)}>
              STYLE {selectedStyles.length > 0 && `(${selectedStyles.length})`}
            </FilterTab>
          </FilterTabs>
          <Panel>
            <PanelScroll>
              <StyleFilter
                onStylesChange={onStylesChange}
                availableStyles={availableStyles}
                selectedStyles={selectedStyles}
              />
            </PanelScroll>
          </Panel>
        </>
      )}

      {activeFilter === 'wishlist' && (
        <>
          <FilterTabs>
            <FilterTab
              isActive={true}
              onClick={() => {
                onWishlistChange(false)
                setActiveFilter(null)
              }}
            >
              LIKED {wishlistOnly && '(PICK)'}
            </FilterTab>
          </FilterTabs>
          {/* 찜한 상품은 패널 UI가 따로 없으므로 버튼 토글만 */}
        </>
      )}
    </FilterSectionContainer>
  )
}

const FilterSectionContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #ffffff;
  background: transparent;
`

const FilterTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
  padding: 0 10px;
  width: 100%;
  max-width: 280px;
`

const FilterTab = styled.button<{ isActive: boolean }>`
  padding: 12px 12px;
  border: 1px solid #374151;
  background: #1a1a1a;
  border-radius: 5px; /*기존 8px*/
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  text-align: center;
  overflow: hidden;
  color: ${(props) => (props.isActive ? '#a8e840' : '#9ca3af')};
  transition: all 0.3s ease;

  /* 샤라락 스윕 효과 - HotItems 하위 탭과 동일 */
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
  }

  &:hover::before {
    left: 100%;
  }

  ${(props) =>
    props.isActive &&
    `
    background: #0f1115;
    color: #a8e840;
    border: 1px solid #a8e840;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(168, 232, 64, 0.3);
    transform: translateY(-1px);
  `}
`

const Panel = styled.div`
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  max-height: none;
  overflow: hidden;
  overscroll-behavior: contain;
  margin: 12px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
      max-height: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
      max-height: 500px;
    }
  }
`

const PanelScroll = styled.div`
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`

// Grid/Cell removed for 1-column layout
