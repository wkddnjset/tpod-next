/* eslint-disable no-use-before-define */
import React from 'react';

import styled from '@emotion/styled';
import Select, { Props as selectProps } from 'react-select';
import { useTheme } from '@chakra-ui/react';

interface customProps {
  chooseType?: any;
}

const SelectComponent = ({ chooseType, ...props }: customProps & selectProps) => {
  const theme = useTheme();
  const handleChange = (e: any) => {
    chooseType(e.value);
  };

  return (
    <Wrap>
      <CustomSelect {...props} customTheme={theme} classNamePrefix={'Select'} onChange={handleChange} />
    </Wrap>
  );
};

export default SelectComponent;

interface wrapStyle {
  width?: string;
}

const Wrap = styled.div<wrapStyle>`
  width: ${({ width }) => (width ? width : '100%')};
`;

const CustomSelect = styled(Select)<{ customTheme: any }>`
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => props.customTheme.colors.white};
  }

  & .Select {
    &__control {
      display: flex;
      align-items: center;
      background-color: ${(props) => props.customTheme.colors.gray[900]};
      border-color: ${(props) => props.customTheme.colors.gray[900]};
      height: 50;
      border-radius: 10px;
      box-shadow: none !important;
    }

    &__menu {
      margin: 0;
      top: calc(100% - 2px);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
      box-shadow: 'none';
      border-width: 0px;
      background-color: ${(props) => props.customTheme.colors.gray[900]};
      color: ${(props) => props.customTheme.colors.white};
      &-list {
        padding: 0;
        border-top-width: 1px;
        border-top-color: ${(props) => props.customTheme.colors.gray[900]};
      }
    }

    &__option {
      height: 50;
      display: 'flex';
      align-items: 'center';
      font-weight: bold;
      &--is-selected {
        background-color: ${(props) => props.customTheme.colors.gray[900]};
      }
      &--is-focused {
        background-color: ${(props) => props.customTheme.colors.gray[800]};
      }
    }

    &__value-container {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 16px;
    }
    &__single-value {
      color: ${(props) => props.customTheme.colors.white};
      font-weight: bold;
      opacity: 1;
      transition: opacity 300ms;
      &--is-disabled {
        opacity: 0;
      }
    }

    &__placeholder {
      color: ${(props) => props.customTheme.colors.gray[500]};
      font-weight: bold;
    }

    &__indicator {
      &-separator {
        display: none;
      }
    }
  }
`;
