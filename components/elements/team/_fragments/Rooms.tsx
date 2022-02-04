import { Box, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';
import RoomCard from 'components/common/RoomCard';

const Rooms = ({ team }: any) => {
  return (
    <SimpleGrid columns={2} spacing="10px" py="20px">
      {team?.rooms?.map((room: any, idx: number) => {
        return (
          <Link key={idx} href={`room/${room.uid}`} passHref>
            <Box>
              <RoomCard data={room} />
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

export default Rooms;
