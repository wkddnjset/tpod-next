import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const useGetMyCards = async () => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        const docRef = collection(db, `user/${user.uid}/cards`);
        const result = await getDocs(docRef);
        const cards: any = [];
        result.forEach((r) => {
          cards.push({ uid: r.id, ...r.data() });
        });
        resolve(cards);
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default useGetMyCards;
