import styled from '@emotion/styled'

interface SearchHeaderProps {
  query: string
  resultCount: number
}

export default function SearchHeader({
  query,
  resultCount,
}: SearchHeaderProps) {
  return (
    <SearchHeaderContainer>
      <SearchTitle>
        <QuoteMark>"</QuoteMark>
        <SearchQuery>{query}</SearchQuery>
        <QuoteMark>"</QuoteMark>
        <SearchResultText>검색 결과</SearchResultText>
        <ResultCount>{resultCount.toLocaleString()}개</ResultCount>
      </SearchTitle>
    </SearchHeaderContainer>
  )
}

const SearchHeaderContainer = styled.div`
  padding: 24px 0 32px;
  margin-bottom: 24px;
  text-align: center;
`

const SearchTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  line-height: 1.3;
`

const QuoteMark = styled.span`
  color: #ffffff;
  font-weight: 800;
`

const SearchQuery = styled.span`
  color: #a8e840;
  font-weight: 800;
`

const SearchResultText = styled.span`
  color: #e5e7eb;
  font-weight: 500;
`

const ResultCount = styled.span`
  color: #ffffff;
  font-weight: 700;
  // background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 16px;
  display: inline-flex;
  align-items: center;
`
