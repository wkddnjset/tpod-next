import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';

const useGetMyRooms = async () => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        const docRef = collection(db, `team/${user.uid}/room`);
        const result = await getDocs(docRef);
        const rooms: any = [];
        result.forEach((r) => {
          rooms.push({ uid: r.id, ...r.data() });
        });
        resolve(rooms);
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default useGetMyRooms;
