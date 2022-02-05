import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import BillingAPI from 'apis/Billing';
import { CardProps } from '../_fragments/Modal/CreateCard';

const useCreateCard = async (data: CardProps) => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        // 빌링키 생성
        const params = {
          ...data,
          uid: user.uid,
        };
        BillingAPI.auth(params)
          .then(async (res) => {
            // 카드 생성
            const docRef = await addDoc(collection(db, `user/${user.uid}/cards`), res);
            console.log('docRef : ', docRef.id);
            resolve('생성 완료');
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject({ name: 'user', value: { type: 'manual', message: '계정을 찾을 수 없습니다.' } });
      }
    });
  });
};

export default useCreateCard;
