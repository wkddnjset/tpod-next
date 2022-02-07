import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, Button, Box, Input, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useCreateRoom from '../../hooks/useCreateRoom';

export interface RoomProps {
  name: string;
  capacity: number;
}
const CreateRoom = ({ isOpen, onClose }: any) => {
  const createRoom = useCreateRoom;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomProps>();

  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmit = (data: RoomProps) => {
    createRoom(data).then(() => {
      reset();
      onClose();
    });
  };
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent mx="16px">
        <ModalHeader>회의실 생성하기</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <Box w="100%">
                <Input type="text" placeholder="회의실 이름" isInvalid={!!errors?.name?.message} {...register('name', { required: '빈칸을 입력해주세요.' })} />
                {!!errors?.name?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.name?.message}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <Input
                  type="tel"
                  placeholder="수용인원"
                  isInvalid={!!errors?.capacity?.message}
                  {...register('capacity', { required: '빈칸을 입력해주세요.' })}
                />
                {!!errors?.capacity?.message && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.capacity?.message}
                  </Text>
                )}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="secondary">
              생성하기
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoom;
