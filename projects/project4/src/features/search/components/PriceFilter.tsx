import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

interface PriceRange {
  min: number
  max: number
}

interface PriceFilterProps {
  onPriceRangesChange: (ranges: PriceRange[]) => void
  priceRanges?: PriceRange[] // 현재 선택된 가격 범위들
}

// 상수 정의
const PRICE_RANGES = {
  'under-30k': { min: 0, max: 30000 },
  '30k-50k': { min: 30000, max: 50000 },
  '50k-80k': { min: 50000, max: 80000 },
  '80k-100k': { min: 80000, max: 100000 },
  'over-100k': { min: 100000, max: 100000000 },
} as const

const PRICE_BUTTONS = [
  { key: 'under-30k', label: `~ 30,000` },
  { key: '30k-50k', label: `30,000 ~ 50,000` },
  { key: '50k-80k', label: `50,000 ~ 80,000` },
  { key: '80k-100k', label: `80,000 ~ 100,000` },
  { key: 'over-100k', label: `100,000 ~` },
  { key: 'custom', label: 'CUSTOM' },
] as const

const DEFAULT_CUSTOM_RANGE = { min: 0, max: 99999 }

export default function PriceFilter({
  onPriceRangesChange,
  priceRanges = [],
}: PriceFilterProps) {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Set<string>>(
    new Set(),
  )
  const [customPriceRange, setCustomPriceRange] = useState(DEFAULT_CUSTOM_RANGE)

  // prop으로 받은 priceRanges를 기반으로 내부 상태 동기화
  useEffect(() => {
    if (priceRanges.length === 0) {
      setSelectedPriceRanges(new Set())
      setCustomPriceRange(DEFAULT_CUSTOM_RANGE)
    } else {
      const ranges = new Set<string>()
      let hasCustomRange = false

      priceRanges.forEach((range) => {
        let isPresetRange = false
        // 미리 정의된 범위와 매칭
        Object.entries(PRICE_RANGES).forEach(([key, value]) => {
          if (value.min === range.min && value.max === range.max) {
            ranges.add(key)
            isPresetRange = true
          }
        })

        // 커스텀 범위인지 확인
        if (!isPresetRange) {
          ranges.add('custom')
          setCustomPriceRange(range)
          hasCustomRange = true
        }
      })

      setSelectedPriceRanges(ranges)
      if (!hasCustomRange) {
        setCustomPriceRange(DEFAULT_CUSTOM_RANGE)
      }
    }
  }, [priceRanges])

  // 선택된 범위들을 PriceRange 배열로 변환하는 헬퍼 함수
  const convertToPriceRanges = (ranges: Set<string>): PriceRange[] => {
    const selectedRanges: PriceRange[] = Array.from(ranges)
      .filter((rangeKey) => rangeKey !== 'custom')
      .map((rangeKey) => PRICE_RANGES[rangeKey as keyof typeof PRICE_RANGES])

    if (ranges.has('custom')) {
      selectedRanges.push(customPriceRange)
    }

    return selectedRanges
  }

  const handlePriceRangeSelect = (range: string) => {
    const newSelectedRanges = new Set(selectedPriceRanges)

    if (range === 'custom') {
      // 직접 입력 토글
      if (newSelectedRanges.has('custom')) {
        newSelectedRanges.delete('custom')
      } else {
        newSelectedRanges.clear()
        newSelectedRanges.add('custom')
      }
    } else {
      // 가격대 토글
      if (newSelectedRanges.has(range)) {
        newSelectedRanges.delete(range)
      } else {
        newSelectedRanges.delete('custom')
        newSelectedRanges.add(range)
      }
    }

    setSelectedPriceRanges(newSelectedRanges)
    onPriceRangesChange(convertToPriceRanges(newSelectedRanges))
  }

  const handleCustomPriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? 0 : Number(value)
    let validatedValue = isNaN(numValue) ? 0 : Math.max(0, numValue)

    // 최대값 제한 (예: 1억원)
    const MAX_PRICE = 100000000
    validatedValue = Math.min(validatedValue, MAX_PRICE)

    const newCustomRange = { ...customPriceRange }

    if (type === 'min') {
      newCustomRange.min = validatedValue
      // 최솟값이 최댓값보다 크면 최댓값을 최솟값으로 조정
      if (validatedValue > customPriceRange.max) {
        newCustomRange.max = validatedValue
      }
    } else {
      newCustomRange.max = validatedValue
      // 최댓값이 최솟값보다 작으면 최솟값을 최댓값으로 조정
      if (validatedValue < customPriceRange.min) {
        newCustomRange.min = validatedValue
      }
    }

    setCustomPriceRange(newCustomRange)

    // custom이 선택된 상태일 때만 onChange 호출
    if (selectedPriceRanges.has('custom')) {
      const newSelectedRanges = new Set(selectedPriceRanges)
      const updatedRanges: PriceRange[] = Array.from(newSelectedRanges)
        .filter((rangeKey) => rangeKey !== 'custom')
        .map((rangeKey) => PRICE_RANGES[rangeKey as keyof typeof PRICE_RANGES])

      updatedRanges.push(newCustomRange)
      onPriceRangesChange(updatedRanges)
    }
  }

  // 가격 범위 유효성 검사
  const validatePriceRange = (min: number, max: number) => {
    if (min < 0 || max < 0) return false
    if (min > max) return false
    if (min > 100000000 || max > 100000000) return false // 1억원 초과
    if (min === max && min === 0) return false // 둘 다 0인 경우
    return true
  }

  const isValidPriceRange = validatePriceRange(
    customPriceRange.min,
    customPriceRange.max,
  )

  return (
    <PriceFilterContainer>
      <PriceButtons>
        {PRICE_BUTTONS.map((button) => (
          <PriceButton
            key={button.key}
            isActive={selectedPriceRanges.has(button.key)}
            onClick={() => handlePriceRangeSelect(button.key)}
          >
            {button.label}
          </PriceButton>
        ))}
      </PriceButtons>

      {selectedPriceRanges.has('custom') && (
        <CustomPriceRange>
          <PriceInputContainer>
            <PriceInputWrapper>
              <PriceInputLabel>MIN</PriceInputLabel>
              <PriceUnit>₩</PriceUnit>
              <PriceInput
                type="number"
                placeholder="0"
                value={customPriceRange.min || ''}
                onChange={(e) => handleCustomPriceChange('min', e.target.value)}
                min="0"
                max="100000000"
                isInvalid={!isValidPriceRange}
              />
            </PriceInputWrapper>

            <PriceInputWrapper>
              <PriceInputLabel>MAX</PriceInputLabel>
              <PriceUnit>₩</PriceUnit>
              <PriceInput
                type="number"
                placeholder="99999"
                value={customPriceRange.max || ''}
                onChange={(e) => handleCustomPriceChange('max', e.target.value)}
                min="0"
                max="100000000"
                isInvalid={!isValidPriceRange}
              />
            </PriceInputWrapper>
          </PriceInputContainer>

          {!isValidPriceRange && (
            <ErrorMessage>
              올바른 가격 범위를 입력해주세요. (최솟값 ≤ 최댓값, 1억원 이하)
            </ErrorMessage>
          )}

          {isValidPriceRange && (
            <PriceRangeInfo>
              현재 범위: {customPriceRange.min.toLocaleString()}원 ~{' '}
              {customPriceRange.max.toLocaleString()}원
            </PriceRangeInfo>
          )}
        </CustomPriceRange>
      )}
    </PriceFilterContainer>
  )
}

// 스타일 컴포넌트
const PriceFilterContainer = styled.div`
  padding: 0;
  margin: 0;
`

const PriceButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`

const PriceButton = styled.button<{ isActive: boolean }>`
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

const CustomPriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 8px auto;
  padding: 14px;
  background: #1a1a1a;
  border-radius: 8px;
  border: 1px solid #374151;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
`

const PriceInput = styled.input<{ isInvalid?: boolean }>`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid ${(props) => (props.isInvalid ? '#ef4444' : '#374151')};
  border-radius: 6px;
  font-size: 13px;
  text-align: center;
  background: #0f1115;
  color: #ffffff;
  font-weight: 600;
  box-sizing: border-box;
  min-width: 0;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.isInvalid ? '#ef4444' : '#a8e840')};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.isInvalid
          ? 'rgba(239, 68, 68, 0.15)'
          : 'rgba(168, 232, 64, 0.15)'};
    background: #1a1a1a;
  }

  &::placeholder {
    color: #9ca3af;
    font-size: 12px;
  }

  /* 숫자 입력 스피너 제거 (선택사항) */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

const PriceInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  width: 100%;
`

const PriceInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
  width: 100%;
`

const PriceInputLabel = styled.label`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  min-width: 35px;
`

const PriceUnit = styled.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  min-width: 20px;
`

const ErrorMessage = styled.div`
  font-size: 11px;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
  font-weight: 500;
`

const PriceRangeInfo = styled.div`
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  padding: 4px 8px;
  background: rgba(107, 114, 128, 0.1);
  border-radius: 4px;
  font-weight: 500;
`
