import { Box, Container, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { StorageGetUser } from 'utils/Storage';

import TimePicker from 'components/common/Timepicker';

const Content = () => {
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const user = await StorageGetUser();
      const { team } = router.query;
      if (user) {
        console.log('team  : ', team);
      } else {
        router.push(`/${team}/login`);
      }
    };
    init();
  }, [router]);
  return (
    <Box>
      <Container>
        <Text>룸룸룸룸</Text>
        <TimePicker />
      </Container>
    </Box>
  );
};

export default Content;
