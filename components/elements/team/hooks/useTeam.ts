import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';

const useTeam = async (team?: string) => {
  const db = getFirestore();

  const docRef = query(collection(db, 'team'), where('name', '==', team));
  const result = await getDocs(docRef);

  console.log('auth : ');
  // let result = null;
  // if (team) {
  //   getTeam(team);
  // } else {
  //   const auth = getAuth();
  //   await onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       console.log('user : ', user);
  //       console.log('user?.uid : ', user?.uid);
  //       const docRef = doc(db, 'team', user.uid);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         console.log('Document data:', docSnap.data());
  //         return docSnap.data();
  //       }
  //     }
  //   });
  // }
  // console.log('result : ', result);
};

export default useTeam;
