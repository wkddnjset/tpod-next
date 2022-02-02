import moment from 'moment';
import { Box, Container } from '@chakra-ui/react';

import Calendar from 'components/common/Calendar';
import TimePicker from 'components/common/TimePicker';

const Content = () => {
  const handleDayClick = (current: moment.Moment) => console.log(current);

  return (
    <Box>
      <Container>
        <Box my="20px">
          <Calendar handleDayClick={handleDayClick} />
        </Box>
        <TimePicker />
      </Container>
    </Box>
  );
};

export default Content;
