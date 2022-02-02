import { useEffect } from 'react';
import Router from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import ContentLayout from 'components/common/@Layout/ContentLayout';
import Content from './_fragments/Content';

export function AdminContainer() {
  useEffect(() => {
    const checkIsLogin = async () => {
      const auth = await getAuth();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          Router.replace('/auth/start');
        }
      });
    };
    checkIsLogin();
  }, []);
  return <ContentLayout content={<Content />} />;
}
