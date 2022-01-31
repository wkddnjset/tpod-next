import { Box, Checkbox, Flex, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const DATA = [
  { id: 1, name: '서장원', username: 'wkddnjset', created: '2021.01.02', uid: 'ETzWVdqLbZQpDYT1V6zGF62CbPs1', isChecked: true },
  { id: 2, name: '박수지', username: 'sujipark', created: '2021.01.02', uid: 'ETzWVdqLbZQpDYT1V6zGF62CbPs1', isChecked: false },
];

const UserManagement = () => {
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
          {DATA.map((d, idx) => {
            return (
              <Tr key={idx}>
                <Td>
                  <Checkbox isChecked={d.isChecked} />
                </Td>
                <Td>{d.name}</Td>
                <Td>{d.username}</Td>
                <Td>{d.created}</Td>
                <Td>{d.uid}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserManagement;
