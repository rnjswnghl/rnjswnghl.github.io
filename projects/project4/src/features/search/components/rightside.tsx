import styled from '@emotion/styled'
import FilterSection from '@/features/search/components/FilterSection'
import { type SortOption } from '@/features/search/components/SortFilter'

interface RightSideProps {
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

export default function RightSide(props: RightSideProps) {
  return (
    <RightSidebar>
      <SidebarContent>
        <SidebarTitle>
          {/* <span>SEARCH</span> */}
          <span>FILTERS</span>
        </SidebarTitle>
        <SidebarDescription>
          원하는 조건으로
          <br />
          검색 결과를
          <br />
          <span>필터링</span>하세요
        </SidebarDescription>

        {/* 그라데이션 구분선 */}
        <SidebarDivider />

        <FilterSection {...props} />

        {/* 두 번째 그라데이션 구분선 */}
        <SecondSidebarDivider />

        <SidebarDecor>
          <SidebarCircle />
          <SidebarLine />
        </SidebarDecor>
      </SidebarContent>
    </RightSidebar>
  )
}

const RightSidebar = styled.div`
  width: 20%;
  height: 100vh;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  font-family: 'Montserrat', sans-serif;
  overscroll-behavior: contain;
  margin: 0;
  padding: 0;
`

const SidebarContent = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  overscroll-behavior: contain;
`

const SidebarTitle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;

  span:first-of-type {
    font-size: 32px;
    font-weight: 800;
    color: #a8e840;
    letter-spacing: -1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  span:last-child {
    font-size: 32px;
    font-weight: 800;
    color: #a8e840;
    letter-spacing: -1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const SidebarDescription = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0 0 20px 0;

  span {
    color: #a8e840;
    font-weight: 800;
    position: relative;
    z-index: 1;
    letter-spacing: -1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const SidebarDecor = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
`

const SidebarCircle = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`

const SidebarLine = styled.span`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`

const SidebarDivider = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 55px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`

const SecondSidebarDivider = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`
