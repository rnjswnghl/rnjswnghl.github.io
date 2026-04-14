import { Global, css } from '@emotion/react'

const BASE = import.meta.env.BASE_URL
const fontUrl = (file: string) => `url('${BASE}fonts/${file}') format('woff')`

const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'NanumSquare';
        src: ${fontUrl('NanumSquareEB.woff')};
        font-weight: 800;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: ${fontUrl('NanumSquareB.woff')};
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: ${fontUrl('NanumSquareR.woff')};
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: ${fontUrl('NanumSquareL.woff')};
        font-weight: 300;
        font-style: normal;
      }

      @font-face {
        font-family: 'Open Sans';
        src: ${fontUrl('OpenSans-Regular.woff')};
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: ${fontUrl('OpenSans-Bold.woff')};
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: ${fontUrl('OpenSans-Semibold.woff')};
        font-weight: 600;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: ${fontUrl('OpenSans-Light.woff')};
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: ${fontUrl('OpenSans-ExtraBold.woff')};
        font-weight: 800;
        font-style: normal;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body,
      #root {
        height: 100%;
      }

      body {
        font-family: 'NanumSquare', sans-serif;
        background: #ffffff;
        color: #333;
        line-height: 1.5;
        overflow-x: hidden;
        /* 프로젝트4는 화면 내부(각 페이지 컨테이너)에서 스크롤을 관리한다 */
        overflow-y: hidden;
      }

      [lang='en'] {
        font-family: 'Open Sans', sans-serif;
      }
    `}
  />
)

export default GlobalStyles
