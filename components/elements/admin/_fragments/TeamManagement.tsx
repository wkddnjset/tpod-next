import { useEffect, useState } from 'react';

import { Box, Input, Flex, Button } from '@chakra-ui/react';
import useGetMyTeam from '../hooks/useGetMyTeam';

const TeamManagement = () => {
  const [team, setTeam] = useState<any>(null);
  const getMyTeam = useGetMyTeam;

  useEffect(() => {
    const init = async () => {
      const teamData = await getMyTeam();
      setTeam(teamData);
    };
    init();
  }, []);

  return (
    <Box py="15px">
      <Flex justifyContent="flex-end" mb="20px">
        <Button size="sm" colorScheme="dark" disabled>
          저장
        </Button>
      </Flex>
      <Input placeholder="팀이름" defaultValue={team?.name} />
    </Box>
  );
};

export default TeamManagement;
