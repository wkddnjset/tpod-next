import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  // base <780px
  sm: '780px', // ≥780px
  md: '980px', // ≥980px
  lg: '1280', // ≥1280px
  xl: '1536px', // ≥1536px
  '2xl': '1920px', // ≥1920px
});

export default breakpoints;

// https://github.com/chakra-ui/chakra-ui/issues/3042
