import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const useEmailLogin = async (email: string, password: string) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export default useEmailLogin;
