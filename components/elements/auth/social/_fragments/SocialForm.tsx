import React, { useState } from 'react';

import Link from 'next/link';

import Text from 'components/common/Text';
// import Input from 'components/Input';

import { Input, VStack, Button, Flex } from '@chakra-ui/react';

import { EmailLoginFormType } from '../type';

const SocialForm = ({ brand, register, errors, isLoading }: EmailLoginFormType) => {
  return (
    <Flex direction="column" h="100%">
      <VStack w="100%" mt={['auto', '85px']} mb="20px" spacing="20px">
        <Input
          name="email"
          type="text"
          placeholder="이메일"
          {...register('email', {
            required: '빈칸을 입력해주세요.',
          })}
          isInvalid={!!errors?.email?.message}
        />
        {brand.fieldSet.map((field, idx) => {
          return (
            <Input
              key={idx}
              {...field}
              {...register(field.name, {
                required: '빈칸을 입력해주세요.',
              })}
              isInvalid={!!errors?.[field.name]?.message}
            />
          );
        })}
      </VStack>

      <VStack spacing="20px">
        <Button w="100%" borderRadius="10px" size="lg" colorScheme="primary" type="submit" isLoading={isLoading}>
          회원가입
        </Button>
        <Link href="/" passHref>
          <Text as="a" textStyle="md" cursor="pointer" decoration="underline">
            이메일 주소가 기억나지 않아요
          </Text>
        </Link>
      </VStack>
    </Flex>
  );
};

export default SocialForm;
