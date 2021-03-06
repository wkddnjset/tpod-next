import { useEffect, useState } from 'react';
import { Box, Checkbox, Flex, Button, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';

import CreateMember from './Modal/CreateMember';

import useGetMembers from '../hooks/useGetMembers';
import useDeleteMember from '../hooks/useDeleteMember';

import moment from 'moment';

const MemberManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checkList, setCheckList] = useState<string[]>([]);
  const [members, setMembers] = useState<any>([]);

  const deleteMember = useDeleteMember;
  const getMember = useGetMembers;

  const onDeleteMember = () => {
    setCheckList([]);
    deleteMember(checkList).then(async () => {
      const memberData = await getMember();
      setMembers(memberData);
    });
  };
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
  }, [isOpen]);

  return (
    <Box py="15px">
      <CreateMember isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="flex-end" mb="20px">
        <Button size="sm" colorScheme="red" disabled={checkList.length < 1} onClick={onDeleteMember}>
          선택삭제
        </Button>
        <Button size="sm" colorScheme="primary" ml="5px" onClick={onOpen}>
          사용자생성
        </Button>
      </Flex>
      <Box overflow="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox isChecked={checkList.length === members.length} onChange={toggleAll} />
              </Th>
              <Th whiteSpace="nowrap">이름</Th>
              <Th whiteSpace="nowrap">아이디</Th>
              <Th whiteSpace="nowrap">생성날짜</Th>
              <Th whiteSpace="nowrap">UID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members?.map((member: any, idx: number) => {
              return (
                <Tr key={idx}>
                  <Td>
                    <Checkbox isChecked={checkList.includes(member.uid)} onChange={(val) => toggleCheckList(val, member.uid)} />
                  </Td>
                  <Td whiteSpace="nowrap">{member.name}</Td>
                  <Td whiteSpace="nowrap">{member.username}</Td>
                  <Td whiteSpace="nowrap">{moment(member.created.toDate()).format('YYYY.MM.DD')}</Td>
                  <Td whiteSpace="nowrap">{member.uid}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default MemberManagement;
