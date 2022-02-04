import Color from './colors.types';

const Light: Color = {
  primary: {
    50: '#e5e0ff',
    100: '#d0c7ff',
    200: '#bbadff',
    300: '#a694ff',
    400: '#907aff',
    500: '#7b61ff',
    600: '#7257ff',
    700: '#6a4dff',
    800: '#6142ff',
    900: '#5938ff',
  },
  secondary: {
    50: '#f3fedc',
    100: '#ebfec3',
    200: '#e3fdaa',
    300: '#dbfd91',
    400: '#d2fc78',
    500: '#cafc5f',
    600: '#c2fc46',
    700: '#b9fb2d',
    800: '#b1fb14',
    900: '#a5f005',
  },
  tertiary: '#0C1F6F',
  point: '#F77721',
  warning: '#FF6060',
  success: '#4575F5',
  black: '#1F1E1E',
  white: '#FFFFFF',
  dark: {
    500: '#1A1A1A',
    600: '#1A1A1A',
    700: '#1A1A1A',
  },
  gray: {
    50: '#f8f9fa',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F0F0F0',
  },
  modal: '#FFFFFF',
};

const Dark: Color = {
  primary: {
    50: '#e5e0ff',
    100: '#d0c7ff',
    200: '#bbadff',
    300: '#a694ff',
    400: '#907aff',
    500: '#7b61ff',
    600: '#7257ff',
    700: '#6a4dff',
    800: '#6142ff',
    900: '#5938ff',
  },
  secondary: {
    50: '#f3fedc',
    100: '#ebfec3',
    200: '#e3fdaa',
    300: '#dbfd91',
    400: '#d2fc78',
    500: '#cafc5f',
    600: '#c2fc46',
    700: '#b9fb2d',
    800: '#b1fb14',
    900: '#a5f005',
  },
  tertiary: '#07175D',
  point: '#FF7215',
  warning: '#FF6060',
  success: '#336BFF',
  black: '#FFFFFF',
  dark: {
    500: '#FFFFFF',
    600: '#FFFFFF',
    700: '#FFFFFF',
  },
  white: '#444444',
  gray: {
    50: '#212529',
    100: '#343a40',
    200: '#495057',
    300: '#868e96',
    400: '#adb5bd',
    500: '#ced4da',
    600: '#dee2e6',
    700: '#e9ecef',
    800: '#f1f3f5',
    900: '#f8f9fa',
  },
  background: {
    primary: '#363636',
    secondary: '#2B2B2B',
    tertiary: '#1A1A1A',
  },
  modal: '#444444',
};

export const mode = {
  light: Light,
  dark: Dark,
};

const colors = {
  dim: {
    primary: '#1A1A1A80',
    secondary: '#1A1A1A33',
  },
  kakao: {
    500: '#FFDE32',
    600: '#F5D322',
    700: '#EFCC1A',
  },
  naver: {
    500: '#20CF5D',
    600: '#17c554',
    700: '#14bf50',
  },
  facebook: {
    500: '#1877F3',
    600: '#1874eb',
    700: '#146cdf',
  },
  google: {
    500: '#FFFFFF',
    600: '#F5F5F5',
    700: '#EEEEEE',
  },
  apple: {
    500: '#000000',
    600: '#111111',
    700: '#222222',
  },
};

export default colors;
