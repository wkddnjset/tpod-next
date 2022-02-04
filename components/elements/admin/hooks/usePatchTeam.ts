import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { TeamProps } from 'features/Admin/adminSlice';

const usePatchTeam = async (data: TeamProps) => {
  const auth = await getAuth();
  const db = getFirestore();

  const docRef = query(collection(db, 'team'), where('slug', '==', data.slug));
  const result = await getDocs(docRef);

  return new Promise(function (resolve, reject) {
    if (result.size > 0) {
      reject({ name: 'slug', value: { type: 'manual', message: '중복되는 slug 입니다.' } });
    } else {
      onAuthStateChanged(auth, async (user) => {
        const db = getFirestore();

        if (user) {
          await setDoc(doc(db, 'team', user.uid), data);
          resolve(data);
        } else {
          reject({ name: 'user', value: { type: 'manual', message: '계정을 찾을 수 없습니다.' } });
        }
      });
    }
  });
};

export default usePatchTeam;
