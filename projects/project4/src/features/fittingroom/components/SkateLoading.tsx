/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useRef, useState, useCallback } from 'react'

type SkateLoadingProps = {
  isVisible: boolean
}

export default function SkateLoading({ isVisible }: SkateLoadingProps) {
  const loadingRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [ouch, setOuch] = useState(false)
  const [pressedButton, setPressedButton] = useState<string>('')
  const [showHint, setShowHint] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeScaleRef = useRef(1)

  const animateLines = useCallback(() => {
    if (!loadingRef.current) return

    const loading = loadingRef.current
    loading.style.setProperty('--line-top-x', '200%')
    loading.style.setProperty('--line-bottom-x', '100%')

    setTimeout(() => {
      loading.style.setProperty('--line-top-x', '0%')
      loading.style.setProperty('--line-bottom-x', '0%')
    }, 500)
  }, [])

  const startLineAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const duration = 1000 / timeScaleRef.current
    intervalRef.current = setInterval(animateLines, duration)
    animateLines()
  }, [animateLines])

  const stopLineAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const setTimeScale = useCallback(
    (scale: number) => {
      timeScaleRef.current = scale
      startLineAnimation()
    },
    [startLineAnimation],
  )

  const animateCSS = useCallback(
    (properties: Record<string, string>, duration = 200, delay = 0) => {
      if (!loadingRef.current) return Promise.resolve()

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          if (!loadingRef.current) return resolve()

          const loading = loadingRef.current
          Object.entries(properties).forEach(([key, value]) => {
            loading.style.setProperty(key, value)
          })

          setTimeout(() => resolve(), duration)
        }, delay)
      })
    },
    [],
  )

  const jump = useCallback(async () => {
    if (active) return
    setActive(true)
    setShowHint(true)

    setTimeScale(2)

    // Jump animation sequence
    await Promise.all([
      animateCSS({ '--skate-x': '-12px' }, 300),
      animateCSS({ '--skate-y': '-32px' }, 400, 200),
    ])

    await animateCSS({ '--skate-x': '12px' }, 500)

    await Promise.all([
      animateCSS({ '--skate-x': '0px' }, 500),
      animateCSS({ '--skate-y': '0px' }, 200),
      animateCSS(
        {
          '--arm-front': '40deg',
          '--arm-front-end': '-12deg',
          '--arm-back': '172deg',
          '--arm-back-end': '38deg',
          '--leg-front': '-8deg',
          '--leg-front-end': '102deg',
          '--leg-back': '103deg',
          '--leg-back-end': '-16deg',
          '--board-r': '-40deg',
          '--body-r': '7deg',
          '--body-y': '-90%',
          '--body-x': '-160%',
        },
        200,
        200,
      ),
    ])

    await animateCSS(
      {
        '--arm-front': '24deg',
        '--arm-front-end': '-48deg',
        '--arm-back': '164deg',
        '--arm-back-end': '-50deg',
        '--leg-front': '40deg',
        '--leg-front-end': '30deg',
        '--leg-back': '120deg',
        '--leg-back-end': '-36deg',
        '--board-r': '0deg',
        '--body-r': '12deg',
        '--body-y': '-65%',
        '--body-x': '-85%',
      },
      400,
    )

    setActive(false)
    setTimeScale(1)
  }, [active, animateCSS, setTimeScale])

  const fast = useCallback(async () => {
    if (active) return
    setActive(true)
    setShowHint(true)

    setTimeScale(2.5)

    await Promise.all([
      animateCSS({ '--skate-x': '12px' }, 300),
      animateCSS(
        {
          '--arm-front': '24deg',
          '--arm-front-end': '-48deg',
          '--arm-back': '164deg',
          '--arm-back-end': '-36deg',
          '--leg-front': '-4deg',
          '--leg-front-end': '66deg',
          '--leg-back': '111deg',
          '--leg-back-end': '-36deg',
          '--board-r': '0deg',
          '--body-r': '34deg',
          '--body-y': '-53%',
          '--body-x': '-28%',
        },
        200,
      ),
    ])
  }, [active, animateCSS, setTimeScale])

  const slow = useCallback(async () => {
    if (active) return
    setActive(true)
    setShowHint(true)

    setTimeScale(0.5)

    await Promise.all([
      animateCSS({ '--skate-x': '-12px' }, 300),
      animateCSS(
        {
          '--arm-front': '32deg',
          '--arm-front-end': '20deg',
          '--arm-back': '156deg',
          '--arm-back-end': '-22deg',
          '--leg-front': '19deg',
          '--leg-front-end': '74deg',
          '--leg-back': '134deg',
          '--leg-back-end': '-29deg',
          '--board-r': '-15deg',
          '--body-r': '-8deg',
          '--body-y': '-65%',
          '--body-x': '-110%',
        },
        200,
      ),
    ])
  }, [active, animateCSS, setTimeScale])

  const down = useCallback(async () => {
    if (active) return
    setActive(true)
    setShowHint(true)

    await animateCSS(
      {
        '--arm-front': '-26deg',
        '--arm-front-end': '-58deg',
        '--arm-back': '204deg',
        '--arm-back-end': '60deg',
        '--leg-front': '40deg',
        '--leg-front-end': '80deg',
        '--leg-back': '150deg',
        '--leg-back-end': '-96deg',
        '--body-r': '180deg',
        '--body-y': '-100%',
      },
      200,
    )
  }, [active, animateCSS])

  const fall = useCallback(async () => {
    if (active) return
    setActive(true)
    setOuch(true)
    stopLineAnimation()

    await Promise.all([
      animateCSS({ '--board-x': '60px' }, 500),
      (async () => {
        await animateCSS({ '--board-r': '-40deg' }, 150)
        await animateCSS({ '--board-r': '0deg' }, 300)
      })(),
      (async () => {
        await animateCSS(
          {
            '--line-top-x': '-100%',
            '--line-bottom-x': '-200%',
            '--body-r': '-8deg',
            '--leg-back-end': '24deg',
            '--leg-back': '60deg',
            '--leg-front-end': '30deg',
            '--leg-front': '10deg',
            '--arm-back-end': '-40deg',
            '--arm-back': '54deg',
            '--arm-front-end': '-28deg',
            '--arm-front': '24deg',
          },
          200,
        )

        await animateCSS(
          {
            '--body-x': '-85%',
            '--body-y': '36%',
            '--body-r': '-26deg',
            '--leg-back-end': '24deg',
            '--leg-back': '20deg',
            '--leg-front-end': '30deg',
            '--leg-front': '-10deg',
            '--arm-back-end': '-40deg',
            '--arm-back': '164deg',
            '--arm-front-end': '-28deg',
            '--arm-front': '24deg',
          },
          200,
        )
      })(),
    ])
  }, [active, animateCSS, stopLineAnimation])

  const reset = useCallback(async () => {
    if (!active) return

    await Promise.all([
      animateCSS({ '--skate-x': '0px' }, 300),
      animateCSS(
        {
          '--arm-front': '24deg',
          '--arm-front-end': '-48deg',
          '--arm-back': '164deg',
          '--arm-back-end': '-50deg',
          '--leg-front': '40deg',
          '--leg-front-end': '30deg',
          '--leg-back': '120deg',
          '--leg-back-end': '-36deg',
          '--board-r': '0deg',
          '--board-x': '0px',
          '--body-r': '12deg',
          '--body-y': '-65%',
          '--body-x': '-85%',
        },
        200,
      ),
    ])

    setActive(false)
    startLineAnimation()
    setTimeScale(1)
  }, [active, animateCSS, startLineAnimation, setTimeScale])

  useEffect(() => {
    if (!isVisible) return

    startLineAnimation()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' || e.keyCode === 39) {
        fast()
        setPressedButton('right')
      } else if (e.code === 'ArrowDown' || e.keyCode === 40) {
        down()
        setPressedButton('down')
      } else if (e.code === 'ArrowLeft' || e.keyCode === 37) {
        slow()
        setPressedButton('left')
      } else if (e.code === 'KeyC' || e.keyCode === 67) {
        fall()
        setPressedButton('fall')
        setTimeout(() => setPressedButton(''), 400)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' ||
        e.code === 'ArrowUp' ||
        e.keyCode === 32 ||
        e.keyCode === 38
      ) {
        if (ouch) {
          setOuch(false)
          reset()
        } else {
          jump()
        }
        setPressedButton('up')
        setTimeout(() => setPressedButton(''), 400)
      } else if (
        e.code === 'ArrowDown' ||
        e.code === 'ArrowRight' ||
        e.code === 'ArrowLeft' ||
        e.keyCode === 40 ||
        e.keyCode === 39 ||
        e.keyCode === 37
      ) {
        if (!ouch) {
          reset()
        }
        setPressedButton('')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      stopLineAnimation()
    }
  }, [
    isVisible,
    jump,
    fast,
    slow,
    down,
    fall,
    reset,
    ouch,
    startLineAnimation,
    stopLineAnimation,
  ])

  if (!isVisible) return null

  return (
    <div css={containerStyle}>
      <div css={loadingStyle} ref={loadingRef}>
        <div css={skateStyle}>
          <div css={bodyStyle}>
            <div css={[armStyle, armBackStyle]}></div>
            <div css={[armStyle, armFrontStyle]}></div>
            <div css={[legStyle, legBackStyle]}></div>
            <div css={[legStyle, legFrontStyle]}></div>
          </div>
          <div css={boardStyle}>
            <svg viewBox="0 0 34 8">
              <path d="M0.897306 0.911767C1.22218 0.30263 1.97934 0.072188 2.58848 0.397061L2.91936 0.573532C3.75214 1.01768 4.68144 1.25 5.62525 1.25H28.3752C29.3191 1.25 30.2484 1.01768 31.0811 0.573532L31.412 0.397061C32.0212 0.072188 32.7783 0.30263 33.1032 0.911767C33.4281 1.5209 33.1976 2.27807 32.5885 2.60294L32.2576 2.77941C31.0627 3.41667 29.7294 3.75 28.3752 3.75H27.9692C28.5841 4.09118 29.0002 4.747 29.0002 5.5C29.0002 6.60457 28.1048 7.5 27.0002 7.5C25.8957 7.5 25.0002 6.60457 25.0002 5.5C25.0002 4.747 25.4164 4.09118 26.0312 3.75H7.96925C8.5841 4.09118 9.00025 4.747 9.00025 5.5C9.00025 6.60457 8.10482 7.5 7.00025 7.5C5.89568 7.5 5.00025 6.60457 5.00025 5.5C5.00025 4.747 5.41639 4.09118 6.03124 3.75H5.62525C4.27109 3.75 2.93774 3.41667 1.74289 2.77941L1.41201 2.60294C0.802874 2.27807 0.572432 1.5209 0.897306 0.911767Z" />
            </svg>
          </div>
          <div css={[lineStyle, lineTopStyle]}></div>
          <div css={[lineStyle, lineBottomStyle]}></div>
        </div>
      </div>

      <div css={keyboardStyle}>
        <button
          css={[
            buttonStyle,
            upButtonStyle,
            pressedButton === 'up' && pressedButtonStyle,
          ]}
          onClick={() => {
            if (ouch) {
              setOuch(false)
              reset()
            } else {
              jump()
            }
          }}
        >
          <svg viewBox="0 0 8 8">
            <path d="M3.99953 1C3.83653 1 3.68353 1.0795 3.59003 1.2135L0.0900328 6.2135C-0.0169672 6.366 -0.0289672 6.5655 0.0560328 6.731C0.142533 6.8965 0.313033 7 0.499533 7H7.50003C7.68653 7 7.85753 6.8965 7.94353 6.731C8.02853 6.5655 8.01653 6.366 7.90953 6.2135L4.40953 1.2135C4.31653 1.0795 4.16353 1 4.00053 1C4.00003 1 4.00003 1 3.99953 1C4.00003 1 4.00003 1 3.99953 1Z" />
          </svg>
        </button>
        <button
          css={[
            buttonStyle,
            leftButtonStyle,
            pressedButton === 'left' && pressedButtonStyle,
          ]}
          onPointerDown={() => slow()}
          onPointerUp={() => !ouch && reset()}
        >
          <svg viewBox="0 0 8 8">
            <path d="M1 4.00053C1 4.16353 1.0795 4.31653 1.2135 4.41003L6.2135 7.91003C6.366 8.01703 6.5655 8.02903 6.731 7.94403C6.8965 7.85753 7 7.68703 7 7.50053V0.499533C7 0.313033 6.8965 0.142033 6.731 0.0560328C6.5655 -0.0289672 6.366 -0.0169672 6.2135 0.0900328L1.2135 3.59003C1.0795 3.68353 1 3.83653 1 3.99953C1 4.00003 1 4.00003 1 4.00053C1 4.00003 1 4.00003 1 4.00053Z" />
          </svg>
        </button>
        <button
          css={[
            buttonStyle,
            rightButtonStyle,
            pressedButton === 'right' && pressedButtonStyle,
          ]}
          onPointerDown={() => fast()}
          onPointerUp={() => !ouch && reset()}
        >
          <svg viewBox="0 0 8 8">
            <path d="M7 3.99953C7 3.83653 6.9205 3.68353 6.7865 3.59003L1.7865 0.0900328C1.6345 -0.0169672 1.4345 -0.0289672 1.269 0.0560328C1.1035 0.142533 1 0.313033 1 0.499533V7.50003C1 7.68653 1.1035 7.85753 1.269 7.94353C1.4345 8.02853 1.634 8.01653 1.7865 7.90953L6.7865 4.40953C6.9205 4.31653 7 4.16353 7 4.00053C7 4.00003 7 4.00003 7 3.99953C7 4.00003 7 4.00003 7 3.99953Z" />
          </svg>
        </button>
        <button
          css={[
            buttonStyle,
            downButtonStyle,
            pressedButton === 'down' && pressedButtonStyle,
          ]}
          onPointerDown={() => down()}
          onPointerUp={() => !ouch && reset()}
        >
          <svg viewBox="0 0 8 8">
            <path d="M4.00053 7C4.16353 7 4.31653 6.9205 4.41003 6.7865L7.91003 1.7865C8.01703 1.634 8.02903 1.4345 7.94403 1.269C7.85753 1.1035 7.68703 1 7.50053 1H0.499533C0.313033 1 0.142533 1.1035 0.0560328 1.269C-0.0289672 1.4345 -0.0169672 1.634 0.0900328 1.7865L3.59003 6.7865C3.68353 6.9205 3.83653 7 3.99953 7C4.00003 7 4.00003 7 4.00053 7C4.00003 7 4.00003 7 4.00053 7Z" />
          </svg>
        </button>
        <span
          css={[
            hintStyle,
            !showHint && hideStyle,
            pressedButton === 'fall' && pressedHintStyle,
          ]}
        >
          Please don't press <strong>C</strong>
        </span>
      </div>
    </div>
  )
}

const containerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(36, 36, 40, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`

const loadingStyle = css`
  --arm-front: 24deg;
  --arm-front-end: -48deg;
  --arm-back: 164deg;
  --arm-back-end: -50deg;
  --leg-front: 40deg;
  --leg-front-end: 30deg;
  --leg-back: 120deg;
  --leg-back-end: -36deg;
  --board-r: 0deg;
  --board-x: 0px;
  --body-r: 12deg;
  --body-y: -65%;
  --body-x: -85%;
  --skate-x: 0px;
  --skate-y: 0px;
  --color: #a8e840;
  --line-top-x: 0%;
  --line-bottom-x: 0%;
  position: relative;
`

const skateStyle = css`
  position: relative;
  width: 40px;
  height: 46px;
  transform: translate(var(--skate-x), var(--skate-y)) translateZ(0);
`

const bodyStyle = css`
  background: var(--color);
  height: 15px;
  width: 7px;
  border-radius: 4px;
  transform-origin: 4px 11px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(var(--body-x), var(--body-y)) rotate(var(--body-r))
    translateZ(0);

  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 4px;
    bottom: 16px;
    left: 0;
    position: absolute;
    background: var(--color);
    transform: translateY(-0.5px);
  }
`

const armStyle = css`
  content: '';
  width: 11px;
  height: 4px;
  top: 0;
  left: 2px;
  border-radius: 2px;
  transform-origin: 2px 2px;
  position: absolute;
  background: var(--color);

  &:before {
    content: '';
    width: 11px;
    height: 4px;
    left: 8px;
    border-radius: 2px;
    transform-origin: 2px 2px;
    position: absolute;
    background: var(--color);
  }
`

const armFrontStyle = css`
  transform: rotate(var(--arm-front));

  &:before {
    transform: rotate(var(--arm-front-end));
  }
`

const armBackStyle = css`
  transform: rotate(var(--arm-back));

  &:before {
    transform: rotate(var(--arm-back-end));
  }
`

const legStyle = css`
  content: '';
  width: 11px;
  height: 4px;
  top: 11px;
  left: 2px;
  border-radius: 2px;
  transform-origin: 2px 2px;
  position: absolute;
  background: var(--color);

  &:before {
    content: '';
    width: 11px;
    height: 4px;
    top: 0;
    left: 8px;
    border-radius: 2px;
    transform-origin: 2px 2px;
    position: absolute;
    background: var(--color);
  }
`

const legFrontStyle = css`
  transform: rotate(var(--leg-front));

  &:before {
    transform: rotate(var(--leg-front-end));
  }
`

const legBackStyle = css`
  left: 1px;
  transform: rotate(var(--leg-back));

  &:before {
    transform: rotate(var(--leg-back-end));
  }
`

const boardStyle = css`
  position: absolute;
  left: 2px;
  bottom: -1px;
  transform: translateX(var(--board-x)) rotate(var(--board-r)) translateZ(0);
  transform-origin: 7px 5.5px;

  svg {
    display: block;
    width: 34px;
    height: 8px;
    fill: var(--color);
  }
`

const lineStyle = css`
  height: 3px;
  border-radius: 1px;
  overflow: hidden;
  position: absolute;
  right: 105%;
  top: 18px;
  width: 16px;
  transform: scaleY(0.75);
  transition: all 0.5s ease;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: var(--color);
    transform: translateX(var(--x));
    transition: transform 0.5s ease;
  }
`

const lineTopStyle = css`
  &:before {
    transform: translateX(var(--line-top-x));
  }
`

const lineBottomStyle = css`
  width: 13px;
  top: 24px;

  &:before {
    transform: translateX(var(--line-bottom-x));
  }
`

const keyboardStyle = css`
  display: grid;
  grid-gap: 8px;
  position: absolute;
  left: 50%;
  bottom: 32px;
  user-select: none;
  transform: translateX(-50%);
  scale: 0.8;

  @media (max-width: 480px) {
    scale: 0.7;
    bottom: 24px;
  }
`

const buttonStyle = css`
  appearance: none;
  height: 36px;
  width: 40px;
  border-radius: 7px;
  background: #2c2c31;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1) translateZ(0);
  transition:
    transform 0.15s,
    background-color 0.15s;
  cursor: pointer;

  &:hover {
    background: #3a3a3f;
  }

  svg {
    display: block;
    width: 8px;
    height: 8px;
    fill: #7f7f85;
    transition: fill 0.15s;
  }
`

const pressedButtonStyle = css`
  transform: scale(0.95) translateZ(0);
  background: #3a3a3f;

  svg {
    fill: #fff;
  }
`

const upButtonStyle = css`
  grid-row: 1;
  grid-column: 2;
`

const leftButtonStyle = css`
  grid-row: 2;
  grid-column: 1;
`

const rightButtonStyle = css`
  grid-row: 2;
  grid-column: 3;
`

const downButtonStyle = css`
  grid-row: 2;
  grid-column: 2;
`

const hintStyle = css`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -24px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #7f7f85;
  text-align: center;
  transition: opacity 0.25s;

  strong {
    transition: color 0.15s;
    color: #7f7f85;
  }
`

const hideStyle = css`
  opacity: 0;
  pointer-events: none;
`

const pressedHintStyle = css`
  strong {
    color: #fff;
  }
`
