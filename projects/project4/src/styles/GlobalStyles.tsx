import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'NanumSquare';
        src: url('/fonts/NanumSquareEB.woff') format('woff');
        font-weight: 800;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: url('/fonts/NanumSquareB.woff') format('woff');
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: url('/fonts/NanumSquareR.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: url('/fonts/NanumSquareL.woff') format('woff');
        font-weight: 300;
        font-style: normal;
      }

      @font-face {
        font-family: 'Open Sans';
        src: url('/fonts/OpenSans-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/fonts/OpenSans-Bold.woff') format('woff');
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/fonts/OpenSans-Semibold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/fonts/OpenSans-Light.woff') format('woff');
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/fonts/OpenSans-ExtraBold.woff') format('woff');
        font-weight: 800;
        font-style: normal;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'NanumSquare', sans-serif;
        background: #ffffff;
        color: #333;
        line-height: 1.5;
        overflow-x: hidden;
      }

      [lang='en'] {
        font-family: 'Open Sans', sans-serif;
      }
    `}
  />
)

export default GlobalStyles
