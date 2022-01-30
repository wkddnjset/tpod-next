import React from 'react';

import { useForm } from 'react-hook-form';
import { Flex } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { setError, setCheck } from 'features/LoginForm/loginFormSlice';
import { useRootState } from 'components/hooks/useRootState';

import debounce from 'lodash.debounce';

import { socialKindMessage, socialKindMessageProps } from 'constants/errorText';
import EmailForm from './EmailForm';

import { useEmailCheckMutation, useEmailLoginMutation, useEmailRegisterMutation } from 'apis/Auth/mutation';

import { FormValues, ContentType } from './type';

const EmailLogin = ({ brand }: ContentType) => {
  // RTK
  const dispatch = useDispatch();
  const { check } = useRootState((state) => state.LOGIN_FORM);

  // react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  // mutation
  const { mutate: mutate } = useEmailCheckMutation({
    options: {
      onSuccess: (res: any) => {
        dispatch(setCheck(res));
      },
      onError: (err: any) => {
        if (err.response.data?.socialKind) {
          const socialKind: socialKindMessageProps = err.response.data.socialKind;
          dispatch(setError({ email: [socialKindMessage[socialKind]] }));
        } else {
          dispatch(setError(err.response.data));
        }
      },
    },
  });
  const { mutate: mutate_, isLoading } = useEmailLoginMutation();
  const { mutate: mutate__, isLoading: isLoading_ } = useEmailRegisterMutation({
    options: {
      onError: (err: any) => {
        dispatch(setError(err.response.data));
      },
    },
  });

  const emailCheck = debounce(mutate, 100);
  const emailLogin = debounce(mutate_, 100);
  const emailRegister = debounce(mutate__, 100);

  const onSubmit = (data: FormValues) => {
    // Email Check를 통해서 가입 여부 확인
    if (check.isRegister === null) {
      emailCheck(data);
    } else {
      // 가입 여부에 따라서 로그인 or 회원가입 진행
      if (check.isRegister) {
        // TODO : 간소화 가능?
        if (data.password) {
          emailLogin({
            email: data.email,
            password: data.password,
          });
        }
        // 제바알...
      } else {
        // 회원가입에 사용하는 objects를 제외하고 metadata로 만들어서 API 호출
        const DEFAULT_FIELD = ['email', 'password', 'passwordConfirm', 'nickname'];
        const userParams: any = {};
        const metadata: any = {};
        Object.entries(data).forEach(([key, value]) => {
          if (!DEFAULT_FIELD.includes(key)) {
            metadata[key] = value;
          } else {
            userParams[key] = value;
          }
        });
        emailRegister({ ...userParams, metadata });
      }
    }
  };

  return (
    <Flex direction="column">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <EmailForm register={register} watch={watch} errors={errors} brand={brand} isLoading={isLoading || isLoading_} />
      </form>
    </Flex>
  );
};

export default EmailLogin;
