import { useEffect, useState } from 'react';

import { Box, Input, Flex, Button } from '@chakra-ui/react';
import useGetMyTeam from '../hooks/useGetMyTeam';

import { setTeam, TeamProps } from 'features/Admin/adminSlice';
import { useDispatch } from 'react-redux';
import { useRootState } from 'components/hooks/useRootState';

const TeamManagement = () => {
  const dispatch = useDispatch();
  const { team } = useRootState((state) => state.ADMIN);

  const getMyTeam = useGetMyTeam;

  useEffect(() => {
    const init = async () => {
      const teamData: TeamProps = await getMyTeam();
      dispatch(setTeam(teamData));
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
