import { Container, Center, Flex, Text } from '@chakra-ui/react';
import { useState, useRef } from 'react';

interface Props {
  handleTimeClick: (val: { start: number; end: number }) => void;
  disabledTime: number[];
  pickTime: { start: number; end: number };
}
const TimePicker = ({ handleTimeClick, disabledTime, pickTime }: Props) => {
  const timepickerRef = useRef<any>(null);
  const [active, setActive] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<number>(0);
  const [endPos, setEndPos] = useState<number>(0);

  const onScrollHandler = () => {
    if (!active) {
      setEndPos(timepickerRef.current.scrollLeft);
    }
  };
  const mouseDownHandler = (e: any) => {
    setActive(true);
    setStartPos(e.clientX);
    timepickerRef.current.style.cursor = 'grabbing';
    timepickerRef.current.style.userSelect = 'none';
  };
  const mouseUpHandler = (e: any) => {
    timepickerRef.current.style.cursor = 'grab';
    setEndPos(startPos - e.clientX + endPos);
    setActive(false);
  };
  const mouseMoveHandler = (e: any) => {
    if (active) {
      timepickerRef.current.scrollLeft = startPos - e.clientX + endPos;
    }
  };

  const handlePickTime = (time: number) => {
    const disabled = disabledTime.includes(time);
    if (!disabled) {
      if (pickTime.start === -1 || pickTime.end !== pickTime.start) {
        handleTimeClick({ start: time, end: time });
      } else if (pickTime.start !== -1 && pickTime.end === pickTime.start) {
        // 기존 선택한 시간이 현재 선택한 시간보다 큼
        if (time < pickTime.start) {
          if (disabledTime.length > 0) {
            // 이미 예약된 구간 제외
            if (time > disabledTime[disabledTime.length - 1] || pickTime.start < disabledTime[0]) {
              handleTimeClick({ start: time, end: pickTime.start });
            } else {
              handleTimeClick({ start: time, end: time });
            }
          } else {
            handleTimeClick({ start: time, end: pickTime.start });
          }
        }
        // 기존 선택한 시간이 현재 선택한 시간보다 작음
        else {
          if (disabledTime.length > 0) {
            // 이미 예약된 구간 제외
            if (time < disabledTime[0] || pickTime.start > disabledTime[disabledTime.length - 1]) {
              handleTimeClick({ start: pickTime.start, end: time });
            } else {
              handleTimeClick({ start: time, end: time });
            }
          } else {
            handleTimeClick({ start: pickTime.start, end: time });
          }
        }
      }
    }
  };

  return (
    <Container
      ref={timepickerRef}
      id="timepicker"
      overflow="auto"
      cursor="grab"
      onScroll={onScrollHandler}
      onMouseMove={mouseMoveHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      p="0px"
      css={{
        '&::-webkit-scrollbar': {
          width: '0px',
          height: '0px',
        },
        '&::-webkit-scrollbar-track': {
          width: '0px',
          height: '0px',
        },
      }}
    >
      <Flex pt="40px" pb="20px" px="10px" display="inline-flex">
        {new Array(24).fill(0).map((_, idx) => {
          const disabled = disabledTime.includes(idx);
          const isActive = pickTime.start === idx || pickTime.end === idx || (pickTime.start <= idx && pickTime.end >= idx);
          return (
            <Center
              key={`timepicker_${idx}`}
              w="45px"
              h="45px"
              bg={disabled ? 'gray.300' : isActive ? 'secondary.500' : 'primary.500'}
              position="relative"
              borderWidth="1px"
              borderColor={disabled ? 'gray.400' : isActive ? 'secondary.500' : 'primary.500'}
              cursor="pointer"
              onClick={() => !active && handlePickTime(idx)}
            >
              {idx === 0 && (
                <Text w="20px" position="absolute" fontSize="10px" top="-35px" left="-10px" textAlign="center">
                  오전
                </Text>
              )}
              {idx === 12 && (
                <Text w="20px" position="absolute" fontSize="10px" top="-35px" left="-10px" textAlign="center">
                  오후
                </Text>
              )}
              <Text fontSize="13px" w="15px" position="absolute" top="-22px" left="-8px" textAlign="center">
                {idx}
              </Text>
              {!disabled && (
                <Text fontSize="10px" color={isActive ? 'black' : 'white'}>
                  예약가능
                </Text>
              )}
            </Center>
          );
        })}
      </Flex>
    </Container>
  );
};

export default TimePicker;
