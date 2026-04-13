import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

export type SortOption = 'name-asc' | 'name-desc' | 'price-high' | 'price-low'

interface SortFilterProps {
  onSortChange: (sortOptions: SortOption[]) => void
  sortOptions?: SortOption[] // 현재 선택된 정렬 옵션들
}

export default function SortFilter({
  onSortChange,
  sortOptions: propSortOptions,
}: SortFilterProps) {
  const [internalSelectedSorts, setInternalSelectedSorts] = useState<
    SortOption[]
  >([])

  // prop으로 받은 sortOptions와 내부 상태 동기화
  const currentSelectedSorts =
    propSortOptions !== undefined ? propSortOptions : internalSelectedSorts

  // prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    if (propSortOptions !== undefined) {
      setInternalSelectedSorts(propSortOptions)
    }
  }, [propSortOptions])

  const handleSortSelect = (sortOption: SortOption) => {
    const newSelectedSorts = [...currentSelectedSorts]
    const index = newSelectedSorts.indexOf(sortOption)

    if (index > -1) {
      // 이미 선택된 정렬이면 해제
      newSelectedSorts.splice(index, 1)
    } else {
      // 새로운 정렬 선택 시 같은 카테고리 내에서만 중복 제거
      if (sortOption === 'name-asc' || sortOption === 'name-desc') {
        // 이름순 선택 시 다른 이름순만 제거 (가격순은 유지)
        const filteredSorts = newSelectedSorts.filter(
          (sort) => sort !== 'name-asc' && sort !== 'name-desc',
        ) as SortOption[]
        filteredSorts.push(sortOption)
        setInternalSelectedSorts(filteredSorts)
        onSortChange(filteredSorts)
        return
      } else if (sortOption === 'price-high' || sortOption === 'price-low') {
        // 가격순 선택 시 다른 가격순만 제거 (이름순은 유지)
        const filteredSorts = newSelectedSorts.filter(
          (sort) => sort !== 'price-high' && sort !== 'price-low',
        ) as SortOption[]
        filteredSorts.push(sortOption)
        setInternalSelectedSorts(filteredSorts)
        onSortChange(filteredSorts)
        return
      }
      newSelectedSorts.push(sortOption)
    }

    setInternalSelectedSorts(newSelectedSorts)
    onSortChange(newSelectedSorts)
  }

  const sortOptions = [
    { key: 'name-asc' as SortOption, label: 'NAME (A - Z)' },
    { key: 'name-desc' as SortOption, label: 'NAME (Z - A)' },
    { key: 'price-high' as SortOption, label: 'PRICE HIGH' },
    { key: 'price-low' as SortOption, label: 'PRICE LOW' },
  ]

  return (
    <SortButtons>
      {sortOptions.map((option) => (
        <SortButton
          key={option.key}
          isActive={currentSelectedSorts.includes(option.key)}
          onClick={() => handleSortSelect(option.key)}
        >
          {option.label}
        </SortButton>
      ))}
    </SortButtons>
  )
}

const SortButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`

const SortButton = styled.button<{ isActive: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.isActive ? '#a8e840' : '#374151')};
  border-radius: 8px;
  background: ${(props) => (props.isActive ? '#1a1a1a' : '#1a1a1a')};
  color: ${(props) => (props.isActive ? '#a8e840' : '#9ca3af')};
  font-size: 15px;
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
