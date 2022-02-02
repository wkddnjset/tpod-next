import { useEffect, useState } from 'react';
import { Box, SimpleGrid, AspectRatio } from '@chakra-ui/react';

import UploadButton from 'components/common/@Icons/System/UploadButton2';
import RoomCard from 'components/common/RoomCard';

import useGetMyRooms from '../hooks/useGetMyRooms';

const RoomManagement = () => {
  const [rooms, setRooms] = useState<any>([]);
  const getMyRooms = useGetMyRooms;

  useEffect(() => {
    const init = async () => {
      const roomData = await getMyRooms();
      setRooms(roomData);
    };
    init();
  }, []);

  return (
    <Box pt="40px">
      <SimpleGrid columns={[4]} spacing="10px">
        {rooms?.map((d: any, idx: number) => {
          return <RoomCard data={d} key={idx} isAdmin />;
        })}
        <AspectRatio ratio={0.8}>
          <Box w="100%" borderColor="gray.600" borderWidth="1px" borderRadius="10px" cursor="pointer">
            <UploadButton w="30px" h="30px" color="gray.600" />
          </Box>
        </AspectRatio>
      </SimpleGrid>
    </Box>
  );
};

export default RoomManagement;
