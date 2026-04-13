import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

interface WishlistFilterProps {
  onWishlistChange: (wishlistOnly: boolean) => void
  wishlistOnly?: boolean // 현재 선택된 찜한 상품 상태
}

export default function WishlistFilter({
  onWishlistChange,
  wishlistOnly: propWishlistOnly,
}: WishlistFilterProps) {
  const [internalWishlistOnly, setInternalWishlistOnly] = useState(false)

  // prop으로 받은 wishlistOnly와 내부 상태 동기화
  const currentWishlistOnly =
    propWishlistOnly !== undefined ? propWishlistOnly : internalWishlistOnly

  // prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    if (propWishlistOnly !== undefined) {
      setInternalWishlistOnly(propWishlistOnly)
    }
  }, [propWishlistOnly])

  const handleWishlistToggle = () => {
    const newValue = !currentWishlistOnly
    setInternalWishlistOnly(newValue)
    onWishlistChange(newValue)
  }

  return (
    <WishlistFilterContainer>
      <FilterHeader>
        <FilterTitle>찜한 상품</FilterTitle>
      </FilterHeader>

      <WishlistOption>
        <WishlistCheckbox
          type="checkbox"
          id="wishlist-only"
          checked={currentWishlistOnly}
          onChange={handleWishlistToggle}
        />
        <WishlistLabel htmlFor="wishlist-only">찜한 상품만 보기</WishlistLabel>
      </WishlistOption>
    </WishlistFilterContainer>
  )
}

const WishlistFilterContainer = styled.div`
  padding: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
  margin-bottom: 16px;
`

const FilterHeader = styled.div`
  margin-bottom: 12px;
`

const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const WishlistOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`

const WishlistCheckbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
  transform: scale(1.2);
`

const WishlistLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
  font-weight: 500;
`
