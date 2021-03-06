import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const useGetMyTeam = async () => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        const docRef = doc(db, 'team', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          resolve(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          resolve({ name: '', slug: '' });
        }
      } else {
        reject('계정 문제');
      }
    });
  });
};

export default useGetMyTeam;
