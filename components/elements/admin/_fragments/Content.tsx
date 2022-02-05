import { Box, Flex, Button, Container, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';
import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import Router from 'next/router';
import { useRootState } from 'components/hooks/useRootState';

import moment from 'moment';

import RoomManagement from './RoomManagement';
import MemberManagement from './MemberManagement';
import TeamManagement from './TeamManagement';
import PaymentManagement from './PaymentManagement';

const Content = () => {
  const { user } = useRootState((state) => state.ADMIN);

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      Router.push('/');
    });
  };
  const range = moment(user.freeTrial).diff(moment(), 'days');
  return (
    <Box>
      {range > 0 && (
        <Alert status="error">
          <AlertIcon />
          <Box>
            <Text textStyle="md" fontWeight="bold">
              무료 사용 기간이 {range}일 남았습니다.
            </Text>
            <Text textStyle="sm" mt="-3px">
              결제정보를 등록해주세요.
            </Text>
          </Box>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}

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
