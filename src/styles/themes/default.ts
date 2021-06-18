const defaultTheme = {
  title: 'light',

  colors: {
    primary: '#ffffff',
    primarySoft: '#f2f2f2',

    secondary: '#218ffe',
    secondarySoft: '#405275',

    accent: '#f99e1a',
    accentSoft: '#f9a730',

    contrast: '#000000',
    contrastSoft: '#4a4c4e',
  },
};
export type CustomTheme = typeof defaultTheme;

export default defaultTheme;
