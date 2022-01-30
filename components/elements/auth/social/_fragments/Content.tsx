import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from 'constants/query-keys';

import { useForm } from 'react-hook-form';
import { Flex } from '@chakra-ui/react';

import debounce from 'lodash.debounce';

import Text from 'components/common/Text';

import SocialForm from './SocialForm';

import { useSocialRegisterMutation } from 'apis/Auth/mutation';

import { FormValues, ContentType } from '../type';

const Content = ({ brand }: ContentType) => {
  // hooks
  const queryClient = useQueryClient();
  // state
  const [social, setSocial] = useState<any>(null);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  // mutation
  const { mutate: register_, isLoading } = useSocialRegisterMutation();

  const socialRegister = debounce(register_, 100);

  const onSubmit = (data: FormValues) => {
    // 회원가입에 사용하는 objects를 제외하고 metadata로 만들어서 API 호출
    const DEFAULT_FIELD = ['email'];
    const userParams: any = {};
    const metadata: any = {};
    Object.entries(data).forEach(([key, value]) => {
      if (!DEFAULT_FIELD.includes(key)) {
        metadata[key] = value;
      } else {
        userParams[key] = value;
      }
    });
    socialRegister({ ...userParams, state: social.state, token: social.token, metadata });
  };

  useEffect(() => {
    const socialToken = queryClient.getQueryData([QUERY_KEY.SOCIAL_TOKEN]);
    if (socialToken) setSocial(socialToken);
    else alert('잘못된 접근입니다.'), Router.push('/');
  }, []);

  return (
    <Flex direction="column" h="100%">
      <Text textStyle="lg" mb="120px">
        <strong>로그인 및 회원가입을</strong>
        <br />
        시작합니다.
        <br />
        <strong>{social?.state}</strong>
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SocialForm register={register} errors={errors} brand={brand} isLoading={isLoading} />
      </form>
    </Flex>
  );
};

export default Content;
