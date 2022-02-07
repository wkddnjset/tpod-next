import { theme as baseTheme } from '@chakra-ui/react';
import { StyleObjectOrFn } from '@chakra-ui/styled-system';

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
  border?: string;
};

const accessibleColorMap: { [key: string]: AccessibleColor } = {
  KAKAO: {
    bg: 'kakao.500',
    color: '#1A1A1A',
    hoverBg: 'kakao.600',
    activeBg: 'kakao.700',
    border: 'kakao.500',
  },
  NAVER: {
    bg: 'naver.500',
    color: '#FFFFFF',
    hoverBg: 'naver.600',
    activeBg: 'naver.700',
    border: 'naver.500',
  },
  FACEBOOK: {
    bg: 'facebook.500',
    color: '#FFFFFF',
    hoverBg: 'facebook.600',
    activeBg: 'facebook.700',
    border: 'facebook.500',
  },
  APPLE: {
    bg: 'apple.500',
    color: '#FFFFFF',
    hoverBg: 'apple.600',
    activeBg: 'apple.700',
    border: 'apple.500',
  },
  GOOGLE: {
    bg: 'google.500',
    color: '#808080',
    hoverBg: 'google.600',
    activeBg: 'google.700',
    border: '#DDDDDD',
  },
  secondary: {
    bg: 'secondary.500',
    color: '#1A1A1A',
    hoverBg: 'secondary.600',
    activeBg: 'secondary.700',
    border: 'secondary.500',
  },
};

const variantSolid: StyleObjectOrFn = (props) => {
  const { colorScheme: c } = props;

  if (c === 'gray') {
    const bg = 'gray.100';
    return {
      bg,
      borderRadius: 'md',
      _hover: {
        bg: 'gray.100',
        _disabled: {
          bg: 'gray.300',
        },
      },
      _active: { bg: 'gray.300' },
    };
  }

  const { bg = `${c}.500`, color = 'white', hoverBg = `${c}.600`, activeBg = `${c}.700`, border = `${c}.500` } = accessibleColorMap[c] ?? {};

  const background = bg;
  const borderColor = border;

  return {
    bg: background,
    color: color,
    borderWidth: 1,
    borderRadius: 'md',
    borderColor: borderColor,
    _hover: {
      bg: hoverBg,
      borderColor: hoverBg,
      _disabled: {
        borderColor: 'gray.300',
        bg: 'gray.300',
      },
    },
    _disabled: {
      borderColor: 'gray.300',
      bg: 'gray.300',
    },
    _active: { bg: activeBg, borderColor: activeBg },
  };
};

const Button = {
  baseStyle: {
    ...baseTheme.components.Button.baseStyle,
    borderRadius: '0px',
    _focus: { boxShadow: 'none' },
    _disabled: {
      opacity: 1,
    },
  },
  variants: {
    solid: variantSolid,
  },
  sizes: {
    lg: {
      h: '50px',
      fontSize: ['16px', '14px', '15px'],
      px: '15px',
    },
    md: {
      h: '54px',
      fontSize: ['16px', '16px', '16px'],
      px: '15px',
    },
    sm: {
      h: '30px',
      fontSize: ['12px', '12px', '12px'],
      px: '15px',
    },
    xs: {
      h: '26px',
      fontSize: ['12px', '12px', '12px'],
      px: '8px',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};

export default Button;
