/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'

export default function Spinner() {
  return (
    <div css={spinnerContainerStyle}>
      <div css={spinnerStyle}></div>
    </div>
  )
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const spinnerContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const spinnerStyle = css`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
