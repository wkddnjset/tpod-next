import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';

const useDeleteRoom = async (uid: string) => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        await deleteDoc(doc(db, `team/${user.uid}/room`, uid));
        resolve('삭제 완료');
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default useDeleteRoom;
