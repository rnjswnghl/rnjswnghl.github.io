import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BrandFilterProps {
  onBrandsChange: (brands: string[]) => void
  availableBrands: string[]
  selectedBrands?: string[] // 현재 선택된 브랜드들
}

export default function BrandFilter({
  onBrandsChange,
  availableBrands,
  selectedBrands = [],
}: BrandFilterProps) {
  const [internalSelectedBrands, setInternalSelectedBrands] = useState<
    Set<string>
  >(new Set())

  // prop으로 받은 selectedBrands와 내부 상태 동기화
  const currentSelectedBrands =
    selectedBrands.length > 0 ? new Set(selectedBrands) : internalSelectedBrands

  // prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    if (selectedBrands.length > 0) {
      setInternalSelectedBrands(new Set(selectedBrands))
    } else {
      setInternalSelectedBrands(new Set())
    }
  }, [selectedBrands])
  const [searchTerm, setSearchTerm] = useState('')

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6 // 한 번에 보여줄 브랜드 수 (전체 선택 포함)

  // 검색어에 따라 브랜드 필터링
  const filteredBrands = availableBrands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 페이지네이션 계산 (전체 선택 버튼 포함)
  const totalPages = Math.ceil((filteredBrands.length + 1) / itemsPerPage) // +1 for 전체 선택 버튼
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // 전체 선택 버튼이 포함된 아이템들
  const allItems = ['ALL', ...filteredBrands]
  const currentItems = allItems.slice(startIndex, endIndex)
  const isSelectAllInCurrentPage = currentItems.includes('ALL')
  const currentBrands = currentItems.filter((item) => item !== 'ALL')

  // 검색어가 변경되면 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(0)
  }, [searchTerm])

  // 화살표 네비게이션 핸들러
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  const handleBrandToggle = (brand: string) => {
    const newSelectedBrands = new Set(currentSelectedBrands)

    if (newSelectedBrands.has(brand)) {
      newSelectedBrands.delete(brand)
    } else {
      newSelectedBrands.add(brand)
    }

    setInternalSelectedBrands(newSelectedBrands)
    onBrandsChange(Array.from(newSelectedBrands))
  }

  const handleSelectAll = () => {
    if (currentSelectedBrands.size === filteredBrands.length) {
      // 모두 선택된 상태면 모두 해제
      setInternalSelectedBrands(new Set())
      onBrandsChange([])
    } else {
      // 모두 선택
      const allBrands = new Set(filteredBrands)
      setInternalSelectedBrands(allBrands)
      onBrandsChange(filteredBrands)
    }
  }

  return (
    <BrandFilterContainer>
      <SearchInput
        type="text"
        placeholder="브랜드 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <BrandButtons>
        <BrandContainer>
          <BrandList>
            {isSelectAllInCurrentPage && (
              <ActionButton onClick={handleSelectAll}>ALL</ActionButton>
            )}

            {currentBrands.map((brand) => (
              <BrandButton
                key={brand}
                type="button"
                isActive={currentSelectedBrands.has(brand)}
                onClick={() => handleBrandToggle(brand)}
              >
                {brand}
              </BrandButton>
            ))}
          </BrandList>

          {totalPages > 1 && (
            <NavigationContainer>
              <ArrowButton
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                direction="prev"
              >
                <ChevronLeft size={16} />
              </ArrowButton>

              <PageInfo>
                {currentPage + 1} / {totalPages}
              </PageInfo>

              <ArrowButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                direction="next"
              >
                <ChevronRight size={16} />
              </ArrowButton>
            </NavigationContainer>
          )}
        </BrandContainer>
      </BrandButtons>

      {filteredBrands.length === 0 && searchTerm && (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}
    </BrandFilterContainer>
  )
}

const BrandFilterContainer = styled.div`
  padding: 0;
  background: transparent;
`

const BrandButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`

const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const BrandList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 270px;
  justify-content: flex-start;
  overflow: hidden;
`

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
  flex-shrink: 0;
  height: 50px;
`

const ArrowButton = styled.button<{ direction: 'prev' | 'next' }>`
  width: 32px;
  height: 32px;
  border: 1px solid #374151;
  border-radius: 6px;
  background: #1a1a1a;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: #a8e840;
    color: #a8e840;
    background: #0f1115;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(168, 232, 64, 0.2);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const PageInfo = styled.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
`

const ActionButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #374151;
  border-radius: 8px;
  background: #1a1a1a;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 40px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background: #0f1115;
    border-color: #a8e840;
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #374151;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px auto 12px;
  background: #1a1a1a;
  color: #ffffff;
  max-width: 280px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #a8e840;
    box-shadow: 0 0 0 2px rgba(168, 232, 64, 0.15);
    background: #0f1115;
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const BrandButton = styled.button<{ isActive: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.isActive ? '#a8e840' : '#374151')};
  border-radius: 8px;
  background: ${(props) => (props.isActive ? '#1a1a1a' : '#1a1a1a')};
  color: ${(props) => (props.isActive ? '#a8e840' : '#9ca3af')};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  width: 100%;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #a8e840;
    background: ${(props) => (props.isActive ? '#1a1a1a' : '#0f1115')};
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: ${(props) =>
      props.isActive
        ? '0 2px 8px rgba(168, 232, 64, 0.3), 0 0 12px rgba(168, 232, 64, 0.2)'
        : '0 1px 4px rgba(0, 0, 0, 0.2)'};
  }
`

const NoResults = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  padding: 20px;
`
