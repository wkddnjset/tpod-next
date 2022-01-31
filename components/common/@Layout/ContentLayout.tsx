import React from 'react';

import { Box } from '@chakra-ui/react';

interface ContentLayoutProps {
  header?: JSX.Element;
  content: JSX.Element;
}

const ContentLayout = ({ header, content }: ContentLayoutProps) => {
  return (
    <>
      <Box>{header}</Box>
      <Box>{content}</Box>
    </>
  );
};

export default ContentLayout;
