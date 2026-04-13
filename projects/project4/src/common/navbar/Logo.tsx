import React, { createContext, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '@/common/styles/logo.scss'

// ========================================
// 타입 정의
// ========================================
type LogoContextType = {
  text: string
}

type LogoProviderProps = {
  children: React.ReactNode
  value: string
}

type LogoFragmentProps = {
  delay: number
  duration: number
  moveX: number
  width: number
}

type LogoLayerProps = {
  layerFragments: React.ReactNode[]
  ariaHidden?: boolean
}

// ========================================
// 상수 및 변수
// ========================================
const LOGO_CONFIG = {
  DURATION: 8000, // in ms
  TREAD_LENGTH: 8.913, // from SCSS $treadLength: 1.6rem * 4 + (2 * π * 0.4rem)
  TREAD_FRAGMENTS: 40,
  LOGO_TEXT: 'ON-WEAR',
} as const

// ========================================
// Context
// ========================================
const LogoContext = createContext<LogoContextType | undefined>(undefined)

// ========================================
// Helper Functions
// ========================================
const useLogo = () => {
  const context = useContext(LogoContext)
  if (!context) {
    throw new Error('Logo components must be used within LogoProvider')
  }
  return context
}

const createTreadArrays = () => {
  const { DURATION, TREAD_LENGTH, TREAD_FRAGMENTS } = LOGO_CONFIG
  const treadFragmentWidth = TREAD_LENGTH / TREAD_FRAGMENTS
  const backTreadArray: React.ReactNode[] = []
  const frontTreadArray: React.ReactNode[] = []

  for (let f = 0; f < TREAD_FRAGMENTS; ++f) {
    const percent = f / TREAD_FRAGMENTS
    const moveX = f * treadFragmentWidth

    backTreadArray.push(
      <LogoFragment
        key={`back-${f}`}
        delay={-DURATION + percent * DURATION}
        duration={DURATION}
        moveX={-moveX}
        width={treadFragmentWidth}
      />,
    )

    frontTreadArray.push(
      <LogoFragment
        key={`front-${f}`}
        delay={-DURATION + (percent - 0.5) * DURATION}
        duration={DURATION}
        moveX={moveX}
        width={treadFragmentWidth}
      />,
    )
  }

  return { backTreadArray, frontTreadArray }
}

// ========================================
// Components
// ========================================
const LogoProvider = ({ children, value }: LogoProviderProps) => {
  const [text] = useState<string>(value)
  return (
    <LogoContext.Provider value={{ text }}>{children}</LogoContext.Provider>
  )
}

function LogoFragment({ delay, duration, moveX, width }: LogoFragmentProps) {
  const { text } = useLogo()

  const treadStyle: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    width: `calc(${width}rem + 1px)`, // extra 1px for bleed
  }

  const windowStyle: React.CSSProperties = {
    transform: `translateX(${moveX}rem)`,
  }

  return (
    <div className="tot__tread" style={treadStyle}>
      <div
        className="tot__tread-window"
        aria-hidden="true"
        data-text={text}
        style={windowStyle}
      />
    </div>
  )
}

function LogoLayer({ layerFragments, ariaHidden }: LogoLayerProps) {
  const { text } = useLogo()

  return (
    <div className="tot__layer" aria-hidden={ariaHidden}>
      {text}
      {layerFragments}
    </div>
  )
}

function Logo() {
  const { backTreadArray, frontTreadArray } = createTreadArrays()

  return (
    <LogoProvider value={LOGO_CONFIG.LOGO_TEXT}>
      <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="tot" style={{ cursor: 'pointer' }}>
          <LogoLayer layerFragments={frontTreadArray} />
          <LogoLayer layerFragments={backTreadArray} ariaHidden={true} />
        </div>
      </Link>
    </LogoProvider>
  )
}

export default Logo
