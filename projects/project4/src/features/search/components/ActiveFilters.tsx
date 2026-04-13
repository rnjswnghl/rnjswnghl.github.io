import styled from '@emotion/styled'
import { X } from 'lucide-react'
import { type SortOption } from '@/features/search/components/SortFilter'

interface ActiveFiltersProps {
  priceRanges: { min: number; max: number }[]
  selectedBrands: string[]
  selectedStyles: string[]
  wishlistOnly: boolean
  sortOptions: SortOption[]
  onRemovePriceRange: (index: number) => void
  onRemoveBrand: (index: number) => void
  onRemoveStyle: (index: number) => void
  onRemoveWishlist: () => void
  onRemoveSort: (index: number) => void
  onClearAll: () => void
}

export default function ActiveFilters({
  priceRanges,
  selectedBrands,
  selectedStyles,
  wishlistOnly,
  sortOptions,
  onRemovePriceRange,
  onRemoveBrand,
  onRemoveStyle,
  onRemoveWishlist,
  onRemoveSort,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    priceRanges.length > 0 ||
    selectedBrands.length > 0 ||
    selectedStyles.length > 0 ||
    wishlistOnly ||
    sortOptions.length > 0

  if (!hasActiveFilters) return null

  return (
    <ActiveFiltersContainer>
      <FilterHeader>
        <FilterLabel>Applied Filters:</FilterLabel>
        <ClearAllButton onClick={onClearAll}>Clear All</ClearAllButton>
      </FilterHeader>
      <FilterTags>
        {priceRanges.map((range, index) => (
          <FilterTag key={`price-${index}`}>
            Price: {range.min.toLocaleString()}~{range.max.toLocaleString()}
            <RemoveFilterButton onClick={() => onRemovePriceRange(index)}>
              <X size={12} />
            </RemoveFilterButton>
          </FilterTag>
        ))}
        {selectedBrands.map((brand, index) => (
          <FilterTag key={`brand-${index}`}>
            Brand: {brand}
            <RemoveFilterButton onClick={() => onRemoveBrand(index)}>
              <X size={12} />
            </RemoveFilterButton>
          </FilterTag>
        ))}
        {selectedStyles.map((style, index) => (
          <FilterTag key={`style-${index}`}>
            Style: {style}
            <RemoveFilterButton onClick={() => onRemoveStyle(index)}>
              <X size={12} />
            </RemoveFilterButton>
          </FilterTag>
        ))}
        {wishlistOnly && (
          <FilterTag>
            Wishlist Only
            <RemoveFilterButton onClick={onRemoveWishlist}>
              <X size={12} />
            </RemoveFilterButton>
          </FilterTag>
        )}
        {sortOptions.map((sortOption, index) => (
          <FilterTag key={`sort-${index}`}>
            Sort:{' '}
            {(sortOption === 'name-asc' && 'Name (A-Z)') ||
              (sortOption === 'name-desc' && 'Name (Z-A)') ||
              (sortOption === 'price-high' && 'Price (High to Low)') ||
              (sortOption === 'price-low' && 'Price (Low to High)')}
            <RemoveFilterButton onClick={() => onRemoveSort(index)}>
              <X size={12} />
            </RemoveFilterButton>
          </FilterTag>
        ))}
      </FilterTags>
    </ActiveFiltersContainer>
  )
}

const ActiveFiltersContainer = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: #0f1115;
  border-radius: 5px;
  border: 1px solid #404040;
`

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const FilterLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #666;
`

const ClearAllButton = styled.button`
  background: none;
  border: 1px solid #666;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #666;
    color: #fff;
  }
`

const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #072bed;
  color: white;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 500;
`

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`
