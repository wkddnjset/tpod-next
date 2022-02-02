import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

interface UserLayoutProps {
  content: JSX.Element;
}

const UserLayout = ({ content }: UserLayoutProps) => {
  return (
    <Flex flex={1} bg="#FAFAFA">
      <Box w="100%" maxW="600px" mx="auto" bg="white">
        {content}
      </Box>
    </Flex>
  );
};

export default UserLayout;
