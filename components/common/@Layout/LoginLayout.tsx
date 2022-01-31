import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

interface LoginLayoutProps {
  content: JSX.Element;
}

const LoginLayout = ({ content }: LoginLayoutProps) => {
  return (
    <Flex h="100vh" backgroundColor="white" alignItems="center" justifyContent="center">
      <Box w="100%" maxW="420px" mx="auto">
        {content}
      </Box>
    </Flex>
  );
};

export default LoginLayout;
