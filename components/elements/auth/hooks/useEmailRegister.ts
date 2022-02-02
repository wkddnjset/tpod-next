import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDoc } from 'firebase/firestore';

const useEmailRegister = async (email: string, password: string, nickname: string) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      const db = getFirestore();
      return addDoc(collection(db, 'user'), {
        email: email,
        nickname: nickname,
      });
    })
    .catch((error) => {
      return new Promise((_, reject) => reject(error));
    });
};

export default useEmailRegister;
