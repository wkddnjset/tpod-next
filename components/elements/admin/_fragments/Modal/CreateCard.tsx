import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Box,
  Input,
  HStack,
  VStack,
  PinInput,
  PinInputField,
  Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import useCreateCard from '../../hooks/useCreateCard';

export interface CardProps {
  cardNumber: string;
  cardExpirationYear: string;
  cardExpirationMonth: string;
  cardPassword: string;
  customerBirthday: string;
}
const CreateCard = ({ isOpen, onClose }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createCard = useCreateCard;
  const {
    register,
    reset,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CardProps>({
    defaultValues: {
      cardNumber: '',
      cardExpirationYear: '',
      cardExpirationMonth: '',
      cardPassword: '',
      customerBirthday: '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmit = (data: CardProps) => {
    console.log('data :', data);
    clearErrors();
    if (data.cardExpirationYear.length !== 2) {
      setError('cardExpirationYear', { message: '빈칸을 채워주세요.' });
      return;
    }
    if (data.cardExpirationMonth.length !== 2) {
      setError('cardExpirationMonth', { message: '빈칸을 채워주세요.' });
      return;
    }
    if (data.cardPassword.length !== 2) {
      setError('cardPassword', { message: '빈칸을 채워주세요.' });
      return;
    }
    setIsLoading(true);
    createCard(data)
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

  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent mx="16px">
        <ModalHeader>카드 생성하기</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <Box w="100%">
                <Input
                  type="tel"
                  placeholder="카드번호 16자리"
                  isInvalid={!!errors?.cardNumber?.message}
                  {...register('cardNumber', { required: '빈칸을 입력해주세요.' })}
                />
                {!!errors?.cardNumber?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.cardNumber?.message}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <HStack>
                  <PinInput
                    type="number"
                    placeholder="Y"
                    errorBorderColor="warning"
                    isInvalid={!!errors?.cardExpirationYear?.message}
                    onChange={(val) => {
                      clearErrors();
                      setValue('cardExpirationYear', val);
                    }}
                  >
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                  <Text>/</Text>
                  <PinInput
                    type="number"
                    placeholder="M"
                    errorBorderColor="warning"
                    isInvalid={!!errors?.cardExpirationMonth?.message}
                    onChange={(val) => {
                      clearErrors();
                      setValue('cardExpirationMonth', val);
                    }}
                  >
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                {(!!errors?.cardExpirationYear?.message || !!errors?.cardExpirationMonth?.message) && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.cardExpirationYear?.message || errors?.cardExpirationMonth?.message}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <HStack>
                  <PinInput
                    type="number"
                    mask
                    errorBorderColor="warning"
                    isInvalid={!!errors?.cardPassword?.message}
                    onChange={(val) => {
                      clearErrors();
                      setValue('cardPassword', val);
                    }}
                  >
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                  <Center w="40px" h="40px" borderColor="inherit" borderWidth="1px" borderRadius="md">
                    <Text color="gray.400">X</Text>
                  </Center>
                  <Center w="40px" h="40px" borderColor="inherit" borderWidth="1px" borderRadius="md">
                    <Text color="gray.400">X</Text>
                  </Center>
                </HStack>
                {!!errors?.cardPassword?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.cardPassword?.message}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <Input
                  type="tel"
                  placeholder="생년월일(YYMMDD)"
                  isInvalid={!!errors?.customerBirthday?.message}
                  {...register('customerBirthday', {
                    required: '빈칸을 입력해주세요.',
                    validate: {
                      format: (v) => (v.length === 6 ? true : '생년월일 형식을 확인해주세요.'),
                    },
                  })}
                />
                {!!errors?.customerBirthday?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.customerBirthday?.message}
                  </Text>
                )}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" isLoading={isLoading} colorScheme="secondary">
              생성하기
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateCard;
