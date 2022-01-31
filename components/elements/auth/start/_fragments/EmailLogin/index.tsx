import React from 'react';

import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { Flex } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { reset, setIsRegister, setNickname, setIsLoading } from 'features/LoginForm/loginFormSlice';
import { useRootState } from 'components/hooks/useRootState';

import EmailForm from './EmailForm';

import useEmailCheck from 'components/elements/auth/hooks/useEmailCheck';
import useEmailLogin from 'components/elements/auth/hooks/useEmailLogin';
import useEmailRegister from 'components/elements/auth/hooks/useEmailRegister';

import { FormValues } from './type';

const EmailLogin = () => {
  // RTK
  const dispatch = useDispatch();
  const { isRegister } = useRootState((state) => state.LOGIN_FORM);

  // hooks
  const emailCheck = useEmailCheck;
  const emailLogin = useEmailLogin;
  const emailRegister = useEmailRegister;

  // react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    dispatch(setIsLoading(true));
    // Email Check를 통해서 가입 여부 확인
    if (isRegister === null) {
      emailCheck(data.email)
        ?.then((res) => {
          if (res) {
            dispatch(setNickname(res.nickname));
            dispatch(setIsRegister(true));
          } else {
            dispatch(setIsRegister(false));
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      // 가입 여부에 따라서 로그인 or 회원가입 진행
      if (isRegister) {
        // TODO : 간소화 가능?
        emailLogin(data.email, data.password)
          .then(() => {
            Router.push('/admin');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} - ${errorMessage}`);
            dispatch(reset());
          })
          .finally(() => {
            dispatch(setIsLoading(false));
          });
      } else {
        // 회원가입에 사용하는 objects를 제외하고 metadata로 만들어서 API 호출
        emailRegister(data.email, data.password, data.nickname)
          .then(() => {
            Router.push('/admin');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} - ${errorMessage}`);
            dispatch(reset());
          })
          .finally(() => {
            dispatch(setIsLoading(false));
          });
      }
    }
  };

  return (
    <Flex direction="column">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <EmailForm register={register} watch={watch} errors={errors} />
      </form>
    </Flex>
  );
};

export default EmailLogin;
