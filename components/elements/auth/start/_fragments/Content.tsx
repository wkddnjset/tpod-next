import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Text from 'components/common/Text';
import { useRootState } from 'components/hooks/useRootState';
import EmailLogin from './EmailLogin';

const Content = () => {
  const { isRegister, nickname } = useRootState((state) => state.LOGIN_FORM);

  return (
    <Flex direction="column">
      {isRegister === null ? (
        <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
          <strong>안녕하세요!</strong>
          <br />
          이메일을 입력해주세요
        </Text>
      ) : isRegister ? (
        <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
          <strong>{nickname}님</strong>
          <br />
          다시 만나 반가워요 :)
        </Text>
      ) : (
        <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
          <strong>처음이시네요!</strong>
          <br />
          가입을 진행합니다
        </Text>
      )}

      <Box>
        <EmailLogin />
      </Box>
    </Flex>
  );
};

export default Content;
