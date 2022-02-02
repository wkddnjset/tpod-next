import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const useGetMembers = async () => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        const docRef = collection(db, `team/${user.uid}/member`);
        const result = await getDocs(docRef);
        const members: any = [];
        result.forEach((r) => {
          members.push({ uid: r.id, ...r.data() });
        });
        resolve(members);
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default useGetMembers;
