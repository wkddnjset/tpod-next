import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';

const usePatchCard = async (uid: string) => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();
      if (user) {
        const cardRef = doc(db, `user/${user.uid}/cards`, uid);
        await updateDoc(cardRef, {
          isMain: true,
        });
        resolve('수정 완료');
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default usePatchCard;
