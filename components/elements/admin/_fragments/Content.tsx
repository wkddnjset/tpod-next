import { Box, Flex, Button, Container, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import Router from 'next/router';

import RoomManagement from './RoomManagement';
import UserManagement from './UserManagement';
import TeamManagement from './TeamManagement';

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
              <Tab _focus={{ boxShadow: 'none' }}>회의실 관리</Tab>
              <Tab _focus={{ boxShadow: 'none' }}>사용자 관리</Tab>
              <Tab _focus={{ boxShadow: 'none' }}>팀 관리</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0">
                <RoomManagement />
              </TabPanel>
              <TabPanel p="0">
                <UserManagement />
              </TabPanel>
              <TabPanel p="0">
                <TeamManagement />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Content;
