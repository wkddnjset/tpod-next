import React from 'react';

import Text from 'components/common/Text';

import { Input, VStack, Button, Box, Flex } from '@chakra-ui/react';

import { LoginFormType } from './type';

const LoginForm = ({ watch, register, errors }: LoginFormType) => {
  const formData = watch();

  return (
    <Flex direction="column" h="100%">
      <VStack w="100%" mb="15px" spacing="8px">
        <Box w="100%">
          <Input
            type="text"
            autoComplete="off"
            placeholder="아이디"
            {...register('username', {
              required: '빈칸을 입력해주세요.',
            })}
            borderColor={formData.username ? 'black' : 'transparent'}
            isInvalid={!!errors?.username?.message}
          />
          {!!errors?.username?.message && (
            <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
              {errors?.username?.message}
            </Text>
          )}
        </Box>

        <Box w="100%">
          <Input
            type="password"
            autoComplete="off"
            placeholder="비밀번호"
            {...register('password', {
              required: '빈칸을 입력해주세요.',
            })}
            borderColor={formData.password ? 'black' : 'transparent'}
            isInvalid={!!errors?.password?.message}
          />
          {!!errors?.password?.message && (
            <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
              {errors?.password?.message}
            </Text>
          )}
        </Box>
      </VStack>
      <Box>
        <VStack spacing="20px">
          <Button w="100%" colorScheme={'dark'} type="submit" disabled={!formData.username || !formData.password}>
            <Text color="white">로그인</Text>
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginForm;
