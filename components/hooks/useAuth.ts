import { getAuth } from 'firebase/auth';

const useAuth = async () => {
  const auth = await getAuth();
  const user = auth.currentUser;
  console.log('user : ', user);
  return {
    uid: user?.uid,
    email: user?.email,
  };
};

export default useAuth;
