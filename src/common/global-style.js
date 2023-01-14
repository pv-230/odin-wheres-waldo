import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --dark-font-color: #111;
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
  }

  body,
  #root {
    flex: 1;
    display: flex;
  }
`;

export default GlobalStyle;
