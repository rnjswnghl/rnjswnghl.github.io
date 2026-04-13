/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/common/auth'
import { useToastStore } from '@/common/stores/toastStore'

interface Article {
  category: string
  subCategory?: string
  title: string
  description: string
  date: string
  author: string
  imageUrl?: string
}

export default function MainContent() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()
  const { showToast } = useToastStore()

  const handleArticleClick = (category: string) => {
    switch (category) {
      case 'FITTING':
        if (isLoggedIn) {
          navigate('/fittingroom')
        } else {
          showToast('로그인이 필요한 서비스입니다.')
        }
        return
      case 'RECOMMEND':
        navigate('/recommend')
        return
      case 'Image Search':
        navigate('/image-search')
        return
      case 'HOT ITEMS':
        navigate('/HotItems')
        return
      default:
        return
    }
  }
  const featuredArticles: Article[] = [
    {
      category: '',
      title: '나만의 패션 큐레이터\nON-WEAR',
      description: '당신의 취향을 반영한 맞춤형 추천',
      date: '',
      author: '',
    },
    {
      category: 'FITTING',
      title: '사진 속 나에게 옷을 입혀보다',
      description: '가상 피팅으로 미리 경험하는 새로운 스타일',
      date: '',
      author: '',
    },
    {
      category: 'RECOMMEND',
      title: '당신을 위한 맞춤 추천',
      description: '취향 분석을 통한 개인화된 상품 추천',
      date: '',
      author: '',
    },
    {
      category: 'Image Search',
      title: '사진과 유사한 옷들을 한 번에',
      description: '비슷한 스타일을 빠르고 간편하게 찾기',
      date: '',
      author: '',
    },
    {
      category: 'HOT ITEMS',
      title: '지금 가장 인기있는 아이템',
      description: '카테고리별 주목받는 상품들',
      date: '',
      author: '',
    },
  ]

  return (
    <div css={mainContainerStyle}>
      <section css={firstSectionStyle}>
        {/* 좌측: 원래 오른쪽 그리드의 왼쪽 열 (index 0, 2) */}
        <div css={gridColumnStyle}>
          {[0, 2].map((i) => {
            const article = featuredArticles[i + 1]
            return (
              <article
                key={`left-col-${i}`}
                css={subArticleStyle}
                className={i === 0 ? 'featured-card' : 'third-card'}
                onClick={() => handleArticleClick(article.category)}
              >
                <div css={articleContentStyle}>
                  <div css={categoryStyle}>{article.category}</div>
                  <h3 css={subTitleStyle}>{article.title}</h3>
                  <p css={descriptionStyle}>{article.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        {/* 가운데: 네온 영역 */}
        <article css={smallArticleStyle} onClick={() => navigate('/')}>
          <div css={[articleContentStyle, leftArticleContentStyle]}>
            <div css={categoryStyle}>{featuredArticles[0].category}</div>
            <h2 css={mainTitleStyle}>{featuredArticles[0].title}</h2>
            <p css={descriptionStyle}>{featuredArticles[0].description}</p>
          </div>
        </article>

        {/* 우측: 원래 오른쪽 그리드의 오른쪽 열 (index 1, 3) */}
        <div css={gridColumnStyle}>
          {[1, 3].map((i) => {
            const article = featuredArticles[i + 1]
            return (
              <article
                key={`right-col-${i}`}
                css={subArticleStyle}
                className={i === 1 ? 'second-card' : 'fourth-card'}
                onClick={() => handleArticleClick(article.category)}
              >
                <div css={articleContentStyle}>
                  <div css={categoryStyle}>{article.category}</div>
                  <h3 css={subTitleStyle}>{article.title}</h3>
                  <p css={descriptionStyle}>{article.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

const mainContainerStyle = css`
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow-y: hidden;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

const firstSectionStyle = css`
  display: grid;
  grid-template-columns: 1fr 520px 1fr; /* 좌-중앙-우 */
  background: #eee;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`

const gridColumnStyle = css`
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100vh;
  background: #eee;
  overflow: hidden;
`

const smallArticleStyle = css`
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: transform 0.3s ease;
  background: #a8e840;
  width: 520px;
  height: 100vh;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      // rgba(0, 0, 0, 0.2) 0%,
      // rgba(0, 0, 0, 0.4) 50%,
       // rgba(0, 0, 0, 0.8) 100%
    );
  }
`

const subArticleStyle = css`
  position: relative;
  background: #f8f8f8;
  overflow: hidden;
  cursor: pointer;
  height: calc(100vh / 2);
  transition: transform 0.3s ease;

  &.featured-card {
    background: url('/img/kanye1.avif') center/cover;
  }

  &.second-card {
    background: url('/img/girl.png') center/cover;
  }

  &.third-card {
    background: url('/img/izy.avif') center/cover;
  }

  &.fourth-card {
    background: url('/img/tyler.avif') center/cover;
  }

  &:hover {
    transform: scale(1.02);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: transparent;
  }
`

const articleContentStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: #fff;
`

const leftArticleContentStyle = css`
  color: #000;
  font-weight: 800;
`

const categoryStyle = css`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`

const mainTitleStyle = css`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  white-space: pre-line;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`

const subTitleStyle = css`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`

const descriptionStyle = css`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  margin-left: 3px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`
