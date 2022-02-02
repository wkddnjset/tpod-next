import { SimpleGrid } from '@chakra-ui/react';
import RoomCard from 'components/common/RoomCard';

const Rooms = ({ team }: any) => {
  return (
    <SimpleGrid columns={[4]} spacing="10px" py="20px">
      {team?.rooms?.map((room: any, idx: number) => {
        return <RoomCard data={room} key={idx} />;
      })}
    </SimpleGrid>
  );
};

export default Rooms;
