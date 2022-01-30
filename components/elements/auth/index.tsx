import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { reset } from 'features/LoginForm/loginFormSlice';

import { useGetBrandDetailQuery } from 'apis/Brand/query';

import Loading from 'components/common/Loading';
import LoginTemplate from 'components/common/@Layout/LoginLayout';

import Content from './_fragments/Content';

export const AuthContainer = () => {
  const router = useRouter();
  // query
  const { isLoading, isError, data } = useGetBrandDetailQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.asPath === '/start') {
      dispatch(reset());
    }
  }, [router]);

  if (isLoading) return <Loading />;
  if (isError) {
    router.push('/404');
    return null;
  }
  return <LoginTemplate content={<Content brand={data} />} />;
};
