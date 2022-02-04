type ColorProps = {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
};
type Color = {
  primary: ColorProps;
  secondary: ColorProps;
  tertiary: string;
  point: string;
  warning: string;
  success: string;
  black: string;
  white: string;
  dark: ColorProps;
  gray: ColorProps;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  modal: string;
};

export default Color;
