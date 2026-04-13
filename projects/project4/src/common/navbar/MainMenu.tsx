/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from '@/common/navbar/Logo'
import Google from '@/common/assets/Google__G__logo.svg'
import { useAuthStore, startGoogleLogin } from '@/common/auth'
import { Search, Crown, Target, Shirt, Camera, LogOut } from 'lucide-react'
import { useToastStore } from '@/common/stores/toastStore'

interface MainMenuProps {
  onSearchClick: () => void
}

export default function MainMenu({ onSearchClick }: MainMenuProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, logout: storeLogout } = useAuthStore()
  const { showToast } = useToastStore()

  const isActive = (path: string) => {
    const currentPath = location.pathname.toLowerCase()
    const checkPath = path.toLowerCase()
    return (
      currentPath.startsWith(checkPath) ||
      (checkPath === '/hotitems' && currentPath === '/')
    )
  }

  return (
    <nav css={containerStyle}>
      <div css={logoContainerStyle}>
        <Logo />
      </div>

      <div css={menuItemsStyle}>
        <button
          css={[
            menuItemStyle,
            location.pathname === '/search' && activeMenuItemStyle,
          ]}
          onClick={onSearchClick}
        >
          <Search />
          <span className="menu-text">Search</span>
        </button>
        <button
          css={[menuItemStyle, isActive('/fittingroom') && activeMenuItemStyle]}
          onClick={() =>
            isLoggedIn
              ? navigate('/fittingroom')
              : showToast('로그인이 필요한 서비스입니다.')
          }
        >
          <Shirt />
          <span className="menu-text">Fitting</span>
          {/* <span css={descriptionStyle}>
            {isLoggedIn
              ? '내 마네킹, 찜, 코디를 관리하고 시도해봐요'
              : '로그인하여 마이페이지를 이용해보세요'}
          </span> */}
        </button>
        <button
          css={[menuItemStyle, isActive('/recommend') && activeMenuItemStyle]}
          onClick={() => navigate('/recommend')}
        >
          <Target />
          <span className="menu-text">Recommend</span>
          {/* <span css={descriptionStyle}>
            취향 기반 맞춤 추천 아이템을 만나보세요
          </span> */}
        </button>
        <button
          css={[
            menuItemStyle,
            isActive('/image-search') && activeMenuItemStyle,
          ]}
          onClick={() => navigate('/image-search')}
        >
          <Camera />
          <span className="menu-text">Image Search</span>
          {/* <span css={descriptionStyle}>
            이미지 검색을 통해 원하는 아이템을 찾아보세요
          </span> */}
        </button>

        <button
          css={[menuItemStyle, isActive('/hotitems') && activeMenuItemStyle]}
          onClick={() => navigate('/HotItems')}
        >
          <Crown />
          <span className="menu-text">Hot</span>
          {/* <span css={descriptionStyle}>
            요즘 가장 인기 있는 카테고리별 아이템을 확인해요
          </span> */}
        </button>
      </div>

      <div css={authContainerStyle}>
        {!isLoggedIn ? (
          <button
            css={[
              menuItemStyle,
              location.pathname.includes('/fittingroom') && activeMenuItemStyle,
            ]}
            onClick={startGoogleLogin}
          >
            <img src={Google} alt="Google Logo" css={googleLogoStyle} />
            <span className="menu-text">Sign in with Google</span>
          </button>
        ) : (
          <button css={menuItemStyle} onClick={storeLogout}>
            <LogOut />
            <span className="menu-text">Logout</span>
          </button>
        )}
      </div>
    </nav>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 80px;
  height: 100%;
  background: #000;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.7);
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;

  &:hover {
    width: 200px;
  }
`

const logoContainerStyle = css`
  padding: 12px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 80px;
  min-width: 80px;
`

const menuItemsStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 14px;
`

const menuItemStyle = css`
  width: 100%;
  text-align: left;
  padding: 12px;
  background: none;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  svg {
    width: 24px;
    height: 24px;
    min-width: 24px;
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.1));
  }

  .menu-text {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  /* 기본 상태에서는 텍스트 숨김 */

  &:hover {
    background: rgba(30, 30, 30, 0.9);
    color: #fff;
    // text-shadow: 0 0 12px rgba(255, 255, 255, 0.5);

    svg {
      filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.4));
    }

    .menu-text {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

const activeMenuItemStyle = css`
  background: rgba(40, 40, 40, 1);
  color: #fff;
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.6);

  svg {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
  }

  /* 활성화된 메뉴는 nav 호버 시 텍스트 표시 */
  nav:hover & .menu-text {
    opacity: 1;
    transform: translateX(0);
  }

  &:hover {
    background: rgba(17, 24, 39, 1);
  }
`

const authContainerStyle = css`
  margin-top: auto;
  padding: 12px;
`

const googleLogoStyle = css`
  width: 18px;
  height: 18px;
`
