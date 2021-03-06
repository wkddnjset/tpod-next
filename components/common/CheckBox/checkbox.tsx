import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { CheckedOffIcon, CheckedOnIcon } from 'components/common/@Icons/System';
import { checkboxProps } from './checkbox.types';

export const CheckBox = ({ checked, children, ...props }: checkboxProps) => {
  return (
    <Flex cursor="pointer" alignItems="center" {...props}>
      {checked ? <CheckedOnIcon w="20px" h="20px" color="primary" /> : <CheckedOffIcon w="20px" h="20px" color="primary" />}
      {typeof children === 'string' ? (
        <Text textStyle="md" ml="5px" color="gray3">
          {children}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
};
