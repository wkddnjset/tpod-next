import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';

const useGetMember = async () => {
  const auth = getAuth();
  let user: any;
  return onAuthStateChanged(auth, (user) => {
    // Check for user status
    // user = user;
    console.log('user : ', user);
    return user;
  });
  // console.log('user : ', user);
  // console.log('auth  : ', auth);
  // console.log('user  : ', user);
  // const db = getFirestore();
  // if (user) {
  //   console.log('user.uid  : ', user.uid);
  //   const docRef = collection(db, `team/${user.uid}/member`);
  //   const result = await getDocs(docRef);
  //   console.log('result.resize : ', result.size);
  //   const members: any = [];
  //   result.forEach((r) => {
  //     members.push({ uid: r.id, ...r.data() });
  //   });
  //   console.log('members : ', members);
  //   return members;
  // }
  // return [];
};

export default useGetMember;
