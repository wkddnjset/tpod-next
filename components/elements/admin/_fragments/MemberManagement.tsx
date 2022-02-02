import { useEffect, useState } from 'react';
import { Box, Checkbox, Flex, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import useGetMember from '../hooks/useGetMember';

const DATA = [
  { id: 1, name: '서장원', username: 'wkddnjset', created: '2021.01.02', uid: 'ETzWVdqLbZQpDYT1V6zGF62CbPs1', isChecked: true },
  { id: 2, name: '박수지', username: 'sujipark', created: '2021.01.02', uid: 'ETzWVdqLbZQpDYT1V6zGF62CbPs1', isChecked: false },
];

const MemberManagement = () => {
  const [checkList, setCheckList] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);
  const getMember = useGetMember;

  useEffect(() => {
    const init = async () => {
      const memberData = await getMember();
      console.log('memberData : ', memberData);
      setMembers(memberData);
    };
    init();
  }, []);

  return (
    <Box py="15px">
      <Flex justifyContent="flex-end" mb="20px">
        <Button size="sm" colorScheme="red">
          선택삭제
        </Button>
        <Button size="sm" colorScheme="facebook" ml="5px">
          사용자생성
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>이름</Th>
            <Th>아이디</Th>
            <Th>생성날짜</Th>
            <Th>UID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members?.map((member: any, idx: number) => {
            return (
              <Tr key={idx}>
                <Td>
                  <Checkbox isChecked={checkList.includes(member.uid)} />
                </Td>
                <Td>{member.name}</Td>
                <Td>{member.username}</Td>
                <Td>{member.created}</Td>
                <Td>{member.uid}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MemberManagement;
