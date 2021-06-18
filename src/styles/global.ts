import { createGlobalStyle } from 'styled-components';

import { CustomTheme } from './themes/default';

import { Industry, BigNoodle, Futura, Roboto } from './fonts';

const GlobalStyles = createGlobalStyle<{ theme: CustomTheme }>`
  ${Industry}

  ${BigNoodle}

  ${Futura}

  ${Roboto}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar {
      width: 4px;
      border-radius: 10px;
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #e0dede;
      border-radius: 10px;
    }
  }
  html {
    font-size: 10px;
  }
  html, body {
    min-height: 100%;
    height:100%;

  }
  body {
    width: 100%;
    display: block;

    background-color: ${({ theme }) => theme.colors.primarySoft};

    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: "Industry", 'Roboto', Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.contrast};

    img {
      user-drag: none;
    }

    select:hover + svg, select:focus + svg {
      color: ${({ theme }) => theme.colors.accent};
    }

    select + svg {
      transform: translateY(1px);
    }

    select {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.contrast};
      font-family: Industry;
      font-weight: 500;
      text-transform: uppercase;
      border: none;

      &:hover, &:focus {
        color: ${({ theme }) => theme.colors.accent};
      }

      &:hover {
        cursor: pointer;
      }

      option {
        background-color: transparent;
      }
    }
  }
`;

export default GlobalStyles;
