import { Box, Text, Flex, Button, SimpleGrid, AspectRatio } from '@chakra-ui/react';

import UploadButton from 'components/common/@Icons/System/UploadButton2';

const DATA = [
  { title: '제 1 회의실', capacity: 3 },
  { title: '제 2 회의실', capacity: 6 },
];
const RoomManagement = () => {
  return (
    <Box pt="40px">
      <SimpleGrid columns={[4]} spacing="10px">
        {DATA.map((d, idx) => {
          return (
            <AspectRatio ratio={0.8} key={idx}>
              <Box w="100%" borderColor="gray.600" borderWidth="1px" borderRadius="10px">
                <Flex direction="column" alignItems="center">
                  <Text textStyle="md">{d.title}</Text>
                  <Text textStyle="sm">인원 : {d.capacity}명</Text>
                  <Button size="sm" mt="10px" colorScheme="red">
                    삭제하기
                  </Button>
                </Flex>
              </Box>
            </AspectRatio>
          );
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
