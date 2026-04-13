import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface StyleFilterProps {
  onStylesChange: (styles: string[]) => void
  availableStyles: string[]
  selectedStyles?: string[] // 현재 선택된 스타일들
}

export default function StyleFilter({
  onStylesChange,
  availableStyles,
  selectedStyles = [],
}: StyleFilterProps) {
  const [internalSelectedStyles, setInternalSelectedStyles] = useState<
    Set<string>
  >(new Set())

  // prop으로 받은 selectedStyles와 내부 상태 동기화
  const currentSelectedStyles =
    selectedStyles.length > 0 ? new Set(selectedStyles) : internalSelectedStyles

  // prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    if (selectedStyles.length > 0) {
      setInternalSelectedStyles(new Set(selectedStyles))
    } else {
      setInternalSelectedStyles(new Set())
    }
  }, [selectedStyles])
  const [searchTerm, setSearchTerm] = useState('')

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6 // 한 번에 보여줄 스타일 수 (전체 선택 포함)

  // 검색어에 따라 스타일 필터링
  const filteredStyles = availableStyles.filter((style) =>
    style.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 페이지네이션 계산 (전체 선택 버튼 포함)
  const totalPages = Math.ceil((filteredStyles.length + 1) / itemsPerPage) // +1 for 전체 선택 버튼
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // 전체 선택 버튼이 포함된 아이템들
  const allItems = ['ALL', ...filteredStyles]
  const currentItems = allItems.slice(startIndex, endIndex)
  const isSelectAllInCurrentPage = currentItems.includes('ALL')
  const currentStyles = currentItems.filter((item) => item !== 'ALL')

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

  const handleStyleToggle = (style: string) => {
    const newSelectedStyles = new Set(currentSelectedStyles)

    if (newSelectedStyles.has(style)) {
      newSelectedStyles.delete(style)
    } else {
      newSelectedStyles.add(style)
    }

    setInternalSelectedStyles(newSelectedStyles)
    onStylesChange(Array.from(newSelectedStyles))
  }

  const handleSelectAll = () => {
    if (currentSelectedStyles.size === filteredStyles.length) {
      // 모두 선택된 상태면 모두 해제
      setInternalSelectedStyles(new Set())
      onStylesChange([])
    } else {
      // 모두 선택
      const allStyles = new Set(filteredStyles)
      setInternalSelectedStyles(allStyles)
      onStylesChange(filteredStyles)
    }
  }

  return (
    <StyleFilterContainer>
      <SearchInput
        type="text"
        placeholder="스타일 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <StyleButtons>
        <StyleContainer>
          <StyleList>
            {isSelectAllInCurrentPage && (
              <ActionButton onClick={handleSelectAll}>ALL</ActionButton>
            )}

            {currentStyles.map((style) => (
              <StyleButton
                key={style}
                type="button"
                isActive={currentSelectedStyles.has(style)}
                onClick={() => handleStyleToggle(style)}
              >
                {style}
              </StyleButton>
            ))}
          </StyleList>

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
        </StyleContainer>
      </StyleButtons>

      {filteredStyles.length === 0 && searchTerm && (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}
    </StyleFilterContainer>
  )
}

const StyleFilterContainer = styled.div`
  padding: 0;
  background: transparent;
`

const StyleButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 270px;
  justify-content: flex-start;
  overflow: hidden;
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

const NoResults = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  padding: 20px;
`

const StyleButton = styled.button<{ isActive: boolean }>`
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
