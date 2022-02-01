import { Box, Container, Text } from '@chakra-ui/react';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TimePicker = () => {
  return (
    <Box>
      <Slider {...settings}>
        <Box bg="purple">
          <h3>1</h3>
        </Box>
        <Box bg="pink">
          <h3>2</h3>
        </Box>
        <Box bg="green">
          <h3>3</h3>
        </Box>
        <Box>
          <h3>4</h3>
        </Box>
        <Box>
          <h3>5</h3>
        </Box>
        <Box>
          <h3>6</h3>
        </Box>
      </Slider>
    </Box>
  );
};

export default TimePicker;
