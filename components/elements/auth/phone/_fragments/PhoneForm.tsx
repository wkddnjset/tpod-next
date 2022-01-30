import React from 'react';

import { Input, VStack, Box, Button, Flex, Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { setPhone, setCode, setIsVerify, setCheck, setError } from 'features/LoginForm/loginFormSlice';
import { useRootState } from 'components/hooks/useRootState';

import { emailValidate } from 'utils/validate';
import { EmailLoginFormType } from '../type';

const PhoneForm = ({ brand, watch, register, errors, isLoading }: EmailLoginFormType) => {
  // RTK
  const dispatch = useDispatch();
  const { phone, code, error, isVerify, check } = useRootState((state) => state.LOGIN_FORM);

  const disabled = check.isRegister === null ? phone.length !== 11 : isVerify ? !check.isRegister && false : check.isRegister ? false : code.length !== 6;

  const formData = watch();
  return (
    <Flex direction="column">
      <VStack w="100%" mb="20px" spacing="8px">
        <Box w="100%">
          <Input
            name="phone"
            type="tel"
            placeholder="전화번호"
            {...register('phone', {
              required: '빈칸을 입력해주세요.',
              pattern: {
                value: /^01([0])-?([0-9]{4})-?([0-9]{4})$/,
                message: '올바른 전화번호를 입력해주세요.',
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setPhone(e.target.value));
                dispatch(setIsVerify(false));
                dispatch(setCheck({ isRegister: null, nickname: '' }));
              },
            })}
            borderColor={formData.phone ? 'black' : 'transparent'}
            isInvalid={!!errors?.phone?.message || !!error?.phone}
            disabled={isVerify || isLoading}
          />
          {(!!errors?.phone?.message || !!error.phone) && (
            <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
              {errors?.phone?.message || error.phone[0]}
            </Text>
          )}
        </Box>
        {check.isRegister !== null && (
          <>
            {check.isRegister ? (
              <>
                <Input
                  name="code"
                  type="tel"
                  placeholder="인증번호"
                  {...register('code', {
                    required: '빈칸을 입력해주세요.',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setCode(e.target.value));
                      dispatch(setError({}));
                    },
                  })}
                  borderColor={formData.code ? 'black' : 'transparent'}
                  isInvalid={!!errors?.code?.message || !!error?.code}
                  disabled={isVerify || isLoading}
                />
                {(!!errors?.code?.message || !!error?.code) && (
                  <Text textStyle="sm" textAlign="left" w="100%" color="warning">
                    {errors?.code?.message ? errors?.code?.message : error?.code && error?.code[0]}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Input
                  name="code"
                  type="tel"
                  placeholder="인증번호"
                  {...register('code', {
                    required: '빈칸을 입력해주세요.',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setCode(e.target.value));
                      dispatch(setError({}));
                    },
                  })}
                  borderColor={formData.code ? 'black' : 'transparent'}
                  isInvalid={!!errors?.code?.message || !!error?.code}
                  disabled={isVerify || isLoading}
                />
                {(!!errors?.code?.message || !!error?.code) && (
                  <Text textStyle="sm" textAlign="left" w="100%" color="warning">
                    {errors?.code?.message ? errors?.code?.message : error?.code && error?.code[0]}
                  </Text>
                )}
                {!isLoading && isVerify && (
                  <>
                    <Box w="100%">
                      <Input
                        name="email"
                        type="text"
                        placeholder="이메일"
                        {...register('email', {
                          required: '빈칸을 입력해주세요.',
                          validate: emailValidate,
                        })}
                        borderColor={formData.email ? 'black' : 'transparent'}
                        isInvalid={!!errors?.email?.message || !!error?.email}
                      />
                      {(!!errors?.email?.message || !!error?.email) && (
                        <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                          {errors?.email?.message || error?.email[0]}
                        </Text>
                      )}
                    </Box>

                    <Box w="100%">
                      <Input
                        name="nickname"
                        type="text"
                        placeholder="닉네임"
                        {...register('email', {
                          required: '빈칸을 입력해주세요.',
                        })}
                        borderColor={formData.nickname ? 'black' : 'transparent'}
                        isInvalid={!!errors?.nickname?.message || !!error?.nickname}
                      />
                      {(!!errors?.nickname?.message || !!error?.nickname) && (
                        <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                          {errors?.nickname?.message || error?.nickname[0]}
                        </Text>
                      )}
                    </Box>

                    {brand.fieldSet.map((field, idx) => {
                      return (
                        <Box key={idx} w="100%">
                          <Input
                            {...field}
                            {...register(field.name, {
                              required: '빈칸을 입력해주세요.',
                            })}
                            borderColor={formData[field.name] ? 'black' : 'transparent'}
                            isInvalid={!!errors?.[field.name]?.message || !!error?.[field.name]}
                          />
                          {(!!errors?.[field.name]?.message || !!error?.[field.name]) && (
                            <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                              {errors?.[field.name]?.message || error?.[field.name][0]}
                            </Text>
                          )}
                        </Box>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </>
        )}
      </VStack>

      <Box>
        <Button w="100%" colorScheme={'dark'} type="submit" disabled={disabled} isLoading={isLoading || !!(isVerify && check.isRegister)}>
          {/* isRegister === null : 인증번호 전송  */}
          {/* isVerify === false && isRegister === false : 인증번호 확인  */}
          {/* isVerify === false && isRegister === true : 로그인  */}
          {/* isVerify === true && isRegister === false : 회원가입  */}
          {check.isRegister === null ? '인증번호 전송' : isVerify ? !check.isRegister && '회원가입' : check.isRegister ? '로그인' : '인증번호 확인'}
        </Button>
      </Box>
    </Flex>
  );
};

export default PhoneForm;
