import { Spinner, Flex } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex flex={1} alignItems="center" justifyContent="center">
      <Spinner size="lg" />
    </Flex>
  );
};
