import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';

import { useRouter } from 'next/router';

import { Flex, Box, Divider, Center, Text, Container, Button } from '@chakra-ui/react';

import useGetRoom from '../hooks/useGetRoom';

import ArrowLeftIcon from 'components/common/@Icons/System/ArrowLeft2';
import Calendar from 'components/common/Calendar';
import TimePicker from 'components/common/TimePicker';

const Content = () => {
  const [room, setRoom] = useState<any>(null);
  const [date, setDate] = useState<moment.Moment>(() => moment());
  const [time, setTime] = useState<{ start: number; end: number }>({ start: -1, end: -1 });

  const router = useRouter();
  const handleDayClick = (current: moment.Moment) => setDate(current);
  const handleTimeClick = (pickTime: { start: number; end: number }) => setTime(pickTime);

  const getRoom = useGetRoom;

  useEffect(() => {
    const init = async () => {
      const { roomId } = router.query;
      if (roomId) {
        const roomData = await getRoom(String(roomId));
        setRoom(roomData);
      }
    };
    init();
  }, [router]);

  if (!room) return null;
  return (
    <Box>
      <Flex as="nav" h="60px" borderBottomWidth="1px" alignItems="center" justifyContent="center">
        <Center w="30px" h="30px" cursor="pointer" onClick={router.back} mr="auto" ml="15px">
          <ArrowLeftIcon w="25px" h="25px" />
        </Center>
        <Text position="absolute">{room.name}</Text>
      </Flex>
      <Container>
        <Box my="20px">
          <Flex alignItems="center" justifyContent="space-between">
            <Text textStyle="md">날짜 선택</Text>
            <Text color="primary.500" fontSize="12px">
              {date.locale('ko').format('YYYY.MM.DD(dd)')}
            </Text>
          </Flex>
          <Divider mt="10px" mb="20px" borderColor="primary.500" borderWidth="1px" />
          <Calendar handleDayClick={handleDayClick} />
        </Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Text textStyle="md">시간 선택</Text>
          <Text color="primary.500" fontSize="12px">
            {time.start > 0 && time.end > 0 && `${time.start}시 ~ ${time.end + 1}시, ${time.end - time.start + 1}시간`}
          </Text>
        </Flex>
        <Divider mt="10px" mb="20px" borderColor="primary.500" borderWidth="1px" />
        <TimePicker handleTimeClick={handleTimeClick} />
        <Button w="100%" colorScheme="primary" mt="20px">
          회의실 예약하기
        </Button>
      </Container>
    </Box>
  );
};

export default Content;
