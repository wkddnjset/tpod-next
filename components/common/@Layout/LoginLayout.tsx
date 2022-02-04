import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

interface LoginLayoutProps {
  content: JSX.Element;
}

const LoginLayout = ({ content }: LoginLayoutProps) => {
  return (
    <Flex h={['auto', '100vh']} pt={['50px', '0px']} backgroundColor="white" alignItems="center" justifyContent="center">
      <Box w="100%" maxW="420px" mx="auto" px="16px">
        {content}
      </Box>
    </Flex>
  );
};

export default LoginLayout;
