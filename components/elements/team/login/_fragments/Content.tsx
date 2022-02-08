import { useState } from 'react';
import { Box, Flex, Text, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useRootState } from 'components/hooks/useRootState';

import useGetProfile from '../../hooks/useGetProfile';

import { FormValues } from './type';
import LoginForm from './LoginForm';

import crypto from 'crypto-js';
import { useEffect } from 'react';

const Content = () => {
  const { team } = useRootState((state) => state.TEAM);

  const getProfile = useGetProfile;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!team) {
      alert('팀이 삭제되었거나 찾을 수 없습니다.');
      router.replace('/');
    }
  }, []);
  const onSubmit = (data: FormValues) => {
    const { team } = router.query;

    setLoading(true);
    const secretKey = process.env.NEXT_PUBLIC_PASSWORD_SECRET;
    const hasedPassword = crypto.HmacSHA256(data.password, String(secretKey));
    getProfile(String(team), data.username, hasedPassword.toString())
      .then((res) => {
        if (res === null) {
          alert('잘못된 계정입니다.\n팀별 관리자에게 문의해주세요.');
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      });
  };

  return (
    <Container>
      <Flex direction="column" pt="40px">
        <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
          <strong>안녕하세요!</strong>
          <br />
          아이디를 입력해주세요
        </Text>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <LoginForm register={register} watch={watch} errors={errors} loading={loading} />
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Content;
