import { useEffect, useState } from 'react';
import { Box, Checkbox, Flex, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import useGetMembers from '../hooks/useGetMembers';
import moment from 'moment';

const MemberManagement = () => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [members, setMembers] = useState<any>([]);
  const getMember = useGetMembers;

  const toggleCheckList = (e: any, uid: string) => {
    if (e.target.checked) {
      setCheckList([uid, ...checkList]);
    } else {
      const curCheckList = JSON.parse(JSON.stringify(checkList));
      const idx = curCheckList.findIndex((a: string) => a === uid);
      curCheckList.splice(idx, 1);
      setCheckList(curCheckList);
    }
  };

  const toggleAll = (e: any) => {
    if (e.target.checked) {
      const list: string[] = [];
      members.forEach((member: any) => {
        list.push(member.uid);
      });
      setCheckList(list);
    } else {
      setCheckList([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      const memberData = await getMember();
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
              <Checkbox isChecked={checkList.length === members.length} onChange={toggleAll} />
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
                  <Checkbox isChecked={checkList.includes(member.uid)} onChange={(val) => toggleCheckList(val, member.uid)} />
                </Td>
                <Td>{member.name}</Td>
                <Td>{member.username}</Td>
                <Td>{moment(member.created.toDate()).format('YYYY.MM.DD')}</Td>
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
