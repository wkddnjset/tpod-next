import { VStack, Box, Flex, Text, Image } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { setMore } from 'features/LoginForm/loginFormSlice';
import { useRootState } from 'components/hooks/useRootState';

import SocialButton from './SocialButton';

import { BrandProps } from 'components/elements/home/types';

export interface LoginButtonBoxProps {
  brand: BrandProps;
}
export const LoginButtonBox = ({ brand }: LoginButtonBoxProps) => {
  // RTK
  const dispatch = useDispatch();
  const { more } = useRootState((state) => state.LOGIN_FORM);

  const hiddenList = brand.socialSet.filter((i) => !i.isMain);
  return (
    <Flex direction="column" alignItems="center">
      <VStack w="100%" mb="8px" spacing="8px">
        {brand.socialSet
          .filter((i) => i.isMain)
          .map((social, idx) => {
            return <SocialButton size="md" key={idx} data={social} brand={brand} />;
          })}
      </VStack>
      <Box
        w="100%"
        h={more ? `${hiddenList.length * 54}px` : '0px'}
        visibility={more ? 'visible' : 'hidden'}
        transition="0.3s"
        opacity={more ? 1 : 0}
        mb={more ? '8px' : '0px'}
      >
        {hiddenList?.map((social, idx) => {
          return <SocialButton size="md" key={idx} data={social} brand={brand} />;
        })}
      </Box>
      <Flex onClick={() => dispatch(setMore(!more))} cursor="pointer" mt="5px">
        <Text textStyle="md" color="gray.700">
          {more ? '돌아가기' : '다른 방법으로 계속하기'}
        </Text>
        <Image src="/icons/more.png" w="24px" h="24px" transform={more ? 'rotate(180deg)' : 'rotate(0deg)'} transition="0.4s" ml="5px" />
      </Flex>
    </Flex>
  );
};
