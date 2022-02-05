import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import moment from 'moment';

const useGetUser = async () => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        const docRef = doc(db, 'user', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const result = {
            email: data.email,
            nickname: data.nickname,
            freeTrial: moment(data.freeTrial.toDate()).toString(),
          };
          resolve(result);
        } else {
          reject('계정 문제');
        }
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default useGetUser;
