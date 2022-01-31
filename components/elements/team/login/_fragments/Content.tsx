import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { FormValues } from './type';
import LoginForm from './LoginForm';

import crypto from 'crypto-js';

const Content = () => {
  const router = useRouter();

  // react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const { team } = router.query;
    console.log('team : ', team);
    console.log('data : ', data);
    const hasedPassword = crypto.AES.encrypt(data.password, process.env.NEXT_PUBLIC_PASSWORD_SECRET).toString();
    console.log('hasedPassword : ', hasedPassword);
  };
  return (
    <Flex direction="column">
      <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
        <strong>안녕하세요!</strong>
        <br />
        아이디를 입력해주세요
      </Text>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <LoginForm register={register} watch={watch} errors={errors} />
        </form>
      </Box>
    </Flex>
  );
};

export default Content;
