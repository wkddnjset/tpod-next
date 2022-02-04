import { useEffect, useState } from 'react';
import { Box, SimpleGrid, AspectRatio, useDisclosure } from '@chakra-ui/react';

import UploadButton from 'components/common/@Icons/System/UploadButton2';
import RoomCard from 'components/common/RoomCard';

import CreateRoom from './Modal/CreateRoom';
import useGetMyRooms from '../hooks/useGetMyRooms';
import useDeleteRoom from '../hooks/useDeleteRoom';

const RoomManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [rooms, setRooms] = useState<any>([]);
  const getMyRooms = useGetMyRooms;
  const deleteRoom = useDeleteRoom;

  const onDelete = (uid: string) => {
    deleteRoom(uid).then(async () => {
      const roomData = await getMyRooms();
      setRooms(roomData);
    });
  };

  useEffect(() => {
    const init = async () => {
      const roomData = await getMyRooms();
      setRooms(roomData);
    };
    init();
  }, [isOpen]);
  return (
    <Box pt="40px">
      <CreateRoom isOpen={isOpen} onClose={onClose} />
      <SimpleGrid columns={[2]} spacing="10px">
        {rooms?.map((d: any, idx: number) => {
          return <RoomCard data={d} key={idx} onDelete={onDelete} isAdmin />;
        })}
        <AspectRatio ratio={0.8} onClick={onOpen}>
          <Box w="100%" borderColor="gray.600" borderWidth="1px" borderRadius="10px" cursor="pointer">
            <UploadButton w="30px" h="30px" color="gray.600" />
          </Box>
        </AspectRatio>
      </SimpleGrid>
    </Box>
  );
};

export default RoomManagement;
