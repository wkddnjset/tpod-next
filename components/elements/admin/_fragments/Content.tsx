import { Box, Flex, Button, Container, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import Router from 'next/router';

import RoomManagement from './RoomManagement';
import MemberManagement from './MemberManagement';
import TeamManagement from './TeamManagement';
import PaymentManagement from './PaymentManagement';

const Content = () => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      Router.push('/');
    });
  };
  return (
    <Box>
      <Container>
        <Flex justifyContent="flex-end" py="10px">
          <Button onClick={logout}>로그아웃</Button>
        </Flex>
        <Box mt="80px">
          <Tabs>
            <TabList>
              <Tab fontSize="sm" _focus={{ boxShadow: 'none' }}>
                회의실
              </Tab>
              <Tab fontSize="sm" _focus={{ boxShadow: 'none' }}>
                사용자
              </Tab>
              <Tab fontSize="sm" _focus={{ boxShadow: 'none' }}>
                팀 정보
              </Tab>
              <Tab fontSize="sm" _focus={{ boxShadow: 'none' }}>
                결제 정보
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0">
                <RoomManagement />
              </TabPanel>
              <TabPanel p="0">
                <MemberManagement />
              </TabPanel>
              <TabPanel p="0">
                <TeamManagement />
              </TabPanel>
              <TabPanel p="0">
                <PaymentManagement />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Content;
