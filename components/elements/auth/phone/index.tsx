import React from 'react';
import Router from 'next/router';

import { useGetBrandDetailQuery } from 'apis/Brand/query';

import Loading from 'components/common/Loading';
import LoginTemplate from 'components/common/@Layout/LoginTemplate';

import Content from './_fragments/Content';

export const PhoneLoginContainer = () => {
  // query
  const { isLoading, isError, data } = useGetBrandDetailQuery();

  if (isLoading) return <Loading />;
  if (isError) {
    Router.push('/404');
    return null;
  }
  return <LoginTemplate content={<Content brand={data} />} />;
};
