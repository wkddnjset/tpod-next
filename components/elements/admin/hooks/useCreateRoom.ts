import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { RoomProps } from '../_fragments/Modal/CreateRoom';

const useCreateRoom = async (data: RoomProps) => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        const docRef = await addDoc(collection(db, `team/${user.uid}/room`), data);
        console.log('docRef : ', docRef.id);
        resolve('생성 완료');
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default useCreateRoom;
