import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { Flex } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { setPhone, setToken, setIsVerify, setCheck, setError, reset } from 'features/LoginForm/loginFormSlice';
import { useRootState } from 'components/hooks/useRootState';

import debounce from 'lodash.debounce';

import Text from 'components/common/Text';

import PhoneForm from './PhoneForm';

import { usePhoneCheckMutation, usePhoneVerifyMutation, usePhoneLoginMutation, usePhoneRegisterMutation } from 'apis/Auth/mutation';

import { FormValues, ContentType } from '../type';

const Content = ({ brand }: ContentType) => {
  // RTK
  const dispatch = useDispatch();
  const { phone, token, isVerify, check } = useRootState((state) => state.LOGIN_FORM);

  // react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  // mutation
  const { mutate: checkMutate, isLoading: isSending } = usePhoneCheckMutation({
    options: {
      onSuccess: (res: any) => {
        dispatch(setCheck(res));
      },
    },
  });
  const { mutate: verify } = usePhoneVerifyMutation({
    options: {
      onSuccess: (res: any) => {
        dispatch(setIsVerify(true));
        dispatch(setToken(res.token));
        // 회원가입 유저는 verify 이후 로그인 로직 실행
        if (check.isRegister) {
          phoneLogin({ phone, token: res.token });
        }
      },
      onError: (err: any) => {
        dispatch(setError(err.response.data));
      },
    },
  });
  const { mutate: login, isLoading } = usePhoneLoginMutation({
    options: {
      onError: () => {
        dispatch(setIsVerify(false));
      },
    },
  });
  const { mutate: register_, isLoading: isLoading_ } = usePhoneRegisterMutation();

  const phoneCheck = debounce(checkMutate, 100);
  const phoneVerify = debounce(verify, 100);
  const phoneLogin = debounce(login, 100);
  const phoneRegister = debounce(register_, 100);

  const onSubmit = (data: FormValues) => {
    // Phone Check를 통해서 가입 여부 확인
    if (check.isRegister === null) {
      // 인증번호 전송 & 회원가입 여부 확인
      phoneCheck(data);
      dispatch(setPhone(data.phone));
    } else {
      if (!isVerify) {
        // 인증번호 확인
        // TODO : 간소화 가능
        if (data.code) {
          phoneVerify({
            phone: data.phone,
            code: data.code,
          });
        }
      } else {
        // 회원가입
        // metadata로 만들어서 API 호출
        if (!check.isRegister) {
          const DEFAULT_FIELD = ['phone', 'code', 'email'];
          const userParams: any = {};
          const metadata: any = {};
          Object.entries(data).forEach(([key, value]) => {
            if (!DEFAULT_FIELD.includes(key)) {
              metadata[key] = value;
            } else {
              userParams[key] = value;
            }
          });
          phoneRegister({ ...userParams, token, metadata });
        }
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('doobucLastLogin', 'PHONE');
    dispatch(reset());
  }, []);

  return (
    <Flex direction="column">
      {check.isRegister === null ? (
        <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center" whiteSpace="nowrap">
          <strong>안녕하세요!</strong>
          <br />
          전화번호를 입력해주세요.
        </Text>
      ) : (
        <>
          {check.isRegister ? (
            <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
              <strong>{check?.nickname}님</strong>
              <br />
              다시 만나 반가워요 :)
            </Text>
          ) : (
            <>
              {isVerify ? (
                <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
                  <strong>처음이시네요!</strong>
                  <br />
                  가입을 진행합니다
                </Text>
              ) : (
                <Text textStyle="xl" mb={['50px', '60px', '80px']} textAlign="center">
                  <strong>시간이 가고 있어요!</strong>
                  <br />
                  인증을 진행해주세요.
                </Text>
              )}
            </>
          )}
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <PhoneForm register={register} watch={watch} errors={errors} brand={brand} isLoading={isSending || isLoading || isLoading_} />
      </form>
    </Flex>
  );
};

export default Content;
