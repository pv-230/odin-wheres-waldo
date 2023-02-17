import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --dark-color: #111;
    --light-color: snow;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    display: flex;
    min-height: 100%;
    font-family: sans-serif;
    overscroll-behavior-y: none;
  }

  body,
  #root {
    flex: 1;
    display: flex;
    overscroll-behavior-y: none;
  }
`;

export default GlobalStyle;
