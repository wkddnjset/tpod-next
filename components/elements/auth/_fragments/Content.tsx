import React, { useMemo } from 'react';
import { Box, Flex, Divider } from '@chakra-ui/react';

import LoginButtonBox from './LoginButtonBox';
import { LoginContentProps } from '../type';

import Text from 'components/common/Text';
import { useRootState } from 'components/hooks/useRootState';
import EmailLogin from './EmailLogin';

const Content = ({ brand }: LoginContentProps) => {
  const { email, more, check } = useRootState((state) => state.LOGIN_FORM);

  const allList = brand.socialSet;
  const visibleList = useMemo(() => brand.socialSet.filter((i) => i.isMain), []);
  const etcHeight = 70;
  return (
    <Flex direction="column">
      {check.isRegister === null ? (
        <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
          <strong>안녕하세요!</strong>
          <br />
          {email ? '이메일을 입력해주세요' : '계정을 선택해주세요'}
        </Text>
      ) : check.isRegister ? (
        <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
          <strong>{check?.nickname}님</strong>
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

      <Box
        h={email ? '0px' : more ? `${allList.length * 54 + etcHeight}px` : `${visibleList.length * 54 + etcHeight}px`}
        opacity={email ? 0 : 1}
        visibility={email ? 'hidden' : 'visible'}
        transition="0.3s"
      >
        <LoginButtonBox brand={brand} />
        {brand.isEmailLogin && (
          <Flex mt="40px" mb="15px" alignItems="center" justifyContent="center" position="relative">
            <Text textStyle="sm" color="gray.500" bg="white" px="17px" zIndex={1}>
              또는 이메일을 입력해주세요
            </Text>
            <Divider position="absolute" />
          </Flex>
        )}
      </Box>
      {brand.isEmailLogin && (
        <Box>
          <EmailLogin brand={brand} />
        </Box>
      )}
    </Flex>
  );
};

export default Content;
