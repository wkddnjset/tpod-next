import { Box, Input, Flex, Button } from '@chakra-ui/react';

const TeamManagement = () => {
  return (
    <Box py="15px">
      <Flex justifyContent="flex-end" mb="20px">
        <Button size="sm" colorScheme="dark" disabled>
          저장
        </Button>
      </Flex>
      <Input placeholder="팀이름"></Input>
    </Box>
  );
};

export default TeamManagement;
