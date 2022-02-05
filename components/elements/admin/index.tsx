import { useEffect } from 'react';
import Router from 'next/router';

import { setUser } from 'features/Admin/adminSlice';
import { useDispatch } from 'react-redux';

import UserLayout from 'components/common/@Layout/UserLayout';
import Content from './_fragments/Content';

import useGetUser from './hooks/useGetUser';

export function AdminContainer() {
  const dispatch = useDispatch();

  const getUser = useGetUser;
  useEffect(() => {
    getUser()
      .then((res: any) => {
        console.log('res : ', res);
        dispatch(setUser(res));
      })
      .catch(() => {
        Router.replace('/auth/start');
      });
  }, []);
  return <UserLayout content={<Content />} />;
}
