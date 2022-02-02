import { Box, Center, Container, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { StorageGetUser } from 'utils/Storage';

import Rooms from './Rooms';

import useGetTeam from '../hooks/useGetTeam';

const Content = () => {
  const getTeam = useGetTeam;
  const router = useRouter();

  const [team, setTeam] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const user = await StorageGetUser();
      const { team } = router.query;
      if (user) {
        if (team) {
          const teamData = await getTeam(String(team));
          setTeam(teamData);
        }
      } else {
        router.push(`/${team}/login`);
      }
    };
    init();
  }, [router]);

  if (!team) return null;
  return (
    <Box>
      <Center as="nav" h="60px" borderBottomWidth="1px">
        <Text>{team.name} 회의실 예약</Text>
      </Center>
      <Container>
        <Rooms team={team} />
      </Container>
    </Box>
  );
};

export default Content;
