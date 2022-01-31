import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { reset } from 'features/LoginForm/loginFormSlice';

import LoginLayout from 'components/common/@Layout/LoginLayout';

import Content from './_fragments/Content';

export const AuthStartContainer = () => {
  const router = useRouter();
  // query
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.asPath === '/auth/start') {
      dispatch(reset());
    }
  }, [router]);

  return <LoginLayout content={<Content />} />;
};
