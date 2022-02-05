import { useEffect, useState } from 'react';
import { Box, HStack, Flex, Button, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';

import CreateCard from './Modal/CreateCard';

import useGetCards from '../hooks/useGetMyCards';
import usePatchCard from '../hooks/usePatchCard';
import useDeleteCard from '../hooks/useDeleteCard';

const PaymentManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cards, setCards] = useState<any>([]);

  const patchCard = usePatchCard;
  const deleteCard = useDeleteCard;
  const getCards = useGetCards;

  const onPatchCard = (uid: string) => {
    patchCard(uid).then(async () => {
      const cardData = await getCards();
      setCards(cardData);
    });
  };
  const onDeleteMember = (uid: string) => {
    deleteCard(uid).then(async () => {
      const cardData = await getCards();
      setCards(cardData);
    });
  };

  useEffect(() => {
    const init = async () => {
      const cardData = await getCards();
      setCards(cardData);
    };
    init();
  }, [isOpen]);

  return (
    <Box py="15px">
      <CreateCard isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="flex-end" mb="20px">
        <Button size="sm" colorScheme="facebook" ml="5px" onClick={onOpen}>
          카드 추가
        </Button>
      </Flex>
      <Box overflow="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th whiteSpace="nowrap">카드사</Th>
              <Th whiteSpace="nowrap">카드번호</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cards?.map((card: any, idx: number) => {
              return (
                <Tr key={idx}>
                  <Td>{card.cardCompany}</Td>
                  <Td>{card.cardNumber}</Td>
                  <Td>
                    <HStack>
                      {card.isMain ? (
                        <Button size="sm" colorScheme="primary" disabled>
                          기본값
                        </Button>
                      ) : (
                        <Button size="sm" colorScheme="primary" onClick={() => onPatchCard(card.uid)}>
                          기본으로 설정
                        </Button>
                      )}
                      <Button size="sm" colorScheme="red" onClick={() => onDeleteMember(card.uid)}>
                        삭제
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PaymentManagement;
