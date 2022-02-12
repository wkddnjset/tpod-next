import { useMemo, useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';

import { useRouter } from 'next/router';

import { Flex, Box, Divider, Input, Center, Text, Container, Button, useToast } from '@chakra-ui/react';

import useGetRoom from '../hooks/useGetRoom';
import useCreateReservation from '../hooks/useCreateReservation';

import ArrowLeftIcon from 'components/common/@Icons/System/ArrowLeft2';
import Calendar from 'components/common/Calendar';
import TimePicker from 'components/common/TimePicker';

const Content = () => {
  const toast = useToast();

  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<any>(null);
  const [date, setDate] = useState<moment.Moment>(() => moment());
  const [time, setTime] = useState<{ start: number; end: number }>({ start: -1, end: -1 });

  const getRoom = useGetRoom;
  const createReservation = useCreateReservation;

  const router = useRouter();

  const handleDayClick = (current: moment.Moment) => {
    setTime({ start: -1, end: -1 });
    setDate(current);
  };
  const handleTimeClick = (pickTime: { start: number; end: number }) => setTime(pickTime);

  const onSumbit = () => {
    if (!loading) {
      setLoading(true);
      const data = {
        roomId: room.uid,
        title,
        date,
        ...time,
      };
      createReservation(data)
        .then(async () => {
          const roomData = await getRoom(String(room.uid));
          setRoom(roomData);
        })
        .finally(() => {
          toast({
            title: '알림',
            description: '성공적으로 예약되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          });
          setTimeout(() => {
            setLoading(false);
            setTitle('');
          }, 300);
        });
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onSumbit();
    }
  };

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

  const disabledTime: number[] = useMemo(() => {
    const filterReservation = room?.reservation.filter((res: any) => {
      return moment(res.date.toDate()).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD');
    });
    const result: number[] = [];
    filterReservation?.map((a: any) => {
      result.push(...Array.from({ length: a.end - a.start + 1 }, (_, i) => a.start + i));
    });

    return result;
  }, [room, date]);

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
            <Text textStyle="md" fontWeight="bold">
              날짜 선택
            </Text>
            <Text color="primary.500" fontSize="12px" fontWeight="bold">
              {date.locale('ko').format('YYYY.MM.DD(dd)')}
            </Text>
          </Flex>
          <Divider mt="10px" mb="20px" borderColor="primary.500" borderWidth="1px" />
          <Calendar handleDayClick={handleDayClick} />
        </Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Text textStyle="md" fontWeight="bold">
            시간 선택
          </Text>
          <Text color="primary.500" fontSize="12px" fontWeight="bold">
            {time.start > 0 && time.end > 0 && `${time.start}시 ~ ${time.end + 1}시, ${time.end - time.start + 1}시간`}
          </Text>
        </Flex>
        <Divider mt="10px" mb="20px" borderColor="primary.500" borderWidth="1px" />
        <TimePicker handleTimeClick={handleTimeClick} disabledTime={disabledTime} pickTime={time} />
        <Input placeholder="예약내용" value={title} onChange={(v) => setTitle(v.target.value)} onKeyDown={handleKeyDown} />
        <Button w="100%" colorScheme="primary" mt="20px" onClick={onSumbit} disabled={!title || (time.start === -1 && time.end === -1)} isLoading={loading}>
          회의실 예약하기
        </Button>
      </Container>
    </Box>
  );
};

export default Content;
