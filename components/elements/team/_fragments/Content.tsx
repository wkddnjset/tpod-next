import { Box, Center, Container, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { StorageGetUser } from 'utils/Storage';

import Rooms from './Rooms';
import { useRootState } from 'components/hooks/useRootState';

import useGetTeam from '../hooks/useGetTeam';

import { useDispatch } from 'react-redux';
import { setTeam } from 'features/Team/teamSlice';

const Content = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { team } = useRootState((state) => state.TEAM);

  const dispatch = useDispatch();

  const getTeam = useGetTeam;
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const user = await StorageGetUser();
      const { team } = router.query;
      if (team) {
        getTeam(String(team)).then((data) => {
          if (data && !user) {
            router.replace(`/${team}/login`);
          }
          dispatch(setTeam(data));
          setTimeout(() => {
            setLoading(false);
          }, 400);
        });
      }
    };
    init();
  }, [router]);

  useEffect(() => {
    return () => setLoading(false); // cleanup function을 이용
  }, []);

  if (!team) return null;
  if (loading) return null;
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
