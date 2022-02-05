import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import moment from 'moment';

const useEmailRegister = async (email: string, password: string, nickname: string) => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const db = getFirestore();
        setDoc(doc(db, 'user', userCredential.user.uid), {
          email: email,
          nickname: nickname,
          freeTrial: moment(new Date()).add(30, 'days').toDate(),
        })
          .then(() => {
            resolve('회원가입 성공');
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default useEmailRegister;
