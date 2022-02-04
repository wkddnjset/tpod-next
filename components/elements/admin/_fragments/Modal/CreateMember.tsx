import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, Button, Box, Input, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { passwordValidate } from 'utils/validate';
import useCreateMember from '../../hooks/useCreateMember';

export interface MemberProps {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
}
const CreateMember = ({ isOpen, onClose }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createMember = useCreateMember;
  const {
    register,
    watch,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberProps>();

  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmit = (data: MemberProps) => {
    clearErrors();
    setIsLoading(true);
    createMember(data)
      .then(() => {
        reset();
        onClose();
      })
      .catch((err) => {
        setError(err.name, err.value);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  };

  const formData = watch();

  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>사용자 생성하기</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <Box w="100%">
                <Input type="text" placeholder="이름" isInvalid={!!errors?.name?.message} {...register('name', { required: '빈칸을 입력해주세요.' })} />
                {!!errors?.name?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.name?.message}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <Input
                  type="text"
                  placeholder="아이디"
                  isInvalid={!!errors?.username?.message}
                  {...register('username', { required: '빈칸을 입력해주세요.' })}
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
                  placeholder="비밀번호"
                  isInvalid={!!errors?.password?.message}
                  {...register('password', { required: '빈칸을 입력해주세요.', validate: passwordValidate })}
                />
                {!!errors?.password?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.password?.message}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <Input
                  type="password"
                  placeholder="비밀번호 확인"
                  isInvalid={!!errors?.passwordConfirm?.message}
                  {...register('passwordConfirm', {
                    required: '빈칸을 입력해주세요.',
                    validate: {
                      isSame: (value: string) => (value === formData.password ? true : '비밀번호가 일치하지 않습니다.'),
                    },
                  })}
                />
                {!!errors?.passwordConfirm?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.passwordConfirm?.message}
                  </Text>
                )}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" isLoading={isLoading}>
              생성하기
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateMember;
