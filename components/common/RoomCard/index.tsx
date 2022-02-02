import Link from 'next/link';
import { Box, Text, Flex, Button, AspectRatio } from '@chakra-ui/react';

interface Props {
  data: any;
  isAdmin?: boolean;
}
const RoomCard = ({ data, isAdmin }: Props) => {
  return (
    <Link href={`/room/${data.uid}`} passHref>
      <AspectRatio ratio={0.8} cursor="pointer">
        <Box w="100%" borderColor="gray.600" borderWidth="1px" borderRadius="10px">
          <Flex direction="column" alignItems="center">
            <Text textStyle="md">{data.name}</Text>
            <Text textStyle="sm">인원 : {data.capacity}명</Text>
            {isAdmin && (
              <Button size="sm" mt="10px" colorScheme="red">
                삭제하기
              </Button>
            )}
          </Flex>
        </Box>
      </AspectRatio>
    </Link>
  );
};

export default RoomCard;
