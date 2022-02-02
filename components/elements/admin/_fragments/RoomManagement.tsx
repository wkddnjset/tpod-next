import { Box, SimpleGrid, AspectRatio } from '@chakra-ui/react';

import UploadButton from 'components/common/@Icons/System/UploadButton2';
import RoomCard from 'components/common/RoomCard';

const DATA = [
  { name: '제 1 회의실', capacity: 3 },
  { name: '제 2 회의실', capacity: 6 },
];
const RoomManagement = () => {
  return (
    <Box pt="40px">
      <SimpleGrid columns={[4]} spacing="10px">
        {DATA.map((d, idx) => {
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
