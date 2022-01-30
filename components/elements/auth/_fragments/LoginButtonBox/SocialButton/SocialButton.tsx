import { Button, Flex, Image, Text } from '@chakra-ui/react';
import Router from 'next/router';
import Link from 'next/link';
import { CallIcon } from 'components/common/@Icons/System';

import getSocialLink from './getSocialLink';
import { BrandProps, SocialType } from 'components/elements/home/types';

import useLastLogin from 'components/elements/start/hooks/useLastLogin';

export interface SocialButtonProps {
  brand: BrandProps;
  data: SocialType;
  size: 'md' | 'sm';
}

export const SOCIAL_DATA: any = Object.freeze({
  KAKAO: { icon: '/icons/social/kakao.png', text: '카카오로 시작하기' },
  NAVER: { icon: '/icons/social/naver.png', text: '네이버로 시작하기' },
  FACEBOOK: { icon: '/icons/social/facebook.png', text: 'Facebook으로 시작하기' },
  GOOGLE: { icon: '/icons/social/google.png', text: 'Google로 시작하기' },
  APPLE: { icon: '/icons/social/apple.png', text: 'Apple로 시작하기' },
});

export const SocialButton = ({ data, brand, size }: SocialButtonProps) => {
  const { lastLogin } = useLastLogin();
  const width = size !== 'sm' ? '100%' : '54px';
  const maxWidth = size !== 'sm' ? 'none' : '54px';
  const left = size !== 'sm' ? '27px' : '9px';
  const social = String(data.kind.toUpperCase());

  // if (social === 'EMAIL') {
  //   return (
  //     <Link href="/start/email" passHref>
  //       <Button as="a" w="100%" h="54px" variant="outline" borderRadius="0px">
  //         <Flex alignItems="center" justifyContent="center">
  //           <MessageIcon position="absolute" w="24px" h="24px" left="27px" />
  //           <Text fontSize={['16px', '14px', '15px']}>이메일로 시작하기</Text>
  //         </Flex>
  //       </Button>
  //     </Link>
  //   );
  // }

  if (social === 'EMAIL') return null;
  if (social === 'PHONE') {
    return (
      <Link href="/start/phone" passHref>
        <Button as="a" w="100%" h="54px" variant="outline" borderRadius="0px">
          {lastLogin === social && <Image src="/lastLogin.png" loading="lazy" w="91px" position="absolute" right="10px" top="-27px" />}
          <Flex alignItems="center" justifyContent="center">
            <CallIcon position="absolute" w="24px" h="24px" left="27px" />
            <Text textStyle="md">전화번호로 시작하기</Text>
          </Flex>
        </Button>
      </Link>
    );
  }
  return (
    <Button
      colorScheme={social}
      w={width}
      h="54px"
      maxW={maxWidth}
      borderRadius="0px"
      onClick={() => {
        localStorage.setItem('doobucLastLogin', String(social));
        Router.replace(getSocialLink({ ...data, name: brand.name }));
      }}
    >
      {lastLogin === social && <Image src="/lastLogin.png" loading="lazy" w="91px" position="absolute" right="10px" top="-27px" />}
      <Flex alignItems="center" justifyContent="center">
        <Image position="absolute" w="24px" h="24px" left={left} src={SOCIAL_DATA[social].icon} loading="lazy" />
        {size !== 'sm' && <Text textStyle="md">{SOCIAL_DATA[social].text}</Text>}
      </Flex>
    </Button>
  );
};
