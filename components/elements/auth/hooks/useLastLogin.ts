import { useEffect, useState } from 'react';

function useLastLogin() {
  const [lastLogin, setLastLogin] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const doobucLastLogin = await localStorage.getItem('doobucLastLogin');
      if (doobucLastLogin) {
        setLastLogin(String(doobucLastLogin));
      }
    };
    init();
  }, []);

  return { lastLogin };
}

export default useLastLogin;
